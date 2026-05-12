// app/api/auth/register/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

import { sendEmail }
from "@/lib/send-email"

import LoginEmail
from "@/emails/login-email"

//////////////////////////////////////////////////////
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// REGISTER
//////////////////////////////////////////////////////

export async function POST(
  req: NextRequest
) {

  try {

    //////////////////////////////////////////////////////
    // JWT SECRET CHECK
    //////////////////////////////////////////////////////

    if (
      !process.env.JWT_SECRET
    ) {

      return NextResponse.json(
        {
          error:
            "JWT secret missing",
        },
        {
          status: 500,
        }
      )
    }

    //////////////////////////////////////////////////////
    // BODY
    //////////////////////////////////////////////////////

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
    // CLEAN VALUES
    //////////////////////////////////////////////////////

    const cleanEmail =
      email
        .trim()
        .toLowerCase()

    const cleanName =
      name.trim()

    //////////////////////////////////////////////////////
    // CHECK EXISTING USER
    //////////////////////////////////////////////////////

    const existingUser =
      await prisma.user.findUnique({

        where: {
          email:
            cleanEmail,
        },
      })

    //////////////////////////////////////////////////////
    // USER EXISTS
    //////////////////////////////////////////////////////

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
    // VALID ROLE
    //////////////////////////////////////////////////////

    const validRole =

      role === "admin"
        ? "admin"

        : role === "driver"
        ? "driver"

        : "user"

    //////////////////////////////////////////////////////
    // CREATE USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.create({

        data: {

          name:
            cleanName,

          email:
            cleanEmail,

          password:
            hashedPassword,

          phone,

          role:
            validRole,

          //////////////////////////////////////////////////////
          // DRIVER APPROVAL
          //////////////////////////////////////////////////////

          isDriverApproved:
            validRole ===
            "driver"
              ? false
              : true,
        },

        select: {

          id: true,

          name: true,

          email: true,

          phone: true,

          role: true,

          createdAt: true,
        },
      })

    //////////////////////////////////////////////////////
    // GENERATE TOKEN
    //////////////////////////////////////////////////////

    const token =
      jwt.sign(

        {
          id:
            user.id,

          role:
            user.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn:
            "7d",
        }
      )

    //////////////////////////////////////////////////////
    // CREATE NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          user.id,

        title:
          "Account Created",

        message:
          "Your account has been created successfully.",

        type:
          "auth",
      },
    })

    //////////////////////////////////////////////////////
    // SEND EMAIL
    //////////////////////////////////////////////////////

    await sendEmail({

      to:
        user.email,

      subject:
        "Welcome to Porter Clone",

      react:
        LoginEmail({

          name:
            user.name,
        }),
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    const response =
      NextResponse.json(

        {
          success: true,

          token,

          user,
        },

        {
          status: 201,
        }
      )

    //////////////////////////////////////////////////////
    // COOKIE
    //////////////////////////////////////////////////////

    response.cookies.set(

      "token",

      token,

      {

        httpOnly:
          true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite:
          "lax",

        path:
          "/",

        maxAge:
          60 *
          60 *
          24 *
          7,
      }
    )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return response

  } catch (error) {

    console.log(
      "REGISTER ERROR:",
      error
    )

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