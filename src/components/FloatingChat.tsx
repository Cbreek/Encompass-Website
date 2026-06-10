import { useState, useRef, useEffect } from 'react'

type Msg = { from: 'bot' | 'user'; text: string }

const BOT_REPLIES: Record<string, string> = {
  default: "Thanks for reaching out! For fastest response, call (714) 920-5462 or email info@encompasstp.com — someone from our team will follow up within one business day.",
  rfp: "To submit an RFP, click 'General Contractors & Architects' in the top navigation. You can upload your scope documents and we'll respond within one business day.",
  rfi: "To submit an RFI, click 'General Contractors & Architects' in the top navigation. You can upload your documents and we'll respond within one business day.",
  services: "Encompass provides AV integration, low voltage & fiber, security & surveillance, network infrastructure, speech privacy, and design consulting. Which service can we help with?",
  hours: "Our team is available Monday–Friday, 8am–5pm Pacific. For urgent project needs, email info@encompasstp.com and include your deadline.",
  location: "We're located at 134 S. Glassell Street, Orange, CA 92866. We serve Southern California and the West Coast.",
}

function getBotReply(text: string): string {
  const t = text.toLowerCase()
  if (t.includes('rfp') || t.includes('bid') || t.includes('package')) return BOT_REPLIES.rfp
  if (t.includes('rfi')) return BOT_REPLIES.rfi
  if (t.includes('service') || t.includes('av') || t.includes('audio') || t.includes('fiber') || t.includes('network')) return BOT_REPLIES.services
  if (t.includes('hour') || t.includes('open') || t.includes('available')) return BOT_REPLIES.hours
  if (t.includes('location') || t.includes('address') || t.includes('where')) return BOT_REPLIES.location
  return BOT_REPLIES.default
}

export function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Msg[]>([
    { from: 'bot', text: 'Welcome to Encompass. Ask about our services, response times, or submit an RFP.' },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = () => {
    const text = input.trim()
    if (!text) return
    setMessages(m => [...m, { from: 'user', text }])
    setInput('')
    setTimeout(() => {
      setMessages(m => [...m, { from: 'bot', text: getBotReply(text) }])
    }, 600)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* Chat panel */}
      {open && (
        <div
          className="flex flex-col overflow-hidden"
          style={{
            width: '340px',
            height: '420px',
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          }}
        >
          {/* Header */}
          <div className="px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: '#e87722' }} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Live</span>
            </div>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Project Inquiries
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${m.from === 'user' ? 'ml-auto' : ''}`}
                style={{
                  background: m.from === 'bot' ? 'rgba(255,255,255,0.06)' : '#e87722',
                  color: '#f5f5f5',
                }}
              >
                {m.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm outline-none"
              style={{ color: '#f5f5f5' }}
            />
            <button
              onClick={send}
              className="text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
              style={{ color: '#e87722' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#e87722')}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle button — solid orange circle */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="flex h-[56px] w-[56px] items-center justify-center rounded-full transition-all duration-300 hover:scale-105"
        style={{ background: '#e87722', boxShadow: '0 8px 32px rgba(232,119,34,0.4)' }}
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" className="h-5 w-5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  )
}
