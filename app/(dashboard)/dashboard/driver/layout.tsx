"use client"

import Link from "next/link"

import axios from "axios"

import {
  usePathname,
  useRouter,
} from "next/navigation"
import {
  IndianRupee,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  FileText,
  Truck,
  User,
} from "lucide-react"

const links = [

  {
    label:
      "Dashboard",

    href:
      "/dashboard/driver",

    icon:
      LayoutDashboard,
  },

  {
    label:
      "Assigned Orders",

    href:
      "/dashboard/driver/orders",

    icon:
      Package,
  },

  {
    label:
      "Active Deliveries",

    href:
      "/dashboard/driver/deliveries",

    icon:
      Truck,
  },

  {
    label:
      "Earnings",

    href:
      "/dashboard/driver/earnings",

    icon:
      IndianRupee,
  },

  {
    label:
      "Documents",

    href:
      "/dashboard/driver/documents",

    icon:
      FileText,
  },

  {
    label:
      "Live Location",

    href:
      "/dashboard/driver/location",

    icon:
      MapPin,
  },

  {
    label:
      "Profile",

    href:
      "/dashboard/driver/profile",

    icon:
      User,
  },
]

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname =
    usePathname()

  const router =
    useRouter()

  //////////////////////////////////////////////////////
  // LOGOUT
  //////////////////////////////////////////////////////

  const handleLogout =
    async () => {

      try {

        await axios.post(
          "/api/auth/logout"
        )

        router.push(
          "/login"
        )

      } catch (error) {

        console.log(error)
      }
    }

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* SIDEBAR */}

      <aside className="hidden w-72 flex-col border-r bg-white lg:flex">

        {/* LOGO */}

        <div className="border-b p-6">

          <h1 className="text-3xl font-black">
            Porter Driver
          </h1>
        </div>

        {/* LINKS */}

        <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">

          {links.map(
            (item) => {

              const Icon =
                item.icon

              const active =
                pathname ===
                item.href

              return (
                <Link
                  key={item.href}
                  href={
                    item.href
                  }
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                    active
                      ? "bg-black text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >

                  <Icon
                    size={20}
                  />

                  <span className="font-medium">

                    {
                      item.label
                    }

                  </span>
                </Link>
              )
            }
          )}
        </div>

        {/* LOGOUT */}

        <div className="border-t p-4">

          <button
            onClick={
              handleLogout
            }
            className="flex w-full items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 transition-all hover:bg-red-100"
          >

            <LogOut
              size={20}
            />

            <span className="font-medium">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <div className="flex flex-1 flex-col">

        {/* TOPBAR */}

        <div className="flex h-20 items-center justify-between border-b bg-white px-6">

          <div>

            <h2 className="text-2xl font-bold">
              Driver Panel
            </h2>

            <p className="text-sm text-slate-500">
              Welcome back driver 🚚
            </p>
          </div>

          {/* USER */}

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white">

            D
          </div>
        </div>

        {/* PAGE */}

        <main className="flex-1 p-6">

          {children}

        </main>
      </div>
    </div>
  )
}