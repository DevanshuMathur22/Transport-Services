// app/api/admin/users/block/route.ts

import { prisma } from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

export async function PATCH(
  req: NextRequest
) {

  try {

    const body =
      await req.json()

    const { id } = body

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (!id) {

      return NextResponse.json(
        {
          error:
            "User id is required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // BLOCK USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.update({

        where: {
          id,
        },

        data: {
          isBlocked: true,
        },
      })

    return NextResponse.json({
      success: true,
      user,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to block user",
      },
      {
        status: 500,
      }
    )
  }
}