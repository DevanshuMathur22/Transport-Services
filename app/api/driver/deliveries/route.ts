// app/api/driver/deliveries/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET() {

  try {

    //////////////////////////////////////////////////////
    // TEMP DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.findFirst({

        where: {
          role:
            "driver",
        },
      })

    //////////////////////////////////////////////////////
    // NO DRIVER
    //////////////////////////////////////////////////////

    if (!driver) {

      return NextResponse.json(
        []
      )
    }

    //////////////////////////////////////////////////////
    // ACTIVE DELIVERIES
    //////////////////////////////////////////////////////

    const deliveries =
      await prisma.booking.findMany({

        where: {

          driverId:
            driver.id,

          status: {

            in: [
              "accepted",
              "picked_up",
              "in_transit",
            ],
          },
        },

        orderBy: {
          updatedAt:
            "desc",
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(
      deliveries
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch deliveries",
      },
      {
        status: 500,
      }
    )
  }
}