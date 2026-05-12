// app/api/user/tracking/[trackingId]/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{
    trackingId: string
  }>
}

//////////////////////////////////////////////////////
// GET TRACKING
//////////////////////////////////////////////////////

export async function GET(
  req: NextRequest,
  { params }: Props
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
    // PARAMS
    //////////////////////////////////////////////////////

    const resolvedParams =
      await params

    //////////////////////////////////////////////////////
    // BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findFirst({

        where: {

          trackingId:
            resolvedParams.trackingId,

          userId:
            decoded.id,
        },

        include: {

          tracking: {
            orderBy: {
              createdAt:
                "asc",
            },
          },

          driver: true,
        },
      })

    //////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////

    if (!booking) {

      return NextResponse.json(
        {
          error:
            "Tracking not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      trackingId:
        booking.trackingId,

      fromCity:
        booking.fromCity,

      toCity:
        booking.toCity,

      vehicleType:
        booking.vehicleType,

      status:
        booking.status,

      eta:
        booking.estimatedTime,

      driver: {

        name:
          booking.driver
            ?.name || "Not Assigned",

        phone:
          booking.driver
            ?.phone || "N/A",
      },

      timeline:
        booking.tracking.map(
          (item) => ({

            message:
              item.message,

            location:
              item.location,

            time:
              new Date(
                item.createdAt
              ).toLocaleString(),
          })
        ),
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch tracking",
      },
      {
        status: 500,
      }
    )
  }
}