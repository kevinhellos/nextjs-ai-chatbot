"use client";

import BottomContainer from '@/components/BottomContainer'
import ChatCard from '@/components/ChatCard';
import Container from '@/components/Container'
import Navbar from '@/components/Navbar';
import { BookOpenText, FileQuestion, Mail, User } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

export default function page() {

  const chatInput = useRef<HTMLInputElement>(null);
  const chatForm = useRef<HTMLFormElement>(null);

  const [prompt, setPrompt] = useState<string>("");
  const [chats, setChats] = useState<any>([]);

  const handleSubmit = async (e: any) => {

    // Scroll to bottom of page
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    e.preventDefault(); // Prevent page from refreshing when a form submit event is triggered
    
    setPrompt(""); // Immediately clear input after a message is sent

    const newChat = { role: "user", message: prompt };
    setChats([...chats, newChat]);

    try {
      const response = await fetch(`${window.location.href}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });
      
      const data = await response.json();
      const systemResponse = { role: "system", message: data.message };
      
      setChats([...chats, newChat, systemResponse]);
      setPrompt("");
    } 
    catch (error) {
      console.error("Error fetching chat response: ", error);
    }
  };

  useEffect(() => {
    // Focus on chat input field after page is loaded
    chatInput?.current?.focus();
  }, []);

  const handlePromptClick = (message: string) => {
    setPrompt(message);
    setTimeout(() => {
      chatForm.current?.requestSubmit();
    }, 100);
  };

  return (
    <>
      <Container>
        <Navbar/>
        
        <div className="chat-container mt-10 overflow-y-scroll">
          {chats.map((chat: any, index: any) => (
            <ChatCard
              key={index}
              chat={chat}
            />
          ))}
        </div>

        {/* Prompt cards will only be shown on the first page load, where there arent any conversations */}
        {chats.length === 0 && (
          <BottomContainer>
            <div className= "mb-20 lg:w-2/4 md:w-2/4 w-full">
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-2 lg:gap-8 text-white">

                <div 
                  className="border border-gray-600 text-gray-400 rounded-xl p-5 font-light text-sm hover:bg-[#2F2F2F] cursor-pointer"
                  onClick={() => handlePromptClick("What is the tallest building in the world?")}
                >
                  <FileQuestion className="mb-2 text-blue-400"/>
                  What is the tallest building in the world?
                </div>

                <div 
                  className="border border-gray-600 text-gray-400 rounded-xl p-5 font-light text-sm hover:bg-[#2F2F2F] cursor-pointer"
                  onClick={() => handlePromptClick("Recipe for a healthy and delicious salad")}
                >
                  <BookOpenText className="mb-2 text-purple-400"/>
                  Recipe for a healthy and delicious salad
                </div>

                <div 
                  className="border border-gray-600 text-gray-400 rounded-xl p-5 font-light text-sm hover:bg-[#2F2F2F] cursor-pointer"
                  onClick={() => handlePromptClick("Who is the inventor of lightbulb?")}
                >
                  <User className="mb-2 text-red-400"/>
                  Who is the inventor of lightbulb?
                </div>

                <div 
                  className="border border-gray-600 text-gray-400 rounded-xl p-5 font-light text-sm hover:bg-[#2F2F2F] cursor-pointer"
                  onClick={() => handlePromptClick("Craft an email for a leave of absence")}
                >
                  <Mail className="mb-2 text-yellow-400"/>
                  Craft an email for a leave of absence
                </div>

              </div>
            </div>
          </BottomContainer>
        )}

        <form ref={chatForm} onSubmit={handleSubmit}>
          <BottomContainer>
            <input 
              type="text" 
              name="prompt"
              className="input input-bordered bg-[#2F2F2F] text-white lg:w-2/4 md:w-2/4 w-full rounded-full px-6 placeholder:text-gray-400/80 font-light"
              placeholder="Type your question and hit enter to send"
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              ref={chatInput}
              required
            />
          </BottomContainer>
        </form>
      </Container>
    </>
  )
}