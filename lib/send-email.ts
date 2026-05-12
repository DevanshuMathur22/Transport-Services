import { resend } from "./resend"

interface Props {
  to: string
  subject: string
  react: React.ReactNode
}

export async function sendEmail({
  to,
  subject,
  react,
}: Props) {

  try {

    await resend.emails.send({

      from:
        "Porter Clone <onboarding@resend.dev>",

      to,

      subject,

      react,
    })

  } catch (error) {

    console.log(error)
  }
}