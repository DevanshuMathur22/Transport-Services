// app/api/user/tracking/[trackingId]/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

interface Props {
  params: Promise<{
    trackingId: string
  }>
}

//////////////////////////////////////////////////////
// GET TRACKING
//////////////////////////////////////////////////////

export async function GET(
  req: NextRequest,
  { params }: Props
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
    // PARAMS
    //////////////////////////////////////////////////////

    const resolvedParams =
      await params

    //////////////////////////////////////////////////////
    // BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findFirst({

        where: {

          trackingId:
            resolvedParams.trackingId,

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

      //////////////////////////////////////////////////////
      // DRIVER
      //////////////////////////////////////////////////////

      driver: {

        name:
          booking.driver
            ?.name ||
          "Not Assigned",

        phone:
          booking.driver
            ?.phone ||
          "N/A",

        vehicleType:
          booking.driver
            ?.vehicleType ||
          "N/A",

        vehicleNumber:
          booking.driver
            ?.vehicleNumber ||
          "N/A",

        latitude:
          booking.driver
            ?.latitude ||
          null,

        longitude:
          booking.driver
            ?.longitude ||
          null,
      },

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
          (item) => ({

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

    console.log(error)

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