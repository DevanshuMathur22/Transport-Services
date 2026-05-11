// app/api/payments/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// CREATE PAYMENT
//////////////////////////////////////////////////////

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !body.userId ||
      !body.bookingId
    ) {
      return NextResponse.json(
        {
          error:
            "Missing userId or bookingId",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // CREATE PAYMENT
    //////////////////////////////////////////////////////

    const payment =
      await prisma.payment.create({

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
            body.status || "paid",

          //////////////////////////////////////////////////////
          // CONNECT USER
          //////////////////////////////////////////////////////

          user: {
            connect: {
              id:
                body.userId,
            },
          },

          //////////////////////////////////////////////////////
          // CONNECT BOOKING
          //////////////////////////////////////////////////////

          booking: {
            connect: {
              id:
                body.bookingId,
            },
          },
        },
      })

    //////////////////////////////////////////////////////
    // CREATE NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          body.userId,

        title:
          "Payment Successful",

        message:
          `Payment of ₹${payment.amount} completed successfully.`,

        type:
          "payment",
      },
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

    console.log(error)

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