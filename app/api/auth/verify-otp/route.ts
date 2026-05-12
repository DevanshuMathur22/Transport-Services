// app/api/auth/verify-otp/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

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
// VERIFY OTP
//////////////////////////////////////////////////////

export async function POST(
  req: NextRequest
) {

  try {

    //////////////////////////////////////////////////////
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    const {

      email,

      otp,

    } = body

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (

      !email ||

      !otp

    ) {

      return NextResponse.json(
        {
          error:
            "Email and OTP are required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // FIND USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findUnique({

        where: {
          email,
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
    // INVALID OTP
    //////////////////////////////////////////////////////

    if (

      !user.otp ||

      user.otp !== otp

    ) {

      return NextResponse.json(
        {
          error:
            "Invalid OTP",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // OTP EXPIRY CHECK
    //////////////////////////////////////////////////////

    if (

      !user.otpExpiry ||

      new Date() >
      new Date(
        user.otpExpiry
      )

    ) {

      return NextResponse.json(
        {
          error:
            "OTP expired",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      message:
        "OTP verified successfully",
    })

  } catch (error) {

    console.log(
      "VERIFY OTP ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Verification failed",
      },
      {
        status: 500,
      }
    )
  }
}