// app/api/user/settings/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET SETTINGS
//////////////////////////////////////////////////////

export async function GET() {

  try {

    //////////////////////////////////////////////////////
    // GET USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findFirst()

    if (!user) {

      return NextResponse.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // SETTINGS
    //////////////////////////////////////////////////////

    const settings = {

      notifications: true,

      darkMode: false,

      twoFactor:
        user.isVerified || false,
    }

    return NextResponse.json(
      settings
    )

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
  req: Request
) {

  try {

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // GET USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findFirst()

    if (!user) {

      return NextResponse.json(
        {
          error:
            "User not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // UPDATE USER
    //////////////////////////////////////////////////////

    await prisma.user.update({

      where: {
        id:
          user.id,
      },

      data: {

        isVerified:
          body.twoFactor,
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      settings: {

        notifications:
          body.notifications,

        darkMode:
          body.darkMode,

        twoFactor:
          body.twoFactor,
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
