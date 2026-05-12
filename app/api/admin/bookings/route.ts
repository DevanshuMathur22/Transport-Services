// app/api/admin/bookings/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET ADMIN BOOKINGS
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
    // CHECK ADMIN
    //////////////////////////////////////////////////////

   const admin =
  await prisma.user.findFirst({

    where: {
      id:
        decoded.id,
    },
  })

console.log("DECODED:", decoded)

console.log("ADMIN:", admin)

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

    console.log(error)

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