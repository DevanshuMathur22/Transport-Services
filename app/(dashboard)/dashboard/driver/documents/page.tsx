"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  FileText,
  Save,
  ShieldCheck,
  Upload,
} from "lucide-react"

import {
  useEffect,
  useState,
} from "react"

export default function DriverDocumentsPage() {

  //////////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////////

  const [
    loading,
    setLoading,
  ] = useState(false)

  const [
    form,
    setForm,
  ] = useState({

    licenseUrl: "",

    rcUrl: "",

    aadhaarUrl: "",

    insuranceUrl: "",
  })

  //////////////////////////////////////////////////////
  // FETCH
  //////////////////////////////////////////////////////

  useEffect(() => {

    fetchDocuments()

  }, [])

  const fetchDocuments =
    async () => {

      try {

        const res =
          await axios.get(
            "/api/driver/documents"
          )

        setForm({

          licenseUrl:
            res.data.licenseUrl || "",

          rcUrl:
            res.data.rcUrl || "",

          aadhaarUrl:
            res.data.aadhaarUrl || "",

          insuranceUrl:
            res.data.insuranceUrl || "",
        })

      } catch (error) {

        console.log(error)
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
          "/api/driver/documents",
          form
        )

        alert(
          "Documents updated"
        )

      } catch (error) {

        console.log(error)

      } finally {

        setLoading(false)
      }
    }

  //////////////////////////////////////////////////////
  // INPUTS
  //////////////////////////////////////////////////////

  const documents = [

    {
      title:
        "Driving License",

      key:
        "licenseUrl",

      placeholder:
        "License document URL",
    },

    {
      title:
        "RC Document",

      key:
        "rcUrl",

      placeholder:
        "RC document URL",
    },

    {
      title:
        "Aadhaar Card",

      key:
        "aadhaarUrl",

      placeholder:
        "Aadhaar document URL",
    },

    {
      title:
        "Insurance",

      key:
        "insuranceUrl",

      placeholder:
        "Insurance document URL",
    },
  ]

  return (
    <div className="space-y-6">

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
        className="rounded-[30px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 text-white"
      >

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Driver Documents
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Upload and manage verification documents.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-green-500/20 px-5 py-3 text-sm font-medium text-green-300">

            <ShieldCheck
              size={18}
            />

            Secure Verification
          </div>
        </div>
      </motion.div>

      {/* DOCUMENTS */}

      <div className="grid gap-6 lg:grid-cols-2">

        {documents.map(
          (
            item
          ) => (

            <motion.div
              key={item.key}
              whileHover={{
                y: -3,
              }}
              className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">

                  <FileText
                    size={22}
                    className="text-orange-600"
                  />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-900">

                    {
                      item.title
                    }

                  </h2>

                  <p className="text-sm text-slate-500">
                    Verification document
                  </p>
                </div>
              </div>

              {/* INPUT */}

              <div className="mt-6">

                <label className="text-sm font-medium text-slate-700">
                  Document URL
                </label>

                <div className="relative mt-2">

                  <Upload
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={
                      form[
                        item.key as keyof typeof form
                      ] || ""
                    }
                    onChange={(e) =>
                      setForm({

                        ...form,

                        [item.key]:
                          e.target.value,
                      })
                    }
                    placeholder={
                      item.placeholder
                    }
                    className="h-12 w-full rounded-2xl border border-slate-200 pl-11 pr-4 outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* BUTTON */}

      <button
        onClick={
          handleSave
        }
        disabled={loading}
        className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 text-sm font-medium text-white transition-all hover:bg-orange-600 disabled:opacity-60"
      >

        <Save
          size={18}
        />

        {
          loading
            ? "Saving..."
            : "Save Documents"
        }

      </button>
    </div>
  )
}