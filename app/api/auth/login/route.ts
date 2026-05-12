// app/api/auth/login/route.ts

import { prisma }
from "@/lib/prisma"

import {
  NextRequest,
  NextResponse,
} from "next/server"

import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"

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
// LOGIN
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

      email,

      password,

    } = body

    //////////////////////////////////////////////////////
    // VALIDATION
    //////////////////////////////////////////////////////

    if (
      !email ||
      !password
    ) {

      return NextResponse.json(
        {
          error:
            "Email and password are required",
        },
        {
          status: 400,
        }
      )
    }

    //////////////////////////////////////////////////////
    // FIND USER
    //////////////////////////////////////////////////////

    const user =
      await prisma.user.findUnique({

        where: {
          email,
        },
      })

    //////////////////////////////////////////////////////
    // USER NOT FOUND
    //////////////////////////////////////////////////////

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
    // BLOCKED USER
    //////////////////////////////////////////////////////

    if (
      user.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Your account has been blocked",
        },
        {
          status: 403,
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

    //////////////////////////////////////////////////////
    // INVALID PASSWORD
    //////////////////////////////////////////////////////

    if (
      !isPasswordValid
    ) {

      //////////////////////////////////////////////////////
      // LOGIN ATTEMPTS
      //////////////////////////////////////////////////////

      await prisma.user.update({

        where: {
          id:
            user.id,
        },

        data: {

          loginAttempts: {
            increment: 1,
          },
        },
      })

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
    // RESET LOGIN ATTEMPTS
    //////////////////////////////////////////////////////

    await prisma.user.update({

      where: {
        id:
          user.id,
      },

      data: {

        loginAttempts:
          0,

        lastLoginAt:
          new Date(),
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
          "Login Successful",

        message:
          "Your account was logged in successfully.",

        type:
          "auth",
      },
    })

    //////////////////////////////////////////////////////
    // LOGIN EMAIL
    //////////////////////////////////////////////////////

    await sendEmail({

      to:
        user.email,

      subject:
        "Login Successful",

      react:
        LoginEmail({

          name:
            user.name,
        }),
    })

    //////////////////////////////////////////////////////
    // REMOVE PASSWORD
    //////////////////////////////////////////////////////

    const {
      password: _,
      ...safeUser
    } = user

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    const response =
      NextResponse.json({

        success: true,

        token,

        user:
          safeUser,
      })

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
      "LOGIN ERROR:",
      error
    )

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