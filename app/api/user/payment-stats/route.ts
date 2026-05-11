// app/api/user/payment-stats/route.ts

import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

//////////////////////////////////////////////////////
// PAYMENT STATS
//////////////////////////////////////////////////////

export async function GET() {

  try {

    const payments =
      await prisma.payment.findMany()

    const totalSpent =
  payments.reduce(
    (
      acc: number,
      item: any
    ) =>
      acc +
      item.amount,
    0
  )

const successful =
  payments.filter(
    (item: any) =>
      item.status ===
      "paid"
  ).length

const pending =
  payments.filter(
    (item: any) =>
      item.status ===
      "pending"
  ).length

const refunded =
  payments.filter(
    (item: any) =>
      item.status ===
      "refunded"
  ).length
    return NextResponse.json({

      totalSpent,

      successful,

      pending,

      refunded,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch payment stats",
      },
      {
        status: 500,
      }
    )
  }
}