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
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// PAY NOW
//////////////////////////////////////////////////////

export async function POST(
  req: NextRequest
) {

  try {

    //////////////////////////////////////////////////////
    // JWT SECRET CHECK
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
    // INVALID AMOUNT
    //////////////////////////////////////////////////////

    if (
      Number(amount) <= 0
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid amount",
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

        select: {

          id: true,

          name: true,

          email: true,

          role: true,

          isBlocked: true,
        },
      })

    //////////////////////////////////////////////////////
    // USER NOT FOUND
    //////////////////////////////////////////////////////

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
    // BLOCKED USER
    //////////////////////////////////////////////////////

    if (
      user.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Account blocked",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // ROLE CHECK
    //////////////////////////////////////////////////////

    if (
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

    //////////////////////////////////////////////////////
    // BOOKING NOT FOUND
    //////////////////////////////////////////////////////

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
    // TRANSACTION ID
    //////////////////////////////////////////////////////

    const transactionId =
      `TXN${Date.now()}`

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

          transactionId,
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

          transactionId,
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

    console.log(
      "PAYMENT_ERROR:",
      error
    )

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