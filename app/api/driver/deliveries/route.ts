import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

export async function GET(
  req: NextRequest
) {

  try {

    //////////////////////////////////////////////////////
    // TOKEN
    //////////////////////////////////////////////////////

    const token =
      req.cookies.get("token")
        ?.value

    if (!token) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    //////////////////////////////////////////////////////
    // VERIFY
    //////////////////////////////////////////////////////

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as {
        id: string
      }

    //////////////////////////////////////////////////////
    // DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },
      })

    //////////////////////////////////////////////////////
    // CHECK DRIVER
    //////////////////////////////////////////////////////

    if (
      !driver ||
      driver.role !==
        "driver"
    ) {

      return NextResponse.json(
        {
          error:
            "Access denied",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // ACTIVE DELIVERIES
    //////////////////////////////////////////////////////

    const deliveries =
      await prisma.booking.findMany({

        where: {

          driverId:
            driver.id,

          status: {

            in: [
              "accepted",
              "picked_up",
              "in_transit",
            ],
          },
        },

        include: {

          user: {

            select: {

              name: true,

              phone: true,

              email: true,
            },
          },
        },

        orderBy: {

          updatedAt:
            "desc",
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(
      deliveries
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch deliveries",
      },
      {
        status: 500,
      }
    )
  }
}