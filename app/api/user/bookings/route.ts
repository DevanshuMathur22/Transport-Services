import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {

    const bookings =
      await prisma.booking.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 10,
      })

    return NextResponse.json(bookings)

  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to fetch bookings",
      },
      {
        status: 500,
      }
    )
  }
}