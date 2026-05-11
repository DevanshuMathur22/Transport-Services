// app/api/driver/orders/[id]/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{
    id: string
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

    //////////////////////////////////////////////////////
    // FIND ORDER
    //////////////////////////////////////////////////////

    const order =
      await prisma.booking.findUnique({

        where: {
          id:
            resolved.id,
        },

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
          // TRACKING
          //////////////////////////////////////////////////////

          tracking: {

            orderBy: {
              createdAt:
                "asc",
            },
          },
        },
      })

    //////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////

    if (!order) {

      return NextResponse.json(
        {
          error:
            "Order not found",
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
      order
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch order details",
      },
      {
        status: 500,
      }
    )
  }
}