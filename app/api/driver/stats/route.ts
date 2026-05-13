// app/api/driver/stats/route.ts

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
// GET DRIVER STATS
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
    // DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },

        select: {

          id: true,

          role: true,

          name: true,

          isBlocked: true,

          isDriverApproved: true,

          isOnline: true,
        },
      })

    console.log({
      decoded,
      driver,
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
    // BLOCKED DRIVER
    //////////////////////////////////////////////////////

    if (
      driver.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Driver account blocked",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // DRIVER APPROVAL
    //////////////////////////////////////////////////////

    if (
      !driver.isDriverApproved
    ) {

      return NextResponse.json(
        {
          error:
            "Driver not approved",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // AVAILABLE ORDERS
    //////////////////////////////////////////////////////

   const availableOrders =
  await prisma.booking.findMany({

    where: {

      status:
        "pending",

      driverId:
        null,
    },

    orderBy: {

      createdAt:
        "desc",
    },

    take: 5,

    include: {

      user: {

        select: {

          name: true,

          phone: true,
        },
      },
    },
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

        include: {

          user: {

            select: {

              name: true,

              phone: true,
            },
          },
        },

        orderBy: {

          updatedAt:
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
    // TOTAL EARNINGS
    //////////////////////////////////////////////////////

    const earnings =
      deliveredBookings.reduce(

        (
          total: number,

          item: any
        ) =>

          total +

          (
            item.driverEarning || 0
          ),

        0
      )

    //////////////////////////////////////////////////////
    // TODAY DELIVERIES
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
      deliveredBookings.filter(
        (item: any) =>

          item.deliveredAt &&

          new Date(
            item.deliveredAt
          ) >= today
      )

    //////////////////////////////////////////////////////
    // TODAY EARNINGS
    //////////////////////////////////////////////////////

    const todayEarnings =
      todayDeliveries.reduce(

        (
          total: number,

          item: any
        ) =>

          total +

          (
            item.driverEarning || 0
          ),

        0
      )

    //////////////////////////////////////////////////////
    // TOTAL DELIVERIES
    //////////////////////////////////////////////////////

    const totalDeliveries =
      deliveredBookings.length

    //////////////////////////////////////////////////////
    // SUCCESS RATE
    //////////////////////////////////////////////////////

    const allDriverBookings =
      await prisma.booking.findMany({

        where: {
          driverId:
            driver.id,
        },

        select: {
          status: true,
        },
      })

    const successRate =
      allDriverBookings.length > 0

        ? Math.round(

            (
              deliveredBookings.length /

              allDriverBookings.length
            ) * 100
          )

        : 0

    //////////////////////////////////////////////////////
    // RECENT ACTIVITIES
    //////////////////////////////////////////////////////

    const recentTracking =
      await prisma.tracking.findMany({

        where: {

          booking: {

            driverId:
              driver.id,
          },
        },

        orderBy: {

          createdAt:
            "desc",
        },

        take: 5,
      })

    //////////////////////////////////////////////////////
    // ACTIVITIES
    //////////////////////////////////////////////////////

    const activities =
      recentTracking.map(
        (item: any) => ({

          message:
            item.message,

          location:
            item.location,

          time:
            new Date(
              item.createdAt
            ).toLocaleString(),
        })
      )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      driver: {

        name:
          driver.name,

        isOnline:
          driver.isOnline,
      },

      pendingOrders:
        availableOrders.length,

      activeDeliveries:
        activeDeliveries.length,

      completedDeliveries:
        totalDeliveries,

      successRate,

      earnings,

      todayEarnings,

      availableOrders,

      currentDelivery,

      activities,
    })

  } catch (error) {

    console.log(
      "DRIVER STATS ERROR:",
      error
    )

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