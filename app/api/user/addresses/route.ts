import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET ADDRESSES
//////////////////////////////////////////////////////

export async function GET(
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
    // GET ADDRESSES
    //////////////////////////////////////////////////////

    const addresses =
      await prisma.address.findMany({

        where: {
          userId:
            decoded.id,
        },

        orderBy: {
          createdAt:
            "desc",
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
    // CREATE ADDRESS
    //////////////////////////////////////////////////////

    const address =
      await prisma.address.create({

        data: {

          userId:
            decoded.id,

          name:
            body.name,

          address:
            body.address,

          city:
            body.city,

          pincode:
            body.pincode,

          isDefault:
            body.isDefault ||
            false,
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