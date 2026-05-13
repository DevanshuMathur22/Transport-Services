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

          verificationStatus: true,

          aadhaarNumber: true,

          licenseNumber: true,

          vehicleNumber: true,

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

        aadhaarNumber:
          driver.aadhaarNumber,

        licenseNumber:
          driver.licenseNumber,

        vehicleNumber:
          driver.vehicleNumber,

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

      verificationStatus:
        driver.verificationStatus,
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
    // DUPLICATE AADHAAR
    //////////////////////////////////////////////////////

    const duplicateAadhaar =
      await prisma.user.findFirst({

        where: {

          aadhaarNumber:
            body.aadhaarNumber,

          NOT: {
            id:
              decoded.id,
          },
        },
      })

    //////////////////////////////////////////////////////
    // DUPLICATE LICENSE
    //////////////////////////////////////////////////////

    const duplicateLicense =
      await prisma.user.findFirst({

        where: {

          licenseNumber:
            body.licenseNumber,

          NOT: {
            id:
              decoded.id,
          },
        },
      })

    //////////////////////////////////////////////////////
    // DUPLICATE VEHICLE
    //////////////////////////////////////////////////////

    const duplicateVehicle =
      await prisma.user.findFirst({

        where: {

          vehicleNumber:

            body.vehicleNumber
              ?.trim()
              ?.toUpperCase(),

          NOT: {
            id:
              decoded.id,
          },
        },
      })

    //////////////////////////////////////////////////////
    // SUSPICIOUS
    //////////////////////////////////////////////////////

    const suspicious =

      duplicateAadhaar ||

      duplicateLicense ||

      duplicateVehicle

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

          aadhaarNumber:
            body.aadhaarNumber,

          licenseNumber:
            body.licenseNumber,

          vehicleNumber:

            body.vehicleNumber
              ?.trim()
              ?.toUpperCase(),

          licenseUrl:
            body.licenseUrl || null,

          rcUrl:
            body.rcUrl || null,

          aadhaarUrl:
            body.aadhaarUrl || null,

          insuranceUrl:
            body.insuranceUrl || null,

          //////////////////////////////////////////////////////
          // AUTO VERIFY
          //////////////////////////////////////////////////////

          isDriverApproved:
            !suspicious,

          verificationStatus:

            suspicious

              ? "manual_review"

              : "auto_approved",
        },

        select: {

          id: true,

          aadhaarNumber: true,

          licenseNumber: true,

          vehicleNumber: true,

          licenseUrl: true,

          rcUrl: true,

          aadhaarUrl: true,

          insuranceUrl: true,

          isDriverApproved: true,

          verificationStatus: true,
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

          suspicious

            ? "Documents submitted for manual review."

            : "Driver verified successfully.",

        type:
          "driver",
      },
    })

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      suspicious:
        Boolean(
          suspicious
        ),

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