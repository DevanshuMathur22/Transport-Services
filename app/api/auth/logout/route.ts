// app/api/auth/logout/route.ts

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
// LOGOUT
//////////////////////////////////////////////////////

export async function POST(
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
    // USER NOTIFICATION
    //////////////////////////////////////////////////////

    if (token) {

      try {

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
            },
          })

        //////////////////////////////////////////////////////
        // CREATE NOTIFICATION
        //////////////////////////////////////////////////////

        if (user) {

          await prisma.notification.create({

            data: {

              userId:
                decoded.id,

              title:
                "Logged Out",

              message:
                "Your account was logged out successfully.",

              type:
                "auth",
            },
          })
        }

      } catch (error) {

        console.log(
          "TOKEN VERIFY ERROR:",
          error
        )
      }
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    const response =
      NextResponse.json({

        success: true,

        message:
          "Logged out successfully",
      })

    //////////////////////////////////////////////////////
    // CLEAR COOKIE
    //////////////////////////////////////////////////////

    response.cookies.set(

      "token",

      "",

      {

        expires:
          new Date(0),

        httpOnly:
          true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          "lax",

        path:
          "/",
      }
    )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return response

  } catch (error) {

    console.log(
      "LOGOUT ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Logout failed",
      },
      {
        status: 500,
      }
    )
  }
}