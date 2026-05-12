// app/api/driver/orders/route.ts

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
    // GET ORDERS
    //////////////////////////////////////////////////////

    const orders =
      await prisma.booking.findMany({

        where: {

          driverId:
            driver.id,
        },

        include: {

          //////////////////////////////////////////////////////
          // CUSTOMER
          //////////////////////////////////////////////////////

          user: {

            select: {

              id: true,

              name: true,

              email: true,

              phone: true,
            },
          },

          //////////////////////////////////////////////////////
          // PAYMENT
          //////////////////////////////////////////////////////

          payment: true,
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
      orders
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch driver orders",
      },
      {
        status: 500,
      }
    )
  }
}