import { useState } from 'react'
import { NavBrand } from './NavBrand'

const PARTNERS = [
  { name: 'Sean Smith', title: 'Partner', email: 'sean.smith@encompasstp.com', calendar: '' },
  { name: 'Jason Voss', title: 'Partner', email: 'jason.voss@encompasstp.com', calendar: '' },
  { name: 'Sean Sutton', title: 'Partner', email: 'sean.sutton@encompasstp.com', calendar: '' },
]

const PREVIEW_URL = 'https://encompass-prototype.netlify.app'

function FieldInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent py-3 text-sm outline-none placeholder:text-[rgba(255,255,255,0.2)]"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#f5f5f5' }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = '#e87722')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
      />
    </div>
  )
}

export function CardScannerPage({ onBack }: { onBack: () => void }) {
  const [partnerIdx, setPartnerIdx] = useState(0)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [event, setEvent] = useState('')
  const [done, setDone] = useState<'none' | 'contact' | 'email' | 'both'>('none')

  const partner = PARTNERS[partnerIdx]
  const fullName = `${firstName} ${lastName}`.trim()

  const saveContact = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${lastName};${firstName}`,
      `FN:${fullName}`,
      title ? `TITLE:${title}` : '',
      company ? `ORG:${company}` : '',
      email ? `EMAIL:${email}` : '',
      phone ? `TEL:${phone}` : '',
      'END:VCARD',
    ].filter(Boolean).join('\r\n')

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${fullName || 'contact'}.vcf`
    a.click()
    URL.revokeObjectURL(url)
    setDone(prev => prev === 'email' || prev === 'both' ? 'both' : 'contact')
  }

  const sendEmail = () => {
    const siteUrl = PREVIEW_URL
    const calendarLine = partner.calendar
      ? `\n\nFeel free to grab time on my calendar here: ${partner.calendar}`
      : ''

    const subject = encodeURIComponent(
      `Great connecting at ${event || '[Event Name]'} — Encompass Technology Partners`
    )
    const body = encodeURIComponent(
      `Hello ${firstName || '[First Name]'},\n\nThank you again for the time spent connecting at the ${event || '[Event Name]'}. I always value opportunities to strengthen relationships within our industry.\n\nAs promised, I've included a direct link to Encompass Technology Partners so your team can easily review our capabilities in commercial AV, structured cabling, enterprise WiFi, physical security, and low-voltage infrastructure:\n\n${siteUrl}\n\nIf your project management or design team has an upcoming RFI or RFP package ready for review, you can drop your scope documents directly into our GC & Architect Portal on the site — or simply reply here and I'll follow up personally.${calendarLine}\n\nI look forward to identifying ways our team can support your projects.\n\nBest regards,\n${partner.name}\n${partner.title}\nEncompass Technology Partners\n${partner.email}`
    )

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    setDone(prev => prev === 'contact' || prev === 'both' ? 'both' : 'email')
  }

  const reset = () => {
    setFirstName(''); setLastName(''); setTitle(''); setCompany('')
    setEmail(''); setPhone(''); setEvent(''); setDone('none')
  }

  return (
    <div className="min-h-screen" style={{ background: '#121212', color: '#f5f5f5', fontFamily: 'Inter, sans-serif' }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(18,18,18,0.9)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-5">
          <NavBrand />
          <button
            onClick={onBack}
            className="text-[11px] font-medium uppercase tracking-[0.2em] transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            ← Back to Site
          </button>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-6 pb-20 pt-32">
        {/* Header */}
        <div className="mb-10">
          <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#e87722' }}>
            Partner Tool
          </span>
          <h1 className="text-4xl md:text-5xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
            Business Card<br /><em className="italic">Follow-Up.</em>
          </h1>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Enter the contact from the event. Two taps — saved to your iPhone and a personalized email ready to send.
          </p>
        </div>

        {/* Partner selector */}
        <div className="mb-8">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Sending As
          </p>
          <div className="grid grid-cols-3 gap-2">
            {PARTNERS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setPartnerIdx(i)}
                className="py-3 text-[11px] font-bold uppercase tracking-[0.15em] transition-all"
                style={{
                  background: partnerIdx === i ? '#e87722' : 'transparent',
                  color: partnerIdx === i ? '#fff' : 'rgba(255,255,255,0.5)',
                  border: partnerIdx === i ? '1px solid #e87722' : '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {p.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <div
          className="mb-8 p-6 md:p-8"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        >
          <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Contact Details
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <FieldInput label="First Name *" value={firstName} onChange={setFirstName} />
            <FieldInput label="Last Name *" value={lastName} onChange={setLastName} />
            <FieldInput label="Title / Role" value={title} onChange={setTitle} />
            <FieldInput label="Company" value={company} onChange={setCompany} />
            <FieldInput label="Email *" type="email" value={email} onChange={setEmail} />
            <FieldInput label="Phone" type="tel" value={phone} onChange={setPhone} />
          </div>
          <div className="mt-6">
            <FieldInput
              label="Event Name *"
              value={event}
              onChange={setEvent}
              placeholder="e.g. ULI Fall Meeting, CREDE Luncheon"
            />
          </div>
        </div>

        {/* Action buttons */}
        {done !== 'both' ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              onClick={saveContact}
              disabled={!firstName}
              className="flex flex-col items-center gap-2 py-6 text-center transition-all duration-200 disabled:opacity-30"
              style={{
                background: done === 'contact' ? 'rgba(232,119,34,0.15)' : 'transparent',
                border: done === 'contact' ? '1px solid #e87722' : '1px solid rgba(255,255,255,0.2)',
                color: '#f5f5f5',
              }}
              onMouseEnter={e => { if (!done || done !== 'contact') (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)' }}
              onMouseLeave={e => { if (!done || done !== 'contact') (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)' }}
            >
              <span className="text-2xl">{done === 'contact' ? '✓' : '👤'}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                {done === 'contact' ? 'Saved to Contacts' : 'Save to iPhone'}
              </span>
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Downloads .vcf contact card
              </span>
            </button>

            <button
              onClick={sendEmail}
              disabled={!firstName || !email || !event}
              className="flex flex-col items-center gap-2 py-6 text-center transition-all duration-200 disabled:opacity-30"
              style={{
                background: done === 'email' ? 'rgba(232,119,34,0.15)' : '#e87722',
                border: '1px solid #e87722',
                color: '#fff',
              }}
              onMouseEnter={e => { if (done === 'none' || done === 'contact') (e.currentTarget as HTMLButtonElement).style.background = '#c96a1a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = (done === 'none' || done === 'contact') ? '#e87722' : 'rgba(232,119,34,0.15)' }}
            >
              <span className="text-2xl">{done === 'email' ? '✓' : '✉'}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                {done === 'email' ? 'Email Ready to Send' : 'Send Follow-Up Email'}
              </span>
              <span className="text-[10px]" style={{ color: done === 'email' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.7)' }}>
                Opens pre-written outreach in your email app
              </span>
            </button>
          </div>
        ) : (
          /* Completion state */
          <div className="py-10 text-center">
            <p
              className="text-4xl italic"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: '#e87722' }}
            >
              Done.
            </p>
            <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {fullName} is saved to your contacts and your follow-up email is ready.
            </p>
            <button
              onClick={reset}
              className="mt-8 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#f5f5f5' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#e87722')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
            >
              Next Card →
            </button>
          </div>
        )}

        {/* Email preview */}
        {(firstName || event) && done !== 'both' && (
          <div className="mt-8 p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Email Preview
            </p>
            <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {`Hello ${firstName || '[First Name]'},\n\nThank you again for the time spent connecting at the ${event || '[Event Name]'}. I always value opportunities to strengthen relationships within our industry.\n\nI've included a direct link to Encompass Technology Partners so your team can review our capabilities:\n${PREVIEW_URL}\n\nIf you have an upcoming RFI or RFP ready, you can drop scope documents directly into our GC & Architect Portal — or simply reply here.\n\nBest regards,\n${partner.name}\n${partner.title}, Encompass Technology Partners`}
            </p>
          </div>
        )}

        <p className="mt-8 text-center text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
          Calendar links and final email routing configured during implementation.
        </p>
      </div>
    </div>
  )
}
