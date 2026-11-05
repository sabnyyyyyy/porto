import { profile } from '../content'
import { scrollToTarget } from '../scroll'
import { ArrowUR, LabelBar, Reveal } from '../ui'

export function Pricing() {
  return (
    <section
      id="profile"
      className="slant-top relative z-1 flex w-full flex-none flex-col items-center gap-15 bg-white px-6 pt-6 pb-20 m:gap-20 m:pb-30 l:gap-15"
    >
      <div className="flex w-full max-w-360 flex-col items-center gap-20">
        <LabelBar label={profile.label} meta={profile.meta} />
      </div>

      <div className="flex w-full max-w-360 flex-col items-start gap-2.5 l:flex-row">
        {profile.plans.map((p, i) => {
          const external = p.href.startsWith('http')
          return (
            <Reveal key={p.name} delay={i * 0.1} className="w-full l:w-px l:flex-1 l:shrink-0 l:basis-0">
              <div
                className={`flex w-full flex-col items-start gap-10 rounded-[5px] p-7.5 ${p.dark ? 'bg-neutral-900 text-white' : 'bg-neutral-50 text-black'}`}
              >
                <div className="flex w-full flex-col gap-2.5">
                  <h3 className="type-body-3">{p.name}</h3>
                  <p className={`type-body-5 max-w-56 ${p.dark ? 'text-white/55' : 'text-black/55'}`}>{p.desc}</p>
                </div>

                <div className="flex flex-wrap items-end gap-2">
                  <span className="text-[56px] leading-[0.95] font-medium tracking-[-3px] m:text-[64px] l:text-[72px]">
                    {p.big}
                  </span>
                  <span className={`type-body-5 pb-2 ${p.dark ? 'text-white/55' : 'text-black/55'}`}>/ {p.unit}</span>
                </div>

                <a
                  href={p.href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  onClick={(e) => {
                    if (!external) {
                      e.preventDefault()
                      scrollToTarget(p.href)
                    }
                  }}
                  className={`group type-body-3 flex items-center gap-3 rounded-full py-2.5 pr-3 pl-5 transition-colors duration-300 ${p.dark ? 'bg-white text-black hover:bg-white/85' : 'bg-black text-white hover:bg-black/80'}`}
                >
                  {p.cta}
                  <span className="grid size-5 place-items-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUR size={9} />
                  </span>
                </a>

                <div className="flex w-full flex-col gap-4.5">
                  <span className="type-body-3">Details</span>
                  <ul className="flex flex-col gap-2">
                    {p.features.map((f) => (
                      <li key={f} className={`type-body-5 flex gap-2 ${p.dark ? 'text-white/70' : 'text-black/65'}`}>
                        <span className="opacity-50">›</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
