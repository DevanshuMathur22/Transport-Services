import { prisma } from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

//////////////////////////////////////////////////////
// GET SINGLE BOOKING
//////////////////////////////////////////////////////

export async function GET(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string
    }>
  }
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
    // PARAMS
    //////////////////////////////////////////////////////

    const { id } =
      await context.params

    //////////////////////////////////////////////////////
    // BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findFirst({

        where: {

          id,

          userId:
            decoded.id,
        },

        include: {

          tracking: {

            orderBy: {
              createdAt:
                "asc",
            },
          },

          payment: true,

          user: {

            select: {
              id: true,
              name: true,
              email: true,
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
            "Booking not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json(
      booking
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch booking",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// UPDATE BOOKING
//////////////////////////////////////////////////////

export async function PUT(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string
    }>
  }
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
    // PARAMS
    //////////////////////////////////////////////////////

    const { id } =
      await context.params

    //////////////////////////////////////////////////////
    // FIND BOOKING
    //////////////////////////////////////////////////////

    const existingBooking =
      await prisma.booking.findFirst({

        where: {

          id,

          userId:
            decoded.id,
        },
      })

    if (!existingBooking) {

      return NextResponse.json(
        {
          error:
            "Booking not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

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
    // UPDATE BOOKING
    //////////////////////////////////////////////////////

    const updatedBooking =
      await prisma.booking.update({

        where: {
          id,
        },

        data: {

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

          status:
            body.status,

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
    // TRACKING UPDATE
    //////////////////////////////////////////////////////

    if (body.status) {

      await prisma.tracking.create({

        data: {

          bookingId:
            updatedBooking.id,

          location:
            updatedBooking.toCity,

          message:
            `Shipment status updated to ${body.status}`,
        },
      })
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      booking:
        updatedBooking,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to update booking",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// DELETE BOOKING
//////////////////////////////////////////////////////

export async function DELETE(
  req: NextRequest,
  context: {
    params: Promise<{
      id: string
    }>
  }
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
    // PARAMS
    //////////////////////////////////////////////////////

    const { id } =
      await context.params

    //////////////////////////////////////////////////////
    // FIND BOOKING
    //////////////////////////////////////////////////////

    const existingBooking =
      await prisma.booking.findFirst({

        where: {

          id,

          userId:
            decoded.id,
        },
      })

    if (!existingBooking) {

      return NextResponse.json(
        {
          error:
            "Booking not found",
        },
        {
          status: 404,
        }
      )
    }

    //////////////////////////////////////////////////////
    // DELETE TRACKING
    //////////////////////////////////////////////////////

    await prisma.tracking.deleteMany({

      where: {
        bookingId: id,
      },
    })

    //////////////////////////////////////////////////////
    // DELETE PAYMENT
    //////////////////////////////////////////////////////

    await prisma.payment.deleteMany({

      where: {
        bookingId: id,
      },
    })

    //////////////////////////////////////////////////////
    // DELETE BOOKING
    //////////////////////////////////////////////////////

    await prisma.booking.delete({

      where: {
        id,
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      message:
        "Booking deleted successfully",
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to delete booking",
      },
      {
        status: 500,
      }
    )
  }
}