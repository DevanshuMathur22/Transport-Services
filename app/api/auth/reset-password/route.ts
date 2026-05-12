// app/api/auth/reset-password/route.ts

import bcrypt from "bcryptjs"

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
// RESET PASSWORD
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

      password,

      otp,

    } = body

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (

      !email ||

      !password ||

      !otp

    ) {

      return NextResponse.json(
        {
          error:
            "Email, password and OTP are required",
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
    // OTP CHECK
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
    // HASH PASSWORD
    //////////////////////////////////////////////////////

    const hashedPassword =
      await bcrypt.hash(

        password,

        10

      )

    //////////////////////////////////////////////////////
    // UPDATE USER
    //////////////////////////////////////////////////////

    await prisma.user.update({

      where: {
        id:
          user.id,
      },

      data: {

        password:
          hashedPassword,

        otp:
          null,

        otpExpiry:
          null,

        loginAttempts:
          0,
      },
    })

    //////////////////////////////////////////////////////
    // NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          user.id,

        title:
          "Password Reset Successful",

        message:
          "Your password has been reset successfully.",

        type:
          "security",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      message:
        "Password reset successful",
    })

  } catch (error) {

    console.log(
      "RESET PASSWORD ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to reset password",
      },
      {
        status: 500,
      }
    )
  }
}