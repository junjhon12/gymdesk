import { useState, useRef, useEffect } from 'react'
import type { ChatMessage } from '../../types/index'
import { chatApi } from '../../services/api'

function ChatBox() {
  const [messages, setMessages]   = useState<ChatMessage[]>([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const bottomRef                 = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: ChatMessage = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const response = await chatApi.sendMessage(updatedMessages)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch {
      setError('Failed to connect to GymDesk AI.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSend()
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0d14] w-full">

      {/* ── Messages Area ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {/* Empty state / Welcome Screen */}
        {messages.length === 0 && (
          <div className="flex flex-col h-full justify-center">
            <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-4 text-center">
              <span className="text-2xl block mb-2">👋</span>
              <p className="text-xs font-semibold text-gray-200 m-0">Welcome to GymDesk AI</p>
              <p className="text-[10px] text-gray-500 mt-1 mb-4 leading-relaxed">
                I can read your live database. Ask me anything about your members, revenue, or operations.
              </p>
              <div className="space-y-1.5">
                {[
                  'How many active members do we have?',
                  'Who joined this month?',
                  'Show me expiring memberships.',
                ].map(suggestion => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="block w-full text-left text-[10px] text-gray-400 bg-[#1f2937]/50 hover:bg-[#1f2937] border border-[#1f2937] px-3 py-2 rounded-lg transition-colors"
                  >
                    → {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message bubbles */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] px-3 py-2 text-[11px] leading-relaxed shadow-sm ${
              msg.role === 'user'
                ? 'bg-[#1d4ed8] text-white rounded-2xl rounded-br-sm' // User: Blue, flat bottom-right
                : 'bg-[#1f2937] text-gray-100 rounded-2xl rounded-bl-sm border border-gray-700' // AI: Gray, flat bottom-left
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1f2937] border border-gray-700 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1.5 items-center h-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]"/>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]"/>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]"/>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex justify-center mt-2">
            <span className="bg-red-950/40 text-red-400 text-[10px] px-3 py-1 rounded-full border border-red-900/50">
              {error}
            </span>
          </div>
        )}

        {/* Invisible div to snap scroll to bottom */}
        <div ref={bottomRef} className="h-1" />
      </div>

      {/* ── Input Area ── */}
      <div className="p-3 border-t border-gray-800 bg-[#0f1117]">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your members..."
            className="flex-1 bg-[#1f2937] border border-gray-700 rounded-lg px-3 py-2 text-[11px] text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="bg-[#1d4ed8] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-3.5 py-2 rounded-lg text-[11px] font-medium transition-colors shadow-lg shadow-blue-900/20"
          >
            Send
          </button>
        </div>
      </div>

    </div>
  )
}

export default ChatBox