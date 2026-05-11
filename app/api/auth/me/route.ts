import { NextRequest, NextResponse } from "next/server"

import jwt from "jsonwebtoken"

import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest
) {
  try {

    const token =
      req.cookies.get("token")
        ?.value

    if (!token) {

      return NextResponse.json(
        {
          user: null,
        },
        {
          status: 401,
        }
      )
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as {
        id: string
      }

    const user =
      await prisma.user.findUnique({
        where: {
          id: decoded.id,
        },

        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      })

    return NextResponse.json({
      user,
    })

  } catch (error) {

    return NextResponse.json(
      {
        user: null,
      },
      {
        status: 500,
      }
    )
  }
}