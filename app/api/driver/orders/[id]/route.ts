// app/api/driver/orders/[id]/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

//////////////////////////////////////////////////////
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// PARAMS TYPE
//////////////////////////////////////////////////////

type Props = {
  params: Promise<{
    id: string
  }>
}

//////////////////////////////////////////////////////
// GET DRIVER ORDER
//////////////////////////////////////////////////////

export async function GET(
  req: NextRequest,
  context: Props
) {

  try {

    //////////////////////////////////////////////////////
    // TOKEN
    //////////////////////////////////////////////////////

    const token =
      req.cookies.get("token")
        ?.value

    //////////////////////////////////////////////////////
    // NO TOKEN
    //////////////////////////////////////////////////////

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
    // JWT SECRET
    //////////////////////////////////////////////////////

    if (
      !process.env.JWT_SECRET
    ) {

      return NextResponse.json(
        {
          error:
            "JWT secret missing",
        },
        {
          status: 500,
        }
      )
    }

    //////////////////////////////////////////////////////
    // VERIFY TOKEN
    //////////////////////////////////////////////////////

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      ) as {
        id: string
      }

    //////////////////////////////////////////////////////
    // PARAMS
    //////////////////////////////////////////////////////

    const { id } =
      await context.params

    //////////////////////////////////////////////////////
    // FIND DRIVER
    //////////////////////////////////////////////////////

   const driver =
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
    // ACCESS CHECK
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
    // FIND ORDER
    //////////////////////////////////////////////////////

    const order =
      await prisma.booking.findUnique({

        where: {
          id,
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

              address: true,

              city: true,
            },
          },

          //////////////////////////////////////////////////////
          // PAYMENT
          //////////////////////////////////////////////////////

          payment: {

            select: {

              amount: true,

              status: true,

              paymentMethod: true,

              transactionId: true,
            },
          },

          //////////////////////////////////////////////////////
          // TRACKING
          //////////////////////////////////////////////////////

          tracking: {

            orderBy: {

              createdAt:
                "asc",
            },
          },
        },
      })

    //////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////

    if (!order) {

      return NextResponse.json(
        {
          error:
            "Order not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // DRIVER ACCESS CHECK
    //////////////////////////////////////////////////////

    if (
      order.driverId !==
      decoded.id
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
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      order,
    })

  } catch (error) {

    console.log(
      "DRIVER ORDER ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch order details",
      },
      {
        status: 500,
      }
    )
  }
}