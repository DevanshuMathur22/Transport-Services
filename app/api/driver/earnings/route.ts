// app/api/driver/earnings/route.ts

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
// GET DRIVER EARNINGS
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

          isBlocked: true,

          isDriverApproved: true,
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

        include: {

          user: {

            select: {

              name: true,

              phone: true,
            },
          },
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
    // TODAY START
    //////////////////////////////////////////////////////

    const today =
      new Date()

    today.setHours(

      0,

      0,

      0,

      0
    )

    //////////////////////////////////////////////////////
    // TODAY DELIVERIES
    //////////////////////////////////////////////////////

    const todayDeliveries =
      deliveries.filter(

        (item) =>

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
    // COMPLETED DELIVERIES
    //////////////////////////////////////////////////////

    const completedDeliveries =
      deliveries.length

    //////////////////////////////////////////////////////
    // AVERAGE EARNINGS
    //////////////////////////////////////////////////////

    const averageEarnings =
      completedDeliveries > 0

        ? Math.round(

            totalEarnings /

            completedDeliveries
          )

        : 0

    //////////////////////////////////////////////////////
    // THIS WEEK
    //////////////////////////////////////////////////////

    const sevenDaysAgo =
      new Date()

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 7
    )

    const weeklyEarnings =
      deliveries
        .filter(
          (item) =>

            item.deliveredAt &&

            new Date(
              item.deliveredAt
            ) >= sevenDaysAgo
        )
        .reduce(
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
    // THIS MONTH
    //////////////////////////////////////////////////////

    const currentMonth =
      new Date().getMonth()

    const currentYear =
      new Date().getFullYear()

    const monthlyEarnings =
      deliveries
        .filter(
          (item) => {

            if (
              !item.deliveredAt
            ) {
              return false
            }

            const date =
              new Date(
                item.deliveredAt
              )

            return (

              date.getMonth() ===
              currentMonth &&

              date.getFullYear() ===
              currentYear
            )
          }
        )
        .reduce(
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
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      totalEarnings,

      todayEarnings,

      weeklyEarnings,

      monthlyEarnings,

      completedDeliveries,

      averageEarnings,

      deliveries,
    })

  } catch (error) {

    console.log(
      "EARNINGS ERROR:",
      error
    )

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