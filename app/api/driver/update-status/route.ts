// app/api/driver/update-status/route.ts

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
// UPDATE STATUS
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
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (

      !body.bookingId ||

      !body.status

    ) {

      return NextResponse.json(
        {
          error:
            "Booking ID and status required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // VALID STATUS
    //////////////////////////////////////////////////////

    const validStatuses = [

      "picked_up",

      "in_transit",

      "delivered",
    ]

    if (
      !validStatuses.includes(
        body.status
      )
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid status",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // FIND DRIVER
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

          email: true,
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
    // APPROVAL CHECK
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
    // FIND BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findUnique({

        where: {
          id:
            body.bookingId,
        },

        include: {

          user: {

            select: {

              id: true,

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
    // ACCESS CHECK
    //////////////////////////////////////////////////////

    if (
      booking.driverId !==
      driver.id
    ) {

      return NextResponse.json(
        {
          error:
            "This booking is not assigned to you",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // UPDATE DATA
    //////////////////////////////////////////////////////

    const updateData: any = {

      status:
        body.status,
    }

    //////////////////////////////////////////////////////
    // PICKED UP
    //////////////////////////////////////////////////////

    if (
      body.status ===
      "picked_up"
    ) {

      updateData.pickedUpAt =
        new Date()
    }

    //////////////////////////////////////////////////////
    // DELIVERED
    //////////////////////////////////////////////////////

    if (
      body.status ===
      "delivered"
    ) {

      updateData.deliveredAt =
        new Date()
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

        data:
          updateData,
      })

    //////////////////////////////////////////////////////
    // TRACKING MESSAGE
    //////////////////////////////////////////////////////

    let trackingMessage =
      "Shipment updated"

    if (
      body.status ===
      "picked_up"
    ) {

      trackingMessage =
        "Shipment picked up"
    }

    if (
      body.status ===
      "in_transit"
    ) {

      trackingMessage =
        "Shipment is in transit"
    }

    if (
      body.status ===
      "delivered"
    ) {

      trackingMessage =
        "Shipment delivered successfully"
    }

    //////////////////////////////////////////////////////
    // CREATE TRACKING
    //////////////////////////////////////////////////////

    await prisma.tracking.create({

      data: {

        bookingId:
          booking.id,

        location:
          booking.toCity,

        message:
          trackingMessage,
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
          "Shipment Update",

        message:
          trackingMessage,

        type:
          "tracking",
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
          "Delivery Status Updated",

        message:
          trackingMessage,

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
          "Shipment Status Updated",

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
      "UPDATE STATUS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to update status",
      },
      {
        status: 500,
      }
    )
  }
}