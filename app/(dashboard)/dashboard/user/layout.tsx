"use client"

import Link from "next/link"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  usePathname,
  useRouter,
} from "next/navigation"

import {
  Bell,
  CreditCard,
  Headphones,
  LayoutDashboard,
  LogOut,
  MapPin,
  MapPinned,
  Menu,
  Package,
  Plus,
  Settings,
  User,
  X,
} from "lucide-react"

import {
  useState,
} from "react"

const links = [
  {
    label: "Dashboard",
    href: "/dashboard/user",
    icon: LayoutDashboard,
  },

  {
    label: "Create Booking",
    href:
      "/dashboard/user/create-booking",
    icon: Plus,
  },

  {
    label: "Bookings",
    href:
      "/dashboard/user/bookings",
    icon: Package,
  },

  {
    label: "Tracking",
    href:
      "/dashboard/user/tracking",
    icon: MapPinned,
  },

  {
    label: "Payments",
    href:
      "/dashboard/user/payments",
    icon: CreditCard,
  },

  {
    label: "Notifications",
    href:
      "/dashboard/user/notifications",
    icon: Bell,
  },

  {
    label: "Addresses",
    href:
      "/dashboard/user/addresses",
    icon: MapPin,
  },

  {
    label: "Support",
    href:
      "/dashboard/user/support",
    icon: Headphones,
  },

  {
    label: "Profile",
    href:
      "/dashboard/user/profile",
    icon: User,
  },

  {
    label: "Settings",
    href:
      "/dashboard/user/settings",
    icon: Settings,
  },
]

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname =
    usePathname()

  const router =
    useRouter()

  const [
    mobileSidebar,
    setMobileSidebar,
  ] = useState(false)

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

      {/* MOBILE OVERLAY */}

      {mobileSidebar && (

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          onClick={() =>
            setMobileSidebar(
              false
            )
          }
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* MOBILE SIDEBAR */}

      <motion.aside
        initial={{
          x: -320,
        }}
        animate={{
          x: mobileSidebar
            ? 0
            : -320,
        }}
        transition={{
          duration: 0.25,
        }}
        className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-2xl lg:hidden"
      >

        {/* TOP */}

        <div className="flex items-center justify-between border-b p-5">

          <div>

            <h1 className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-3xl font-black text-transparent">
              Porter
            </h1>

            <p className="mt-1 text-xs text-slate-500">
              User Dashboard
            </p>
          </div>

          <button
            onClick={() =>
              setMobileSidebar(
                false
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"
          >

            <X
              size={18}
            />

          </button>
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
                  onClick={() =>
                    setMobileSidebar(
                      false
                    )
                  }
                  className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                    active
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
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
            className="flex h-12 w-full items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 text-red-600 transition-all hover:bg-red-100"
          >

            <LogOut
              size={20}
            />

            <span className="font-medium">
              Logout
            </span>
          </button>
        </div>
      </motion.aside>

      {/* DESKTOP SIDEBAR */}

      <aside className="hidden w-72 flex-col border-r border-slate-200 bg-white lg:flex">

        {/* LOGO */}

        <div className="border-b p-6">

          <h1 className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-4xl font-black text-transparent">
            Porter
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            User Dashboard
          </p>
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
                <motion.div
                  whileHover={{
                    x: 4,
                  }}
                  key={item.href}
                >

                  <Link
                    href={
                      item.href
                    }
                    className={`group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all ${
                      active
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
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
                </motion.div>
              )
            }
          )}
        </div>

        {/* USER */}

        <div className="border-t p-4">

          <div className="mb-4 flex items-center gap-3 rounded-2xl bg-slate-50 p-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-semibold text-white shadow-md">

              D

            </div>

            <div>

              <h3 className="text-sm font-semibold text-slate-900">
                Devanshu
              </h3>

              <p className="text-xs text-slate-500">
                Customer Account
              </p>
            </div>
          </div>

          <button
            onClick={
              handleLogout
            }
            className="flex h-12 w-full items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 text-red-600 transition-all hover:bg-red-100"
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

      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">

        {/* TOPBAR */}

        <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">

          <div className="flex h-20 items-center justify-between px-4 sm:px-6">

            {/* LEFT */}

            <div className="flex items-center gap-3">

              {/* MOBILE MENU */}

              <button
                onClick={() =>
                  setMobileSidebar(
                    true
                  )
                }
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
              >

                <Menu
                  size={20}
                />

              </button>

              <div>

                <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  User Dashboard
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Welcome back 👋
                </p>
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex items-center gap-3">

              <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-100">

                <Bell
                  size={20}
                />

                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-green-500" />
              </button>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">

                <div className="hidden text-right sm:block">

                  <h3 className="text-sm font-semibold text-slate-900">
                    Devanshu
                  </h3>

                  <p className="text-xs text-slate-500">
                    Customer
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-sm font-semibold text-white shadow-md">

                  D

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE */}

        <main className="flex-1 p-4 sm:p-6">

          {children}

        </main>
      </div>
    </div>
  )
}