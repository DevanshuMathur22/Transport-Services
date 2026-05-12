// app/dashboard/admin/settings/page.tsx

"use client"

import axios from "axios"

import {
  useEffect,
  useState,
} from "react"

import { motion } from "framer-motion"

import {
  Bell,
  Globe,
  Lock,
  Save,
  Settings,
  ShieldCheck,
  User,
} from "lucide-react"

export default function AdminSettingsPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [settings, setSettings] =
    useState({

      siteName:
        "",

      supportEmail:
        "",

      adminName:
        "",

      adminEmail:
        "",

      maintenanceMode:
        false,

      notifications:
        true,

      allowRegistrations:
        true,

      requireDriverApproval:
        true,
    })

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchSettings()

  }, [])

  const fetchSettings =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/admin/settings"
          )

        setSettings(
          res.data
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////////

  const saveSettings =
    async () => {

      try {

        setSaving(true)

        await axios.put(
          "/api/admin/settings",
          settings
        )

        alert(
          "Settings updated"
        )

      } catch (error) {

        console.log(error)

      } finally {

        setSaving(false)
      }
    }

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {

    return (
      <div className="flex h-[70vh] items-center justify-center">

        <div className="h-6 w-6 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

      </div>
    )
  }

  return (
    <div className="space-y-5 p-5">

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
        className="rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white"
      >

        <div className="flex items-center justify-between gap-5">

          <div>

            <h1 className="text-3xl font-bold tracking-tight">
              Admin Settings
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Manage platform configuration and security settings.
            </p>
          </div>

          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">

            <Settings
              size={30}
            />
          </div>
        </div>
      </motion.div>

      {/* GRID */}

      <div className="grid gap-5 xl:grid-cols-2">

        {/* GENERAL */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Globe
              size={22}
              className="text-blue-600"
            />

            <h2 className="text-xl font-bold text-slate-900">
              General Settings
            </h2>
          </div>

          <div className="mt-6 space-y-5">

            {/* SITE NAME */}

            <div>

              <label className="text-sm font-medium text-slate-700">

                Site Name

              </label>

              <input
                type="text"
                value={
                  settings.siteName
                }
                onChange={(e) =>
                  setSettings({

                    ...settings,

                    siteName:
                      e.target.value,
                  })
                }
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-green-500"
              />
            </div>

            {/* SUPPORT EMAIL */}

            <div>

              <label className="text-sm font-medium text-slate-700">

                Support Email

              </label>

              <input
                type="email"
                value={
                  settings.supportEmail
                }
                onChange={(e) =>
                  setSettings({

                    ...settings,

                    supportEmail:
                      e.target.value,
                  })
                }
                className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-green-500"
              />
            </div>
          </div>
        </div>

        {/* SECURITY */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <ShieldCheck
              size={22}
              className="text-green-600"
            />

            <h2 className="text-xl font-bold text-slate-900">
              Security
            </h2>
          </div>

          <div className="mt-6 space-y-5">

            {[
              {
                label:
                  "Require Driver Approval",

                value:
                  settings.requireDriverApproval,

                key:
                  "requireDriverApproval",
              },

              {
                label:
                  "Allow Registrations",

                value:
                  settings.allowRegistrations,

                key:
                  "allowRegistrations",
              },
            ].map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                >

                  <div>

                    <h3 className="font-medium text-slate-900">

                      {
                        item.label
                      }

                    </h3>
                  </div>

                  <button
                    onClick={() =>
                      setSettings({

                        ...settings,

                        [item.key]:
                          !item.value,
                      })
                    }
                    className={`h-7 w-14 rounded-full transition-all ${
                      item.value
                        ? "bg-green-500"
                        : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`h-6 w-6 rounded-full bg-white transition-all ${
                        item.value
                          ? "translate-x-7"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* PLATFORM */}

      <div className="grid gap-5 xl:grid-cols-2">

        {/* NOTIFICATIONS */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Bell
              size={22}
              className="text-orange-600"
            />

            <h2 className="text-xl font-bold text-slate-900">
              Notifications
            </h2>
          </div>

          <div className="mt-6">

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">

              <div>

                <h3 className="font-medium text-slate-900">
                  Enable Notifications
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Send alerts and updates
                </p>
              </div>

              <button
                onClick={() =>
                  setSettings({

                    ...settings,

                    notifications:
                      !settings.notifications,
                  })
                }
                className={`h-7 w-14 rounded-full transition-all ${
                  settings.notifications
                    ? "bg-green-500"
                    : "bg-slate-300"
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full bg-white transition-all ${
                    settings.notifications
                      ? "translate-x-7"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* MAINTENANCE */}

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center gap-3">

            <Lock
              size={22}
              className="text-red-600"
            />

            <h2 className="text-xl font-bold text-slate-900">
              Maintenance
            </h2>
          </div>

          <div className="mt-6">

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">

              <div>

                <h3 className="font-medium text-slate-900">
                  Maintenance Mode
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Temporarily disable platform
                </p>
              </div>

              <button
                onClick={() =>
                  setSettings({

                    ...settings,

                    maintenanceMode:
                      !settings.maintenanceMode,
                  })
                }
                className={`h-7 w-14 rounded-full transition-all ${
                  settings.maintenanceMode
                    ? "bg-red-500"
                    : "bg-slate-300"
                }`}
              >
                <div
                  className={`h-6 w-6 rounded-full bg-white transition-all ${
                    settings.maintenanceMode
                      ? "translate-x-7"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ADMIN */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <User
            size={22}
            className="text-purple-600"
          />

          <h2 className="text-xl font-bold text-slate-900">
            Admin Account
          </h2>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">

          {/* ADMIN NAME */}

          <div>

            <label className="text-sm font-medium text-slate-700">

              Admin Name

            </label>

            <input
              type="text"
              value={
                settings.adminName
              }
              onChange={(e) =>
                setSettings({

                  ...settings,

                  adminName:
                    e.target.value,
                })
              }
              className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-green-500"
            />
          </div>

          {/* ADMIN EMAIL */}

          <div>

            <label className="text-sm font-medium text-slate-700">

              Admin Email

            </label>

            <input
              type="email"
              value={
                settings.adminEmail
              }
              onChange={(e) =>
                setSettings({

                  ...settings,

                  adminEmail:
                    e.target.value,
                })
              }
              className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-green-500"
            />
          </div>
        </div>
      </div>

      {/* SAVE */}

      <div className="flex justify-end">

        <button
          onClick={
            saveSettings
          }
          disabled={saving}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 text-sm font-medium text-white transition-all hover:bg-green-700 disabled:opacity-50"
        >

          <Save
            size={18}
          />

          {
            saving
              ? "Saving..."
              : "Save Settings"
          }

        </button>
      </div>
    </div>
  )
}