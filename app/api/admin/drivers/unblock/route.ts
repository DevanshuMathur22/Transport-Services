// app/api/admin/drivers/unblock/route.ts

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
// UNBLOCK DRIVER
//////////////////////////////////////////////////////

export async function PATCH(
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
    // ADMIN CHECK
    //////////////////////////////////////////////////////

    const admin =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },

        select: {

          id: true,

          role: true,
        },
      })

    //////////////////////////////////////////////////////
    // ACCESS DENIED
    //////////////////////////////////////////////////////

    if (

      !admin ||

      admin.role !==
        "admin"

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
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    const { id } =
      body

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (!id) {

      return NextResponse.json(
        {
          error:
            "Driver id is required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // FIND DRIVER
    //////////////////////////////////////////////////////

    const existingDriver =
      await prisma.user.findUnique({

        where: {
          id,
        },

        select: {

          id: true,

          role: true,

          isBlocked: true,
        },
      })

    //////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////

    if (
      !existingDriver
    ) {

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
    // CHECK ROLE
    //////////////////////////////////////////////////////

    if (
      existingDriver.role !==
      "driver"
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid driver",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // ALREADY UNBLOCKED
    //////////////////////////////////////////////////////

    if (
      !existingDriver.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Driver already active",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // UNBLOCK DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.update({

        where: {
          id,
        },

        data: {

          isBlocked:
            false,
        },
      })

    //////////////////////////////////////////////////////
    // NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          driver.id,

        title:
          "Account Activated",

        message:
          "Your driver account has been unblocked by admin.",

        type:
          "driver",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      driver,
    })

  } catch (error) {

    console.log(
      "UNBLOCK DRIVER ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to unblock driver",
      },
      {
        status: 500,
      }
    )
  }
}