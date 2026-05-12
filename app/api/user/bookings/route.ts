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
    // VERIFY TOKEN
    //////////////////////////////////////////////////////

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as {
        id: string
      }

    //////////////////////////////////////////////////////
    // USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },

        select: {

          id: true,

          role: true,
        },
      })

    //////////////////////////////////////////////////////
    // CHECK USER
    //////////////////////////////////////////////////////

    if (
      !user ||
      user.role !==
        "user"
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
    // USER BOOKINGS
    //////////////////////////////////////////////////////

    const bookings =
      await prisma.booking.findMany({

        where: {
          userId:
            decoded.id,
        },

        include: {

          //////////////////////////////////////////////////////
          // DRIVER
          //////////////////////////////////////////////////////

          driver: {

            select: {

              id: true,

              name: true,

              phone: true,

              vehicleType: true,

              vehicleNumber: true,
            },
          },

          //////////////////////////////////////////////////////
          // PAYMENT
          //////////////////////////////////////////////////////

          payment: true,

          //////////////////////////////////////////////////////
          // TRACKING
          //////////////////////////////////////////////////////

          tracking: {

            orderBy: {

              createdAt:
                "desc",
            },

            take: 1,
          },
        },

        orderBy: {

          createdAt:
            "desc",
        },

        take: 10,
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(
      bookings
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch bookings",
      },
      {
        status: 500,
      }
    )
  }
}