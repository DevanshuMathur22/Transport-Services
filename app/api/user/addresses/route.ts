// app/api/user/addresses/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

//////////////////////////////////////////////////////
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// GET ADDRESSES
//////////////////////////////////////////////////////

export async function GET(
  req: NextRequest
) {

  try {

    //////////////////////////////////////////////////////
    // JWT SECRET CHECK
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

    if (

      !user ||

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
    // GET ADDRESSES
    //////////////////////////////////////////////////////

    const addresses =
      await prisma.address.findMany({

        where: {
          userId:
            decoded.id,
        },

        orderBy: {

          isDefault:
            "desc",

          createdAt:
            "desc",
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      addresses,
    })

  } catch (error) {

    console.log(
      "GET ADDRESSES ERROR:",
      error
    )

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
    // JWT SECRET CHECK
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

    if (

      !user ||

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
    // CLEAN VALUES
    //////////////////////////////////////////////////////

    const name =
      body.name.trim()

    const addressText =
      body.address.trim()

    const city =
      body.city.trim()

    const pincode =
      body.pincode.trim()

    //////////////////////////////////////////////////////
    // PINCODE VALIDATION
    //////////////////////////////////////////////////////

    if (
      pincode.length < 4
    ) {

      return NextResponse.json(
        {
          error:
            "Invalid pincode",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // DEFAULT ADDRESS
    //////////////////////////////////////////////////////

    if (body.isDefault) {

      await prisma.address.updateMany({

        where: {
          userId:
            decoded.id,
        },

        data: {
          isDefault:
            false,
        },
      })
    }

    //////////////////////////////////////////////////////
    // CREATE ADDRESS
    //////////////////////////////////////////////////////

    const address =
      await prisma.address.create({

        data: {

          userId:
            decoded.id,

          name,

          address:
            addressText,

          city,

          pincode,

          isDefault:
            body.isDefault ||
            false,
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(

      {
        success: true,

        address,
      },

      {
        status: 201,
      }
    )

  } catch (error) {

    console.log(
      "CREATE ADDRESS ERROR:",
      error
    )

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