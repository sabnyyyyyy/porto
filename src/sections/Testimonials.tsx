import { useEffect, useState } from 'react'
import { banner, site, testimonials } from '../content'
import { Art, ArrowLink, LabelBar, Marquee, Reveal } from '../ui'

export function Testimonials() {
  const items = testimonials.items
  const [idx, setIdx] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 6000)
    return () => clearInterval(t)
  }, [paused, items.length])

  const cur = items[idx]
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <>
      <section
        id="testimonials"
        className="relative z-1 flex w-full flex-none flex-col items-center gap-27.5 bg-white px-6 pt-6 pb-20 m:pb-30"
      >
        <div className="flex w-full max-w-360 flex-col items-center gap-20">
          <LabelBar label={testimonials.label} meta={testimonials.meta} />
        </div>

        <div
          className="flex w-full max-w-360 flex-col gap-10 l:flex-row l:items-start l:justify-between"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex w-full max-w-62.5 flex-none flex-col gap-2.5 l:w-82 l:max-w-none">
            <div className="relative aspect-[0.78/1] w-full overflow-clip rounded-[5px] l:w-50">
              {items.map((t, i) =>
                t.src ? (
                  <div
                    key={i}
                    role="img"
                    aria-label={t.name}
                    className="absolute inset-0 bg-cover transition-opacity duration-700"
                    style={{ opacity: i === idx ? 1 : 0, backgroundImage: `url(${t.src})`, backgroundPosition: t.pos }}
                  />
                ) : (
                  <Art
                    key={i}
                    k={t.art}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: i === idx ? 1 : 0 }}
                  />
                ),
              )}
            </div>
            <div className="type-body-3 flex flex-col">
              <span key={idx} className="text-black">{cur.name}</span>
              <span className="text-black/50">{cur.role}</span>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-10 l:max-w-225">
            <blockquote
              key={idx}
              className="type-heading-4 animate-enter text-black"
              style={
                {
                  textIndent: 'clamp(0px, 10vw, 150px)',
                  '--enter-y': '16px',
                  '--enter-duration': '0.9s',
                  '--enter-ease': 'var(--ease)',
                } as React.CSSProperties
              }
            >
              “{cur.quote}”
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="type-body-3 flex gap-2">
                <span className="text-black">{pad(idx + 1)}</span>
                <span className="text-black/40">/ {pad(items.length)}</span>
              </div>
              <div className="ml-auto flex gap-2">
                {(['‹', '›'] as const).map((s, k) => (
                  <button
                    key={s}
                    type="button"
                    aria-label={k === 0 ? 'Previous testimonial' : 'Next testimonial'}
                    onClick={() => setIdx((i) => (i + (k === 0 ? -1 : 1) + items.length) % items.length)}
                    className="grid size-10 cursor-pointer place-items-center rounded-full bg-neutral-50 text-lg transition-colors duration-300 hover:bg-neutral-900 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* big marquee + contact card */}
      <section
        id="contact"
        className="relative z-1 flex w-full flex-none flex-col items-center gap-6 bg-white px-6 pb-6"
      >
        <div className="relative w-full max-w-360 overflow-clip rounded-[5px]">
          <Art k="sea" className="aspect-[3/4] w-full m:aspect-[16/10] l:aspect-[16/8.4]" />
          <div className="absolute inset-0 flex flex-col justify-between">
            <Marquee duration={30} className="pt-8">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i} className="type-heading-2 mr-16 flex-none whitespace-nowrap text-white">
                  {banner.text}
                  <span className="mx-8 opacity-60">—</span>
                </span>
              ))}
            </Marquee>
            <Reveal className="mx-auto mb-10 flex w-52 flex-col items-center gap-3 rounded-[5px] bg-black/25 p-3 backdrop-blur-md m:w-60">
              <div
                role="img"
                aria-label="Ikhsan Arlatin Sani"
                className="aspect-[0.8/1] w-full rounded-[3px] bg-cover"
                style={{ backgroundImage: 'url(/images/sabny.jpg)', backgroundPosition: '48% 40%' }}
              />
              <ArrowLink href={`mailto:${site.email}`} className="w-full text-white">
                {banner.cta}
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
