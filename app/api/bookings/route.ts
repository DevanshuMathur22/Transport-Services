// app/api/bookings/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

import { sendEmail }
from "@/lib/send-email"

import BookingEmail
from "@/emails/booking-email"

//////////////////////////////////////////////////////
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// CREATE BOOKING
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
    // USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },
      })

    //////////////////////////////////////////////////////
    // USER NOT FOUND
    //////////////////////////////////////////////////////

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
    // BLOCKED USER
    //////////////////////////////////////////////////////

    if (
      user.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Your account is blocked",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // ETA
    //////////////////////////////////////////////////////

    let estimatedTime =
      "2 Hours"

    if (
      Number(
        body.distance
      ) > 100
    ) {

      estimatedTime =
        "1 Day"
    }

    if (
      Number(
        body.distance
      ) > 300
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
              body.price || 0
            ),

          estimatedTime,

          status:
            "pending",

          //////////////////////////////////////////////////////
          // OPTIONAL
          //////////////////////////////////////////////////////

          packageType:
            body.packageType || null,

          pickupDate:
            body.pickupDate || null,

          pickupTime:
            body.pickupTime || null,

          instructions:
            body.instructions || null,
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
    // EMAIL
    //////////////////////////////////////////////////////

    await sendEmail({

      to:
        user.email,

      subject:
        "Booking Confirmed",

      react:
        BookingEmail({

          trackingId:
            booking.trackingId,

          customerName:
            user.name,
        }),
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

    console.log(
      "BOOKING ERROR:",
      error
    )

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