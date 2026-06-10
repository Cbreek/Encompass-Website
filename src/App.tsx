import { useEffect, useState } from 'react'
import capAv from './assets/cap-av.jpg'
import capFiber from './assets/cap-fiber.jpg'
import { NavBrand } from './components/NavBrand'
import { HeroIntro } from './components/HeroIntro'
import { HeroRotator } from './components/HeroRotator'
import { Reveal } from './components/Reveal'
import { FloatingChat } from './components/FloatingChat'
import { GCFormPage } from './components/GCFormPage'

export default function App() {
  const [page, setPage] = useState<'home' | 'gc'>('home')
  const [riseKey, setRiseKey] = useState(0)
  const [introPlaying, setIntroPlaying] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === 'visible') setRiseKey((k) => k + 1)
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const handleIntroDone = () => {
    setIntroPlaying(false)
    setRiseKey((k) => k + 1)
  }

  const goGC = () => { setPage('gc'); setMobileOpen(false) }

  if (page === 'gc') {
    return <GCFormPage onBack={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
  }

  return (
    <div className="min-h-screen" style={{ background: '#121212', color: '#f5f5f5', fontFamily: 'Inter, sans-serif' }}>
      {introPlaying && <HeroIntro onDone={handleIntroDone} />}

      {/* ── Nav ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: 'rgba(18,18,18,0.6)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.05)' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <a href="#" aria-label="Encompass Technology Partners — Home">
            <NavBrand />
          </a>
          {/* Desktop nav links */}
          <div className="hidden gap-8 text-[11px] font-medium uppercase tracking-[0.2em] md:flex" style={{ color: 'rgba(255,255,255,0.8)' }}>
            {['#capabilities', '#markets', '#projects', '#about', '#contact'].map((href, i) => (
              <a key={href} href={href} className="transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.8)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e87722')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              >
                {['Services', 'Markets', 'Projects', 'About', 'Contact'][i]}
              </a>
            ))}
          </div>
          {/* Desktop GC button */}
          <button
            onClick={goGC}
            className="hidden items-center px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all md:inline-flex"
            style={{ border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)' }}
          >
            General Contractors &amp; Architects
          </button>
          {/* Mobile hamburger */}
          <button
            className="flex flex-col justify-center gap-[5px] p-2 md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(o => !o)}
          >
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                background: '#f5f5f5',
                transform: mobileOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                background: '#f5f5f5',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px w-6 transition-all duration-300"
              style={{
                background: '#f5f5f5',
                transform: mobileOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            className="border-t px-6 pb-6 pt-4 md:hidden"
            style={{ background: 'rgba(18,18,18,0.97)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <div className="flex flex-col gap-5">
              {['#capabilities', '#markets', '#projects', '#about', '#contact'].map((href, i) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[12px] font-medium uppercase tracking-[0.2em] transition-colors"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e87722')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                >
                  {['Services', 'Markets', 'Projects', 'About', 'Contact'][i]}
                </a>
              ))}
              <button
                onClick={goGC}
                className="mt-2 w-full py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all"
                style={{ background: '#e87722', border: '1px solid #e87722' }}
              >
                GC &amp; Architects — Submit RFI / RFP
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen w-full overflow-hidden">
        <HeroRotator />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 md:px-10" key={riseKey}>
          <span
            className="mb-5 block animate-hero-rise text-xs font-bold uppercase tracking-[0.4em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
            style={{ color: '#e87722', animationDelay: '200ms', animationFillMode: 'both' }}
          >
            Intelligent Infrastructure
          </span>
          <h1
            className="animate-hero-rise text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif', animationDelay: '500ms', animationFillMode: 'both' }}
          >
            Our legacy is the{' '}
            <em className="italic" style={{ color: '#e87722' }}>expertise</em>
            <br />
            behind yours.
          </h1>
          <div className="mt-10 flex animate-hero-rise" style={{ animationDelay: '900ms', animationFillMode: 'both' }}>
            <a
              href="#contact"
              className="px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-500"
              style={{ background: 'white', color: '#121212' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#e87722'; (e.currentTarget as HTMLAnchorElement).style.color = 'white' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'white'; (e.currentTarget as HTMLAnchorElement).style.color = '#121212' }}
            >
              Start a Project
            </a>
          </div>
        </div>
      </section>

      {/* ── Proof / Credentials ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(31,31,31,0.3)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="grid gap-12 md:grid-cols-4">
            {[
              { stat: '80+', label: 'Combined Years Experience' },
              { stat: '2019', label: 'Founded in Orange, CA' },
              { stat: 'Top 13%', label: 'California Low-Voltage Contractors' },
              { stat: '#1064391', label: 'C-7 Licensed & Insured' },
            ].map((p) => (
              <div key={p.label} className="space-y-4 pl-5" style={{ borderLeft: '2px solid rgba(232,119,34,0.6)' }}>
                <div
                  className="text-5xl italic md:text-6xl"
                  style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: '#e87722' }}
                >
                  {p.stat}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {p.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section id="capabilities" className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <div className="mb-20 flex items-baseline justify-between pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2
            className="text-4xl italic md:text-5xl"
            style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
          >
            Core Ecosystems
          </h2>
          <span className="text-[11px] uppercase tracking-widest" style={{ opacity: 0.4 }}>01 — 06</span>
        </div>
        <div className="grid grid-cols-1 gap-px md:grid-cols-2" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <CapCard title="Next-Gen AV Integration" body="Immersive conference environments and mission-critical display systems engineered for absolute uptime." img={capAv} imgAlt="Modern executive boardroom with seamless LED video wall" />
          <CapCard title="Low Voltage & Fiber" body="The backbone of enterprise. Precision cabling and infrastructure that powers the future of your facility." img={capFiber} imgAlt="Macro shot of precision fiber optic cabling" />
          <CapCard title="Security & Surveillance" body="AI-driven access control and computer vision platforms that evolve with your facility's security posture." />
          <CapCard title="Network Infrastructure" body="Secure, redundant architectures that eliminate downtime and optimize low-latency operations." />
          <CapCard title="Speech Privacy & Paging" body="Masking systems and distributed audio that ensure confidentiality and clear communication across your facility." />
          <CapCard title="Design Services & Consulting" body="From concept through commissioning — engineered drawings, system design, and technology consulting for any project scale." />
        </div>
      </section>

      {/* ── Intelligence Layer ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(31,31,31,0.3)' }}>
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-32 md:grid-cols-2 md:px-10">
          <div>
            <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: '#e87722' }}>
              The Intelligence Layer
            </span>
            <h2
              className="text-5xl leading-[0.95] md:text-6xl"
              style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
            >
              Your building,{' '}
              <em className="italic">awake.</em>
            </h2>
          </div>
          <div className="space-y-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
            <p className="text-lg leading-relaxed">
              Every system we deploy is wired into our 24/7 AI operations layer —
              a quiet, always-on partner that watches, predicts, and resolves
              before a ticket is ever filed.
            </p>
            <p className="leading-relaxed">
              From the boardroom LED wall to the fiber riser in the basement, your
              infrastructure becomes a single intelligent surface. One that earns
              its keep every minute of every day.
            </p>
            <div className="pt-4 pl-6" style={{ borderLeft: '2px solid #e87722' }}>
              <p
                className="text-2xl italic"
                style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: '#f5f5f5' }}
              >
                "The system that runs itself, so your people don't have to."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── About / Founders ── */}
      <section id="about" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-32 md:px-10">
          <Reveal>
            <div className="mb-16 flex items-baseline justify-between pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 className="text-4xl italic md:text-5xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                Built by Industry Veterans
              </h2>
              <span className="text-[11px] uppercase tracking-widest" style={{ opacity: 0.4 }}>About — 2019</span>
            </div>
          </Reveal>
          <div className="grid gap-16 md:grid-cols-5">
            <Reveal className="md:col-span-2">
              <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Encompass Technology Partners was founded in 2019 by three veterans of
                the commercial AV and low-voltage industry, with more than{' '}
                <span style={{ color: '#e87722' }}>80 combined years</span> designing and
                deploying mission-critical systems across the West Coast.
              </p>
              <p className="mt-6 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                We're not the biggest firm — and that's the point. Every project gets
                a principal at the table, a senior engineer on the drawings, and a
                certified technician on site. No layers. No handoffs. No surprises.
              </p>
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] md:text-base" style={{ color: '#e87722' }}>
                Top 13% of California Low-Voltage Contractors
              </p>
            </Reveal>
            <div className="grid gap-px md:col-span-3 md:grid-cols-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
              {[
                { name: 'Sean Sutton', role: 'Co-Founder / Principal', focus: 'Client Strategy & Design' },
                { name: 'Jason Voss', role: 'Co-Founder / Principal', focus: 'Operations & Engineering' },
                { name: 'Sean Smith', role: 'Co-Founder / Principal', focus: 'Field Delivery & Service' },
              ].map((p, i) => (
                <Reveal key={p.name} delay={i * 120}>
                  <div className="h-full p-10" style={{ background: '#121212' }}>
                    <div
                      className="mb-8 h-12 w-12 rounded-full"
                      style={{ border: '1px solid rgba(232,119,34,0.4)', background: 'rgba(232,119,34,0.1)' }}
                    />
                    <div className="text-2xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>{p.name}</div>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: '#e87722' }}>
                      {p.role}
                    </div>
                    <p className="mt-6 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.focus}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Markets ── */}
      <section id="markets" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(31,31,31,0.3)' }}>
        <div className="mx-auto max-w-7xl px-6 py-32 md:px-10">
          <Reveal>
            <div className="mb-16 flex items-baseline justify-between pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 className="text-4xl italic md:text-5xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                Markets We Serve
              </h2>
              <span className="text-[11px] uppercase tracking-widest" style={{ opacity: 0.4 }}>Verticals</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-px md:grid-cols-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
            {[
              { title: 'Corporate', body: 'Headquarters, boardrooms, and high-density office floors.' },
              { title: 'Healthcare', body: 'Clinical environments with strict uptime and compliance requirements.' },
              { title: 'Hospitality', body: 'Hotels, resorts, and venues where guest experience is the product.' },
              { title: 'Education', body: 'Higher-ed lecture halls, moot courts, and training facilities.' },
              { title: 'Multi-Tenant Commercial', body: 'Spec suites, tenant improvements, and amenity spaces.' },
              { title: 'Industrial & Logistics', body: 'Warehouses, distribution, and operations centers.' },
            ].map((m, i) => (
              <Reveal key={m.title} delay={(i % 3) * 100}>
                <div
                  className="group h-full p-10 transition-colors"
                  style={{ background: '#121212' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1f1f1f')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#121212')}
                >
                  <h3 className="mb-4 text-xl font-light md:text-2xl">{m.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section id="projects" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-32 md:px-10">
          <Reveal>
            <div className="mb-16 flex items-baseline justify-between pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 className="text-4xl italic md:text-5xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                Featured Projects
              </h2>
              <span className="text-[11px] uppercase tracking-widest" style={{ opacity: 0.4 }}>Selected Work</span>
            </div>
          </Reveal>
          <div className="grid gap-px md:grid-cols-3" style={{ background: 'rgba(255,255,255,0.1)' }}>
            {[
              {
                client: 'The New Home Company',
                title: 'Executive Boardroom',
                location: 'Irvine, CA',
                scope: 'Integrated LED display, conferencing, and acoustic treatment for a publicly-traded homebuilder\'s executive suite.',
              },
              {
                client: 'Westcliff Law School',
                title: 'Moot Court Technology',
                location: 'Tustin, CA',
                scope: 'Multi-camera capture, evidence display, and judge bench integration for student trial advocacy training.',
              },
              {
                client: 'Western Growers Association',
                title: 'Training & Event Space',
                location: 'Irvine, CA',
                scope: 'Reconfigurable training room with dual displays, wireless presentation, and ceiling microphone array.',
              },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <article className="flex h-full flex-col p-10" style={{ background: '#121212' }}>
                  <div
                    className="mb-8 aspect-[4/3] w-full transition-all"
                    style={{ background: 'linear-gradient(135deg, #1f1f1f, #121212)', outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }}
                  />
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: '#e87722' }}>
                    {p.location}
                  </div>
                  <h3 className="mt-3 text-2xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>{p.title}</h3>
                  <div className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{p.client}</div>
                  <p className="mt-6 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{p.scope}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div
            className="mt-12 flex flex-wrap items-center justify-between gap-6 pt-10"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            <p className="text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
              Procore active partner since 2024 — bid packages and submittals available on request.
            </p>
          </div>
        </div>
      </section>

      {/* ── Integration Partners ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', background: 'rgba(31,31,31,0.3)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <Reveal>
            <div className="mb-12 flex flex-col items-baseline justify-between gap-2 md:flex-row">
              <h2 className="text-3xl italic md:text-4xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                Integration Partners
              </h2>
              <span className="text-sm uppercase tracking-widest" style={{ opacity: 0.5 }}>
                Certified across the platforms that matter
              </span>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-3 gap-px md:grid-cols-6" style={{ background: 'rgba(255,255,255,0.1)' }}>
              {['Crestron', 'Planar', 'Logitech', 'Shure', 'Extron', 'Biamp'].map((brand) => (
                <div
                  key={brand}
                  className="flex aspect-[3/2] items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] transition-colors cursor-default"
                  style={{ background: '#121212', color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e87722')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {brand}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GC & Architects Portal ── */}
      <section id="gc" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em]" style={{ color: '#e87722' }}>
                  For General Contractors &amp; Architects
                </span>
                <h2 className="text-3xl md:text-4xl" style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}>
                  Bid packages. Submittals. RFI support.
                </h2>
                <p className="mt-4 max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  Encompass is a Procore-active trade partner. We provide complete bid packages,
                  engineered submittals, and real-time RFI responses to keep your schedule
                  on track from permit to punch list.
                </p>
              </div>
              <button
                onClick={() => setPage('gc')}
                className="shrink-0 px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] transition-all duration-300"
                style={{ background: '#e87722', color: 'white' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#c96a1a')}
                onMouseLeave={e => (e.currentTarget.style.background = '#e87722')}
              >
                Submit an RFI / RFP →
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact / Footer ── */}
      <footer
        id="contact"
        className="mx-auto max-w-7xl px-6 pb-12 pt-40 md:px-10"
      >
        <div className="pt-20" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="grid gap-20 md:grid-cols-2">
            <div>
              <h2
                className="mb-4 text-5xl leading-none md:text-6xl"
                style={{ fontFamily: 'Instrument Serif, Georgia, serif' }}
              >
                Let's hear <br />
                <em className="italic">from you.</em>
              </h2>
              <div className="mb-10 h-0.5 w-16" style={{ background: '#e87722' }} />
              <p className="mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                Encompass Technology Partners works directly with general contractors,
                developers, architects, and end users on commercial technology projects
                across Southern California and the West Coast.
              </p>
              <p className="mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Use the form to tell us about your project and someone from our team
                will follow up within one business day. For time-sensitive inquiries,
                please call us directly.
              </p>
              <ul className="space-y-6">
                <ContactRow icon="📍" label="Office Location">
                  <p style={{ color: 'rgba(255,255,255,0.85)' }}>134 S. Glassell Street</p>
                  <p style={{ color: 'rgba(255,255,255,0.85)' }}>Orange, CA 92866</p>
                </ContactRow>
                <ContactRow icon="📞" label="Phone">
                  <a href="tel:+17149205462" style={{ color: 'rgba(255,255,255,0.85)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e87722')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  >
                    (714) 920-5462
                  </a>
                </ContactRow>
                <ContactRow icon="✉" label="Email">
                  <a href="mailto:info@encompasstp.com" style={{ color: 'rgba(255,255,255,0.85)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#e87722')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                  >
                    info@encompasstp.com
                  </a>
                </ContactRow>
                <ContactRow icon="✓" label="CA License">
                  <p style={{ color: 'rgba(255,255,255,0.85)' }}>#1064391 — Active Low Voltage Systems</p>
                </ContactRow>
              </ul>
            </div>

            <form
              className="flex flex-col gap-6"
              onSubmit={(e) => {
                e.preventDefault()
                const fd = new FormData(e.currentTarget)
                const subject = encodeURIComponent(`Consultation Request — ${fd.get('service') || 'General Inquiry'}`)
                const body = encodeURIComponent(
                  `Full Name: ${fd.get('name')}\nCompany: ${fd.get('company')}\nEmail: ${fd.get('email')}\nPhone: ${fd.get('phone')}\nService of Interest: ${fd.get('service')}\n\nProject Description:\n${fd.get('notes')}`
                )
                window.location.href = `mailto:info@encompasstp.com?subject=${subject}&body=${body}`
              }}
            >
              <p
                className="text-2xl leading-snug md:text-3xl"
                style={{ fontFamily: 'Instrument Serif, Georgia, serif', color: 'rgba(255,255,255,0.85)' }}
              >
                Tell us about your project.
              </p>
              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { name: 'name', type: 'text', placeholder: 'FULL NAME *', required: true },
                  { name: 'company', type: 'text', placeholder: 'COMPANY / ORGANIZATION', required: false },
                  { name: 'email', type: 'email', placeholder: 'EMAIL ADDRESS *', required: true },
                  { name: 'phone', type: 'tel', placeholder: 'PHONE NUMBER', required: false },
                ].map((f) => (
                  <input
                    key={f.name}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    className="w-full bg-transparent py-4 text-sm outline-none transition-colors"
                    style={{
                      borderBottom: '1px solid rgba(255,255,255,0.2)',
                      color: '#f5f5f5',
                    }}
                    onFocus={e => (e.currentTarget.style.borderBottomColor = '#e87722')}
                    onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
                  />
                ))}
              </div>
              <select
                name="service"
                defaultValue=""
                className="w-full bg-transparent py-4 text-sm uppercase tracking-[0.2em] outline-none transition-colors"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#f5f5f5', background: '#121212' }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = '#e87722')}
                onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
              >
                <option value="" disabled>Service of Interest — Select One</option>
                <option value="Next-Gen AV Integration">Next-Gen AV Integration</option>
                <option value="Low Voltage & Fiber">Low Voltage &amp; Fiber</option>
                <option value="Security & Surveillance">Security &amp; Surveillance</option>
                <option value="Network Infrastructure">Network Infrastructure</option>
                <option value="Speech Privacy & Paging">Speech Privacy &amp; Paging</option>
                <option value="Design Services & Consulting">Design Services &amp; Consulting</option>
                <option value="Multiple / Not Sure">Multiple / Not sure</option>
              </select>
              <textarea
                name="notes"
                required
                placeholder="PROJECT DESCRIPTION — building type, size, scope, timeline"
                rows={3}
                className="w-full resize-none bg-transparent py-4 text-sm leading-relaxed outline-none transition-colors"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.2)', color: '#f5f5f5' }}
                onFocus={e => (e.currentTarget.style.borderBottomColor = '#e87722')}
                onBlur={e => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.2)')}
              />
              <button
                type="submit"
                className="mt-2 self-start pb-2 text-xs font-bold uppercase tracking-[0.3em] transition-colors text-white"
                style={{ borderBottom: '2px solid #e87722' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#e87722')}
                onMouseLeave={e => (e.currentTarget.style.color = 'white')}
              >
                Send Inquiry →
              </button>
              <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Submitting will open a pre-addressed message to the Encompass team in your email client.
              </p>
            </form>
          </div>

          {/* Logo lockup */}
          <div className="mt-20 flex justify-center">
            <div style={{ opacity: 0.4 }}>
              <NavBrand />
            </div>
          </div>

          <div
            className="mt-20 flex flex-col items-center justify-between gap-6 text-[10px] font-medium uppercase tracking-widest md:flex-row"
            style={{ opacity: 0.2 }}
          >
            <p>© {new Date().getFullYear()} Encompass Technology Partners. All systems active.</p>
            <div className="flex gap-8">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </footer>

      <FloatingChat />
    </div>
  )
}

function CapCard({
  title,
  body,
  img,
  imgAlt,
}: {
  title: string
  body: string
  img?: string
  imgAlt?: string
}) {
  return (
    <div
      className="group p-10 transition-colors md:p-12"
      style={{ background: '#121212' }}
      onMouseEnter={e => (e.currentTarget.style.background = '#1f1f1f')}
      onMouseLeave={e => (e.currentTarget.style.background = '#121212')}
    >
      <h3 className="mb-5 text-2xl font-light md:text-3xl">{title}</h3>
      <p className="mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{body}</p>
      {img ? (
        <div className="aspect-video w-full overflow-hidden" style={{ outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }}>
          <img
            src={img}
            alt={imgAlt ?? ''}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-video w-full" style={{ background: 'rgba(255,255,255,0.02)', outline: '1px solid rgba(255,255,255,0.1)', outlineOffset: '-1px' }} />
      )}
    </div>
  )
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: string
  label: string
  children: React.ReactNode
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {icon}
      </span>
      <div>
        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {label}
        </div>
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </li>
  )
}
