// app/api/admin/payments/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET ADMIN PAYMENTS
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
    // CHECK ADMIN
    //////////////////////////////////////////////////////

    const admin =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },
      })

    if (
      !admin ||
      admin.role !==
        "admin"
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
    // PAYMENTS
    //////////////////////////////////////////////////////

    const payments =
      await prisma.payment.findMany({

        include: {

          //////////////////////////////////////////////////////
          // USER
          //////////////////////////////////////////////////////

          user: {

            select: {

              id: true,

              name: true,

              email: true,

              phone: true,
            },
          },

          //////////////////////////////////////////////////////
          // BOOKING
          //////////////////////////////////////////////////////

          booking: {

            select: {

              id: true,

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

    const totalRevenue =
      payments
        .filter(
          (item) =>
            item.status ===
            "paid"
        )
        .reduce(
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
        (item) =>
          item.status ===
          "paid"
      ).length

    const pending =
      payments.filter(
        (item) =>
          item.status ===
          "pending"
      ).length

    const refunded =
      payments.filter(
        (item) =>
          item.status ===
          "refunded"
      ).length

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      payments,

      stats: {

        totalRevenue,

        successful,

        pending,

        refunded,
      },
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch payments",
      },
      {
        status: 500,
      }
    )
  }
}