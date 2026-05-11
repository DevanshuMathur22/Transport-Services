// app/api/auth/register/route.ts

import { prisma } from "@/lib/prisma"

import { NextResponse } from "next/server"

import bcrypt from "bcryptjs"

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json()

    const {
      name,
      email,
      password,
      phone,
      role,
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
    // CHECK EXISTING USER
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
      await bcrypt.hash(
        password,
        10
      )

    //////////////////////////////////////////////////////
    // VALID ROLES
    //////////////////////////////////////////////////////

    const validRole =
      role === "driver"
        ? "driver"
        : "user"

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

          role:
            validRole,
        },
      })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

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

    console.log(error)

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