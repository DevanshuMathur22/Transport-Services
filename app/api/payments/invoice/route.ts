// app/api/payments/invoice/[id]/route.ts

import {
  NextRequest,
  NextResponse,
} from "next/server"

import jwt from "jsonwebtoken"

import { prisma }
from "@/lib/prisma"

interface Props {
  params: Promise<{
    id: string
  }>
}

//////////////////////////////////////////////////////
// GET INVOICE
//////////////////////////////////////////////////////

export async function GET(
  req: NextRequest,
  { params }: Props
) {

  try {

    //////////////////////////////////////////////////////
    // TOKEN
    //////////////////////////////////////////////////////

    const token =
      req.cookies.get("token")
        ?.value

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
        process.env.JWT_SECRET!
      ) as {
        id: string
      }

    //////////////////////////////////////////////////////
    // PARAMS
    //////////////////////////////////////////////////////

    const resolved =
      await params

    //////////////////////////////////////////////////////
    // PAYMENT
    //////////////////////////////////////////////////////

    const payment =
      await prisma.payment.findUnique({

        where: {
          id:
            resolved.id,
        },

        include: {

          booking: true,

          user: {

            select: {

              id: true,

              name: true,

              email: true,

              phone: true,
            },
          },
        },
      })

    //////////////////////////////////////////////////////
    // NOT FOUND
    //////////////////////////////////////////////////////

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

    //////////////////////////////////////////////////////
    // ACCESS CHECK
    //////////////////////////////////////////////////////

    if (
      payment.userId !==
      decoded.id
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
    // RESPONSE
    //////////////////////////////////////////////////////

    return NextResponse.json({

      success: true,

      invoiceId:
        `INV${Date.now()}`,

      issuedAt:
        new Date(),

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