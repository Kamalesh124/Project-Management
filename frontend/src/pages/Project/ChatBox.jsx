"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { fetchChatByProject, fetchChatMessages, sendMessage } from "@/redux/Chat/Action"
import { PaperPlaneIcon, ChatBubbleIcon, PersonIcon } from "@radix-ui/react-icons"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const ChatBox = () => {
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const { id } = useParams()
  const { chat, auth } = useSelector((store) => store)
  const chatContainerRef = useRef(null)

  const handleMessageChange = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {
    dispatch(fetchChatByProject(id))
  }, [])

  useEffect(() => {
    if (chat.chat) {
      dispatch(fetchChatMessages(chat.chat?.id))
    }
  }, [chat.chat])

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(
        sendMessage({
          message: {
            senderId: auth.user?.id,
            projectId: id,
            content: message,
          },
          sendToServer: sendMessageToServer,
        }),
      )
      setMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chat.messages])

  const sendMessageToServer = (message) => {
    console.log(message)
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isCurrentUser = (senderId) => senderId === auth.user?.id

  return (
    <div className="sticky h-fit">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
        {/* Header with gradient background */}
        <div className="relative border-b border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-700/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="relative flex items-center gap-3 p-5">
            <div className="p-2 rounded-full bg-blue-500/20 border border-blue-500/30">
              <ChatBubbleIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-100">Project Chat</h1>
              <p className="text-xs text-slate-400">{chat.messages?.length || 0} messages</p>
            </div>
            {/* Online indicator */}
            <div className="ml-auto flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>
        </div>

        {/* Messages area - Completely hidden scrollbar */}
        <div
          className="h-[32rem] w-full overflow-y-scroll"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: "none",
          }}
        >
          <style
            dangerouslySetInnerHTML={{
              __html: `
              .h-\\[32rem\\]::-webkit-scrollbar {
                display: none;
              }
              .h-\\[32rem\\] {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `,
            }}
          />

          <div className="p-4 space-y-4">
            {chat.messages?.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="p-4 rounded-full bg-slate-800/50 border border-slate-700/50 mb-4">
                  <ChatBubbleIcon className="h-8 w-8 text-slate-500" />
                </div>
                <p className="text-slate-400 text-sm">No messages yet</p>
                <p className="text-slate-500 text-xs mt-1">Start the conversation!</p>
              </div>
            ) : (
              chat.messages?.map((item, i) => {
                const isOwn = isCurrentUser(item.sender?.id)
                const showAvatar = i === 0 || chat.messages[i - 1]?.sender?.id !== item.sender?.id

                return (
                  <div
                    ref={i === chat.messages.length - 1 ? chatContainerRef : null}
                    key={item.id || i}
                    className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"} group`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 ${showAvatar ? "opacity-100" : "opacity-0"}`}>
                      <Avatar className="h-8 w-8 border-2 border-slate-600/50">
                        <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-600 text-slate-200 text-xs font-semibold">
                          {item.sender?.fullName?.[0]?.toUpperCase() || item.sender?.name?.[0]?.toUpperCase() || (
                            <PersonIcon className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                    </div>

                    {/* Message bubble */}
                    <div className={`flex flex-col max-w-[75%] ${isOwn ? "items-end" : "items-start"}`}>
                      {/* Sender name and timestamp */}
                      {showAvatar && (
                        <div className={`flex items-center gap-2 mb-1 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
                          <span className="text-xs font-medium text-slate-300">
                            {isOwn ? "You" : item.sender?.fullName || "Unknown User"}
                          </span>
                          <span className="text-xs text-slate-500">{formatTime(item.timestamp || Date.now())}</span>
                        </div>
                      )}
                      {/* Message content */}
                      <div
                        className={`relative px-4 py-2.5 rounded-2xl transition-all duration-200 hover:scale-[1.02] ${
                          isOwn
                            ? "bg-gradient-to-br from-blue-600/90 to-blue-500/80 text-white shadow-lg shadow-blue-500/25 rounded-br-md"
                            : "bg-gradient-to-br from-slate-700/80 to-slate-600/60 text-slate-100 border border-slate-600/30 rounded-bl-md"
                        }`}
                      >
                        <p className="text-sm leading-relaxed break-words">{item.content}</p>

                        {/* Message tail */}
                        <div
                          className={`absolute bottom-0 w-3 h-3 ${
                            isOwn
                              ? "-right-1 bg-gradient-to-br from-blue-600/90 to-blue-500/80 rounded-bl-full"
                              : "-left-1 bg-gradient-to-br from-slate-700/80 to-slate-600/60 rounded-br-full border-l border-b border-slate-600/30"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Input area */}
        <div className="relative border-t border-slate-700/50 bg-gradient-to-r from-slate-800/80 to-slate-700/60 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 to-slate-500/5" />
          <div className="relative flex items-end gap-3 p-4">
            {/* Message input */}
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={handleMessageChange}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="min-h-[44px] pl-4 pr-12 py-3 bg-slate-800/50 border-slate-600/50 rounded-xl text-slate-100 placeholder:text-slate-400 focus:bg-slate-800/70 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
                maxLength={1000}
              />

              {/* Character count */}
              {message.length > 800 && (
                <div className="absolute -top-6 right-2 text-xs text-slate-400">{message.length}/1000</div>
              )}
            </div>
            {/* Send button */}
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className={`h-11 w-11 rounded-xl transition-all duration-200 hover:scale-105 ${
                message.trim()
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-500/25"
                  : "bg-slate-700/50 cursor-not-allowed"
              }`}
              size="icon"
            >
              <PaperPlaneIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none" />
      </div>
    </div>
  )
}

export default ChatBox
