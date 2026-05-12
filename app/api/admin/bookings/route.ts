// app/api/admin/bookings/route.ts

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
// GET ADMIN BOOKINGS
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
    // CHECK ADMIN
    //////////////////////////////////////////////////////

    const admin =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },

        select: {

          id: true,

          role: true,
        },
      })

    //////////////////////////////////////////////////////
    // ACCESS DENIED
    //////////////////////////////////////////////////////

    if (

      !admin ||

      admin.role !==
        "admin"

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
    // BOOKINGS
    //////////////////////////////////////////////////////

    const bookings =
      await prisma.booking.findMany({

        include: {

          //////////////////////////////////////////////////////
          // CUSTOMER
          //////////////////////////////////////////////////////

          user: {

            select: {

              id: true,

              name: true,

              email: true,

              phone: true,
            },
          },

          //////////////////////////////////////////////////////
          // DRIVER
          //////////////////////////////////////////////////////

          driver: {

            select: {

              id: true,

              name: true,

              phone: true,

              vehicleType: true,

              vehicleNumber: true,
            },
          },

          //////////////////////////////////////////////////////
          // PAYMENT
          //////////////////////////////////////////////////////

          payment: true,
        },

        orderBy: {

          createdAt:
            "desc",
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(
      bookings
    )

  } catch (error) {

    console.log(
      "ADMIN BOOKINGS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch bookings",
      },
      {
        status: 500,
      }
    )
  }
}