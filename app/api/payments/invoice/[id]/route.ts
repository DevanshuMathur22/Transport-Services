import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

interface Props {
  params: Promise<{
    id: string
  }>
}

//////////////////////////////////////////////////////
// GET INVOICE
//////////////////////////////////////////////////////

export async function GET(
  req: Request,
  { params }: Props
) {
  try {

    const resolved =
      await params

    const payment =
      await prisma.payment.findUnique({

        where: {
          id:
            resolved.id,
        },

        include: {
          booking: true,
        },
      })

    if (!payment) {

      return NextResponse.json(
        {
          error:
            "Invoice not found",
        },
        {
          status: 404,
        }
      )
    }

    return NextResponse.json({

      invoiceId:
        `INV${Date.now()}`,

      payment,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to fetch invoice",
      },
      {
        status: 500,
      }
    )
  }
}