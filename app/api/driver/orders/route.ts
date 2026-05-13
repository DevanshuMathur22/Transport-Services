// app/api/driver/orders/route.ts

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
// GET DRIVER ORDERS
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

          isOnline: true,
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
    // DRIVER APPROVAL
    //////////////////////////////////////////////////////

    if (
      !driver.isDriverApproved
    ) {

      return NextResponse.json(
        {
          error:
            "Driver not approved",
        },
        {
          status: 403,
        }
      )
    }

    //////////////////////////////////////////////////////
    // GET ORDERS
    //////////////////////////////////////////////////////

    const orders =
      await prisma.booking.findMany({

        where: {

          driverId:
            driver.id,
        },

        include: {

          //////////////////////////////////////////////////////
          // CUSTOMER
          //////////////////////////////////////////////////////

          user: {

            select: {

              id: true,

              name: true,

              email: true,

              phone: true,
            },
          },

          //////////////////////////////////////////////////////
          // PAYMENT
          //////////////////////////////////////////////////////

          payment: {

            select: {

              id: true,

              amount: true,

              status: true,

              paymentMethod: true,

              transactionId: true,
            },
          },

          //////////////////////////////////////////////////////
          // TRACKING
          //////////////////////////////////////////////////////

          tracking: {

            orderBy: [

              {
                createdAt:
                  "desc",
              },
            ],

            take: 1,
          },
        },

        orderBy: [

          {
            updatedAt:
              "desc",
          },
        ],
      })

    //////////////////////////////////////////////////////
    // STATS
    //////////////////////////////////////////////////////

    const totalOrders =
      orders.length

    const activeOrders =
      orders.filter(
        (item: any) =>

          item.status ===
          "accepted" ||

          item.status ===
          "picked_up" ||

          item.status ===
          "in_transit"
      ).length

    const completedOrders =
      orders.filter(
        (item: any) =>
          item.status ===
          "delivered"
      ).length

    //////////////////////////////////////////////////////
    // FORMATTED ORDERS
    //////////////////////////////////////////////////////

    const formattedOrders =
      orders.map(
        (item: any) => ({

          id:
            item.id,

          trackingId:
            item.trackingId,

          fromCity:
            item.fromCity,

          toCity:
            item.toCity,

          pickupAddress:
            item.pickupAddress,

          deliveryAddress:
            item.deliveryAddress,

          vehicleType:
            item.vehicleType,

          packageType:
            item.packageType,

          weight:
            item.weight,

          distance:
            item.distance,

          price:
            item.price,

          driverEarning:
            item.driverEarning,

          estimatedTime:
            item.estimatedTime,

          pickupDate:
            item.pickupDate,

          pickupTime:
            item.pickupTime,

          status:
            item.status,

          createdAt:
            item.createdAt,

          updatedAt:
            item.updatedAt,

          //////////////////////////////////////////////////////
          // CUSTOMER
          //////////////////////////////////////////////////////

          customer:
            item.user
              ? {

                  id:
                    item.user.id,

                  name:
                    item.user.name,

                  email:
                    item.user.email,

                  phone:
                    item.user.phone,
                }

              : null,

          //////////////////////////////////////////////////////
          // PAYMENT
          //////////////////////////////////////////////////////

          payment:
            item.payment
              ? {

                  id:
                    item.payment.id,

                  amount:
                    item.payment.amount,

                  status:
                    item.payment.status,

                  paymentMethod:
                    item.payment.paymentMethod,

                  transactionId:
                    item.payment.transactionId,
                }

              : null,

          //////////////////////////////////////////////////////
          // LATEST TRACKING
          //////////////////////////////////////////////////////

          latestTracking:
            item.tracking[0]
              ? {

                  id:
                    item.tracking[0].id,

                  message:
                    item.tracking[0].message,

                  location:
                    item.tracking[0].location,

                  createdAt:
                    item.tracking[0].createdAt,
                }

              : null,
        })
      )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      stats: {

        totalOrders,

        activeOrders,

        completedOrders,
      },

      orders:
        formattedOrders,
    })

  } catch (error) {

    console.log(
      "DRIVER ORDERS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch driver orders",
      },
      {
        status: 500,
      }
    )
  }
}