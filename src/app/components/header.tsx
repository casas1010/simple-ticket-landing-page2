"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Image from "next/image"

export default function Header({ title = "Simple Ticket" }: { title?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [flash, setFlash] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (title && title !== "Simple Ticket") {
      setFlash(true)
      const timeout = setTimeout(() => setFlash(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [title])

  const handleIconClick = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (params.has("mode")) {
      params.delete("mode")
      router.replace(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <div className="sticky top-4 z-50 flex justify-center px-4">
      <style>{`
        @keyframes flash-green {
          0%, 100% { background-color: #16a34a; }
          50% { background-color: #22c55e; }
        }
        .flash-green {
          animation: flash-green 1s ease-in-out infinite;
        }
      `}</style>
      <header
        className={`w-full max-w-6xl rounded-2xl backdrop-blur bg-white/10 shadow-lg transition-all ${
          scrolled ? "py-2" : "py-4"
        } px-6 md:px-8 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-3">
          <div
            onClick={handleIconClick}
            className={`p-2 rounded-lg transition-all duration-300 cursor-pointer ${
              flash ? "flash-green" : "bg-blue-600"
            }`}
          >
            <Image
              src="https://i.imgur.com/OEMWwAS.png"
              alt="Logo"
              width={200}
              height={200}
              className={`transition-all duration-300 ${scrolled ? "w-4 h-4" : "w-6 h-6"}`}
            />
          </div>
          <span className="text-white text-xl font-bold">{title}</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#contact" className="text-white hover:text-blue-400 transition-colors">
            Contact
          </a>
        </nav>
      </header>
    </div>
  )
}