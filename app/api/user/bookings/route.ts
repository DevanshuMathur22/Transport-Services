// app/api/user/bookings/route.ts

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
// GET USER BOOKINGS
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

          name: true,

          email: true,
        },
      })

    //////////////////////////////////////////////////////
    // CHECK USER
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
    // USER BOOKINGS
    //////////////////////////////////////////////////////

    const bookings =
      await prisma.booking.findMany({

        where: {
          userId:
            decoded.id,
        },

        include: {

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

          payment: {

            select: {

              id: true,

              amount: true,

              status: true,

              paymentMethod: true,

              transactionId: true,

              createdAt: true,
            },
          },

          //////////////////////////////////////////////////////
          // TRACKING
          //////////////////////////////////////////////////////

          tracking: {

            orderBy: {

              createdAt:
                "desc",
            },

            take: 1,
          },
        },

        orderBy: {

          createdAt:
            "desc",
        },

        take: 10,
      })

    //////////////////////////////////////////////////////
    // FORMATTED BOOKINGS
    //////////////////////////////////////////////////////

    const formattedBookings =
      bookings.map(
        (booking) => ({

          id:
            booking.id,

          trackingId:
            booking.trackingId,

          fromCity:
            booking.fromCity,

          toCity:
            booking.toCity,

          pickupAddress:
            booking.pickupAddress,

          deliveryAddress:
            booking.deliveryAddress,

          vehicleType:
            booking.vehicleType,

          packageType:
            booking.packageType,

          weight:
            booking.weight,

          distance:
            booking.distance,

          price:
            booking.price,

          estimatedTime:
            booking.estimatedTime,

          status:
            booking.status,

          pickupDate:
            booking.pickupDate,

          pickupTime:
            booking.pickupTime,

          createdAt:
            booking.createdAt,

          //////////////////////////////////////////////////////
          // DRIVER
          //////////////////////////////////////////////////////

          driver:
            booking.driver
              ? {

                  id:
                    booking.driver.id,

                  name:
                    booking.driver.name,

                  phone:
                    booking.driver.phone,

                  vehicleType:
                    booking.driver.vehicleType,

                  vehicleNumber:
                    booking.driver.vehicleNumber,
                }

              : null,

          //////////////////////////////////////////////////////
          // PAYMENT
          //////////////////////////////////////////////////////

          payment:
            booking.payment
              ? {

                  id:
                    booking.payment.id,

                  amount:
                    booking.payment.amount,

                  status:
                    booking.payment.status,

                  paymentMethod:
                    booking.payment.paymentMethod,

                  transactionId:
                    booking.payment.transactionId,
                }

              : null,

          //////////////////////////////////////////////////////
          // LATEST TRACKING
          //////////////////////////////////////////////////////

          latestTracking:
            booking.tracking[0]
              ? {

                  message:
                    booking.tracking[0]
                      .message,

                  location:
                    booking.tracking[0]
                      .location,

                  createdAt:
                    booking.tracking[0]
                      .createdAt,
                }

              : null,
        })
      )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      total:
        formattedBookings.length,

      bookings:
        formattedBookings,
    })

  } catch (error) {

    console.log(
      "USER BOOKINGS ERROR:",
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