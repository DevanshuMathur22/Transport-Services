// app/api/admin/drivers/unblock/route.ts

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
            "Driver id is required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // UNBLOCK DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.update({

        where: {
          id,
        },

        data: {
          isBlocked: false,
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({
      success: true,
      driver,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to unblock driver",
      },
      {
        status: 500,
      }
    )
  }
}