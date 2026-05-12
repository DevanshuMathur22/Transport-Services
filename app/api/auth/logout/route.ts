import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

//////////////////////////////////////////////////////
// LOGOUT
//////////////////////////////////////////////////////

export async function POST(
  req: NextRequest
) {

  try {

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
            process.env.JWT_SECRET!
          ) as {
            id: string
          }

        //////////////////////////////////////////////////////
        // CREATE NOTIFICATION
        //////////////////////////////////////////////////////

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

      } catch (error) {

        console.log(
          "Token verification failed"
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

    return response

  } catch (error) {

    console.log(error)

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