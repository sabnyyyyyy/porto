import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { footer, nav, site } from '../content'
import { scrollToTarget } from '../scroll'
import { ArrowLink, ArrowUR, useInView } from '../ui'

export function Footer() {
  const [ref, seen] = useInView<HTMLElement>(0.1)
  const markRef = useRef<HTMLDivElement>(null)
  const [, force] = useState(0)

  useEffect(() => {
    const on = () => force((n) => n + 1)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])

  return (
    <footer
      ref={ref}
      className="glow-gradient slant-top relative z-1 flex w-full flex-none flex-col items-center justify-end gap-17.5 px-6 pt-11.2 text-white"
    >
      <div className="flex w-full max-w-360 flex-col gap-10 l:flex-row l:justify-between">
        <div className="flex flex-col gap-8 border-t border-white/16 pt-10 l:w-1/2">
          <h2 className="type-heading-4 text-[36px] leading-[36px] m:text-[56px] m:leading-[56px]">
            <span className="block text-white/50">{footer.lead}</span>
            <a href={`mailto:${site.email}`} className="block text-white">
              {site.email}
            </a>
          </h2>
          <div className="flex flex-wrap gap-x-10 gap-y-6">
            <ArrowLink href={`mailto:${site.email}`} className="text-white">
              {footer.cta}
            </ArrowLink>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="alink type-body-3 cursor-pointer text-white"
            >
              <span>GitHub</span>
              <ArrowUR />
            </a>
          </div>
        </div>

        <nav className="flex w-full flex-col l:w-100" aria-label="Footer">
          {nav.map((n, i) => (
            <a
              key={n.label}
              href={n.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToTarget(n.href === '#top' ? 0 : n.href)
              }}
              className="nav-link type-body-3 group relative flex items-start gap-2 border-t border-white/16 py-3.5 first:border-t-0 l:first:border-t"
              style={{ opacity: i === 0 ? 1 : 0.6 }}
            >
              <span>{n.label}</span>
              <span className="type-body-6 text-white/50">{String(i + 1).padStart(2, '0')}</span>
            </a>
          ))}
          <div className="border-t border-white/16" />
        </nav>
      </div>

      <div className="relative flex w-full max-w-360 flex-col items-start justify-between gap-6 border-t border-white/16 pt-0 m:flex-row m:items-end">
        <div ref={markRef} className="type-heading-1 -mb-[0.06em] flex overflow-clip uppercase">
          {site.name.split('').map((ch, i) => (
            <span key={i} className="overflow-hidden pt-[0.05em]">
              <span
                className="inline-block"
                style={
                  {
                    transform: seen ? 'none' : 'translateY(105%)',
                    transition: `transform 1.3s var(--hero-ease) ${i * 0.08}s`,
                  } as CSSProperties
                }
              >
                {ch}
              </span>
            </span>
          ))}
        </div>
        <div className="type-body-5 flex flex-col items-end gap-1 pb-6 text-right m:pb-8">
          <span>{footer.rights}</span>
          <span className="text-white/50">{site.role} · {site.location}</span>
        </div>
      </div>
    </footer>
  )
}
