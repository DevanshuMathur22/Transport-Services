import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET NOTIFICATIONS
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
    // QUERY
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
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      notifications,

      unreadCount,

      pagination: {

        total,

        page,

        limit,

        totalPages:
          Math.ceil(
            total / limit
          ),
      },
    })

  } catch (error) {

    console.log(error)

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