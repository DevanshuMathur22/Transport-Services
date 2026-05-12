// app/api/user/payments/route.ts

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
// GET PAYMENTS
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
    // QUERY PARAMS
    //////////////////////////////////////////////////////

    const {
      searchParams,
    } = new URL(req.url)

    const status =
      searchParams.get(
        "status"
      )

    const page =
      Number(
        searchParams.get(
          "page"
        )
      ) || 1

    const limit =
      Number(
        searchParams.get(
          "limit"
        )
      ) || 10

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      page < 1 ||
      limit < 1
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid pagination",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // VALID STATUS
    //////////////////////////////////////////////////////

    const validStatuses = [

      "paid",

      "pending",

      "failed",

      "refunded",
    ]

    if (
      status &&
      !validStatuses.includes(
        status
      )
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid payment status",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // PAYMENTS
    //////////////////////////////////////////////////////

    const payments =
      await prisma.payment.findMany({

        where: {

          userId:
            decoded.id,

          ...(status && {
            status:
              status as any,
          }),
        },

        include: {

          //////////////////////////////////////////////////////
          // BOOKING
          //////////////////////////////////////////////////////

          booking: {

            include: {

              driver: {

                select: {

                  id: true,

                  name: true,

                  phone: true,

                  vehicleType: true,

                  vehicleNumber: true,
                },
              },
            },
          },
        },

        orderBy: {

          createdAt:
            "desc",
        },

        skip:
          (page - 1) *
          limit,

        take:
          limit,
      })

    //////////////////////////////////////////////////////
    // TOTAL
    //////////////////////////////////////////////////////

    const total =
      await prisma.payment.count({

        where: {

          userId:
            decoded.id,

          ...(status && {
            status:
              status as any,
          }),
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      payments,

      pagination: {

        total,

        page,

        limit,

        totalPages:
          Math.ceil(
            total / limit
          ),

        hasNextPage:
          page * limit <
          total,

        hasPrevPage:
          page > 1,
      },
    })

  } catch (error) {

    console.log(
      "USER_PAYMENTS_ERROR:",
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