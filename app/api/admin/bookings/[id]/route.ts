// app/api/admin/bookings/[id]/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// UPDATE BOOKING
//////////////////////////////////////////////////////

export async function PUT(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {

  try {

    const { id } =
      await context.params

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
    // ADMIN CHECK
    //////////////////////////////////////////////////////

    const admin =
      await prisma.user.findUnique({

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

    //////////////////////////////////////////////////////
    // UPDATE BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.update({

        where: {
          id,
        },

        data: {

          //////////////////////////////////////////////////////
          // STATUS UPDATE
          //////////////////////////////////////////////////////

          status:
            body.status,

          //////////////////////////////////////////////////////
          // DRIVER ASSIGN / REMOVE
          //////////////////////////////////////////////////////

          driverId:
            body.driverId || null,
        },
      })

    //////////////////////////////////////////////////////
    // TRACKING
    //////////////////////////////////////////////////////

    await prisma.tracking.create({

      data: {

        bookingId:
          booking.id,

        location:
          booking.toCity,

        message:
          body.message ||
          `Booking updated to ${body.status}`,
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
          "Booking Updated",

        message:
          `Shipment ${booking.trackingId} updated to ${booking.status}`,

        type:
          "booking",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      booking,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to update booking",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// CANCEL BOOKING
//////////////////////////////////////////////////////

export async function DELETE(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string
    }>
  }
) {

  try {

    const { id } =
      await context.params

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
    // ADMIN CHECK
    //////////////////////////////////////////////////////

    const admin =
      await prisma.user.findUnique({

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
    // CANCEL BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.update({

        where: {
          id,
        },

        data: {

          status:
            "cancelled",
        },
      })

    //////////////////////////////////////////////////////
    // TRACKING
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
          `Shipment ${booking.trackingId} was cancelled by admin.`,

        type:
          "booking",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,
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