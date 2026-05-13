// app/api/user/addresses/[id]/route.ts

import { prisma }
from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

//////////////////////////////////////////////////////
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// PARAMS TYPE
//////////////////////////////////////////////////////

type Props = {
  params: Promise<{
    id: string
  }>
}

//////////////////////////////////////////////////////
// DELETE ADDRESS
//////////////////////////////////////////////////////

export async function DELETE(
  req: NextRequest,
  context: Props
) {

  try {

    //////////////////////////////////////////////////////
    // TOKEN
    //////////////////////////////////////////////////////

    const token =
      req.cookies.get("token")
        ?.value

    //////////////////////////////////////////////////////
    // NO TOKEN
    //////////////////////////////////////////////////////

    if (!token) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    //////////////////////////////////////////////////////
    // JWT SECRET
    //////////////////////////////////////////////////////

    if (
      !process.env.JWT_SECRET
    ) {

      return NextResponse.json(
        {
          error:
            "JWT secret missing",
        },
        {
          status: 500,
        }
      )
    }

    //////////////////////////////////////////////////////
    // VERIFY TOKEN
    //////////////////////////////////////////////////////

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      ) as {
        id: string
      }

    //////////////////////////////////////////////////////
    // PARAMS
    //////////////////////////////////////////////////////

    const { id } =
      await context.params

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (!id) {

      return NextResponse.json(
        {
          error:
            "Address id is required",
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
          id:
            decoded.id,
        },

        select: {

          id: true,

          role: true,

          isBlocked: true,
        },
      })

    //////////////////////////////////////////////////////
    // USER CHECK
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
    // BLOCKED USER
    //////////////////////////////////////////////////////

    if (
      user.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Account blocked",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // ROLE CHECK
    //////////////////////////////////////////////////////

    if (
      user.role !==
      "user"
    ) {

      return NextResponse.json(
        {
          error:
            "Access denied",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // FIND ADDRESS
    //////////////////////////////////////////////////////

    const address =
      await prisma.address.findFirst({

        where: {

          id,

          userId:
            decoded.id,
        },
      })

    //////////////////////////////////////////////////////
    // ADDRESS NOT FOUND
    //////////////////////////////////////////////////////

    if (!address) {

      return NextResponse.json(
        {
          error:
            "Address not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // DELETE ADDRESS
    //////////////////////////////////////////////////////

    await prisma.address.delete({

      where: {
        id,
      },
    })

    //////////////////////////////////////////////////////
    // NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          decoded.id,

        title:
          "Address Deleted",

        message:
          `${address.address} removed successfully.`,

        type:
          "address",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      message:
        "Address deleted successfully",
    })

  } catch (error) {

    console.log(
      "DELETE ADDRESS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to delete address",
      },
      {
        status: 500,
      }
    )
  }
}