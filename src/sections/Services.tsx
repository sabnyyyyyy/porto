import { services } from '../content'
import { Art, ArrowLink, LabelBar, Reveal, ScrollWords } from '../ui'

export function Services() {
  return (
    <section
      id="services"
      className="slant-top relative z-1 flex w-full flex-none flex-col items-center gap-15 bg-neutral-900 px-6 pt-6 pb-20 text-white m:gap-20 m:pb-30 l:gap-25 l:pb-40"
    >
      <div className="flex w-full max-w-360 flex-col items-center gap-25 m:gap-30 l:gap-57.75">
        <LabelBar dark label={services.label} meta={services.meta} />

        <div className="flex w-full flex-col items-start gap-10 m:gap-17.5">
          <div className="relative w-full">
            <ScrollWords
              text={services.statement}
              className="type-heading-3"
              indent="clamp(0px, 16vw, 260px)"
            />
            {/* small floating portrait: its bottom edge lines up with the first text line */}
            <div className="absolute top-[-72px] left-0 z-1 hidden aspect-[0.7672/1] w-23.5 overflow-clip rounded-[5px] m:block l:top-[-166px] l:w-44">
              <Art k="rose" className="size-full" />
            </div>
          </div>
          <div className="flex w-full items-center gap-12.5 l:gap-57.5">
            <ArrowLink href="#pricing" className="text-white">
              {services.cta}
            </ArrowLink>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-360 flex-col items-center gap-17.5 l:pl-23.5">
        {services.items.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.04} className="relative z-3 w-full bg-neutral-900">
            <div className="flex w-full flex-col items-start gap-6">
              <div className="flex w-full flex-col items-start gap-5 l:flex-row l:items-center l:justify-between">
                <span className="text-[96px] leading-[0.9] font-medium tracking-[-5px] text-white m:text-[140px] l:w-[28%] l:text-[190px] l:tracking-[-9px]">
                  {s.n}
                </span>
                {s.src ? (
                  <div
                    role="img"
                    aria-label={`${s.tag} example`}
                    className="aspect-[1.7/1] w-full rounded-[5px] bg-cover l:w-[30%]"
                    style={{ backgroundImage: `url(${s.src})`, backgroundPosition: s.pos }}
                  />
                ) : (
                  <Art k={s.art} className="aspect-[1.7/1] w-full rounded-[5px] l:w-[30%]" />
                )}
                <div className="flex w-full flex-col justify-between gap-10 l:w-[34%] l:min-h-48">
                  <h3 className="type-heading-4 text-white">{s.tag}</h3>
                  <div className="flex flex-col gap-2">
                    <span className="type-body-3 text-white">{s.title}</span>
                    <p className="type-body-5 max-w-90 text-white/55">{s.text}</p>
                  </div>
                </div>
              </div>
              <div className="h-px w-full bg-white/10" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
