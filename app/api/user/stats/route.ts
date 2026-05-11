import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {

    const totalBookings =
      await prisma.booking.count()

    const activeDeliveries =
      await prisma.booking.count({
        where: {
          status: "in_transit",
        },
      })

    const completedOrders =
      await prisma.booking.count({
        where: {
          status: "delivered",
        },
      })

    const payments =
      await prisma.payment.findMany()

    const totalSpent =
  payments.reduce(
    (acc: number, item) => acc + item.amount,
    0
  )
    return NextResponse.json({
      totalBookings,
      activeDeliveries,
      completedOrders,
      totalSpent,
    })

  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to fetch stats",
      },
      {
        status: 500,
      }
    )
  }
}