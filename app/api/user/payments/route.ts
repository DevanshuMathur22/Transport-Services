// app/api/user/payments/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET PAYMENTS
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

      payments,

      pagination: {

        total,

        page,

        limit,

        totalPages:
          Math.ceil(
            total / limit
          ),
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