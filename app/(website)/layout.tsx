import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import SmoothScroll from "@/components/providers/smooth-scroll"
export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />

      {children}

      <Footer />
    </>
  )
}