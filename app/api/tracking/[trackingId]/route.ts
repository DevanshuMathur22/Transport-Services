// app/api/tracking/[trackingId]/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{
    trackingId: string
  }>
}

export async function GET(
  req: Request,
  { params }: Props
) {
  try {

    //////////////////////////////////////////////////////
    // PARAMS
    //////////////////////////////////////////////////////

    const resolved =
      await params

    const trackingId =
      resolved.trackingId

    //////////////////////////////////////////////////////
    // FIND BOOKING
    //////////////////////////////////////////////////////

    const booking =
      await prisma.booking.findUnique({
        where: {
          trackingId,
        },

        include: {
          tracking: {
            orderBy: {
              createdAt: "asc",
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
    // STATUS -> PROGRESS
    //////////////////////////////////////////////////////

    const progressMap: any = {

      pending: 10,

      accepted: 25,

      picked_up: 50,

      in_transit: 80,

      delivered: 100,

      cancelled: 0,
    }

    //////////////////////////////////////////////////////
    // TIMELINE
    //////////////////////////////////////////////////////

    const timeline =
      booking.tracking.map(
       (item: any) => ({
          message:
            item.message,

          location:
            item.location,

          time:
            new Date(
              item.createdAt
            ).toLocaleString(),
        })
      )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      id: booking.id,

      trackingId:
        booking.trackingId,

      fromCity:
        booking.fromCity,

      toCity:
        booking.toCity,

      vehicleType:
        booking.vehicleType,

      status:
        booking.status,

      eta:
        booking.estimatedTime ||
        "2 Hours",

      progress:
        progressMap[
          booking.status
        ] || 0,

      timeline,

      //////////////////////////////////////////////////////
      // DEMO DRIVER
      //////////////////////////////////////////////////////

      driver: {
        name:
          "Rahul Sharma",

        rating: 4.8,

        phone:
          "+91 9876543210",

        vehicleNumber:
          "RJ14 AB 4589",
      },
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