export default function SupportPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-4xl font-black">
          Support
        </h1>

        <p className="mt-2 text-slate-500">
          Contact our support team
        </p>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">

        <form className="space-y-5">

          <input
            placeholder="Subject"
            className="h-14 w-full rounded-2xl border px-4 outline-none"
          />

          <textarea
            placeholder="Message"
            rows={6}
            className="w-full rounded-2xl border p-4 outline-none"
          />

          <button className="rounded-2xl bg-black px-6 py-3 text-white">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  )
}