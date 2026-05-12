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
// ADMIN DASHBOARD
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
    // TOTAL USERS
    //////////////////////////////////////////////////////

    const totalUsers =
      await prisma.user.count({

        where: {
          role:
            "user",
        },
      })

    //////////////////////////////////////////////////////
    // TOTAL DRIVERS
    //////////////////////////////////////////////////////

    const totalDrivers =
      await prisma.user.count({

        where: {
          role:
            "driver",
        },
      })

    //////////////////////////////////////////////////////
    // TOTAL BOOKINGS
    //////////////////////////////////////////////////////

    const totalBookings =
      await prisma.booking.count()

    //////////////////////////////////////////////////////
    // REVENUE
    //////////////////////////////////////////////////////

    const revenue =
      await prisma.payment.aggregate({

        _sum: {
          amount: true,
        },
      })

    //////////////////////////////////////////////////////
    // RECENT BOOKINGS
    //////////////////////////////////////////////////////

    const recentBookings =
      await prisma.booking.findMany({

        take: 5,

        orderBy: {
          createdAt:
            "desc",
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

    //////////////////////////////////////////////////////
    // PENDING DRIVERS
    //////////////////////////////////////////////////////

    const pendingDrivers =
      await prisma.user.findMany({

        where: {

          role:
            "driver",

          isDriverApproved:
            false,
        },

        take: 5,

        orderBy: {
          createdAt:
            "desc",
        },

        select: {

          id: true,

          name: true,

          email: true,
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

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

    console.log(
      "ADMIN DASHBOARD ERROR:",
      error
    )

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