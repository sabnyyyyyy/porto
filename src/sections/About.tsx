import { useEffect, useRef, type CSSProperties } from 'react'
import { about, logos } from '../content'
import { clamp, onScroll, scrollToTarget } from '../scroll'
import { ArrowLink, LabelBar, Marquee, Reveal, useInView } from '../ui'

/** Statement paragraph: each line slides up out of a mask. */
function Statement({ text }: { text: string }) {
  const [ref, seen] = useInView<HTMLParagraphElement>(0.2)
  const words = text.split(' ')
  return (
    <p ref={ref} className={`type-heading-3 text-black ${seen ? 'in' : ''}`}>
      <span
        aria-hidden="true"
        className="inline-block align-bottom"
        style={{ width: 'clamp(0px, 31vw, 520px)', height: '1px' }}
      />
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block"
            style={{
              transform: seen ? 'none' : 'translateY(110%)',
              transition: `transform 1.1s var(--ease) ${i * 0.025}s`,
            }}
          >
            {w}
            {' '}
          </span>
        </span>
      ))}
    </p>
  )
}

/** Image split into vertical strips that rise at different speeds while scrolling. */
function StripImage() {
  const ref = useRef<HTMLDivElement>(null)
  const N = 4
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cols = Array.from(el.querySelectorAll<HTMLElement>('[data-col]'))
    return onScroll(() => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const p = clamp((vh - r.top) / (vh * 0.9 + r.height * 0.3))
      cols.forEach((c, i) => {
        const delay = 0.12 * (N - 1 - i)
        const t = clamp((p - delay) / (1 - delay * 1.4))
        const e = 1 - Math.pow(1 - t, 3)
        c.style.transform = `translateY(${(1 - e) * (90 + i * 38)}%)`
      })
    })
  }, [])
  return (
    <div
      ref={ref}
      role="img"
      aria-label={about.photo.alt}
      className="relative flex h-110 w-full flex-none items-end justify-center gap-2.5 overflow-clip rounded-[5px] m:h-screen l:h-110 l:w-82"
    >
      {Array.from({ length: N }, (_, i) => (
        <div key={i} data-col="" className="relative h-full w-px flex-1 shrink-0 basis-0 overflow-clip rounded-[5px]">
          {/* every column shows its own slice of the same photo (10px = the flex gap) */}
          <div
            className="absolute top-0 h-full bg-no-repeat"
            style={
              {
                width: `calc(${N * 100}% + ${(N - 1) * 10}px)`,
                left: `calc(${-i} * (100% + 10px))`,
                backgroundImage: `url(${about.photo.src})`,
                backgroundSize: 'auto 112%',
                backgroundPosition: about.photo.position,
              } as CSSProperties
            }
          />
        </div>
      ))}
    </div>
  )
}

export function About() {
  return (
    <section
      id="about"
      className="slant-top relative z-1 flex w-full flex-none flex-col items-center bg-white px-6 pt-6 pb-2"
    >
      <div className="flex w-full max-w-360 flex-col items-center gap-15 m:gap-20">
        <LabelBar label={about.label} meta={about.meta} />
        <div className="w-full">
          <Statement text={about.statement} />
        </div>
      </div>

      <div className="h-10 w-full flex-none m:h-12.5 l:h-27.5" />

      <div className="flex w-full max-w-360 flex-none flex-col items-start gap-10 m:gap-12.5 l:flex-row l:justify-between">
        <StripImage />
        <div className="hidden w-57.25 flex-none self-stretch l:block" />
        <div className="flex w-full max-w-208.75 flex-none flex-col items-start gap-10 m:gap-20 l:flex-1">
          {about.rows.map((row, i) => (
            <Reveal key={row.k} delay={i * 0.08} className="flex w-full flex-col items-start gap-5 m:flex-row m:gap-50">
              <span className="type-body-3 w-24 flex-none text-black">{row.k}</span>
              {row.v ? (
                <p className="type-body-5 max-w-72 text-black/60">{row.v}</p>
              ) : (
                <div className="w-full max-w-87.5">
                  {row.stats?.map(([k, v]) => (
                    <div key={k} className="type-body-5 flex justify-between border-b border-black/10 py-2.5 text-black/70 first:border-t">
                      <span>{k}</span>
                      <span>{v}</span>
                    </div>
                  ))}
                  <div className="mt-14">
                    <ArrowLink href="#work" onClick={() => scrollToTarget('#work')}>
                      {about.cta}
                    </ArrowLink>
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {/* client logos */}
      <div className="mt-16 w-full flex-none border-t border-black/10 py-6 m:mt-24">
        <Marquee duration={36}>
          {logos.map((l, i) => (
            <div
              key={i}
              className="mr-3 flex h-34 w-52 flex-none items-center justify-center rounded-[5px] bg-neutral-50 text-[17px] font-bold tracking-tight text-black/80 m:w-60"
            >
              {l}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
