import React from 'react'

export default function Container({ children } : { children: React.ReactNode }) {
  return (
    <div className="flex justify-center bg-[#212121] min-h-screen overflow-y overflow-y-scroll">
      <div className="w-full max-w-2xl px-5">
        {children}
      </div>
    </div>
  )
}