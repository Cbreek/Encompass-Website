export function NavBrand() {
  return (
    <div className="flex items-center gap-3">
      <svg
        viewBox="-40 -40 80 80"
        className="h-9 w-9 md:h-10 md:w-10 shrink-0 text-white"
        role="img"
        aria-hidden="true"
      >
        <circle r="34" fill="none" stroke="currentColor" strokeWidth="3" />
        <g stroke="currentColor" strokeWidth="1" opacity="0.4">
          <line x1="0" y1="-28" x2="0" y2="28" />
          <line x1="-28" y1="0" x2="28" y2="0" />
        </g>
        <polygon points="0,-26 6,0 0,6 -6,0" fill="#C41E3A" />
        <polygon points="0,26 6,0 0,-6 -6,0" fill="currentColor" opacity="0.7" />
        <polygon points="26,0 0,6 -6,0 0,-6" fill="currentColor" opacity="0.25" />
        <polygon points="-26,0 0,6 6,0 0,-6" fill="currentColor" opacity="0.25" />
        <circle r="2.5" fill="currentColor" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="text-lg font-bold tracking-tight md:text-xl"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          <span style={{ color: '#C41E3A' }}>Enc</span>
          <span className="text-white">ompass</span>
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 md:text-[11px]">
          Technology Partners
        </span>
      </span>
    </div>
  )
}
