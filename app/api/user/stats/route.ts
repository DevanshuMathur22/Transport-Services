import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

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
    // USER BOOKINGS
    //////////////////////////////////////////////////////

    const totalBookings =
      await prisma.booking.count({

        where: {
          userId:
            decoded.id,
        },
      })

    const activeDeliveries =
      await prisma.booking.count({

        where: {
          userId:
            decoded.id,

          status:
            "in_transit",
        },
      })

    const completedOrders =
      await prisma.booking.count({

        where: {
          userId:
            decoded.id,

          status:
            "delivered",
        },
      })

    //////////////////////////////////////////////////////
    // PAYMENTS
    //////////////////////////////////////////////////////

    const payments =
      await prisma.payment.findMany({

        where: {
          userId:
            decoded.id,
        },
      })

    const totalSpent =
      payments.reduce(
        (
          acc: number,
          item
        ) =>
          acc + item.amount,
        0
      )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({
      totalBookings,
      activeDeliveries,
      completedOrders,
      totalSpent,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch stats",
      },
      {
        status: 500,
      }
    )
  }
}