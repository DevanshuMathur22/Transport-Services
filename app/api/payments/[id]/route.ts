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
// GET SINGLE PAYMENT
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
    // PAYMENT
    //////////////////////////////////////////////////////

    const payment =
      await prisma.payment.findUnique({

        where: {
          id,
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

    return NextResponse.json({

      success: true,

      payment,
    })

  } catch (error) {

    console.log(
      "GET PAYMENT ERROR:",
      error
    )

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
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !body.status
    ) {

      return NextResponse.json(
        {
          error:
            "Status is required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // PAYMENT
    //////////////////////////////////////////////////////

    const existingPayment =
      await prisma.payment.findUnique({

        where: {
          id,
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

    if (
      !existingPayment
    ) {

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
          id,
        },

        data: {

          status:
            body.status,
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
    // TRACKING ENTRY
    //////////////////////////////////////////////////////

    if (
      payment.booking
    ) {

      await prisma.tracking.create({

        data: {

          bookingId:
            payment.booking.id,

          location:
            payment.booking.toCity,

          message:
            `Payment marked as ${body.status}`,
        },
      })
    }

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

    return NextResponse.json({

      success: true,

      payment,
    })

  } catch (error) {

    console.log(
      "UPDATE PAYMENT ERROR:",
      error
    )

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