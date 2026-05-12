// app/api/payments/[id]/route.ts

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

interface Props {
  params: Promise<{
    id: string
  }>
}

//////////////////////////////////////////////////////
// GET SINGLE PAYMENT
//////////////////////////////////////////////////////

export async function GET(
  req: NextRequest,
  { params }: Props
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
    // PARAMS
    //////////////////////////////////////////////////////

    const resolved =
      await params

    //////////////////////////////////////////////////////
    // PAYMENT
    //////////////////////////////////////////////////////

    const payment =
      await prisma.payment.findUnique({

        where: {
          id:
            resolved.id,
        },

        include: {

          booking: true,

          user: {

            select: {

              id: true,

              name: true,

              email: true,
            },
          },
        },
      })

    //////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////

    if (!payment) {

      return NextResponse.json(
        {
          error:
            "Payment not found",
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
      payment.userId !==
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

    return NextResponse.json(
      payment
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch payment",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// UPDATE PAYMENT
//////////////////////////////////////////////////////

export async function PUT(
  req: NextRequest,
  { params }: Props
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
    // PARAMS
    //////////////////////////////////////////////////////

    const resolved =
      await params

    //////////////////////////////////////////////////////
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // PAYMENT
    //////////////////////////////////////////////////////

    const existingPayment =
      await prisma.payment.findUnique({

        where: {
          id:
            resolved.id,
        },

        include: {

          booking: true,

          user: {

            select: {

              id: true,

              name: true,

              email: true,
            },
          },
        },
      })

    //////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////

    if (!existingPayment) {

      return NextResponse.json(
        {
          error:
            "Payment not found",
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
      existingPayment.userId !==
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
    // UPDATE PAYMENT
    //////////////////////////////////////////////////////

    const payment =
      await prisma.payment.update({

        where: {
          id:
            resolved.id,
        },

        data: {

          status:
            body.status,
        },
      })

    //////////////////////////////////////////////////////
    // USER NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          existingPayment.userId,

        title:
          "Payment Updated",

        message:
          `Payment status updated to ${body.status}.`,

        type:
          "payment",
      },
    })

    //////////////////////////////////////////////////////
    // EMAIL
    //////////////////////////////////////////////////////

    if (
      existingPayment.user?.email
    ) {

      await sendEmail({

        to:
          existingPayment.user.email,

        subject:
          "Payment Status Updated",

        react:
          BookingEmail({

            trackingId:
              existingPayment.booking
                ?.trackingId || "",

            customerName:
              existingPayment.user.name,
          }),
      })
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(
      payment
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to update payment",
      },
      {
        status: 500,
      }
    )
  }
}