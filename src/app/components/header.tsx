"use client"

import { useEffect, useState } from "react"

export default function Header({ title = "Simple Property" }: { title?: string }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="sticky top-4 z-50 flex justify-center px-4">
      <header
        className={`w-full max-w-6xl rounded-2xl backdrop-blur bg-white/10 shadow-lg transition-all ${
          scrolled ? "py-2" : "py-4"
        } px-6 md:px-8 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg transition-all duration-300">
            <img
              src="https://i.imgur.com/OEMWwAS.png"
              alt="Logo"
              className={`transition-all duration-300 ${scrolled ? "w-4 h-4" : "w-6 h-6"}`}
            />
          </div>
          <span className="text-white text-xl font-bold">{title}</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          {/* <a href="#features" className="text-white hover:text-blue-400 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-white hover:text-blue-400 transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-white hover:text-blue-400 transition-colors">
            About
          </a> */}
          <a href="#contact" className="text-white hover:text-blue-400 transition-colors">
            Contact
          </a>
        </nav>
      </header>
    </div>
  )
}