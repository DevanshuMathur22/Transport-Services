// app/api/admin/drivers/review/route.ts

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
// GET REVIEW DRIVERS
//////////////////////////////////////////////////////

export async function GET(
  req: NextRequest
) {

  try {

    //////////////////////////////////////////////////////
    // JWT SECRET
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
    // ADMIN
    //////////////////////////////////////////////////////

    const admin =
      await prisma.user.findUnique({

        where: {
          id:
            decoded.id,
        },

        select: {

          id: true,

          role: true,

          isBlocked: true,
        },
      })

    //////////////////////////////////////////////////////
    // ACCESS CHECK
    //////////////////////////////////////////////////////

    if (

      !admin ||

      admin.role !==
      "admin"

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
    // BLOCKED ADMIN
    //////////////////////////////////////////////////////

    if (
      admin.isBlocked
    ) {

      return NextResponse.json(
        {
          error:
            "Admin blocked",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // REVIEW DRIVERS
    //////////////////////////////////////////////////////

    const drivers =
      await prisma.user.findMany({

        where: {

          role:
            "driver",

          verificationStatus: {

            in: [

              "manual_review",

              "pending",

              "suspicious",
            ],
          },
        },

        orderBy: {

          updatedAt:
            "desc",
        },

        select: {

          id: true,

          name: true,

          email: true,

          phone: true,

          city: true,

          vehicleType: true,

          vehicleNumber: true,

          aadhaarNumber: true,

          licenseNumber: true,

          aadhaarUrl: true,

          licenseUrl: true,

          rcUrl: true,

          insuranceUrl: true,

          verificationStatus: true,

          isDriverApproved: true,

          createdAt: true,
        },
      })

    //////////////////////////////////////////////////////
    // FORMAT DRIVERS
    //////////////////////////////////////////////////////

    const formattedDrivers =
      await Promise.all(

        drivers.map(
         async (
  driver: any
) => {

            //////////////////////////////////////////////////////
            // DUPLICATE AADHAAR
            //////////////////////////////////////////////////////

            const aadhaarDuplicates =
              driver.aadhaarNumber

                ? await prisma.user.count({

                    where: {

                      aadhaarNumber:
                        driver.aadhaarNumber,

                      NOT: {
                        id:
                          driver.id,
                      },
                    },
                  })

                : 0

            //////////////////////////////////////////////////////
            // DUPLICATE LICENSE
            //////////////////////////////////////////////////////

            const licenseDuplicates =
              driver.licenseNumber

                ? await prisma.user.count({

                    where: {

                      licenseNumber:
                        driver.licenseNumber,

                      NOT: {
                        id:
                          driver.id,
                      },
                    },
                  })

                : 0

            //////////////////////////////////////////////////////
            // DUPLICATE VEHICLE
            //////////////////////////////////////////////////////

            const vehicleDuplicates =
              driver.vehicleNumber

                ? await prisma.user.count({

                    where: {

                      vehicleNumber:
                        driver.vehicleNumber,

                      NOT: {
                        id:
                          driver.id,
                      },
                    },
                  })

                : 0

            //////////////////////////////////////////////////////
            // RESPONSE ITEM
            //////////////////////////////////////////////////////

            return {

              ...driver,

              duplicateChecks: {

                aadhaar:
                  aadhaarDuplicates > 0,

                license:
                  licenseDuplicates > 0,

                vehicle:
                  vehicleDuplicates > 0,
              },
            }
          }
        )
      )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      total:
        formattedDrivers.length,

      drivers:
        formattedDrivers,
    })

  } catch (error) {

    console.log(
      "REVIEW DRIVERS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch review drivers",
      },
      {
        status: 500,
      }
    )
  }
}