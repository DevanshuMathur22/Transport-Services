import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {

    const body = await req.json()

    const {
      name,
      email,
      password,
      phone,
    } = body

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !name ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          error:
            "All fields are required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // CHECK USER
    //////////////////////////////////////////////////////

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      })

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "User already exists",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // HASH PASSWORD
    //////////////////////////////////////////////////////

    const hashedPassword =
      await bcrypt.hash(password, 10)

    //////////////////////////////////////////////////////
    // CREATE USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password:
            hashedPassword,
          phone,
        },
      })

    return NextResponse.json(
      {
        success: true,
        user,
      },
      {
        status: 201,
      }
    )

  } catch (error) {

    return NextResponse.json(
      {
        error:
          "Registration failed",
      },
      {
        status: 500,
      }
    )
  }
}