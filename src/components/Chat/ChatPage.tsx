import React, { useEffect, useState, useRef, ChangeEvent } from "react"
import { UserCircle, Send, X, Paperclip, FileText } from "lucide-react"
import { ParticleBackground } from "../SignIn/ParticleBackground"
import { sendMessageToGemini } from "../../services/ChatService"
import { db } from "../../firebase"
import { ref, push, onValue } from "firebase/database"
import { useAuth } from "../../services/AuthProvider"
import { useNavigate } from "react-router-dom"
import { getAuth, signOut as firebaseSignOut } from "firebase/auth"

const ChatPage: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const auth = getAuth()

  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const [isThinking, setIsThinking] = useState(false)
  const [botTypingText, setBotTypingText] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [showProfileCard, setShowProfileCard] = useState(false)
  const [showChatCard, setShowChatCard] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowChatCard(true)
    }, 100)
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, botTypingText])

  useEffect(() => {
    if (user) {
      const chatRef = ref(db, `chats/${user.uid}`)
      onValue(chatRef, (snapshot) => {
        const data = snapshot.val()
        const loadedMessages = data ? Object.values(data) : []
        setMessages(loadedMessages)
      })
    }
  }, [user])

  const renderBotText = (text: string) => {
    const lines = text.split("\n")
    return lines.map((line, i) => {
      if (/^\s*([0-9]+\.|-|\*)\s+/.test(line)) {
        const match = line.match(/^(\s*([0-9]+\.|-|\*))\s+(.*)/)
        if (match) {
          return (
            <p key={i}>
              <strong>{match[1]}</strong> {match[3]}
            </p>
          )
        }
      }
      return <p key={i}>{line}</p>
    })
  }

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })

  const handleSendMessage = async () => {
    if ((!newMessage.trim() && !attachedFile) || !user) return

    let fileData = null
    if (attachedFile) {
      try {
        const base64 = await fileToBase64(attachedFile)
        fileData = {
          name: attachedFile.name,
          type: attachedFile.type,
          base64,
        }
      } catch (error) {
        console.error("File read error:", error)
      }
    }

    const userMessage = {
      text: newMessage,
      file: fileData,
      sender: "user",
      timestamp: new Date().toISOString(),
    }
    push(ref(db, `chats/${user.uid}`), userMessage)

    setNewMessage("")
    setAttachedFile(null)
    setIsThinking(true)
    setBotTypingText("")

    // Send message text + attached file info to bot prompt
    let prompt = newMessage
    if (fileData) {
      prompt += `\n[Attached file: ${fileData.name}]`
    }
    const botResponse = await sendMessageToGemini(prompt)

    let index = 0
    const typingInterval = setInterval(() => {
      setBotTypingText((prev) => prev + botResponse.charAt(index))
      index++
      if (index >= botResponse.length) {
        clearInterval(typingInterval)
        const botMessage = {
          text: botResponse,
          sender: "bot",
          timestamp: new Date().toISOString(),
        }
        push(ref(db, `chats/${user.uid}`), botMessage)
        setBotTypingText("")
        setIsThinking(false)
      }
    }, 30)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleProfileCard = () => {
    setShowProfileCard(!showProfileCard)
  }

  const handleSignOut = async () => {
    try {
      await firebaseSignOut(auth)
      navigate("/")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const getUserInitials = () => {
    if (!user) return "U"
    if (user.displayName) {
      return user.displayName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    }
    if (user.email) return user.email[0].toUpperCase()
    return "U"
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFile(e.target.files[0])
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-900 to-indigo-800 p-4">
      <ParticleBackground />
      <div
        className={`chat-card bg-white rounded-2xl shadow-xl w-full max-w-5xl h-[85vh] flex flex-col transition-all duration-700 ease-out transform ${
          showChatCard ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } z-10 overflow-hidden border border-blue-100`}
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
            title="Profile"
          >
            <UserCircle size={24} />
          </button>
        </div>

        {/* Chat messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 p-6 overflow-y-auto bg-gray-50"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } message-animation`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-none shadow-blue-200"
                      : "bg-white text-gray-800 rounded-tl-none shadow-sm border border-gray-100"
                  } shadow-lg transition-all duration-300 hover:shadow-xl whitespace-pre-wrap`}
                >
                  {message.file ? (
                    <div className="mb-2">
                      {message.file.type.startsWith("image/") ? (
                        <img
                          src={message.file.base64 || message.file.url}
                          alt={message.file.name}
                          className="max-w-full rounded-lg"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FileText size={20} />
                          <span>{message.file.name}</span>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {message.sender === "bot"
                    ? renderBotText(message.text)
                    : <p>{message.text}</p>}

                  <p
                    className={`text-xs mt-2 ${
                      message.sender === "user" ? "text-blue-100" : "text-gray-500"
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isThinking && botTypingText && (
              <div className="flex justify-start message-animation">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-gray-100 whitespace-pre-wrap">
                  {renderBotText(botTypingText)}
                  <span className="blinking-cursor">|</span>
                </div>
              </div>
            )}

            {isThinking && !botTypingText && (
              <div className="flex justify-start message-animation">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] border border-gray-100">
                  <p className="flex items-center">
                    VirtuBot is thinking
                    <span className="thinking-dots ml-1">
                      <span className="thinking-dot">.</span>
                      <span
                        className="thinking-dot"
                        style={{ animationDelay: "0.3s" }}
                      >
                        .
                      </span>
                      <span
                        className="thinking-dot"
                        style={{ animationDelay: "0.6s" }}
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

        {/* Input area with clip icon on left */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {/* File attach icon + hidden input */}
            <label
              htmlFor="file-upload"
              className="cursor-pointer p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
              title="Attach file"
            >
              <Paperclip size={20} />
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={onFileChange}
              className="hidden"
            />

            {/* Textarea + filename */}
            <div className="flex-1 relative flex items-center space-x-2">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
                rows={1}
              />
              {attachedFile && (
                <div className="text-sm text-gray-600 px-2 py-1 bg-gray-100 rounded max-w-xs truncate">
                  {attachedFile.name}
                </div>
              )}
            </div>

            {/* Send button */}
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() && !attachedFile}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 disabled:from-blue-400 disabled:to-blue-500"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile card */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white to-blue-50 shadow-2xl transform transition-all duration-500 ease-in-out ${
          showProfileCard ? "translate-x-0" : "translate-x-full"
        } z-50`}
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
              {getUserInitials()}
            </div>
            <h3 className="text-lg font-medium text-gray-800">
              {user?.displayName || "User"}
            </h3>
            <p className="text-gray-500 mt-1">{user?.email || "No email"}</p>
          </div>
          <div className="space-y-4">
            <button className="profile-btn w-full bg-white hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 flex items-center justify-center">
              <span className="mr-2"></span> Security Settings
            </button>
            <button className="profile-btn w-full bg-white hover:bg-gray-50 text-gray-800 py-2 px-4 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 flex items-center justify-center">
              <span className="mr-2"></span> Preferences
            </button>
            <button className="profile-btn w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center">
              <span className="mr-2"></span> Reset Password
            </button>
            <button
              onClick={handleSignOut}
              className="profile-btn w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] mt-8 flex items-center justify-center"
            >
              <span className="mr-2"></span> Sign Out
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .blinking-cursor {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default ChatPage
