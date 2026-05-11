import jwt from "jsonwebtoken"

const JWT_SECRET =
  process.env.JWT_SECRET!

export function generateToken(id: string) {

  return jwt.sign(
    {
      id,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )
}

export function verifyToken(token: string) {

  try {

    return jwt.verify(
      token,
      JWT_SECRET
    ) as {
      id: string
    }

  } catch (error) {

    return null
  }
}