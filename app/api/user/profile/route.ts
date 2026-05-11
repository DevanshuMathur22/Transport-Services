import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET PROFILE
//////////////////////////////////////////////////////

export async function GET() {

  try {

    //////////////////////////////////////////////////////
    // GET FIRST USER
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

    return NextResponse.json({

      id:
        user.id,

      name:
        user.name,

      email:
        user.email,

      phone:
        user.phone || "",

      city:
        user.city || "",

      address:
        user.address || "",
    })

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
// UPDATE PROFILE
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

    const existingUser =
      await prisma.user.findFirst()

    if (!existingUser) {

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
    // UPDATE
    //////////////////////////////////////////////////////

    const updatedUser =
      await prisma.user.update({

        where: {
          id:
            existingUser.id,
        },

        data: {

          name:
            body.name,

          email:
            body.email,

          phone:
            body.phone,

          city:
            body.city,

          address:
            body.address,
        },
      })

    return NextResponse.json(
      updatedUser
    )

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