// app/api/webhooks/razorpay/route.ts

import { NextResponse } from "next/server"

//////////////////////////////////////////////////////
// RAZORPAY WEBHOOK
//////////////////////////////////////////////////////

export async function POST(
  req: Request
) {
  try {

    const body =
      await req.json()

    console.log(
      "Webhook:",
      body
    )

    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Webhook failed",
      },
      {
        status: 500,
      }
    )
  }
}