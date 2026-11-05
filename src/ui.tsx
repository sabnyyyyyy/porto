import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { art, type ArtKey } from './content'
import { clamp, onScroll } from './scroll'

/* ---------- Icons ---------- */
export function ArrowUR({ size = 10 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M1 9 9 1M3 1h6v6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}

/* ---------- Placeholder artwork ---------- */
export function Art({ k, className = '', style }: { k: ArtKey; className?: string; style?: CSSProperties }) {
  const p = art[k]
  const vars = {
    '--a': p.a,
    '--b': p.b,
    '--c': p.c,
    '--x': p.x,
    '--y': p.y,
    '--s': p.shape,
    '--sx': p.sx,
    '--sy': p.sy,
    '--sw': p.sw,
    ...style,
  } as CSSProperties
  return (
    <div className={`art ${className}`} style={vars} role="img" aria-label="Placeholder artwork">
      <span className="art-shape" />
    </div>
  )
}

/* ---------- Reveal on scroll (IntersectionObserver) ---------- */
export function useInView<T extends HTMLElement>(threshold = 0.15, once = true) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          if (once) io.disconnect()
        } else if (!once) setSeen(false)
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold, once])
  return [ref, seen] as const
}

export function Reveal({
  children,
  delay = 0,
  y,
  className = '',
  as: Tag = 'div',
  style,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'p' | 'h2' | 'h3' | 'li' | 'span' | 'a'
  style?: CSSProperties
}) {
  const [ref, seen] = useInView<HTMLElement>(0.12)
  const Comp = Tag as 'div'
  return (
    <Comp
      ref={ref as never}
      data-reveal=""
      className={`${seen ? 'in' : ''} ${className}`}
      style={{ '--d': `${delay}s`, ...(y !== undefined ? { '--y': `${y}px` } : {}), ...style } as CSSProperties}
    >
      {children}
    </Comp>
  )
}

/* ---------- Section label bar: line draws in, then label + meta ---------- */
export function LabelBar({ label, meta, dark = false }: { label: string; meta?: string; dark?: boolean }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.3)
  return (
    <div ref={ref} className="w-full">
      <div
        data-line=""
        className={`h-px w-full ${seen ? 'in' : ''} ${dark ? 'bg-white/16' : 'bg-black/16'}`}
      />
      <div
        data-reveal=""
        style={{ '--d': '0.25s', '--y': '10px' } as CSSProperties}
        className={`type-body-3 flex items-center justify-between gap-4 pt-3 ${seen ? 'in' : ''}`}
      >
        <span className={dark ? 'text-white' : 'text-black'}>{label}</span>
        {meta && <span className={dark ? 'text-white/50' : 'text-black/50'}>{meta}</span>}
      </div>
    </div>
  )
}

/* ---------- Underlined arrow link ---------- */
export function ArrowLink({
  children,
  href = '#',
  className = '',
  onClick,
}: {
  children: ReactNode
  href?: string
  className?: string
  onClick?: () => void
}) {
  return (
    <a href={href} onClick={onClick} className={`alink type-body-3 cursor-pointer ${className}`}>
      <span>{children}</span>
      <ArrowUR />
    </a>
  )
}

/* ---------- Heading whose words light up while you scroll ---------- */
export function ScrollWords({
  text,
  className = '',
  indent = '0',
  from = 'rgba(255,255,255,.28)',
  to = '#fff',
}: {
  text: string
  className?: string
  indent?: string
  from?: string
  to?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = text.split(' ')
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = Array.from(el.querySelectorAll<HTMLElement>('[data-w]'))
    return onScroll(() => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when the block enters at the bottom, 1 when its end reaches ~35% of the viewport
      const p = clamp((vh * 0.92 - r.top) / (r.height + vh * 0.45))
      const n = spans.length
      spans.forEach((s, i) => {
        const t = clamp(p * (n + 6) - i)
        s.style.color = `color-mix(in srgb, ${to} ${Math.round(t * 100)}%, ${from})`
      })
    })
  }, [])
  return (
    <p ref={ref} className={className} style={{ textIndent: indent }}>
      {words.map((w, i) => (
        <span key={i} data-w="" style={{ color: from }}>
          {w}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}

/* ---------- Count-up number ---------- */
export function CountUp({ to, suffix = '', duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const [ref, seen] = useInView<HTMLSpanElement>(0.4)
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!seen) return
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = clamp((now - t0) / duration)
      const e = 1 - Math.pow(1 - t, 4)
      setV(Math.round(to * e))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to, duration])
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  )
}

/* ---------- Infinite marquee ---------- */
export function Marquee({
  children,
  duration = 40,
  className = '',
}: {
  children: ReactNode
  duration?: number
  className?: string
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="marquee-track" style={{ '--marquee-duration': `${duration}s` } as CSSProperties}>
        <div className="flex flex-none">{children}</div>
        <div className="flex flex-none" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
