import {
  NextRequest,
  NextResponse,
} from "next/server"

import { prisma }
from "@/lib/prisma"

export async function POST(
  req: NextRequest
) {

  try {

    const body =
      await req.json()

    const user =
      await prisma.user.findUnique({

        where: {
          email:
            body.email,
        },
      })

    if (
      !user ||
      user.otp !==
        body.otp
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
    // EXPIRY CHECK
    //////////////////////////////////////////////////////

    if (
      !user.otpExpiry ||
      user.otpExpiry <
        new Date()
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

    return NextResponse.json({

      success: true,
    })

  } catch (error) {

    console.log(error)

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