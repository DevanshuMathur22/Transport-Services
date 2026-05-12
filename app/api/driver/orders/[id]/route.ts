// app/api/driver/orders/[id]/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

interface Props {
  params: Promise<{
    id: string
  }>
}

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
    // PARAMS
    //////////////////////////////////////////////////////

    const resolved =
      await params

    //////////////////////////////////////////////////////
    // FIND ORDER
    //////////////////////////////////////////////////////

    const order =
      await prisma.booking.findUnique({

        where: {
          id:
            resolved.id,
        },

        include: {

          //////////////////////////////////////////////////////
          // CUSTOMER
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
          // TRACKING
          //////////////////////////////////////////////////////

          tracking: {

            orderBy: {
              createdAt:
                "asc",
            },
          },
        },
      })

    //////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////

    if (!order) {

      return NextResponse.json(
        {
          error:
            "Order not found",
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
      order.driverId !==
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
      order
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch order details",
      },
      {
        status: 500,
      }
    )
  }
}