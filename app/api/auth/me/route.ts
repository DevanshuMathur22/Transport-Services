// app/api/auth/me/route.ts

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
// GET CURRENT USER
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
          user: null,

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
          user: null,
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
    // FIND USER
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

          role: true,

          city: true,

          isBlocked: true,

          isOnline: true,

          vehicleType: true,

          vehicleNumber: true,

          createdAt: true,
        },
      })

    //////////////////////////////////////////////////////
    // USER NOT FOUND
    //////////////////////////////////////////////////////

    if (!user) {

      return NextResponse.json(
        {
          user: null,
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
          user: null,

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

      user,
    })

  } catch (error) {

    console.log(
      "AUTH ME ERROR:",
      error
    )

    return NextResponse.json(
      {
        user: null,
      },
      {
        status: 500,
      }
    )
  }
}