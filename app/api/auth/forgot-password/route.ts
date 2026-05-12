// app/api/auth/forgot-password/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import { prisma }
from "@/lib/prisma"

import { sendEmail }
from "@/lib/send-email"

import OtpEmail
from "@/emails/otp-email"

//////////////////////////////////////////////////////
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// FORGOT PASSWORD
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

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !body.email
    ) {

      return NextResponse.json(
        {
          error:
            "Email is required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findUnique({

        where: {
          email:
            body.email,
        },

        select: {

          id: true,

          email: true,

          name: true,
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
    // OTP
    //////////////////////////////////////////////////////

    const otp =
      Math.floor(

        100000 +

        Math.random() *
          900000

      ).toString()

    //////////////////////////////////////////////////////
    // OTP EXPIRY
    //////////////////////////////////////////////////////

    const otpExpiry =
      new Date(

        Date.now() +

        10 *
          60 *
          1000

      )

    //////////////////////////////////////////////////////
    // SAVE OTP
    //////////////////////////////////////////////////////

    await prisma.user.update({

      where: {
        id:
          user.id,
      },

      data: {

        otp,

        otpExpiry,
      },
    })

    //////////////////////////////////////////////////////
    // SEND EMAIL
    //////////////////////////////////////////////////////

    await sendEmail({

      to:
        user.email,

      subject:
        "Password Reset OTP",

      react:
        OtpEmail({
          otp,
        }),
    })

    //////////////////////////////////////////////////////
    // NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          user.id,

        title:
          "Password Reset Request",

        message:
          "OTP sent to your email for password reset.",

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
        "OTP sent successfully",
    })

  } catch (error) {

    console.log(
      "FORGOT PASSWORD ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to send OTP",
      },
      {
        status: 500,
      }
    )
  }
}