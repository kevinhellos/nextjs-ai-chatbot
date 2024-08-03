"use client";

import React from 'react'
import { ReactTyped } from 'react-typed';

export default function ChatCard({
    chat
} : {
    chat: any
}) {
  return (
    <div 
        className={`chat ${chat.role === "system" ? "chat-start" : "chat-end"}`}>
        <div className={`chat-bubble rounded-md flex ${chat.role === "system" ? "bg-transparent text-white mb-20" : "bg-gray-100 border text-black"}` }>
        {chat.role === "system" ? (
            <ReactTyped
                strings={[`${chat.message}`]}
                typeSpeed={40}
                showCursor={false}
            />
        ):(
            <>{chat.message}</>
        )}
        </div>
    </div>
  )
}
