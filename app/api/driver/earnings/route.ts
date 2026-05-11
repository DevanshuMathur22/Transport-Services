// app/api/driver/earnings/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET() {

  try {

    //////////////////////////////////////////////////////
    // TEMP DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.findFirst({

        where: {
          role:
            "driver",
        },
      })

    //////////////////////////////////////////////////////
    // NO DRIVER
    //////////////////////////////////////////////////////

    if (!driver) {

      return NextResponse.json({

        totalEarnings: 0,

        todayEarnings: 0,

        completedDeliveries: 0,

        averageEarnings: 0,

        deliveries: [],
      })
    }

    //////////////////////////////////////////////////////
    // DELIVERED BOOKINGS
    //////////////////////////////////////////////////////

    const deliveries =
      await prisma.booking.findMany({

        where: {

          driverId:
            driver.id,

          status:
            "delivered",
        },

        orderBy: {
          deliveredAt:
            "desc",
        },
      })

    //////////////////////////////////////////////////////
    // TOTAL EARNINGS
    //////////////////////////////////////////////////////

    const totalEarnings =
      deliveries.reduce(
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
    // TODAY EARNINGS
    //////////////////////////////////////////////////////

    const today =
      new Date()

    today.setHours(
      0,
      0,
      0,
      0
    )

    const todayDeliveries =
      deliveries.filter(
        (
          item
        ) =>
          item.deliveredAt &&
          new Date(
            item.deliveredAt
          ) >= today
      )

    const todayEarnings =
      todayDeliveries.reduce(
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
    // COMPLETED
    //////////////////////////////////////////////////////

    const completedDeliveries =
      deliveries.length

    //////////////////////////////////////////////////////
    // AVERAGE
    //////////////////////////////////////////////////////

    const averageEarnings =
      completedDeliveries > 0
        ? Math.round(
            totalEarnings /
            completedDeliveries
          )
        : 0

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      totalEarnings,

      todayEarnings,

      completedDeliveries,

      averageEarnings,

      deliveries,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch earnings",
      },
      {
        status: 500,
      }
    )
  }
}