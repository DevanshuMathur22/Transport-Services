// app/api/user/payment-stats/route.ts

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
// PAYMENT STATS
//////////////////////////////////////////////////////

export async function GET(
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

          isBlocked: true,
        },
      })

    //////////////////////////////////////////////////////
    // CHECK USER
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
          acc: number,
          item: any
        ) =>
          acc +
          item.amount,
        0
      )

    const successful =
      payments.filter(
        (
          item: any
        ) =>
          item.status ===
          "paid"
      ).length

    const pending =
      payments.filter(
        (
          item: any
        ) =>
          item.status ===
          "pending"
      ).length

    const refunded =
      payments.filter(
        (
          item: any
        ) =>
          item.status ===
          "refunded"
      ).length

    const failed =
      payments.filter(
        (
          item: any
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

      success: true,

      stats: {

        totalSpent,

        successful,

        pending,

        refunded,

        failed,

        totalTransactions:
          payments.length,
      },

      lastPayment,

      payments,
    })

  } catch (error) {

    console.log(
      "PAYMENT_STATS_ERROR:",
      error
    )

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