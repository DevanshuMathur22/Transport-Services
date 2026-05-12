// emails/login-email.tsx

interface Props {
  name: string
}

export default function LoginEmail({
  name,
}: Props) {

  return (

    <div
      style={{
        fontFamily:
          "Arial, sans-serif",
        background:
          "#f8fafc",
        padding:
          "40px 20px",
      }}
    >

      <div
        style={{
          maxWidth:
            "600px",
          margin:
            "0 auto",
          background:
            "#ffffff",
          borderRadius:
            "16px",
          padding:
            "40px",
          border:
            "1px solid #e2e8f0",
        }}
      >

        //////////////////////////////////////////////////////
        // LOGO
        //////////////////////////////////////////////////////

        <h1
          style={{
            fontSize:
              "28px",
            fontWeight:
              "bold",
            color:
              "#16a34a",
            marginBottom:
              "10px",
          }}
        >
          Porter Clone
        </h1>

        //////////////////////////////////////////////////////
        // TITLE
        //////////////////////////////////////////////////////

        <h2
          style={{
            fontSize:
              "22px",
            color:
              "#0f172a",
            marginBottom:
              "20px",
          }}
        >
          Login Successful
        </h2>

        //////////////////////////////////////////////////////
        // MESSAGE
        //////////////////////////////////////////////////////

        <p
          style={{
            fontSize:
              "16px",
            lineHeight:
              "28px",
            color:
              "#475569",
          }}
        >
          Hi {name},
        </p>

        <p
          style={{
            fontSize:
              "16px",
            lineHeight:
              "28px",
            color:
              "#475569",
            marginTop:
              "10px",
          }}
        >
          Your account was
          logged in
          successfully.
        </p>

        //////////////////////////////////////////////////////
        // ALERT BOX
        //////////////////////////////////////////////////////

        <div
          style={{
            marginTop:
              "25px",
            background:
              "#dcfce7",
            padding:
              "18px",
            borderRadius:
              "12px",
            color:
              "#166534",
            fontSize:
              "15px",
            lineHeight:
              "24px",
          }}
        >
          If this login was
          not made by you,
          please reset your
          password
          immediately.
        </div>

        //////////////////////////////////////////////////////
        // FOOTER
        //////////////////////////////////////////////////////

        <p
          style={{
            marginTop:
              "35px",
            fontSize:
              "14px",
            color:
              "#94a3b8",
          }}
        >
          © 2026 Porter Clone.
          All rights reserved.
        </p>

      </div>
    </div>
  )
}