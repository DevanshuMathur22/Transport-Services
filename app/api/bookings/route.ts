import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// GET ALL BOOKINGS
//////////////////////////////////////////////////////

export async function GET() {
  try {

    const bookings =
      await prisma.booking.findMany({
        orderBy: {
          createdAt: "desc",
        },
      })

    return NextResponse.json(
      bookings
    )

  } catch (error) {

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

//////////////////////////////////////////////////////
// CREATE BOOKING
//////////////////////////////////////////////////////

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !body.userId ||
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

          userId:
            body.userId,

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
          // OPTIONAL EXTRA FIELDS
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
    // CREATE TRACKING
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
// CREATE NOTIFICATION
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