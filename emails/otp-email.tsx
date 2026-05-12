import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components"

interface Props {
  otp: string
}

export default function OtpEmail({
  otp,
}: Props) {

  return (
    <Html>

      <Head />

      <Preview>
        Your OTP Code
      </Preview>

      <Body
        style={{
          background:
            "#f8fafc",

          fontFamily:
            "Arial",
        }}
      >

        <Container
          style={{
            background:
              "#ffffff",

            padding:
              "30px",

            borderRadius:
              "20px",
          }}
        >

          <Heading>
            Password Reset OTP
          </Heading>

          <Text>
            Use the OTP below to reset your password.
          </Text>

          <div
            style={{
              background:
                "#16a34a",

              color:
                "#ffffff",

              padding:
                "20px",

              borderRadius:
                "12px",

              textAlign:
                "center",

              fontSize:
                "32px",

              fontWeight:
                "bold",

              letterSpacing:
                "8px",
            }}
          >

            {otp}

          </div>

          <Text
            style={{
              marginTop:
                "20px",
            }}
          >

            OTP expires in 10 minutes.
          </Text>

        </Container>
      </Body>
    </Html>
  )
}