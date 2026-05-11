import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET ADDRESSES
//////////////////////////////////////////////////////

export async function GET() {

  try {

    const user =
      await prisma.user.findFirst()

    if (!user) {

      return NextResponse.json([])
    }

    const addresses =
      await prisma.address.findMany({

        where: {
          userId:
            user.id,
        },

        orderBy: {
          createdAt: "desc",
        },
      })

    return NextResponse.json(
      addresses
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch addresses",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// CREATE ADDRESS
//////////////////////////////////////////////////////

export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !body.name ||
      !body.address ||
      !body.city ||
      !body.pincode
    ) {
      return NextResponse.json(
        {
          error:
            "All fields are required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // GET USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findFirst()

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
    // CREATE ADDRESS
    //////////////////////////////////////////////////////

    const address =
      await prisma.address.create({

        data: {

          userId:
            user.id,

          name:
            body.name,

          address:
            body.address,

          city:
            body.city,

          pincode:
            body.pincode,

          isDefault:
            body.isDefault || false,
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(
      address,
      {
        status: 201,
      }
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to create address",
      },
      {
        status: 500,
      }
    )
  }
}