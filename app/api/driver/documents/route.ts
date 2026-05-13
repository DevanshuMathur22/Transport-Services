// app/api/driver/documents/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

//////////////////////////////////////////////////////
// FORCE DYNAMIC
//////////////////////////////////////////////////////

export const dynamic =
  "force-dynamic"

export const runtime =
  "nodejs"

//////////////////////////////////////////////////////
// GET DOCUMENTS
//////////////////////////////////////////////////////

export async function GET(
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
    // TOKEN
    //////////////////////////////////////////////////////

    const token =
      req.cookies.get("token")
        ?.value

    //////////////////////////////////////////////////////
    // NO TOKEN
    //////////////////////////////////////////////////////

    if (!token) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    //////////////////////////////////////////////////////
    // VERIFY TOKEN
    //////////////////////////////////////////////////////

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      ) as {
        id: string
      }

    //////////////////////////////////////////////////////
    // DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },

        select: {

          id: true,

          role: true,

          isBlocked: true,

          isDriverApproved: true,

          licenseUrl: true,

          rcUrl: true,

          aadhaarUrl: true,

          insuranceUrl: true,

          createdAt: true,
        },
      })

    //////////////////////////////////////////////////////
    // CHECK DRIVER
    //////////////////////////////////////////////////////

    if (

      !driver ||

      driver.role !==
      "driver"

    ) {

      return NextResponse.json(
        {
          error:
            "Access denied",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // BLOCKED DRIVER
    //////////////////////////////////////////////////////

    if (
      driver.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Driver account blocked",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      documents: {

        licenseUrl:
          driver.licenseUrl,

        rcUrl:
          driver.rcUrl,

        aadhaarUrl:
          driver.aadhaarUrl,

        insuranceUrl:
          driver.insuranceUrl,
      },

      isDriverApproved:
        driver.isDriverApproved,
    })

  } catch (error) {

    console.log(
      "GET DOCUMENTS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch documents",
      },
      {
        status: 500,
      }
    )
  }
}

//////////////////////////////////////////////////////
// UPDATE DOCUMENTS
//////////////////////////////////////////////////////

export async function PUT(
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
    // TOKEN
    //////////////////////////////////////////////////////

    const token =
      req.cookies.get("token")
        ?.value

    //////////////////////////////////////////////////////
    // NO TOKEN
    //////////////////////////////////////////////////////

    if (!token) {

      return NextResponse.json(
        {
          error:
            "Unauthorized",
        },
        {
          status: 401,
        }
      )
    }

    //////////////////////////////////////////////////////
    // VERIFY
    //////////////////////////////////////////////////////

    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET

      ) as {
        id: string
      }

    //////////////////////////////////////////////////////
    // BODY
    //////////////////////////////////////////////////////

    const body =
      await req.json()

    //////////////////////////////////////////////////////
    // DRIVER
    //////////////////////////////////////////////////////

    const driver =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },

        select: {

          id: true,

          role: true,

          isBlocked: true,

          name: true,
        },
      })

    //////////////////////////////////////////////////////
    // CHECK DRIVER
    //////////////////////////////////////////////////////

    if (

      !driver ||

      driver.role !==
      "driver"

    ) {

      return NextResponse.json(
        {
          error:
            "Access denied",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // BLOCKED DRIVER
    //////////////////////////////////////////////////////

    if (
      driver.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Driver account blocked",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // UPDATE DRIVER
    //////////////////////////////////////////////////////

    const updatedDriver =
      await prisma.user.update({

        where: {
          id:
            driver.id,
        },

        data: {

          licenseUrl:
            body.licenseUrl || null,

          rcUrl:
            body.rcUrl || null,

          aadhaarUrl:
            body.aadhaarUrl || null,

          insuranceUrl:
            body.insuranceUrl || null,

          //////////////////////////////////////////////////////
          // AUTO APPROVE
          //////////////////////////////////////////////////////

          isDriverApproved:
            true,
        },

        select: {

          id: true,

          licenseUrl: true,

          rcUrl: true,

          aadhaarUrl: true,

          insuranceUrl: true,

          isDriverApproved: true,
        },
      })

    //////////////////////////////////////////////////////
    // DRIVER NOTIFICATION
    //////////////////////////////////////////////////////

    await prisma.notification.create({

      data: {

        userId:
          driver.id,

        title:
          "Documents Updated",

        message:
          "Your driver documents were updated successfully.",

        type:
          "driver",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      driver:
        updatedDriver,
    })

  } catch (error) {

    console.log(
      "UPDATE DOCUMENTS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to update documents",
      },
      {
        status: 500,
      }
    )
  }
}