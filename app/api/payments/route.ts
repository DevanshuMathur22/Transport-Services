// app/api/payments/route.ts

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
// CREATE PAYMENT
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

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !body.bookingId
    ) {

      return NextResponse.json(
        {
          error:
            "Booking ID required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // PAYMENT METHOD VALIDATION
    //////////////////////////////////////////////////////

    if (
      !body.paymentMethod
    ) {

      return NextResponse.json(
        {
          error:
            "Payment method required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // AMOUNT VALIDATION
    //////////////////////////////////////////////////////

    const amount =
      Number(body.amount)

    if (

      isNaN(amount) ||

      amount <= 0

    ) {

      return NextResponse.json(
        {
          error:
            "Invalid payment amount",
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
    // BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findUnique({

        where: {
          id:
            body.bookingId,
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
    // ACCESS CHECK
    //////////////////////////////////////////////////////

    if (
      booking.userId !==
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
    // EXISTING PAYMENT
    //////////////////////////////////////////////////////

    const existingPayment =
      await prisma.payment.findUnique({

        where: {
          bookingId:
            booking.id,
        },
      })

    //////////////////////////////////////////////////////
    // PAYMENT STATUS
    //////////////////////////////////////////////////////

    const paymentStatus =

      body.status ||
      "paid"

    //////////////////////////////////////////////////////
    // PAYMENT
    //////////////////////////////////////////////////////

    let payment

    //////////////////////////////////////////////////////
    // UPDATE PAYMENT
    //////////////////////////////////////////////////////

    if (existingPayment) {

      payment =
        await prisma.payment.update({

          where: {
            id:
              existingPayment.id,
          },

          data: {

            amount,

            paymentMethod:
              body.paymentMethod,

            transactionId:
              `TXN${Date.now()}`,

            status:
              paymentStatus,
          },
        })

    } else {

      //////////////////////////////////////////////////////
      // CREATE PAYMENT
      //////////////////////////////////////////////////////

      payment =
        await prisma.payment.create({

          data: {

            userId:
              decoded.id,

            bookingId:
              booking.id,

            amount,

            paymentMethod:
              body.paymentMethod,

            transactionId:
              `TXN${Date.now()}`,

            status:
              paymentStatus,
          },
        })
    }

    //////////////////////////////////////////////////////
    // NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          decoded.id,

        title:
          "Payment Successful",

        message:
          `Payment of ₹${payment.amount} completed successfully.`,

        type:
          "payment",
      },
    })

    //////////////////////////////////////////////////////
    // EMAIL
    //////////////////////////////////////////////////////

    if (user.email) {

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
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(

      {
        success: true,

        payment,
      },

      {
        status: 201,
      }
    )

  } catch (error) {

    console.log(
      "PAYMENT_ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to create payment",
      },
      {
        status: 500,
      }
    )
  }
}