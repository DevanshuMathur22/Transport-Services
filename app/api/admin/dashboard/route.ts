import { prisma } from "@/lib/prisma"

import { NextResponse } from "next/server"

export async function GET() {

  try {

    const totalUsers =
      await prisma.user.count({
        where: {
          role: "user",
        },
      })

    const totalDrivers =
      await prisma.user.count({
        where: {
          role: "driver",
        },
      })

    const totalBookings =
      await prisma.booking.count()

    const revenue =
      await prisma.payment.aggregate({
        _sum: {
          amount: true,
        },
      })

    const recentBookings =
      await prisma.booking.findMany({

        take: 5,

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          trackingId: true,
          fromCity: true,
          toCity: true,
          price: true,
          status: true,
        },
      })

    const pendingDrivers =
      await prisma.user.findMany({

        where: {
          role: "driver",

          isDriverApproved: false,
        },

        take: 5,

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          name: true,
          email: true,
        },
      })

    return NextResponse.json({

      stats: {
        totalUsers,
        totalDrivers,
        totalBookings,

        totalRevenue:
          revenue._sum.amount || 0,
      },

      recentBookings,

      pendingDrivers,
    })

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch dashboard",
      },
      {
        status: 500,
      }
    )
  }
}