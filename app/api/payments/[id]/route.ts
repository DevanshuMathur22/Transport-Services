// app/api/payments/[id]/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{
    id: string
  }>
}

//////////////////////////////////////////////////////
// GET SINGLE PAYMENT
//////////////////////////////////////////////////////

export async function GET(
  req: Request,
  { params }: Props
) {
  try {

    const resolved =
      await params

    const payment =
      await prisma.payment.findUnique({

        where: {
          id:
            resolved.id,
        },

        include: {
          booking: true,
        },
      })

    if (!payment) {

      return NextResponse.json(
        {
          error:
            "Payment not found",
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json(
      payment
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch payment",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// UPDATE PAYMENT
//////////////////////////////////////////////////////

export async function PUT(
  req: Request,
  { params }: Props
) {
  try {

    const resolved =
      await params

    const body =
      await req.json()

    const payment =
      await prisma.payment.update({

        where: {
          id:
            resolved.id,
        },

        data: {
          status:
            body.status,
        },
      })

    return NextResponse.json(
      payment
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to update payment",
      },
      {
        status: 500,
      }
    )
  }
}