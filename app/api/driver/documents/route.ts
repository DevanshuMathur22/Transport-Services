// app/api/driver/documents/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET DOCUMENTS
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

          licenseUrl: true,

          rcUrl: true,

          aadhaarUrl: true,

          insuranceUrl: true,
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
          "Failed to fetch documents",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// UPDATE DOCUMENTS
//////////////////////////////////////////////////////

export async function PUT(
  req: Request
) {

  try {

    const body =
      await req.json()

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
    // UPDATE
    //////////////////////////////////////////////////////

    const updatedDriver =
      await prisma.user.update({

        where: {
          id:
            driver.id,
        },

        data: {

          licenseUrl:
            body.licenseUrl,

          rcUrl:
            body.rcUrl,

          aadhaarUrl:
            body.aadhaarUrl,

          insuranceUrl:
            body.insuranceUrl,
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      driver:
        updatedDriver,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to update documents",
      },
      {
        status: 500,
      }
    )
  }
}