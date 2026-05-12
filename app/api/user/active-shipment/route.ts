// app/api/user/active-shipment/route.ts

import { prisma } from "@/lib/prisma"

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
// GET ACTIVE SHIPMENT
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
    // USER ACTIVE BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findFirst({

        where: {

          userId:
            decoded.id,

          OR: [

            {
              status:
                "accepted",
            },

            {
              status:
                "picked_up",
            },

            {
              status:
                "in_transit",
            },
          ],
        },

        include: {

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

          payment: {

            select: {

              amount: true,

              status: true,

              paymentMethod: true,
            },
          },
        },

        orderBy: {

          createdAt:
            "desc",
        },
      })

    //////////////////////////////////////////////////////
    // NO ACTIVE SHIPMENT
    //////////////////////////////////////////////////////

    if (!booking) {

      return NextResponse.json({

        success: true,

        shipment:
          null,
      })
    }

    //////////////////////////////////////////////////////
    // PROGRESS
    //////////////////////////////////////////////////////

    let progress = 10

    if (
      booking.status ===
      "accepted"
    ) {

      progress = 25
    }

    if (
      booking.status ===
      "picked_up"
    ) {

      progress = 55
    }

    if (
      booking.status ===
      "in_transit"
    ) {

      progress = 80
    }

    if (
      booking.status ===
      "delivered"
    ) {

      progress = 100
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      shipment: {

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

        status:
          booking.status,

        progress,

        eta:
          booking.estimatedTime ||
          "2h 30m",

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
              }

            : null,

        //////////////////////////////////////////////////////
        // PAYMENT
        //////////////////////////////////////////////////////

        payment:
          booking.payment
            ? {

                amount:
                  booking.payment.amount,

                status:
                  booking.payment.status,

                paymentMethod:
                  booking.payment.paymentMethod,
              }

            : null,
      },
    })

  } catch (error) {

    console.log(
      "ACTIVE SHIPMENT ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch active shipment",
      },
      {
        status: 500,
      }
    )
  }
}