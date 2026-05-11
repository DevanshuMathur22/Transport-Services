// app/api/driver/accept-order/route.ts

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
      !body.driverId
    ) {

      return NextResponse.json(
        {
          error:
            "Booking ID and Driver ID required",
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
            body.driverId,

          status:
            "accepted",

          acceptedAt:
            new Date(),

          //////////////////////////////////////////////////////
          // DRIVER EARNING
          //////////////////////////////////////////////////////

          driverEarning:
            booking.price * 0.8,
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
          "Failed to accept order",
      },
      {
        status: 500,
      }
    )
  }
}