// app/api/admin/settings/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET SETTINGS
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
    // VERIFY
    //////////////////////////////////////////////////////

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
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

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      siteName:
        "Porter Clone",

      supportEmail:
        "support@porterclone.com",

      adminName:
        admin.name || "",

      adminEmail:
        admin.email || "",

      maintenanceMode:
        false,

      notifications:
        true,

      allowRegistrations:
        true,

      requireDriverApproval:
        true,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch settings",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// UPDATE SETTINGS
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
    // VERIFY
    //////////////////////////////////////////////////////

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
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

    //////////////////////////////////////////////////////
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // UPDATE ADMIN
    //////////////////////////////////////////////////////

    await prisma.user.update({

      where: {
        id:
          admin.id,
      },

      data: {

        name:
          body.adminName,

        email:
          body.adminEmail,
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      settings: {

        siteName:
          body.siteName,

        supportEmail:
          body.supportEmail,

        adminName:
          body.adminName,

        adminEmail:
          body.adminEmail,

        maintenanceMode:
          body.maintenanceMode,

        notifications:
          body.notifications,

        allowRegistrations:
          body.allowRegistrations,

        requireDriverApproval:
          body.requireDriverApproval,
      },
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to update settings",
      },
      {
        status: 500,
      }
    )
  }
}