// app/api/driver/earnings/route.ts

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
// GET DRIVER EARNINGS
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
    // DELIVERED BOOKINGS
    //////////////////////////////////////////////////////

    const deliveries =
      await prisma.booking.findMany({

        where: {

          driverId:
            driver.id,

          status:
            "delivered",
        },

        include: {

          user: {

            select: {

              id: true,

              name: true,

              phone: true,

              email: true,
            },
          },

          payment: {

            select: {

              id: true,

              amount: true,

              status: true,

              paymentMethod: true,

              transactionId: true,
            },
          },
        },

        orderBy: [

          {
            deliveredAt:
              "desc",
          },
        ],
      })

    //////////////////////////////////////////////////////
    // TOTAL EARNINGS
    //////////////////////////////////////////////////////

    const totalEarnings =
      deliveries.reduce(

        (
          total: number,
          item: any
        ) =>

          total +

          (
            item.driverEarning || 0
          ),

        0
      )

    //////////////////////////////////////////////////////
    // TODAY START
    //////////////////////////////////////////////////////

    const today =
      new Date()

    today.setHours(

      0,

      0,

      0,

      0
    )

    //////////////////////////////////////////////////////
    // TODAY DELIVERIES
    //////////////////////////////////////////////////////

    const todayDeliveries =
      deliveries.filter(

        (item: any) =>

          item.deliveredAt &&

          new Date(
            item.deliveredAt
          ) >= today
      )

    //////////////////////////////////////////////////////
    // TODAY EARNINGS
    //////////////////////////////////////////////////////

    const todayEarnings =
      todayDeliveries.reduce(

        (
          total: number,
          item: any
        ) =>

          total +

          (
            item.driverEarning || 0
          ),

        0
      )

    //////////////////////////////////////////////////////
    // COMPLETED DELIVERIES
    //////////////////////////////////////////////////////

    const completedDeliveries =
      deliveries.length

    //////////////////////////////////////////////////////
    // AVERAGE EARNINGS
    //////////////////////////////////////////////////////

    const averageEarnings =
      completedDeliveries > 0

        ? Math.round(

            totalEarnings /

            completedDeliveries
          )

        : 0

    //////////////////////////////////////////////////////
    // THIS WEEK
    //////////////////////////////////////////////////////

    const sevenDaysAgo =
      new Date()

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 7
    )

    const weeklyEarnings =
      deliveries
        .filter(
          (item: any) =>

            item.deliveredAt &&

            new Date(
              item.deliveredAt
            ) >= sevenDaysAgo
        )
        .reduce(
          (
            total: number,
            item: any
          ) =>

            total +

            (
              item.driverEarning || 0
            ),

          0
        )

    //////////////////////////////////////////////////////
    // THIS MONTH
    //////////////////////////////////////////////////////

    const currentMonth =
      new Date().getMonth()

    const currentYear =
      new Date().getFullYear()

    const monthlyEarnings =
      deliveries
        .filter(
          (item: any) => {

            if (
              !item.deliveredAt
            ) {
              return false
            }

            const date =
              new Date(
                item.deliveredAt
              )

            return (

              date.getMonth() ===
              currentMonth &&

              date.getFullYear() ===
              currentYear
            )
          }
        )
        .reduce(
          (
            total: number,
            item: any
          ) =>

            total +

            (
              item.driverEarning || 0
            ),

          0
        )

    //////////////////////////////////////////////////////
    // FORMATTED DELIVERIES
    //////////////////////////////////////////////////////

    const formattedDeliveries =
      deliveries.map(
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

          distance:
            item.distance,

          weight:
            item.weight,

          price:
            item.price,

          driverEarning:
            item.driverEarning || 0,

          status:
            item.status,

          deliveredAt:
            item.deliveredAt,

          createdAt:
            item.createdAt,

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
        })
      )

    //////////////////////////////////////////////////////
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      stats: {

        totalEarnings,

        todayEarnings,

        weeklyEarnings,

        monthlyEarnings,

        completedDeliveries,

        averageEarnings,
      },

      deliveries:
        formattedDeliveries,
    })

  } catch (error) {

    console.log(
      "EARNINGS ERROR:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch earnings",
      },
      {
        status: 500,
      }
    )
  }
}