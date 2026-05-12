// app/api/driver/stats/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

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
    // DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },
      })

    //////////////////////////////////////////////////////
    // CHECK DRIVER
    //////////////////////////////////////////////////////

    if (
      !driver ||
      driver.role !==
        "driver"
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
    // PENDING ORDERS
    //////////////////////////////////////////////////////

    const availableOrders =
      await prisma.booking.findMany({

        where: {
          status:
            "pending",
        },

        orderBy: {
          createdAt:
            "desc",
        },

        take: 5,
      })

    //////////////////////////////////////////////////////
    // ACTIVE DELIVERIES
    //////////////////////////////////////////////////////

    const activeDeliveries =
      await prisma.booking.findMany({

        where: {

          driverId:
            driver.id,

          status: {

            in: [
              "accepted",
              "picked_up",
              "in_transit",
            ],
          },
        },

        orderBy: {

          createdAt:
            "desc",
        },
      })

    //////////////////////////////////////////////////////
    // CURRENT DELIVERY
    //////////////////////////////////////////////////////

    const currentDelivery =
      activeDeliveries[0] || null

    //////////////////////////////////////////////////////
    // DELIVERED BOOKINGS
    //////////////////////////////////////////////////////

    const deliveredBookings =
      await prisma.booking.findMany({

        where: {

          driverId:
            driver.id,

          status:
            "delivered",
        },
      })

    //////////////////////////////////////////////////////
    // EARNINGS
    //////////////////////////////////////////////////////

    const earnings =
      deliveredBookings.reduce(
        (
          total,
          item
        ) =>
          total +
          (
            item.driverEarning || 0
          ),
        0
      )

    //////////////////////////////////////////////////////
    // ACTIVITIES
    //////////////////////////////////////////////////////

    const activities = [

      {
        message:
          "Accepted a new shipment order",

        time:
          "5 min ago",
      },

      {
        message:
          "Shipment picked up successfully",

        time:
          "20 min ago",
      },

      {
        message:
          "Delivery completed successfully",

        time:
          "1 hour ago",
      },
    ]

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      pendingOrders:
        availableOrders.length,

      activeDeliveries:
        activeDeliveries.length,

      earnings,

      availableOrders,

      currentDelivery,

      activities,
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