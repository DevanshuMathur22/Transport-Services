// app/api/driver/profile/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

//////////////////////////////////////////////////////
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// GET DRIVER PROFILE
//////////////////////////////////////////////////////

export async function GET(
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

          name: true,

          email: true,

          phone: true,

          city: true,

          role: true,

          isBlocked: true,

          isDriverApproved: true,

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
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      id:
        driver.id,

      name:
        driver.name,

      email:
        driver.email,

      phone:
        driver.phone,

      city:
        driver.city,

      vehicleType:
        driver.vehicleType,

      vehicleNumber:
        driver.vehicleNumber,
    })

  } catch (error) {

    console.log(
      "GET DRIVER PROFILE ERROR:",
      error
    )

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

      !body.name ||

      !body.phone ||

      !body.city ||

      !body.vehicleType ||

      !body.vehicleNumber

    ) {

      return NextResponse.json(
        {
          error:
            "All fields are required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // UPDATE PROFILE
    //////////////////////////////////////////////////////

    const updatedDriver =
      await prisma.user.update({

        where: {
          id:
            decoded.id,
        },

        data: {

          name:
            body.name.trim(),

          phone:
            body.phone.trim(),

          city:
            body.city.trim(),

          vehicleType:
            body.vehicleType.trim(),

          vehicleNumber:
            body.vehicleNumber
              .trim()
              .toUpperCase(),
        },
      })

    //////////////////////////////////////////////////////
    // NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          decoded.id,

        title:
          "Profile Updated",

        message:
          "Driver profile updated successfully.",

        type:
          "profile",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      message:
        "Profile updated successfully",

      driver:
        updatedDriver,
    })

  } catch (error) {

    console.log(
      "UPDATE DRIVER PROFILE ERROR:",
      error
    )

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