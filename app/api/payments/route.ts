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
// CREATE PAYMENT
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
    // BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findUnique({

        where: {
          id:
            body.bookingId,
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
          bookingId:
            booking.id,
        },
      })

    //////////////////////////////////////////////////////
    // UPDATE PAYMENT
    //////////////////////////////////////////////////////

    let payment

    if (existingPayment) {

      payment =
        await prisma.payment.update({

          where: {
            id:
              existingPayment.id,
          },

          data: {

            amount:
              Number(
                body.amount
              ),

            paymentMethod:
              body.paymentMethod,

            transactionId:
              `TXN${Date.now()}`,

            status:
              body.status ||
              "completed",
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

            amount:
              Number(
                body.amount
              ),

            paymentMethod:
              body.paymentMethod,

            transactionId:
              `TXN${Date.now()}`,

            status:
              body.status ||
              "completed",
          },
        })
    }

    //////////////////////////////////////////////////////
    // USER NOTIFICATION
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

    return NextResponse.json(
      payment,
      {
        status: 201,
      }
    )

  } catch (error) {

    console.log(
      "PAYMENT_ERROR",
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