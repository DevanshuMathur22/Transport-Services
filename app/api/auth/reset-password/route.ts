import bcrypt from "bcryptjs"

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
    // HASH
    //////////////////////////////////////////////////////

    const hashedPassword =
      await bcrypt.hash(
        body.password,
        10
      )

    //////////////////////////////////////////////////////
    // UPDATE
    //////////////////////////////////////////////////////

    await prisma.user.update({

      where: {
        id:
          user.id,
      },

      data: {

        password:
          hashedPassword,

        otp: null,

        otpExpiry:
          null,
      },
    })

    return NextResponse.json({

      success: true,

      message:
        "Password reset successful",
    })

  } catch (error) {

    console.log(error)

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