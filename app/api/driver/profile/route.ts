// app/api/driver/profile/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET DRIVER PROFILE
//////////////////////////////////////////////////////

export async function GET(
  req: NextRequest
) {

  try {

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

          name: true,

          email: true,

          phone: true,

          city: true,

          vehicleType: true,

          vehicleNumber: true,
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
          "Failed to fetch profile",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// UPDATE DRIVER PROFILE
//////////////////////////////////////////////////////

export async function PUT(
  req: NextRequest
) {

  try {

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
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
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
    // UPDATE DRIVER
    //////////////////////////////////////////////////////

    const updatedDriver =
      await prisma.user.update({

        where: {
          id:
            driver.id,
        },

        data: {

          name:
            body.name,

          phone:
            body.phone,

          city:
            body.city,

          vehicleType:
            body.vehicleType,

          vehicleNumber:
            body.vehicleNumber,
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
          "Profile Updated",

        message:
          "Your driver profile was updated successfully.",

        type:
          "driver",
      },
    })

    //////////////////////////////////////////////////////
    // ADMIN NOTIFICATION
    //////////////////////////////////////////////////////

    const admin =
      await prisma.user.findFirst({

        where: {
          role:
            "admin",
        },
      })

    if (admin) {

      await prisma.notification.create({

        data: {

          userId:
            admin.id,

          title:
            "Driver Profile Updated",

          message:
            `${updatedDriver.name} updated driver profile details.`,

          type:
            "admin",
        },
      })
    }

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
          "Failed to update profile",
      },
      {
        status: 500,
      }
    )
  }
}