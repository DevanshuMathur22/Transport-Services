// app/api/user/tracking/[trackingId]/route.ts

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
// PARAMS TYPE
//////////////////////////////////////////////////////

type Props = {
  params: Promise<{
    trackingId: string
  }>
}

//////////////////////////////////////////////////////
// GET TRACKING
//////////////////////////////////////////////////////

export async function GET(
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
    // PARAMS
    //////////////////////////////////////////////////////

    const {
      trackingId,
    } =
      await context.params

    //////////////////////////////////////////////////////
    // BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findFirst({

        where: {

          trackingId,

          userId:
            decoded.id,
        },

        include: {

          //////////////////////////////////////////////////////
          // TRACKING
          //////////////////////////////////////////////////////

          tracking: {

            orderBy: {

              createdAt:
                "asc",
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

              latitude: true,

              longitude: true,

              isOnline: true,
            },
          },

          //////////////////////////////////////////////////////
          // PAYMENT
          //////////////////////////////////////////////////////

          payment: {

            select: {

              amount: true,

              status: true,

              paymentMethod: true,

              transactionId: true,
            },
          },
        },
      })

    //////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////

    if (!booking) {

      return NextResponse.json(
        {
          error:
            "Tracking not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

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

      status:
        booking.status,

      eta:
        booking.estimatedTime,

      distance:
        booking.distance,

      weight:
        booking.weight,

      price:
        booking.price,

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

              latitude:
                booking.driver.latitude,

              longitude:
                booking.driver.longitude,

              isOnline:
                booking.driver.isOnline,
            }

          : null,

      //////////////////////////////////////////////////////
      // PAYMENT
      //////////////////////////////////////////////////////

      payment:
        booking.payment
          ? {

              amount:
                booking.payment
                  .amount,

              status:
                booking.payment
                  .status,

              paymentMethod:
                booking.payment
                  .paymentMethod,

              transactionId:
                booking.payment
                  .transactionId,
            }

          : null,

      //////////////////////////////////////////////////////
      // TIMELINE
      //////////////////////////////////////////////////////

      timeline:
        booking.tracking.map(
          (
            item: any
          ) => ({

            id:
              item.id,

            message:
              item.message,

            location:
              item.location,

            latitude:
              item.latitude,

            longitude:
              item.longitude,

            time:
              new Date(
                item.createdAt
              ).toLocaleString(),
          })
        ),
    })

  } catch (error) {

    console.log(
      "TRACKING ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch tracking",
      },
      {
        status: 500,
      }
    )
  }
}