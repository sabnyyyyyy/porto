import Lenis from 'lenis'

type Listener = (y: number) => void

const listeners = new Set<Listener>()
let lenis: Lenis | null = null
let rafId = 0

/** Smooth scroll (Lenis) + shared scroll bus so every scroll-linked effect runs in one place. */
export function initScroll() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })
  lenis.on('scroll', () => listeners.forEach((fn) => fn(window.scrollY)))
  const loop = (time: number) => {
    lenis?.raf(time)
    rafId = requestAnimationFrame(loop)
  }
  rafId = requestAnimationFrame(loop)
  const onResize = () => listeners.forEach((fn) => fn(window.scrollY))
  window.addEventListener('resize', onResize)
  return () => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', onResize)
    lenis?.destroy()
    lenis = null
  }
}

export function onScroll(fn: Listener) {
  listeners.add(fn)
  fn(window.scrollY)
  return () => {
    listeners.delete(fn)
  }
}

export function scrollToTarget(target: string | number | HTMLElement, offset = 0) {
  if (lenis) lenis.scrollTo(target as never, { offset, duration: 1.6 })
  else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
