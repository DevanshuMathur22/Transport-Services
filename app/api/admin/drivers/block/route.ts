// app/api/admin/drivers/block/route.ts

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

    if (!id) {

      return NextResponse.json(
        {
          error:
            "Driver id is required",
        },
        {
          status: 400,
        }
      )
    }

    const driver =
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
      driver,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to block driver",
      },
      {
        status: 500,
      }
    )
  }
}