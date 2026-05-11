// app/api/driver/orders/route.ts

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
        [],
      )
    }

    //////////////////////////////////////////////////////
    // GET ORDERS
    //////////////////////////////////////////////////////

    const orders =
      await prisma.booking.findMany({

        where: {

          driverId:
            driver.id,
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
      orders
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch driver orders",
      },
      {
        status: 500,
      }
    )
  }
}