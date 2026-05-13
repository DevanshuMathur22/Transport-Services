"use client"

import axios from "axios"

import {
  motion,
} from "framer-motion"

import {
  AlertTriangle,
  CheckCircle2,
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
    verificationStatus,
    setVerificationStatus,
  ] = useState("pending")

  const [
    isDriverApproved,
    setIsDriverApproved,
  ] = useState(false)

  const [
    form,
    setForm,
  ] = useState({

    aadhaarNumber: "",

    licenseNumber: "",

    vehicleNumber: "",

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

          aadhaarNumber:
            res.data.documents
              ?.aadhaarNumber || "",

          licenseNumber:
            res.data.documents
              ?.licenseNumber || "",

          vehicleNumber:
            res.data.documents
              ?.vehicleNumber || "",

          licenseUrl:
            res.data.documents
              ?.licenseUrl || "",

          rcUrl:
            res.data.documents
              ?.rcUrl || "",

          aadhaarUrl:
            res.data.documents
              ?.aadhaarUrl || "",

          insuranceUrl:
            res.data.documents
              ?.insuranceUrl || "",
        })

        setVerificationStatus(
          res.data
            ?.verificationStatus ||
          "pending"
        )

        setIsDriverApproved(
          res.data
            ?.isDriverApproved
        )

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

        const res =
          await axios.put(
            "/api/driver/documents",
            form
          )

        setVerificationStatus(
          res.data.driver
            ?.verificationStatus
        )

        setIsDriverApproved(
          res.data.driver
            ?.isDriverApproved
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

          {/* STATUS */}

          <div>

            {
              verificationStatus ===
              "auto_approved" ||

              verificationStatus ===
              "approved"

                ? (

                  <div className="flex items-center gap-2 rounded-2xl bg-green-500/20 px-5 py-3 text-sm font-medium text-green-300">

                    <CheckCircle2
                      size={18}
                    />

                    Verified Driver
                  </div>
                )

                : verificationStatus ===
                  "manual_review"

                ? (

                  <div className="flex items-center gap-2 rounded-2xl bg-yellow-500/20 px-5 py-3 text-sm font-medium text-yellow-300">

                    <AlertTriangle
                      size={18}
                    />

                    Under Manual Review
                  </div>
                )

                : (

                  <div className="flex items-center gap-2 rounded-2xl bg-slate-700 px-5 py-3 text-sm font-medium text-slate-200">

                    <ShieldCheck
                      size={18}
                    />

                    Pending Verification
                  </div>
                )
            }
          </div>
        </div>
      </motion.div>

      {/* BASIC DETAILS */}

      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <label className="text-sm font-medium text-slate-700">
            Aadhaar Number
          </label>

          <input
            type="text"
            value={
              form.aadhaarNumber
            }
            onChange={(e) =>
              setForm({

                ...form,

                aadhaarNumber:
                  e.target.value,
              })
            }
            placeholder="123412341234"
            maxLength={12}
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 outline-none focus:border-orange-500"
          />
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <label className="text-sm font-medium text-slate-700">
            License Number
          </label>

          <input
            type="text"
            value={
              form.licenseNumber
            }
            onChange={(e) =>
              setForm({

                ...form,

                licenseNumber:
                  e.target.value,
              })
            }
            placeholder="DL0420110012345"
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 uppercase outline-none focus:border-orange-500"
          />
        </div>

        <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">

          <label className="text-sm font-medium text-slate-700">
            Vehicle Number
          </label>

          <input
            type="text"
            value={
              form.vehicleNumber
            }
            onChange={(e) =>
              setForm({

                ...form,

                vehicleNumber:
                  e.target.value
                    .toUpperCase(),
              })
            }
            placeholder="RJ14AB1234"
            style={{
              textTransform:
                "uppercase",
            }}
            className="mt-2 h-12 w-full rounded-2xl border border-slate-200 px-4 uppercase outline-none focus:border-orange-500"
          />
        </div>
      </div>

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

      {/* STATUS MESSAGE */}

      {
        !isDriverApproved &&

        verificationStatus ===
        "manual_review" && (

          <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-sm text-yellow-800">

            Your documents were flagged for manual verification because duplicate information was detected.

          </div>
        )
      }
    </div>
  )
}