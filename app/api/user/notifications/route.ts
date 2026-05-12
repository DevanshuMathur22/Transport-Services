// app/api/user/notifications/route.ts

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
// GET NOTIFICATIONS
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
    // USER
    //////////////////////////////////////////////////////

    const user =
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
    // CHECK USER
    //////////////////////////////////////////////////////

    if (!user) {

      return NextResponse.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // BLOCKED USER
    //////////////////////////////////////////////////////

    if (
      user.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Account blocked",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // QUERY PARAMS
    //////////////////////////////////////////////////////

    const {
      searchParams,
    } = new URL(req.url)

    const page =
      Number(
        searchParams.get(
          "page"
        )
      ) || 1

    const limit =
      Number(
        searchParams.get(
          "limit"
        )
      ) || 20

    const type =
      searchParams.get(
        "type"
      )

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      page < 1 ||
      limit < 1
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid pagination",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // FETCH NOTIFICATIONS
    //////////////////////////////////////////////////////

    const notifications =
      await prisma.notification.findMany({

        where: {

          userId:
            decoded.id,

          ...(type && {
            type,
          }),
        },

        orderBy: {

          createdAt:
            "desc",
        },

        skip:
          (page - 1) *
          limit,

        take:
          limit,
      })

    //////////////////////////////////////////////////////
    // UNREAD COUNT
    //////////////////////////////////////////////////////

    const unreadCount =
      await prisma.notification.count({

        where: {

          userId:
            decoded.id,

          isRead:
            false,
        },
      })

    //////////////////////////////////////////////////////
    // TOTAL
    //////////////////////////////////////////////////////

    const total =
      await prisma.notification.count({

        where: {

          userId:
            decoded.id,

          ...(type && {
            type,
          }),
        },
      })

    //////////////////////////////////////////////////////
    // FORMATTED NOTIFICATIONS
    //////////////////////////////////////////////////////

    const formattedNotifications =
      notifications.map(
        (notification) => ({

          id:
            notification.id,

          title:
            notification.title,

          message:
            notification.message,

          type:
            notification.type,

          isRead:
            notification.isRead,

          createdAt:
            notification.createdAt,

          time:
            new Date(
              notification.createdAt
            ).toLocaleString(),
        })
      )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      unreadCount,

      notifications:
        formattedNotifications,

      pagination: {

        total,

        page,

        limit,

        totalPages:
          Math.ceil(
            total / limit
          ),

        hasNextPage:
          page * limit <
          total,

        hasPrevPage:
          page > 1,
      },
    })

  } catch (error) {

    console.log(
      "NOTIFICATIONS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch notifications",
      },
      {
        status: 500,
      }
    )
  }
}