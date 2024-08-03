import { aiVersion } from '@/data/data'
import React from 'react'

export default function Navbar() {

  const isBeta = true;

  return (
    <nav className="navbar bg-[#212121] text-white text-xl font-sans font-medium flex">
      Chatbot {isBeta && <span className="ms-2 font-medium bg-yellow-200 text-black px-2 rounded-sm text-sm">BETA</span>}
      <span className="text-xs text-gray-500 font-light ms-3">
        Version {aiVersion}
      </span>
    </nav>
  )
}
