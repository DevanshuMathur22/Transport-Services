import { NextResponse } from "next/server"

//////////////////////////////////////////////////////
// GET NOTIFICATIONS
//////////////////////////////////////////////////////

export async function GET() {

  try {

    const notifications = [

      {
        id: 1,

        title:
          "Booking Created",

        message:
          "Your shipment booking has been created successfully.",

        time:
          "2 min ago",

        type:
          "booking",
      },

      {
        id: 2,

        title:
          "Payment Successful",

        message:
          "Your payment of ₹1,250 was completed successfully.",

        time:
          "10 min ago",

        type:
          "payment",
      },

      {
        id: 3,

        title:
          "Shipment Picked Up",

        message:
          "Driver has picked up your shipment from Jaipur.",

        time:
          "30 min ago",

        type:
          "tracking",
      },

      {
        id: 4,

        title:
          "Order Delivered",

        message:
          "Your shipment has been delivered successfully.",

        time:
          "1 hour ago",

        type:
          "delivery",
      },
    ]

    return NextResponse.json(
      notifications
    )

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch notifications",
      },
      {
        status: 500,
      }
    )
  }
}