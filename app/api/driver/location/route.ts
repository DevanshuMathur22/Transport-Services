// app/api/driver/location/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET LOCATION
//////////////////////////////////////////////////////

export async function GET() {

  try {

    //////////////////////////////////////////////////////
    // DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.findFirst({

        where: {
          role:
            "driver",
        },

        select: {

          id: true,

          latitude: true,

          longitude: true,

          updatedAt: true,
        },
      })

    //////////////////////////////////////////////////////
    // NO DRIVER
    //////////////////////////////////////////////////////

    if (!driver) {

      return NextResponse.json(
        {
          error:
            "Driver not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(
      driver
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch location",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// UPDATE LOCATION
//////////////////////////////////////////////////////

export async function PUT(
  req: Request
) {

  try {

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      typeof body.latitude !==
      "number" ||

      typeof body.longitude !==
      "number"
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid coordinates",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // DRIVER
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
        {
          error:
            "Driver not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // UPDATE LOCATION
    //////////////////////////////////////////////////////

    const updatedDriver =
      await prisma.user.update({

        where: {
          id:
            driver.id,
        },

        data: {

          latitude:
            body.latitude,

          longitude:
            body.longitude,
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      latitude:
        updatedDriver.latitude,

      longitude:
        updatedDriver.longitude,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to update location",
      },
      {
        status: 500,
      }
    )
  }
}