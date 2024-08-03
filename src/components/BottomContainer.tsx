import React from 'react'

export default function BottomContainer({ children } : { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center p-5 mb-0">
      {children}
    </div>
  )
}
