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

export async function POST(
  req: NextRequest
) {

  try {

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findUnique({

        where: {
          email:
            body.email,
        },
      })

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
    // EXPIRY
    //////////////////////////////////////////////////////

    const otpExpiry =
      new Date(
        Date.now() +
        10 *
          60 *
          1000
      )

    //////////////////////////////////////////////////////
    // SAVE
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
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      message:
        "OTP sent successfully",
    })

  } catch (error) {

    console.log(error)

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