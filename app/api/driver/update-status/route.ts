import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request
) {

  try {

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
    // FIND BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findUnique({

        where: {
          id:
            body.bookingId,
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
    // UPDATE DATA
    //////////////////////////////////////////////////////

    const updateData: any = {

      status:
        body.status,
    }

    //////////////////////////////////////////////////////
    // TIMESTAMPS
    //////////////////////////////////////////////////////

    if (
      body.status ===
      "picked_up"
    ) {

      updateData.pickedUpAt =
        new Date()
    }

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
          "Failed to update status",
      },
      {
        status: 500,
      }
    )
  }
}