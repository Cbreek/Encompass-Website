import { useState, useRef, useEffect } from 'react'
import { NavBrand } from './NavBrand'

type Tab = 'RFI' | 'RFP' | 'BID PACKAGE'

const ROLES = [
  'GENERAL CONTRACTOR',
  'ARCHITECT',
  'BUILDING OWNER',
  'DEVELOPER / CRE',
  'END USER',
]

const SYSTEMS = [
  'AUDIO / VISUAL INTEGRATION',
  'CONFERENCING SYSTEMS',
  'CONTROL SYSTEMS',
  'ETHERNET & STRUCTURED CABLING',
  'WI-FI & WIRELESS INFRASTRUCTURE',
  'PHYSICAL SECURITY (CCTV / ACCESS CONTROL)',
  'SPEECH PRIVACY & SOUND MASKING',
  'NETWORK INFRASTRUCTURE',
  'MULTIPLE SERVICES / FULL SCOPE',
]

const PHASES = [
  'PRE-DESIGN',
  'BIDDING',
  'DESIGN DEVELOPMENT',
  'CONSTRUCTION DOCUMENTS',
  'ACTIVE CONSTRUCTION',
  'PUNCH / CLOSEOUT',
]

function SelectBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-5 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-200"
      style={{
        background: active ? '#e87722' : 'transparent',
        color: active ? '#fff' : 'rgba(255,255,255,0.75)',
        border: active ? '1px solid #e87722' : '1px solid rgba(255,255,255,0.2)',
      }}
      onMouseEnter={e => {
        if (!active) {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)'
          ;(e.currentTarget as HTMLButtonElement).style.color = '#fff'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.75)'
        }
      }}
    >
      {children}
    </button>
  )
}

function FieldInput({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="bg-transparent py-3 text-sm outline-none"
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.2)',
          color: '#f5f5f5',
        }}
        onFocus={e => (e.currentTarget.style.borderBottomColor = '#e87722')}
        onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
      />
    </div>
  )
}

export function GCFormPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<Tab>('RFI')
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  const [role, setRole] = useState('')
  const [firmName, setFirmName] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectLocation, setProjectLocation] = useState('')
  const [projectSize, setProjectSize] = useState('')
  const [systems, setSystems] = useState<Set<string>>(new Set())
  const [projectPhase, setProjectPhase] = useState('')
  const [bidDueDate, setBidDueDate] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactTitle, setContactTitle] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [fileName, setFileName] = useState('')

  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const toggleSystem = (s: string) => {
    setSystems(prev => {
      const next = new Set(prev)
      if (next.has(s)) next.delete(s)
      else next.add(s)
      return next
    })
  }

  const handleSend = () => {
    const subject = encodeURIComponent(
      `${tab} Submission — ${projectName || 'New Project'}`,
    )
    const body = encodeURIComponent(
      `Submission Type: ${tab}\nRole: ${role}\nFirm: ${firmName}\nProject: ${projectName}\nLocation: ${projectLocation}\nSize: ${projectSize}\nSystems: ${[...systems].join(', ')}\nPhase: ${projectPhase}\nBid Due: ${bidDueDate}\nContact: ${contactName} (${contactEmail}, ${contactPhone})\nTitle: ${contactTitle}\n\nNotes:\n${notes}\n\nAttachment: ${fileName || '(none — will follow)'}`,
    )
    window.location.href = `mailto:info@encompasstp.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const tabLabel = tab === 'BID PACKAGE' ? 'BID PACKAGE' : tab

  return (
    <div className="min-h-screen" style={{ background: '#121212', color: '#f5f5f5', fontFamily: 'Inter, sans-serif' }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(18,18,18,0.85)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <NavBrand />
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
          >
            ← Back to Site
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 pb-40 pt-36 md:px-10">
        {/* Header */}
        <div className="mb-16">
          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.35em]" style={{ color: '#e87722' }}>
            A Direct Channel — General Contractors &amp; Architects
          </span>
          <h1
            className="text-5xl leading-[0.95] md:text-6xl lg:text-7xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            Submit an RFI, RFP,
            <br />
            or <em className="italic">Bid Package.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Skip the gatekeepers. Five questions, one upload — and a qualified response
            from Encompass lands in your inbox within one business day.
          </p>
          <div className="mt-8 flex flex-wrap gap-8">
            {['Routed to the Right Contact', 'Confidential', '1 Business Day Response'].map(b => (
              <span key={b} className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <span style={{ color: '#e87722' }}>✓</span> {b}
              </span>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div
          className="p-8 md:p-12"
          style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
        >
          {/* Tab switcher */}
          <div className="mb-10">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Submission Type
            </p>
            <div className="grid grid-cols-3">
              {(['RFI', 'RFP', 'BID PACKAGE'] as Tab[]).map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className="py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-200"
                  style={{
                    background: tab === t ? '#e87722' : 'transparent',
                    color: tab === t ? '#fff' : 'rgba(255,255,255,0.5)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderLeft: t === 'RFI' ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Step progress */}
          <div className="mb-12 flex items-center">
            {[1, 2, 3, 4, 5].map((s, idx) => (
              <div key={s} className="flex items-center" style={{ flex: s < 5 ? '1' : undefined }}>
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-[11px] font-bold"
                  style={{
                    background: s <= step ? '#e87722' : 'transparent',
                    color: s <= step ? '#fff' : 'rgba(255,255,255,0.3)',
                    border: s <= step ? '1px solid #e87722' : '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  {s}
                </div>
                {idx < 4 && (
                  <div
                    className="h-px flex-1 mx-2"
                    style={{ background: s < step ? '#e87722' : 'rgba(255,255,255,0.15)' }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step content */}
          {submitted ? (
            <div className="py-16 text-center">
              <p
                className="text-4xl italic md:text-5xl"
                style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: '#e87722' }}
              >
                Inquiry on its way.
              </p>
              <p className="mt-6 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Your default email client opened a pre-addressed message<br />
                to Encompass. We'll follow up within one business day.
              </p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div>
                  <h2 className="mb-2 text-3xl md:text-4xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                    Who are you?
                  </h2>
                  <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    So we route the right partner to your project.
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {ROLES.map(r => (
                      <SelectBtn key={r} active={role === r} onClick={() => setRole(r)}>
                        {r}
                      </SelectBtn>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="mb-2 text-3xl md:text-4xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                    The project
                  </h2>
                  <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Where and how big.
                  </p>
                  <div className="grid gap-8 md:grid-cols-2">
                    <FieldInput label="Firm Name" value={firmName} onChange={setFirmName} />
                    <FieldInput label="Project Name" value={projectName} onChange={setProjectName} />
                    <FieldInput label="Project Location" value={projectLocation} onChange={setProjectLocation} />
                    <FieldInput label="Size (SF or # of Rooms)" value={projectSize} onChange={setProjectSize} />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="mb-2 text-3xl md:text-4xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                    Systems involved
                  </h2>
                  <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Select all that apply.
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {SYSTEMS.map(s => (
                      <SelectBtn key={s} active={systems.has(s)} onClick={() => toggleSystem(s)}>
                        {s}
                      </SelectBtn>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="mb-2 text-3xl md:text-4xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                    Timeline &amp; phase
                  </h2>
                  <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Tells us how to prioritize.
                  </p>
                  <div className="mb-8">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Project Phase
                    </p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {PHASES.map(p => (
                        <SelectBtn key={p} active={projectPhase === p} onClick={() => setProjectPhase(p)}>
                          {p}
                        </SelectBtn>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Bid / Response Due Date
                    </p>
                    <input
                      type="date"
                      value={bidDueDate}
                      onChange={e => setBidDueDate(e.target.value)}
                      className="bg-transparent py-3 text-sm outline-none"
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.2)',
                        color: '#f5f5f5',
                        colorScheme: 'dark',
                      }}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = '#e87722')}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
                    />
                  </div>
                </div>
              )}

              {step === 5 && (
                <div>
                  <h2 className="mb-2 text-3xl md:text-4xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                    Your contact + scope upload
                  </h2>
                  <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    Attach the document if you have one — or send and follow up.
                  </p>
                  <div className="grid gap-8 md:grid-cols-2">
                    <FieldInput label="Your Name" value={contactName} onChange={setContactName} />
                    <FieldInput label="Title / Role" value={contactTitle} onChange={setContactTitle} />
                    <FieldInput label="Email" type="email" value={contactEmail} onChange={setContactEmail} />
                    <FieldInput label="Phone" type="tel" value={contactPhone} onChange={setContactPhone} />
                  </div>
                  <div className="mt-8">
                    <label className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Notes / Special Conditions
                    </label>
                    <textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      rows={3}
                      className="w-full resize-none bg-transparent py-3 text-sm leading-relaxed outline-none"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#f5f5f5' }}
                      onFocus={e => (e.currentTarget.style.borderBottomColor = '#e87722')}
                      onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
                    />
                  </div>
                  <div className="mt-10">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      Attach {tabLabel} Document
                    </p>
                    <div
                      className="flex items-center justify-between px-6 py-6"
                      style={{ border: '1px dashed rgba(255,255,255,0.2)' }}
                    >
                      <div>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                          {fileName || `Drop your ${tabLabel} here or browse`}
                        </p>
                        {!fileName && (
                          <p className="mt-1 text-[11px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            PDF · DOCX · DWG · ZIP · UP TO 100MB
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="text-[11px] font-bold uppercase tracking-[0.2em] transition-colors"
                        style={{ color: '#e87722' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#e87722')}
                      >
                        Select File
                      </button>
                      <input
                        ref={fileRef}
                        type="file"
                        accept=".pdf,.docx,.dwg,.zip"
                        className="hidden"
                        onChange={e => setFileName(e.target.files?.[0]?.name ?? '')}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Nav row */}
              <div className="mt-12 flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}>
                <button
                  type="button"
                  onClick={() => (step > 1 ? setStep(s => s - 1) : onBack())}
                  className="text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  ← Back
                </button>

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={() => setStep(s => s + 1)}
                    className="px-8 py-4 text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-200"
                    style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff', background: 'transparent' }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLButtonElement).style.background = '#e87722'
                      ;(e.currentTarget as HTMLButtonElement).style.borderColor = '#e87722'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                      ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.3)'
                    }}
                  >
                    Continue →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSend}
                    className="px-10 py-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white transition-all duration-200"
                    style={{ background: '#e87722', border: '1px solid #e87722' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#c96a1a')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#e87722')}
                  >
                    Send to Encompass
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        {/* 01–04 Process steps */}
        <div className="mt-24 grid gap-10 md:grid-cols-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '4rem' }}>
          {[
            { n: '01', title: 'Submit', body: 'Wizard or scope upload routes to Encompass.' },
            { n: '02', title: 'Consultation', body: 'Phone or video review of requirements within 1 business day.' },
            { n: '03', title: 'Site Walk', body: 'We coordinate with your GC and design team on conditions.' },
            { n: '04', title: 'Proposal', body: 'Detailed technology scope, timeline, and pricing.' },
          ].map(step => (
            <div key={step.n}>
              <p className="mb-3 text-3xl italic" style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: '#e87722', opacity: 0.7 }}>
                {step.n}
              </p>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em]">{step.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.body}</p>
            </div>
          ))}
        </div>

        {/* Direct contact line */}
        <div className="mt-16 text-center text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>
          <p>
            Or email directly —{' '}
            <a href="mailto:info@encompasstp.com" style={{ color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e87722')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
            >
              info@encompasstp.com
            </a>
            {' '}· (714) 920-5462
          </p>
          <p className="mt-1">134 S. Glassell St., Orange, CA 92866 · CA License #1064391</p>
        </div>
      </div>
    </div>
  )
}
