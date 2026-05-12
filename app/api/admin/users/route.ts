// app/api/admin/users/route.ts

import { prisma } from "@/lib/prisma"

import { NextResponse } from "next/server"

export async function GET() {

  try {

    const users =
      await prisma.user.findMany({

        where: {
          role: "user",
        },

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,

          name: true,

          email: true,

          phone: true,

          isBlocked: true,

          createdAt: true,
        },
      })

    return NextResponse.json(
      users
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch users",
      },
      {
        status: 500,
      }
    )
  }
}