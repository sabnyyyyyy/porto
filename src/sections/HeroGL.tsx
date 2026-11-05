import { useEffect, useRef } from 'react'

/** Generates an abstract placeholder "portrait" so the hero works without any photo. */
export function makeHeroArt(): HTMLCanvasElement {
  const W = 1800
  const H = 1100
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const g = c.getContext('2d')!
  const bg = g.createRadialGradient(W * 0.6, H * 0.35, 40, W * 0.55, H * 0.5, W * 0.75)
  bg.addColorStop(0, '#ff7a1f')
  bg.addColorStop(0.35, '#f74d04')
  bg.addColorStop(0.7, '#cb2602')
  bg.addColorStop(1, '#5a0c02')
  g.fillStyle = bg
  g.fillRect(0, 0, W, H)

  g.filter = 'blur(70px)'
  g.fillStyle = 'rgba(1,126,153,.85)'
  g.beginPath()
  g.ellipse(W * 0.42, H * 0.42, 260, 340, -0.3, 0, Math.PI * 2)
  g.fill()
  g.fillStyle = 'rgba(30,8,4,.9)'
  g.beginPath()
  g.ellipse(W * 0.4, H * 1.05, 520, 340, 0, 0, Math.PI * 2)
  g.fill()
  g.filter = 'blur(40px)'
  g.fillStyle = 'rgba(255,196,150,.9)'
  g.beginPath()
  g.ellipse(W * 0.52, H * 0.4, 170, 230, 0.1, 0, Math.PI * 2)
  g.fill()
  g.filter = 'blur(90px)'
  g.fillStyle = 'rgba(255,210,170,.55)'
  g.beginPath()
  g.ellipse(W * 0.7, H * 0.3, 160, 380, 0.4, 0, Math.PI * 2)
  g.fill()
  g.filter = 'none'

  const img = g.getImageData(0, 0, W, H)
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 22
    img.data[i] += n
    img.data[i + 1] += n
    img.data[i + 2] += n
  }
  g.putImageData(img, 0, 0)
  return c
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){
  vUv = aPos * .5 + .5;
  gl_Position = vec4(aPos, 0., 1.);
}`

// Swirl + chromatic split + horizontal glitch streaks around the pointer.
const FRAG = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uRes;
uniform vec2 uImg;
uniform vec2 uFocus;
uniform vec2 uMouse;
uniform vec2 uDir;
uniform float uForce;
uniform float uTime;
varying vec2 vUv;

vec2 cover(vec2 uv){
  float rs = uRes.x / uRes.y;
  float is = uImg.x / uImg.y;
  vec2 s = rs > is ? vec2(1., is / rs) : vec2(rs / is, 1.);
  // uFocus (0..1, origin bottom-left) decides which part of the photo stays visible when it is cropped
  return (uv - .5) * s + .5 + (uFocus - .5) * (1. - s);
}
float hash(float n){ return fract(sin(n) * 43758.5453); }

void main(){
  vec2 asp = vec2(uRes.x / uRes.y, 1.);
  vec2 d = (vUv - uMouse) * asp;
  float r = length(d);
  float fall = exp(-r * r * 14.);

  // swirl
  float ang = fall * uForce * 5.5;
  float s = sin(ang), c = cos(ang);
  vec2 rd = vec2(c * d.x - s * d.y, s * d.x + c * d.y);
  vec2 uv = uMouse + rd / asp;

  // push along the pointer direction
  uv -= uDir * fall * uForce * .06;

  // glitch streaks, strongest near the pointer
  float row = floor(vUv.y * 70.);
  float gate = step(.93, hash(row + floor(uTime * 6.)));
  uv.x += gate * fall * uForce * .05 * (hash(row) - .5) * 2.;

  // chromatic split
  vec2 sp = uDir * fall * uForce * .035 + vec2(.0015 * uForce, 0.);
  float R = texture2D(uTex, cover(uv + sp)).r;
  float G = texture2D(uTex, cover(uv)).g;
  float B = texture2D(uTex, cover(uv - sp)).b;
  gl_FragColor = vec4(R, G, B, 1.);
}`

export function HeroGL({ src, focus = [0.5, 0.5] }: { src: string | null; focus?: readonly [number, number] }) {
  const fx = focus[0]
  const fy = focus[1]
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const compile = (type: number, source: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, source)
      gl.compileShader(sh)
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = (n: string) => gl.getUniformLocation(prog, n)
    const uRes = u('uRes')
    const uImg = u('uImg')
    const uFocus = u('uFocus')
    const uMouse = u('uMouse')
    const uDir = u('uDir')
    const uForce = u('uForce')
    const uTime = u('uTime')

    const tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    let ready = false
    let imgW = 1
    let imgH = 1
    let active = true
    let visible = true
    let raf = 0
    const upload = (source: TexImageSource, w: number, h: number) => {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source)
      imgW = w
      imgH = h
      ready = true
      active = true
    }
    if (src) {
      const im = new Image()
      im.crossOrigin = 'anonymous'
      im.onload = () => upload(im, im.naturalWidth, im.naturalHeight)
      im.src = src
    } else {
      const art = makeHeroArt()
      upload(art, art.width, art.height)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
      active = true
    }

    // pointer state (UV space, origin bottom-left)
    const target = { x: 0.5, y: 0.5 }
    const cur = { x: 0.5, y: 0.5 }
    const dir = { x: 0, y: 0 }
    let force = 0

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      if (e.clientY < r.top || e.clientY > r.bottom) return
      const nx = (e.clientX - r.left) / r.width
      const ny = 1 - (e.clientY - r.top) / r.height
      const dx = nx - target.x
      const dy = ny - target.y
      target.x = nx
      target.y = ny
      dir.x += (dx - dir.x) * 0.5
      dir.y += (dy - dir.y) * 0.5
      force = Math.min(1, force + Math.hypot(dx, dy) * 6)
      active = true
    }

    const t0 = performance.now()
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible || !ready || !active) return
      cur.x += (target.x - cur.x) * 0.1
      cur.y += (target.y - cur.y) * 0.1
      force *= 0.965
      dir.x *= 0.95
      dir.y *= 0.95
      if (force < 0.002 && Math.hypot(target.x - cur.x, target.y - cur.y) < 0.0005) {
        force = 0
        active = false
      }
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uImg, imgW, imgH)
      gl.uniform2f(uFocus, fx, fy)
      gl.uniform2f(uMouse, cur.x, cur.y)
      gl.uniform2f(uDir, dir.x * 4, dir.y * 4)
      gl.uniform1f(uForce, force)
      gl.uniform1f(uTime, (now - t0) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) active = true
    })
    io.observe(canvas)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      gl.deleteTexture(tex)
      gl.deleteProgram(prog)
    }
  }, [src, fx, fy])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}
