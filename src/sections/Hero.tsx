import { useState, type CSSProperties } from 'react'
import { hero, nav, site } from '../content'
import { scrollToTarget } from '../scroll'
import { ArrowLink } from '../ui'
import { HeroGL } from './HeroGL'

const enter = (delay: number, y = '20%'): CSSProperties =>
  ({
    '--enter-y': y,
    '--enter-delay': `${delay}s`,
    '--enter-duration': 'var(--hero-duration)',
    '--enter-ease': 'var(--hero-ease)',
  }) as CSSProperties

export function Hero() {
  const [open, setOpen] = useState(false)

  const go = (href: string) => {
    setOpen(false)
    scrollToTarget(href === '#top' ? 0 : href)
  }

  return (
    <section
      id="top"
      className="sticky top-0 z-1 flex h-screen w-full flex-none flex-col items-center justify-between overflow-clip bg-neutral-900 p-6 text-white"
    >
      {/* background image + interactive WebGL layer */}
      <div
        className="animate-enter absolute inset-0 overflow-clip"
        style={{ '--enter-scale': 1.15, '--enter-opacity': 1, '--enter-duration': '2.6s', '--enter-ease': 'var(--hero-ease)' } as CSSProperties}
      >
        {site.heroImage && (
          <img
            src={site.heroImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover"
            style={{ objectPosition: site.heroPosition }}
          />
        )}
        <HeroGL src={site.heroImage} focus={site.heroFocus} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/20" />

      {/* header */}
      <div className="absolute top-0 right-0 left-0 z-2 l:top-6 l:right-6 l:left-6">
        <header className="relative flex w-full items-center justify-between p-6 l:p-0">
          <a
            href="#top"
            aria-label={`${site.name} home`}
            onClick={(e) => {
              e.preventDefault()
              go('#top')
            }}
            className="animate-enter flex items-center gap-1.5 l:w-[22%]"
            style={enter(0.6)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M1 12V6a6 6 0 0 1 12 0v6H9V6a2 2 0 0 0-4 0v6Z" fill="#fff" />
            </svg>
            <span className="text-[15px] font-bold tracking-tight uppercase">{site.logo}</span>
          </a>

          <nav className="hidden items-center justify-center gap-[44px] l:flex" aria-label="Primary">
            {nav.map((n, i) => (
              <a
                key={n.label}
                href={n.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(n.href)
                }}
                className="nav-link animate-enter relative flex cursor-pointer items-end gap-3 overflow-clip"
                style={enter(0.68 + i * 0.08)}
              >
                <span className="relative">
                  <span className="type-body-3 block">{n.label}</span>
                  <span className="nav-underline absolute -inset-x-px bottom-0.5 z-1 h-px bg-white" />
                </span>
                <span className="type-body-6 pb-2 text-white/50">{String(i + 1).padStart(2, '0')}</span>
              </a>
            ))}
          </nav>

          <div className="hidden w-[22%] l:block" />

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="animate-enter -m-1 cursor-pointer p-1 l:hidden"
            style={enter(0.68)}
          >
            <span className="relative block size-6" aria-hidden="true">
              <span
                className="absolute top-1/2 left-1/2 -mt-px -ml-[9px] h-0.5 w-4.5 rounded-[1px] bg-white transition-transform duration-300"
                style={{ transform: open ? 'rotate(45deg)' : 'translateY(-4px)' }}
              />
              <span
                className="absolute top-1/2 left-1/2 -mt-px -ml-[9px] h-0.5 w-4.5 rounded-[1px] bg-white transition-transform duration-300"
                style={{ transform: open ? 'rotate(-45deg)' : 'translateY(4px)' }}
              />
            </span>
          </button>
        </header>
      </div>

      {/* mobile menu */}
      <div
        id="mobile-menu"
        className={`absolute inset-0 z-3 flex flex-col justify-end gap-2 bg-neutral-900/95 p-6 pb-20 transition-opacity duration-500 l:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        {nav.map((n, i) => (
          <a
            key={n.label}
            href={n.href}
            onClick={(e) => {
              e.preventDefault()
              go(n.href)
            }}
            className="type-heading-3 flex items-start gap-2 border-b border-white/10 py-3"
          >
            {n.label}
            <span className="type-body-6 text-white/50">{String(i + 1).padStart(2, '0')}</span>
          </a>
        ))}
      </div>

      {/* intro copy */}
      <div className="relative z-1 mt-16 flex w-full flex-1 flex-col justify-start self-stretch pt-24 m:pt-28 l:mt-0 l:pt-[16vh]">
        <div className="max-w-[260px]">
          <p className="animate-enter type-body-3" style={enter(0.9, '30%')}>
            <span className="text-white">{hero.lead}</span>{' '}
            <span className="text-white/55">{hero.leadDim}</span>
          </p>
          <div className="animate-enter mt-6" style={enter(1.05, '30%')}>
            <ArrowLink href="#work" className="text-white" onClick={() => scrollToTarget('#work')}>
              {hero.cta}
            </ArrowLink>
          </div>
        </div>
      </div>

      {/* tags */}
      <ul
        className="animate-enter type-body-3 absolute bottom-28 left-6 z-1 m:bottom-36 l:bottom-[22%] l:left-[18%]"
        style={enter(1.15, '30%')}
      >
        {hero.tags.map((t, i) => (
          <li key={t} className="flex gap-1">
            {i === 0 && <span className="text-white/55">01/</span>}
            <span className={i === 0 ? '' : 'pl-[1.65em]'}>{t}</span>
          </li>
        ))}
      </ul>

      <div className="animate-enter type-body-3 absolute bottom-6 left-6 z-1" style={enter(1.2, '30%')}>
        {site.year}
      </div>

      {/* wordmark */}
      <h1
        aria-label={site.name}
        className="type-heading-1 relative z-1 -mb-[0.04em] flex w-full justify-end self-end overflow-clip pr-0 text-white uppercase l:max-w-[69%]"
      >
        {site.name.split('').map((ch, i) => (
          <span key={i} className="overflow-hidden pt-[0.05em] pb-[0.02em]" aria-hidden="true">
            <span className="wordmark-letter" style={{ '--i': i, '--wordmark-delay': '0.6s' } as CSSProperties}>
              {ch}
            </span>
          </span>
        ))}
      </h1>
    </section>
  )
}
