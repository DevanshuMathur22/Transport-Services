// app/api/admin/drivers/reject/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

export async function PUT(
  req: NextRequest
) {

  try {

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

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      ) as {
        id: string
      }

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

    const body =
      await req.json()

    if (
      !body.driverId
    ) {

      return NextResponse.json(
        {
          error:
            "Driver ID required",
        },
        {
          status: 400,
        }
      )
    }

    const updatedDriver =
      await prisma.user.update({

        where: {
          id:
            body.driverId,
        },

        data: {

          isDriverApproved:
            false,

          verificationStatus:
            "rejected",
        },

        select: {

          id: true,

          name: true,

          verificationStatus: true,
        },
      })

    await prisma.notification.create({

      data: {

        userId:
          body.driverId,

        title:
          "Driver Rejected",

        message:
          "Your driver verification was rejected.",

        type:
          "driver",
      },
    })

    return NextResponse.json({

      success: true,

      driver:
        updatedDriver,
    })

  } catch (error) {

    console.log(
      "REJECT DRIVER ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to reject driver",
      },
      {
        status: 500,
      }
    )
  }
}