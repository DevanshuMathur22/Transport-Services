import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components"

interface Props {
  trackingId: string
  customerName: string
}

export default function BookingEmail({
  trackingId,
  customerName,
}: Props) {

  return (
    <Html>

      <Head />

      <Preview>
        Booking Confirmed
      </Preview>

      <Body
        style={{
          backgroundColor:
            "#f8fafc",

          fontFamily:
            "Arial",
        }}
      >

        <Container
          style={{
            backgroundColor:
              "#ffffff",

            padding:
              "30px",

            borderRadius:
              "20px",
          }}
        >

          <Heading>
            Booking Confirmed 🚚
          </Heading>

          <Text>
            Hello {customerName},
          </Text>

          <Text>
            Your shipment booking has been created successfully.
          </Text>

          <Section
            style={{
              background:
                "#f1f5f9",

              padding:
                "20px",

              borderRadius:
                "12px",
            }}
          >

            <Text>
              Tracking ID:
            </Text>

            <Heading>
              {trackingId}
            </Heading>

          </Section>

          <Text>
            Thank you for choosing us.
          </Text>

        </Container>
      </Body>
    </Html>
  )
}