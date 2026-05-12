// app/api/user/profile/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// GET PROFILE
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
    // GET USER
    //////////////////////////////////////////////////////

    const user =
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

          address: true,

          role: true,

          isBlocked: true,

          createdAt: true,
        },
      })

    //////////////////////////////////////////////////////
    // USER NOT FOUND
    //////////////////////////////////////////////////////

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
    // BLOCKED USER
    //////////////////////////////////////////////////////

    if (
      user.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Account blocked",
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

      profile: {

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

        role:
          user.role,

        joinedAt:
          user.createdAt,
      },
    })

  } catch (error) {

    console.log(
      "PROFILE_FETCH_ERROR:",
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
// UPDATE PROFILE
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
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // FIND USER
    //////////////////////////////////////////////////////

    const existingUser =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },
      })

    //////////////////////////////////////////////////////
    // USER NOT FOUND
    //////////////////////////////////////////////////////

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
    // BLOCKED USER
    //////////////////////////////////////////////////////

    if (
      existingUser.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Account blocked",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !body.name ||
      !body.email
    ) {

      return NextResponse.json(
        {
          error:
            "Name and email are required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // EMAIL CHECK
    //////////////////////////////////////////////////////

    const emailExists =
      await prisma.user.findFirst({

        where: {

          email:
            body.email,

          NOT: {
            id:
              decoded.id,
          },
        },
      })

    if (emailExists) {

      return NextResponse.json(
        {
          error:
            "Email already in use",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // UPDATE USER
    //////////////////////////////////////////////////////

    const updatedUser =
      await prisma.user.update({

        where: {
          id:
            decoded.id,
        },

        data: {

          name:
            body.name.trim(),

          email:
            body.email
              .trim()
              .toLowerCase(),

          phone:
            body.phone || "",

          city:
            body.city || "",

          address:
            body.address || "",
        },

        select: {

          id: true,

          name: true,

          email: true,

          phone: true,

          city: true,

          address: true,

          role: true,
        },
      })

    //////////////////////////////////////////////////////
    // NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          updatedUser.id,

        title:
          "Profile Updated",

        message:
          "Your profile was updated successfully.",

        type:
          "profile",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      profile:
        updatedUser,
    })

  } catch (error) {

    console.log(
      "PROFILE_UPDATE_ERROR:",
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