import { useEffect, useRef } from 'react'
import { site, work } from '../content'
import { clamp, onScroll } from '../scroll'
import { Art, ArrowLink, LabelBar, Reveal } from '../ui'

const TOPS = [50, 90, 130, 170]

export function Work() {
  const wrap = useRef<HTMLDivElement>(null)

  // Stacked sticky cards: each card shrinks a little more as later cards slide over it.
  useEffect(() => {
    const root = wrap.current
    if (!root) return
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-card]'))
    return onScroll(() => {
      if (window.innerWidth < 1200) {
        cards.forEach((c) => (c.style.transform = 'none'))
        return
      }
      const cover = cards.map((c, i) => {
        const next = cards[i + 1]
        if (!next) return 0
        const h = c.offsetHeight
        const gap = next.getBoundingClientRect().top - TOPS[i + 1]
        return clamp(1 - gap / (h * 0.9))
      })
      cards.forEach((c, i) => {
        let s = 1
        for (let j = i; j < cards.length - 1; j++) s -= 0.05 * cover[j]
        c.style.transform = s < 0.9995 ? `scale(${s})` : 'none'
      })
    })
  }, [])

  return (
    <section
      id="work"
      className="relative z-1 flex w-full flex-none flex-col items-center gap-15 bg-white px-6 pt-6 pb-20 m:gap-20 m:pb-30"
    >
      <div className="flex w-full max-w-360 flex-col items-center gap-20">
        <LabelBar label={work.label} meta={work.meta} />
      </div>

      <div className="flex w-full max-w-360 flex-col gap-10 m:gap-12.5 l:flex-row l:items-start l:justify-between l:gap-0">
        {/* left: sticky title */}
        <div className="flex w-full max-w-62.5 flex-col gap-4 l:sticky l:top-0 l:flex-1 l:py-50">
          <Reveal>
            <h2 className="type-heading-4">
              Selected
              <br />
              Work
            </h2>
          </Reveal>
          <div className="h-px w-full bg-black/16" />
          <ArrowLink href="#contact">{work.cta}</ArrowLink>
        </div>

        {/* center: stacked cards */}
        <div ref={wrap} className="flex w-full flex-col gap-10 m:gap-12.5 l:max-w-223 l:flex-1 l:gap-20 l:px-11.5">
          {work.items.map((it, i) => {
            const frame = 'aspect-[4/5] w-full rounded-[3px] m:aspect-[1.3/1] l:aspect-[1.58/1]'
            const body = (
              <>
                {it.src ? (
                  <img src={it.src} alt={it.title} className={`${frame} object-cover`} />
                ) : (
                  <Art k={it.art} className={frame} />
                )}
                <div className="type-body-3 flex items-center justify-between pt-2.5">
                  <span className="text-black">
                    {it.title}
                    {it.href && <span className="ml-2 text-black/40">↗</span>}
                  </span>
                  <span className="text-black/50">{it.cat}</span>
                </div>
              </>
            )
            return (
              <div
                key={it.title}
                data-card=""
                className="w-full origin-top bg-white l:sticky"
                style={{ top: TOPS[i] }}
              >
                {it.href ? (
                  <a href={it.href} target="_blank" rel="noreferrer" className="block">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </div>
            )
          })}
        </div>

        {/* right: sticky "see all" pill */}
        <div className="flex w-full max-w-62.5 l:sticky l:top-0 l:flex-1 l:justify-center l:py-50">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="group type-body-3 flex w-min cursor-pointer items-center gap-4 overflow-clip rounded-full bg-neutral-50 py-0.75 pr-4 pl-0.75 whitespace-nowrap transition-colors duration-300 hover:bg-neutral-900 hover:text-white"
          >
            <span
              aria-hidden="true"
              className="size-11 rounded-full bg-cover transition-transform duration-500 group-hover:scale-90"
              style={{ backgroundImage: 'url(/images/sabny.jpg)', backgroundPosition: '48% 35%' }}
            />
            {work.all}
          </a>
        </div>
      </div>
    </section>
  )
}
