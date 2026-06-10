export function FloatingChat() {
  return (
    <a
      href="#contact"
      className="fixed bottom-8 right-8 z-50 flex h-[84px] w-[84px] items-center justify-center rounded-full border-2 transition-all duration-300 hover:scale-105"
      style={{ borderColor: '#e87722', background: 'transparent' }}
      aria-label="Contact us"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </a>
  )
}
