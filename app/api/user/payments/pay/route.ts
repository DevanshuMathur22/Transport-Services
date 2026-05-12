// app/api/user/payments/pay/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

import { sendEmail }
from "@/lib/send-email"

import BookingEmail
from "@/emails/booking-email"

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
    // USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },
      })

    if (!user) {

      return NextResponse.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
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
    // PAYMENT EXISTS
    //////////////////////////////////////////////////////

    const existingPayment =
      await prisma.payment.findUnique({

        where: {
          bookingId,
        },
      })

    //////////////////////////////////////////////////////
    // UPSERT PAYMENT
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
    // USER NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          decoded.id,

        title:
          existingPayment
            ? "Payment Updated"
            : "Payment Successful",

        message:
          `₹${payment.amount} payment completed successfully.`,

        type:
          "payment",
      },
    })

    //////////////////////////////////////////////////////
    // ADMIN NOTIFICATION
    //////////////////////////////////////////////////////

    const admin =
      await prisma.user.findFirst({

        where: {
          role:
            "admin",
        },
      })

    if (admin) {

      await prisma.notification.create({

        data: {

          userId:
            admin.id,

          title:
            "New Payment Received",

          message:
            `${user.name} paid ₹${payment.amount} for shipment ${booking.trackingId}.`,

          type:
            "admin",
        },
      })
    }

    //////////////////////////////////////////////////////
    // EMAIL
    //////////////////////////////////////////////////////

    await sendEmail({

      to:
        user.email,

      subject:
        "Payment Successful",

      react:
        BookingEmail({

          trackingId:
            booking.trackingId,

          customerName:
            user.name,
        }),
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