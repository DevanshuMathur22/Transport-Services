// app/api/admin/bookings/cancel/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// CANCEL BOOKING
//////////////////////////////////////////////////////

export async function POST(
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
    // CHECK ADMIN
    //////////////////////////////////////////////////////

    const admin =
      await prisma.user.findFirst({

        where: {
          id:
            decoded.id,
        },
      })

    if (
      !admin ||
      admin.role !== "admin"
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
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    const {
      bookingId,
    } = body

    if (!bookingId) {

      return NextResponse.json(
        {
          error:
            "Booking id required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // FIND BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findUnique({

        where: {
          id:
            bookingId,
        },
      })

    if (!booking) {

      return NextResponse.json(
        {
          error:
            "Booking not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // UPDATE STATUS
    //////////////////////////////////////////////////////

    const updatedBooking =
      await prisma.booking.update({

        where: {
          id:
            bookingId,
        },

        data: {

          status:
            "cancelled",
        },
      })

    //////////////////////////////////////////////////////
    // TRACKING ENTRY
    //////////////////////////////////////////////////////

    await prisma.tracking.create({

      data: {

        bookingId:
          booking.id,

        location:
          booking.toCity,

        message:
          "Shipment cancelled by admin",
      },
    })

    //////////////////////////////////////////////////////
    // NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          booking.userId,

        title:
          "Booking Cancelled",

        message:
          `Shipment ${booking.trackingId} has been cancelled by admin.`,

        type:
          "booking",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      booking:
        updatedBooking,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to cancel booking",
      },
      {
        status: 500,
      }
    )
  }
}