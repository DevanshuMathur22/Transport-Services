"use client"

import {
  useEffect,
  useRef,
  useState,
} from "react"

import {
  ChevronLeft,
  ChevronRight,
  Bike,
  Truck,
  Package,
  ShieldCheck,
  Warehouse,
} from "lucide-react"

const features = [
  {
    title: "Bike Delivery",

    description:
      "Fast and flexible bike delivery options for your needs.",

    image:
      "https://images.unsplash.com/photo-1529074963764-98f45c47344b?q=80&w=1200&auto=format&fit=crop",

    icon: Bike,
  },

  {
    title: "Truck Rentals",

    description:
      "Reliable truck rental services for all your logistics needs.",

    image:
      "https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?q=80&w=1200&auto=format&fit=crop",

    icon: Truck,
  },

  {
    title: "Packers Movers",

    description:
      "Professional packing and moving services for hassle-free shifting.",

    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200&auto=format&fit=crop",

    icon: Package,
  },

  {
    title: "Enterprise",

    description:
      "Customized logistics solutions for modern enterprises.",

    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",

    icon: ShieldCheck,
  },

  {
    title: "Warehousing",

    description:
      "Secure and scalable warehousing infrastructure for inventory.",

    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",

    icon: Warehouse,
  },
]

export default function Features() {

  const sliderRef =
    useRef<HTMLDivElement>(null)

  const [canScrollLeft, setCanScrollLeft] =
    useState(false)

  const [canScrollRight, setCanScrollRight] =
    useState(true)

  const updateButtons = () => {

    if (!sliderRef.current) return

    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = sliderRef.current

    setCanScrollLeft(scrollLeft > 10)

    setCanScrollRight(
      scrollLeft + clientWidth <
        scrollWidth - 10
    )
  }

  useEffect(() => {

    updateButtons()

    const slider = sliderRef.current

    slider?.addEventListener(
      "scroll",
      updateButtons
    )

    return () => {
      slider?.removeEventListener(
        "scroll",
        updateButtons
      )
    }
  }, [])

  const scrollLeftHandler = () => {

    sliderRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    })
  }

  const scrollRightHandler = () => {

    sliderRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    })
  }

  return (
    <section className="relative overflow-hidden bg-[#09090B] px-4 py-20 md:px-8 md:py-28">

      {/* Glow */}
      <div className="absolute left-[-120px] top-0 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-[-100px] h-[300px] w-[300px] rounded-full bg-fuchsia-500/10 blur-3xl" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1700px]">

        {/* Top */}
        <div className="flex items-end justify-between gap-6">

          <div>

            {/* Badge */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-2xl">

              <div className="h-2 w-2 animate-pulse rounded-full bg-violet-400" />

              <p className="text-[10px] font-medium tracking-[0.3em] text-zinc-300">
                FEATURES
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">

              Explore
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">

                our services
              </span>
            </h2>
          </div>

          {/* Arrows */}
          <div className="hidden items-center gap-3 md:flex">

            {canScrollLeft && (
              <button
                onClick={
                  scrollLeftHandler
                }
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-2xl transition hover:bg-white/10"
              >

                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            {canScrollRight && (
              <button
                onClick={
                  scrollRightHandler
                }
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-2xl transition hover:bg-white/10"
              >

                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="mt-14 flex gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >

          {features.map((item) => {

            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="group min-w-[260px] md:min-w-[340px]"
              >

                <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-500 hover:border-violet-500/20 hover:bg-white/[0.07]">

                  {/* Image */}
                  <div className="relative overflow-hidden">

                    <img
                      src={item.image}
                      alt=""
                      className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-105 md:h-[430px]"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Icon */}
                    <div className="absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-2xl">

                      <Icon className="h-6 w-6 text-violet-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7">

                    <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">

                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">

                      {item.description}
                    </p>

                    {/* Bottom Line */}
                    <div className="mt-6 h-[3px] w-16 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all duration-500 group-hover:w-28" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile Arrows */}
        <div className="mt-8 flex items-center justify-center gap-3 md:hidden">

          {canScrollLeft && (
            <button
              onClick={
                scrollLeftHandler
              }
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl"
            >

              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {canScrollRight && (
            <button
              onClick={
                scrollRightHandler
              }
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-xl"
            >

              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}