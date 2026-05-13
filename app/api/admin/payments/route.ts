// app/api/admin/payments/route.ts

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
// GET ADMIN PAYMENTS
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
    // ADMIN CHECK
    //////////////////////////////////////////////////////

    const admin =
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
    // ACCESS DENIED
    //////////////////////////////////////////////////////

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
    // BLOCKED ADMIN
    //////////////////////////////////////////////////////

    if (
      admin.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Admin account blocked",
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
    // TOTAL REVENUE
    //////////////////////////////////////////////////////

    const totalRevenue =
      payments
        .filter(
          (item: any) =>
            item.status ===
            "paid"
        )
        .reduce(
          (
            acc: number,
            item: any
          ) =>

            acc +

            item.amount,

          0
        )

    //////////////////////////////////////////////////////
    // SUCCESSFUL
    //////////////////////////////////////////////////////

    const successful =
      payments.filter(
        (item: any) =>
          item.status ===
          "paid"
      ).length

    //////////////////////////////////////////////////////
    // PENDING
    //////////////////////////////////////////////////////

    const pending =
      payments.filter(
        (item: any) =>
          item.status ===
          "pending"
      ).length

    //////////////////////////////////////////////////////
    // REFUNDED
    //////////////////////////////////////////////////////

    const refunded =
      payments.filter(
        (item: any) =>
          item.status ===
          "refunded"
      ).length

    //////////////////////////////////////////////////////
    // FAILED
    //////////////////////////////////////////////////////

    const failed =
      payments.filter(
        (item: any) =>
          item.status ===
          "failed"
      ).length

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      payments,

      stats: {

        totalRevenue,

        successful,

        pending,

        refunded,

        failed,
      },
    })

  } catch (error) {

    console.log(
      "ADMIN PAYMENTS ERROR:",
      error
    )

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