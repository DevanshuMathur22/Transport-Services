// app/api/user/payment-stats/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

//////////////////////////////////////////////////////
// PAYMENT STATS
//////////////////////////////////////////////////////

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

          role: true,
        },
      })

    //////////////////////////////////////////////////////
    // CHECK USER
    //////////////////////////////////////////////////////

    if (
      !user ||
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
    // USER PAYMENTS
    //////////////////////////////////////////////////////

    const payments =
      await prisma.payment.findMany({

        where: {
          userId:
            decoded.id,
        },

        include: {

          booking: {

            select: {

              trackingId: true,

              fromCity: true,

              toCity: true,

              status: true,
            },
          },
        },

        orderBy: {

          createdAt:
            "desc",
        },
      })

    //////////////////////////////////////////////////////
    // STATS
    //////////////////////////////////////////////////////

    const totalSpent =
      payments.reduce(
        (
          acc,
          item
        ) =>
          acc +
          item.amount,
        0
      )

    const successful =
      payments.filter(
        (
          item
        ) =>
          item.status ===
          "paid"
      ).length

    const pending =
      payments.filter(
        (
          item
        ) =>
          item.status ===
          "pending"
      ).length

    const refunded =
      payments.filter(
        (
          item
        ) =>
          item.status ===
          "refunded"
      ).length

    const failed =
      payments.filter(
        (
          item
        ) =>
          item.status ===
          "failed"
      ).length

    //////////////////////////////////////////////////////
    // LAST PAYMENT
    //////////////////////////////////////////////////////

    const lastPayment =
      payments[0] || null

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      totalSpent,

      successful,

      pending,

      refunded,

      failed,

      totalTransactions:
        payments.length,

      lastPayment,

      payments,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch payment stats",
      },
      {
        status: 500,
      }
    )
  }
}