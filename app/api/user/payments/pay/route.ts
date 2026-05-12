// app/api/user/payments/pay/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// PAY NOW
//////////////////////////////////////////////////////

export async function POST(
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
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    const {
      bookingId,
      amount,
      paymentMethod,
    } = body

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !bookingId ||
      !amount ||
      !paymentMethod
    ) {

      return NextResponse.json(
        {
          error:
            "Missing fields",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // CHECK BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findFirst({

        where: {

          id:
            bookingId,

          userId:
            decoded.id,
        },
      })

    if (!booking) {

      return NextResponse.json(
        {
          error:
            "Booking not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // CREATE PAYMENT
    //////////////////////////////////////////////////////

    const payment =
  await prisma.payment.upsert({

    where: {
      bookingId,
    },

    update: {

      amount:
        Number(amount),

      paymentMethod,

      status:
        "paid",

      transactionId:
        `TXN${Date.now()}`,
    },

    create: {

      userId:
        decoded.id,

      bookingId,

      amount:
        Number(amount),

      paymentMethod,

      status:
        "paid",

      transactionId:
        `TXN${Date.now()}`,
    },
  })
    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      payment,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Payment failed",
      },
      {
        status: 500,
      }
    )
  }
}