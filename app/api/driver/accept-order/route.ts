// app/api/driver/accept-order/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

import { sendEmail }
from "@/lib/send-email"

import BookingEmail
from "@/emails/booking-email"

//////////////////////////////////////////////////////
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// ACCEPT ORDER
//////////////////////////////////////////////////////

export async function POST(
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

          name: true,
        },
      })

    //////////////////////////////////////////////////////
    // DRIVER CHECK
    //////////////////////////////////////////////////////

    if (
      !driver ||
      driver.role !==
        "driver"
    ) {

      return NextResponse.json(
        {
          error:
            "Only drivers can accept orders",
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
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (

      !body.bookingId

    ) {

      return NextResponse.json(
        {
          error:
            "Booking ID required",
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
            body.bookingId,
        },

        select: {

          id: true,

          userId: true,

          driverId: true,

          trackingId: true,

          fromCity: true,

          toCity: true,

          price: true,

          status: true,

          user: {

            select: {

              name: true,

              email: true,
            },
          },
        },
      })

    //////////////////////////////////////////////////////
    // BOOKING NOT FOUND
    //////////////////////////////////////////////////////

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
    // ALREADY ACCEPTED
    //////////////////////////////////////////////////////

    if (
      booking.driverId
    ) {

      return NextResponse.json(
        {
          error:
            "Order already accepted",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // INVALID STATUS
    //////////////////////////////////////////////////////

    if (
      booking.status !==
      "pending"
    ) {

      return NextResponse.json(
        {
          error:
            "Booking cannot be accepted",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // UPDATE BOOKING
    //////////////////////////////////////////////////////

    const updatedBooking =
      await prisma.booking.update({

        where: {
          id:
            booking.id,
        },

        data: {

          driverId:
            driver.id,

          status:
            "accepted",

          acceptedAt:
            new Date(),

          //////////////////////////////////////////////////////
          // DRIVER EARNING
          //////////////////////////////////////////////////////

          driverEarning:
            Number(
              booking.price || 0
            ) * 0.8,
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
          booking.fromCity,

        message:
          "Driver accepted the shipment",
      },
    })

    //////////////////////////////////////////////////////
    // USER NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          booking.userId,

        title:
          "Driver Assigned",

        message:
          `Driver accepted shipment ${booking.trackingId}`,

        type:
          "booking",
      },
    })

    //////////////////////////////////////////////////////
    // DRIVER NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          driver.id,

        title:
          "Order Accepted",

        message:
          `You accepted shipment ${booking.trackingId}`,

        type:
          "driver",
      },
    })

    //////////////////////////////////////////////////////
    // EMAIL
    //////////////////////////////////////////////////////

    if (
      booking.user?.email
    ) {

      await sendEmail({

        to:
          booking.user.email,

        subject:
          "Driver Assigned",

        react:
          BookingEmail({

            trackingId:
              booking.trackingId,

            customerName:
              booking.user.name,
          }),
      })
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      booking:
        updatedBooking,
    })

  } catch (error) {

    console.log(
      "ACCEPT ORDER ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to accept order",
      },
      {
        status: 500,
      }
    )
  }
}