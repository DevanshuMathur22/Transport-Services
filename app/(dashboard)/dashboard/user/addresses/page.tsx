"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  Home,
  MapPin,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function AddressPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [addresses, setAddresses] =
    useState<any[]>([])

  const [loading, setLoading] =
    useState(true)

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchAddresses()

  }, [])

  const fetchAddresses =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/user/addresses"
          )

setAddresses(
  Array.isArray(
    res.data.addresses
  )
    ? res.data.addresses
    : []
)
      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // DELETE
  //////////////////////////////////////////////////////

  const deleteAddress =
    async (id: string) => {

      try {

        await axios.delete(
          `/api/user/addresses/${id}`
        )

        fetchAddresses()

      } catch (error) {

        console.log(error)
      }
    }

  //////////////////////////////////////////////////////
  // LOADING
  //////////////////////////////////////////////////////

  if (loading) {

    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="flex items-center gap-3">

          <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />

          <p className="text-sm text-slate-500">
            Loading addresses...
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

              <MapPin
                size={28}
                className="text-green-400"
              />
            </div>

            <div>

              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Saved Addresses
              </h1>

              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-300">
                Manage pickup and delivery locations easily.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="flex h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 text-sm font-medium text-white shadow-lg transition-all hover:shadow-green-200"
          >

            <Plus
              size={18}
            />

            Add Address

          </motion.button>
        </div>
      </motion.div>

      {/* EMPTY */}

      {addresses.length === 0 && (

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="flex h-[42vh] flex-col items-center justify-center rounded-[30px] border border-dashed border-slate-300 bg-white text-center"
        >

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

            <MapPin
              size={38}
              className="text-slate-400"
            />

          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">

            No Saved Addresses

          </h2>

          <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">

            Add pickup and delivery locations to access them quickly later.

          </p>

          <button className="mt-6 flex h-11 items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 text-sm font-medium text-white transition-all hover:bg-green-700">

            <Plus
              size={18}
            />

            Add Address

          </button>
        </motion.div>
      )}

      {/* LIST */}

      <div className="grid gap-5 md:grid-cols-2">

        {addresses.map(
          (
            item,
            index
          ) => (

            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay:
                  index * 0.05,
              }}
              whileHover={{
                y: -4,
              }}
              className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg"
            >

              {/* TOP */}

              <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-r from-green-500 to-emerald-500 p-5">

                <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

                <div className="relative flex items-start justify-between gap-4">

                  <div className="flex items-center gap-4">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-white/10 text-white backdrop-blur">

                      <Home
                        size={24}
                      />

                    </div>

                    <div>

                      <h2 className="text-lg font-semibold text-white">

                        {
                          item.name
                        }

                      </h2>

                      <p className="mt-1 text-sm text-green-100">

                        Saved Address

                      </p>
                    </div>
                  </div>

                  <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">

                    Default

                  </div>
                </div>
              </div>

              {/* BODY */}

              <div className="p-5">

                <div className="rounded-[24px] bg-slate-50 p-4">

                  <div className="flex items-start gap-3">

                    <MapPin
                      size={18}
                      className="mt-0.5 shrink-0 text-green-600"
                    />

                    <div>

                      <p className="text-sm leading-7 text-slate-600">

                        {
                          item.address
                        }

                      </p>

                      <p className="mt-3 text-xs font-medium text-slate-400">

                        {
                          item.city
                        }

                        {" • "}

                        {
                          item.pincode
                        }

                      </p>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="mt-5 flex items-center gap-3">

                  <motion.button
                    whileTap={{
                      scale: 0.95,
                    }}
                    whileHover={{
                      scale: 1.02,
                    }}
                    className="flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition-all hover:bg-slate-100"
                  >

                    <Pencil
                      size={17}
                    />

                    Edit

                  </motion.button>

                  <motion.button
                    whileTap={{
                      scale: 0.95,
                    }}
                    whileHover={{
                      scale: 1.02,
                    }}
                    onClick={() =>
                      deleteAddress(
                        item.id
                      )
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-red-600 transition-all hover:bg-red-100"
                  >

                    <Trash2
                      size={18}
                    />

                  </motion.button>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}