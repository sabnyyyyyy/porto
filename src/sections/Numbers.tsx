import { numbers } from '../content'
import { ArrowUR, LabelBar, Reveal } from '../ui'

export function Numbers() {
  return (
    <section className="relative z-1 flex w-full flex-none flex-col items-center gap-15 bg-white px-6 pt-6 pb-20 m:gap-20 m:pb-30">
      <div className="flex w-full max-w-360 flex-col items-center gap-20">
        <LabelBar label={numbers.label} meta={numbers.meta} />
      </div>

      <div className="grid w-full max-w-360 grid-cols-1 m:grid-cols-2">
        {numbers.items.map((it, i) => (
          <Reveal key={it.title} delay={(i % 2) * 0.1} className="relative border-t border-black/10 pt-6 pr-6 pb-16 m:pr-10">
            <span className="absolute top-3 right-3 text-black/50">
              <ArrowUR size={8} />
            </span>
            <div className="text-[96px] leading-[0.95] font-medium tracking-[-5px] m:text-[120px] l:text-[150px] l:tracking-[-8px]">
              {it.big}
            </div>
            <div className="mt-4 h-px w-full max-w-110 bg-black/16" />
            <h3 className="type-body-3 mt-3">{it.title}</h3>
            <p className="type-body-5 mt-3 max-w-78 text-black/55">{it.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
