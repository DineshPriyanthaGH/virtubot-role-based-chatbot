import React, { useEffect, useState, useRef } from 'react'
import { UserCircle, Send, X } from 'lucide-react'
import { ParticleBackground } from '../SignIn/ParticleBackground'
const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm VirtuBot. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [showProfileCard, setShowProfileCard] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [showChatCard, setShowChatCard] = useState(false)
  // Show chat card with animation after component mounts
  useEffect(() => {
    setTimeout(() => {
      setShowChatCard(true)
    }, 100)
  }, [])
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages([...messages, userMessage])
    setNewMessage('')
    // Show typing indicator
    setIsTyping(true)
    // Show thinking message after typing stops
    setTimeout(() => {
      setIsTyping(false)
      setIsThinking(true)
      // Simulate bot response after thinking
      setTimeout(() => {
        setIsThinking(false)
        // Generate bot response
        const botResponses = [
          "I understand what you're asking. Let me help with that.",
          "That's an interesting question! Here's what I know about it.",
          'I can definitely help you with that request.',
          'Let me analyze that for you...',
          'Based on my knowledge, I would suggest the following.',
        ]
        const randomResponse =
          botResponses[Math.floor(Math.random() * botResponses.length)]
        const botMessage = {
          id: messages.length + 2,
          text: randomResponse,
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages((prevMessages) => [...prevMessages, botMessage])
      }, 2000) // Bot thinking time
    }, 1000) // Typing time
  }
interface KeyPressEvent extends React.KeyboardEvent<HTMLTextAreaElement> {}

const handleKeyPress = (e: KeyPressEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
    }
}
  const toggleProfileCard = () => {
    setShowProfileCard(!showProfileCard)
  }
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-900 to-indigo-800 p-4">
      <ParticleBackground />
      {/* Chat Card */}
      <div
        className={`chat-card bg-white rounded-2xl shadow-xl w-full max-w-5xl h-[85vh] flex flex-col transition-all duration-700 ease-out transform ${showChatCard ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} z-10 overflow-hidden border border-blue-100`}
      >
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              V
            </div>
            <h1 className="ml-3 text-xl font-semibold">VirtuBot</h1>
          </div>
          <button
            onClick={toggleProfileCard}
            className="relative flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
          >
            <UserCircle size={24} />
          </button>
        </div>
        {/* Chat container */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-6 overflow-y-auto bg-gray-50"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} message-animation`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${message.sender === 'user' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none shadow-blue-200' : 'bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100'} shadow-lg transition-all duration-300 hover:shadow-xl`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start message-animation">
                <div className="bg-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="typing-dot"></div>
                    <div
                      className="typing-dot"
                      style={{
                        animationDelay: '0.2s',
                      }}
                    ></div>
                    <div
                      className="typing-dot"
                      style={{
                        animationDelay: '0.4s',
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            {/* Thinking message */}
            {isThinking && (
              <div className="flex justify-start message-animation">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-gray-100">
                  <p className="flex items-center">
                    VirtuBot is thinking
                    <span className="thinking-dots ml-1">
                      <span className="thinking-dot">.</span>
                      <span
                        className="thinking-dot"
                        style={{
                          animationDelay: '0.3s',
                        }}
                      >
                        .
                      </span>
                      <span
                        className="thinking-dot"
                        style={{
                          animationDelay: '0.6s',
                        }}
                      >
                        .
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Message input */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex">
            <div className="flex-1 relative">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress} // Changed from onKeyPress to onKeyDown
                placeholder="Type your message..."
                className="w-full border border-gray-200 rounded-l-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
                rows={1}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 rounded-r-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:from-blue-400 disabled:to-blue-500"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Profile Card */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white to-blue-50 shadow-2xl transform transition-all duration-500 ease-in-out ${showProfileCard ? 'translate-x-0' : 'translate-x-full'} z-50`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
            <button
              onClick={toggleProfileCard}
              className="profile-close-btn text-gray-500 hover:text-gray-700 transition-all duration-300 transform hover:rotate-90"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center mb-8">
            <div className="profile-avatar h-24 w-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
              JD
            </div>
            <h3 className="text-lg font-medium text-gray-800">John Doe</h3>
            <p className="text-gray-500 mt-1">john.doe@example.com</p>
          </div>
          <div className="space-y-4">
            <button className="profile-btn w-full bg-white hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 flex items-center justify-center">
              <span className="mr-2">🔒</span> Security Settings
            </button>
            <button className="profile-btn w-full bg-white hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 flex items-center justify-center">
              <span className="mr-2">⚙️</span> Preferences
            </button>
            <button className="profile-btn w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center">
              <span className="mr-2">🔄</span> Reset Password
            </button>
            <button className="profile-btn w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] mt-8 flex items-center justify-center">
              <span className="mr-2">👋</span> Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChatPage
