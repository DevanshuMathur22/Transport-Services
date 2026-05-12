import { prisma } from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

//////////////////////////////////////////////////////
// DELETE ADDRESS
//////////////////////////////////////////////////////

export async function DELETE(
  req: NextRequest
) {

  try {

    //////////////////////////////////////////////////////
    // TOKEN
    //////////////////////////////////////////////////////

    const token =
      req.cookies.get("token")
        ?.value

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
    // VERIFY TOKEN
    //////////////////////////////////////////////////////

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as {
        id: string
      }

    //////////////////////////////////////////////////////
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    const { addressId } =
      body

    if (!addressId) {

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
    // FIND ADDRESS
    //////////////////////////////////////////////////////

    const address =
      await prisma.address.findFirst({

        where: {
          id: addressId,

          userId:
            decoded.id,
        },
      })

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
        id: addressId,
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    console.log(error)

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