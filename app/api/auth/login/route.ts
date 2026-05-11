import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {

    const body = await req.json()

    const {
      email,
      password,
    } = body

    //////////////////////////////////////////////////////
    // FIND USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      })

    if (!user) {
      return NextResponse.json(
        {
          error:
            "Invalid credentials",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // CHECK PASSWORD
    //////////////////////////////////////////////////////

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error:
            "Invalid credentials",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // GENERATE TOKEN
    //////////////////////////////////////////////////////

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      }
    )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    const response =
      NextResponse.json({
        success: true,
        token,
        user,
      })

    //////////////////////////////////////////////////////
    // COOKIE
    //////////////////////////////////////////////////////

    response.cookies.set(
      "token",
      token,
      {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      }
    )

    return response

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Login failed",
      },
      {
        status: 500,
      }
    )
  }
}