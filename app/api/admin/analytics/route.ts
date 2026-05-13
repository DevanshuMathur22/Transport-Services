// app/api/admin/analytics/route.ts

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
// ADMIN ANALYTICS
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
    // USERS
    //////////////////////////////////////////////////////

    const totalUsers =
      await prisma.user.count({

        where: {
          role:
            "user",
        },
      })

    //////////////////////////////////////////////////////
    // DRIVERS
    //////////////////////////////////////////////////////

    const totalDrivers =
      await prisma.user.count({

        where: {
          role:
            "driver",
        },
      })

    //////////////////////////////////////////////////////
    // ONLINE DRIVERS
    //////////////////////////////////////////////////////

    const onlineDrivers =
      await prisma.user.count({

        where: {

          role:
            "driver",

          isOnline:
            true,
        },
      })

    //////////////////////////////////////////////////////
    // BOOKINGS
    //////////////////////////////////////////////////////

    const bookings =
      await prisma.booking.findMany()

    //////////////////////////////////////////////////////
    // COUNTS
    //////////////////////////////////////////////////////

    const totalBookings =
      bookings.length

    const pendingBookings =
      bookings.filter(
        (item: any) =>
          item.status ===
          "pending"
      ).length

    const inTransitBookings =
      bookings.filter(
        (item: any) =>
          item.status ===
          "in_transit"
      ).length

    const deliveredBookings =
      bookings.filter(
        (item: any) =>
          item.status ===
          "delivered"
      ).length

    const cancelledBookings =
      bookings.filter(
        (item: any) =>
          item.status ===
          "cancelled"
      ).length

    //////////////////////////////////////////////////////
    // SUCCESS RATE
    //////////////////////////////////////////////////////

    const successRate =

      totalBookings > 0

        ? Math.round(

            (
              deliveredBookings /

              totalBookings
            ) * 100
          )

        : 0

    //////////////////////////////////////////////////////
    // AVG DELIVERY TIME
    //////////////////////////////////////////////////////

    const avgDeliveryTime =
      "2h 30m"

    //////////////////////////////////////////////////////
    // PAYMENTS
    //////////////////////////////////////////////////////

    const payments =
      await prisma.payment.findMany()

    //////////////////////////////////////////////////////
    // REVENUE
    //////////////////////////////////////////////////////

    const revenue =
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
    // PAYMENT COUNTS
    //////////////////////////////////////////////////////

    const paidPayments =
      payments.filter(
        (item: any) =>
          item.status ===
          "paid"
      ).length

    const pendingPayments =
      payments.filter(
        (item: any) =>
          item.status ===
          "pending"
      ).length

    const refundedPayments =
      payments.filter(
        (item: any) =>
          item.status ===
          "refunded"
      ).length

    const failedPayments =
      payments.filter(
        (item: any) =>
          item.status ===
          "failed"
      ).length

    //////////////////////////////////////////////////////
    // TOP CITIES
    //////////////////////////////////////////////////////

    const cityMap:
      Record<
        string,
        number
      > = {}

    bookings.forEach(
      (item: any) => {

        cityMap[
          item.toCity
        ] =

          (
            cityMap[
              item.toCity
            ] || 0
          ) + 1
      }
    )

    const topCities =

      Object.entries(
        cityMap
      )

        .map(
          ([
            city,
            count,
          ]) => ({

            city,

            count,
          })
        )

        .sort(
          (
            a,
            b
          ) =>

            Number(
              b.count
            ) -

            Number(
              a.count
            )
        )

        .slice(0, 5)

    //////////////////////////////////////////////////////
    // VEHICLE STATS
    //////////////////////////////////////////////////////

    const vehicleMap:
      Record<
        string,
        number
      > = {}

    bookings.forEach(
      (item: any) => {

        const key =
          String(
            item.vehicleType
          )

        vehicleMap[key] =

          (
            vehicleMap[key] || 0
          ) + 1
      }
    )

    const vehicleStats =

      Object.entries(
        vehicleMap
      )

        .map(
          ([
            vehicleType,
            count,
          ]) => ({

            vehicleType,

            count,
          })
        )

        .sort(
          (
            a,
            b
          ) =>

            Number(
              b.count
            ) -

            Number(
              a.count
            )
        )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      //////////////////////////////////////////////////////
      // MAIN
      //////////////////////////////////////////////////////

      totalUsers,

      totalDrivers,

      onlineDrivers,

      totalBookings,

      revenue,

      successRate,

      avgDeliveryTime,

      //////////////////////////////////////////////////////
      // BOOKINGS
      //////////////////////////////////////////////////////

      pendingBookings,

      inTransitBookings,

      deliveredBookings,

      cancelledBookings,

      //////////////////////////////////////////////////////
      // PAYMENTS
      //////////////////////////////////////////////////////

      paidPayments,

      pendingPayments,

      refundedPayments,

      failedPayments,

      //////////////////////////////////////////////////////
      // EXTRA
      //////////////////////////////////////////////////////

      topCities,

      vehicleStats,
    })

  } catch (error) {

    console.log(
      "ANALYTICS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch analytics",
      },
      {
        status: 500,
      }
    )
  }
}