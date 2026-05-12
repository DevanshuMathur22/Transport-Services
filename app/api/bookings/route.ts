import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// CREATE BOOKING
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
      !body.fromCity ||
      !body.toCity ||
      !body.pickupAddress ||
      !body.deliveryAddress ||
      !body.vehicleType ||
      !body.weight ||
      !body.distance
    ) {

      return NextResponse.json(
        {
          error:
            "All required fields are mandatory",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // ETA
    //////////////////////////////////////////////////////

    let estimatedTime =
      "2 Hours"

    if (
      body.distance > 100
    ) {
      estimatedTime =
        "1 Day"
    }

    if (
      body.distance > 300
    ) {
      estimatedTime =
        "2 Days"
    }

    //////////////////////////////////////////////////////
    // CREATE BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.create({

        data: {

          //////////////////////////////////////////////////////
          // TOKEN USER ID
          //////////////////////////////////////////////////////

          userId:
            decoded.id,

          trackingId:
            `PRT${Date.now()}`,

          fromCity:
            body.fromCity,

          toCity:
            body.toCity,

          pickupAddress:
            body.pickupAddress,

          deliveryAddress:
            body.deliveryAddress,

          vehicleType:
            body.vehicleType,

          weight:
            Number(
              body.weight
            ),

          distance:
            Number(
              body.distance
            ),

          price:
            Number(
              body.price
            ),

          estimatedTime,

          //////////////////////////////////////////////////////
          // OPTIONAL
          //////////////////////////////////////////////////////

          // @ts-ignore

          packageType:
            body.packageType,

          // @ts-ignore

          pickupDate:
            body.pickupDate,

          // @ts-ignore

          pickupTime:
            body.pickupTime,

          // @ts-ignore

          instructions:
            body.instructions,
        },
      })

    //////////////////////////////////////////////////////
    // TRACKING
    //////////////////////////////////////////////////////

    await prisma.tracking.create({

      data: {

        bookingId:
          booking.id,

        location:
          body.fromCity,

        message:
          "Booking created successfully",
      },
    })

    //////////////////////////////////////////////////////
    // NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          booking.userId,

        title:
          "Booking Created",

        message:
          `Tracking ID ${booking.trackingId} created successfully.`,

        type:
          "booking",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(
      {
        success: true,

        trackingId:
          booking.trackingId,

        booking,
      },
      {
        status: 201,
      }
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to create booking",
      },
      {
        status: 500,
      }
    )
  }
}