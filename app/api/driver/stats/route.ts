// app/api/driver/stats/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET() {

  try {

    //////////////////////////////////////////////////////
    // DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.findFirst({

        where: {
          role:
            "driver",
        },
      })

    if (!driver) {

      return NextResponse.json(
        {
          error:
            "Driver not found",
        },
        {
          status: 404,
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
            item.price || 0
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