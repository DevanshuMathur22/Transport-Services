import { NextResponse } from "next/server"

//////////////////////////////////////////////////////
// DELETE ADDRESS
//////////////////////////////////////////////////////

export async function DELETE() {

  try {

    return NextResponse.json({
      success: true,
    })

  } catch (error) {

    console.log(error)

    return NextResponse.json(
      {
        error:
          "Failed to delete address",
      },
      {
        status: 500,
      }
    )
  }
}