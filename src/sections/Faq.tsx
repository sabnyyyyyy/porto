import { useState } from 'react'
import { faq } from '../content'
import { Art, LabelBar, Reveal } from '../ui'

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="relative z-1 flex w-full flex-none flex-col items-center gap-15 bg-white px-6 pt-6 pb-40 m:gap-20 l:pb-56">
      <div className="flex w-full max-w-360 flex-col items-center gap-20">
        <LabelBar label={faq.label} />
      </div>

      <div className="flex w-full max-w-360 flex-col gap-10 l:flex-row l:justify-between">
        <Reveal className="w-full max-w-62.5 flex-none l:w-82 l:max-w-none">
          <a href="#contact" className="group block w-full max-w-62.5 l:w-62.5">
            <div className="overflow-clip rounded-[3px]">
              <Art k="clay" className="aspect-[1.3/1] w-full transition-transform duration-[900ms] group-hover:scale-105" />
            </div>
            <div className="type-body-3 flex items-center justify-between pt-2">
              <span className="flex items-center gap-1.5 text-black">
                <svg width="7" height="8" viewBox="0 0 7 8" aria-hidden="true">
                  <path d="M0 0 7 4 0 8Z" fill="currentColor" />
                </svg>
                Play
              </span>
              <span className="text-black/50">Showreel</span>
            </div>
          </a>
        </Reveal>

        <div className="w-full l:max-w-186">
          {faq.items.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal key={f.q} delay={i * 0.05}>
                <div className="border-b border-black/10 first:border-t">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="type-body-3 flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left"
                  >
                    <span>{f.q}</span>
                    <span className="relative block size-3 flex-none" aria-hidden="true">
                      <span className="absolute top-1/2 left-0 h-px w-full bg-black" />
                      <span
                        className="absolute top-0 left-1/2 h-full w-px bg-black transition-transform duration-500 ease-[var(--ease)]"
                        style={{ transform: isOpen ? 'scaleY(0)' : 'none' }}
                      />
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease)]"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="type-body-5 max-w-120 pb-5 text-black/55">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
