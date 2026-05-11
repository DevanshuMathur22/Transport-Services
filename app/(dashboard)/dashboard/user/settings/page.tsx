"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  Bell,
  Lock,
  LogOut,
  Moon,
  Save,
  Shield,
  User,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function SettingsPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [
    loading,
    setLoading,
  ] = useState(false)

  const [
    pageLoading,
    setPageLoading,
  ] = useState(true)

  const [
    settings,
    setSettings,
  ] = useState({

    notifications: true,

    darkMode: false,

    twoFactor: false,
  })

  //////////////////////////////////////////////////////
  // FETCH SETTINGS
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchSettings()

  }, [])

  const fetchSettings =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/user/settings"
          )

        setSettings(
          res.data
        )

      } catch (error) {

        console.log(error)

      } finally {

        setPageLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////////

  const handleSave =
    async () => {

      try {

        setLoading(true)

        await axios.put(
          "/api/user/settings",
          settings
        )

        alert(
          "Settings updated successfully"
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // LOGOUT
  //////////////////////////////////////////////////////

  const handleLogout =
    async () => {

      try {

        await axios.post(
          "/api/auth/logout"
        )

        window.location.href =
          "/login"

      } catch (error) {

        console.log(error)
      }
    }

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (pageLoading) {

    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="flex items-center gap-3">

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Loading settings...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">

      {/* HERO */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 sm:p-6"
      >

        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-green-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

              <Shield
                size={28}
                className="text-green-400"
              />
            </div>

            <div>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Settings
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                Manage account preferences and security settings.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur sm:text-sm">

            Privacy & Security

          </div>
        </div>
      </motion.div>

      {/* SETTINGS GRID */}

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">

        {/* LEFT */}

        <div className="space-y-5">

          {/* ACCOUNT */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm"
          >

            {/* TOP */}

            <div className="border-b border-slate-100 p-5 sm:p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg">

                  <User
                    size={26}
                  />

                </div>

                <div>

                  <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    Account Preferences
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Customize notifications and appearance.
                  </p>
                </div>
              </div>
            </div>

            {/* ITEMS */}

            <div className="space-y-4 p-5 sm:p-6">

              {/* NOTIFICATIONS */}

              <motion.div
                whileHover={{
                  y: -2,
                }}
                className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-slate-50 p-4 transition-all hover:border-green-200 hover:bg-white"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">

                    <Bell
                      size={22}
                      className="text-green-600"
                    />

                  </div>

                  <div>

                    <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                      Notifications
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      Receive booking and shipment updates.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      notifications:
                        !settings.notifications,
                    })
                  }
                  className={`relative h-7 w-12 rounded-full transition-all ${
                    settings.notifications
                      ? "bg-green-600"
                      : "bg-slate-300"
                  }`}
                >

                  <motion.div
                    layout
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm ${
                      settings.notifications
                        ? "left-6"
                        : "left-1"
                    }`}
                  />

                </button>
              </motion.div>

              {/* DARK MODE */}

              <motion.div
                whileHover={{
                  y: -2,
                }}
                className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-slate-50 p-4 transition-all hover:border-purple-200 hover:bg-white"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">

                    <Moon
                      size={22}
                      className="text-purple-600"
                    />

                  </div>

                  <div>

                    <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                      Dark Mode
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      Enable dark appearance for dashboard.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      darkMode:
                        !settings.darkMode,
                    })
                  }
                  className={`relative h-7 w-12 rounded-full transition-all ${
                    settings.darkMode
                      ? "bg-green-600"
                      : "bg-slate-300"
                  }`}
                >

                  <motion.div
                    layout
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm ${
                      settings.darkMode
                        ? "left-6"
                        : "left-1"
                    }`}
                  />

                </button>
              </motion.div>

              {/* TWO FACTOR */}

              <motion.div
                whileHover={{
                  y: -2,
                }}
                className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-slate-50 p-4 transition-all hover:border-orange-200 hover:bg-white"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">

                    <Lock
                      size={22}
                      className="text-orange-600"
                    />

                  </div>

                  <div>

                    <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                      Two Factor Authentication
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                      Add extra security protection.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setSettings({
                      ...settings,
                      twoFactor:
                        !settings.twoFactor,
                    })
                  }
                  className={`relative h-7 w-12 rounded-full transition-all ${
                    settings.twoFactor
                      ? "bg-green-600"
                      : "bg-slate-300"
                  }`}
                >

                  <motion.div
                    layout
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm ${
                      settings.twoFactor
                        ? "left-6"
                        : "left-1"
                    }`}
                  />

                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT */}

        <div className="space-y-5">

          {/* SECURITY CARD */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.05,
            }}
            className="overflow-hidden rounded-[30px] bg-gradient-to-br from-green-500 to-emerald-600 p-5 text-white shadow-lg sm:p-6"
          >

            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

              <Shield
                size={28}
              />

            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Secure Account
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-green-100">
              Your account security and privacy settings are protected.
            </p>

            <div className="mt-6 space-y-3">

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

                <p className="text-xs text-green-100">
                  Notifications
                </p>

                <h3 className="mt-1 text-sm font-semibold">

                  {
                    settings.notifications
                      ? "Enabled"
                      : "Disabled"
                  }

                </h3>
              </div>

              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

                <p className="text-xs text-green-100">
                  2FA Protection
                </p>

                <h3 className="mt-1 text-sm font-semibold">

                  {
                    settings.twoFactor
                      ? "Active"
                      : "Inactive"
                  }

                </h3>
              </div>
            </div>
          </motion.div>

          {/* ACTIONS */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="overflow-hidden rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >

            <h2 className="text-lg font-semibold text-slate-900">
              Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Save preferences or logout securely.
            </p>

            <div className="mt-6 space-y-3">

              <motion.button
                whileTap={{
                  scale: 0.96,
                }}
                whileHover={{
                  scale: 1.02,
                }}
                onClick={
                  handleSave
                }
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-sm font-medium text-white shadow-lg transition-all hover:shadow-green-200 disabled:cursor-not-allowed disabled:opacity-60"
              >

                <Save
                  size={18}
                />

                {
                  loading
                    ? "Saving..."
                    : "Save Settings"
                }

              </motion.button>

              <motion.button
                whileTap={{
                  scale: 0.96,
                }}
                whileHover={{
                  scale: 1.02,
                }}
                onClick={
                  handleLogout
                }
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 text-sm font-medium text-red-600 transition-all hover:bg-red-100"
              >

                <LogOut
                  size={18}
                />

                Logout

              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}