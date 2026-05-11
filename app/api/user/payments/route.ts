// app/api/user/payments/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET() {

  try {

    const payments =
      await prisma.payment.findMany({

        include: {
          booking: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      })

    return NextResponse.json(
      payments
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch payments",
      },
      {
        status: 500,
      }
    )
  }
}