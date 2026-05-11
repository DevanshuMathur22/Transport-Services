// app/api/user/active-shipment/route.ts

import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {

    //////////////////////////////////////////////////////
    // LATEST ACTIVE BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findFirst({
        where: {
          OR: [
            {
              status: "accepted",
            },
            {
              status: "picked_up",
            },
            {
              status: "in_transit",
            },
          ],
        },

        orderBy: {
          createdAt: "desc",
        },
      })

    //////////////////////////////////////////////////////
    // NO ACTIVE SHIPMENT
    //////////////////////////////////////////////////////

    if (!booking) {

      return NextResponse.json(
        null
      )
    }

    //////////////////////////////////////////////////////
    // PROGRESS
    //////////////////////////////////////////////////////

    let progress = 10

    if (
      booking.status ===
      "accepted"
    ) {
      progress = 25
    }

    if (
      booking.status ===
      "picked_up"
    ) {
      progress = 55
    }

    if (
      booking.status ===
      "in_transit"
    ) {
      progress = 80
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({
      id: booking.id,

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

      progress,

      eta:
        booking.estimatedTime ||
        "2h 30m",
    })

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Failed to fetch active shipment",
      },
      {
        status: 500,
      }
    )
  }
}