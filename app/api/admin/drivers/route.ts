// app/api/admin/drivers/route.ts

import { prisma } from "@/lib/prisma"

import { NextResponse } from "next/server"

export async function GET() {

  try {

    const drivers =
      await prisma.user.findMany({

        where: {
          role: "driver",
        },

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,

          name: true,

          email: true,

          phone: true,

          vehicleType: true,

          vehicleNumber: true,

          isDriverApproved: true,

          isBlocked: true,

          isOnline: true,

          createdAt: true,
        },
      })

    return NextResponse.json(
      drivers
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch drivers",
      },
      {
        status: 500,
      }
    )
  }
}