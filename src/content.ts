// Semua teks portfolio ada di sini — ganti sesuai kebutuhanmu.
// Gambar: taruh foto/screenshot di /public/images lalu isi `src` pada item terkait.

export type ArtProps = {
  a: string
  b: string
  c: string
  x?: string
  y?: string
  shape?: string
  sx?: string
  sy?: string
  sw?: string
}

export const art = {
  fire: { a: '#ff6a1a', b: '#870f01', c: '#2b0602', x: '35%', y: '30%', shape: 'rgba(1,126,153,.55)', sx: '38%', sy: '42%', sw: '46%' },
  gold: { a: '#e8c26a', b: '#6b4a10', c: '#0b0905', x: '50%', y: '28%', shape: 'rgba(255,230,160,.35)', sx: '50%', sy: '52%', sw: '40%' },
  mono: { a: '#e9e9e9', b: '#5b5b5b', c: '#1a1a1a', x: '60%', y: '25%', shape: 'rgba(0,0,0,.55)', sx: '55%', sy: '62%', sw: '40%' },
  sand: { a: '#d8c3a3', b: '#8a6a45', c: '#3a2a1a', x: '40%', y: '35%', shape: 'rgba(60,30,10,.55)', sx: '50%', sy: '70%', sw: '34%' },
  sage: { a: '#9db3a4', b: '#3d5246', c: '#18231c', x: '70%', y: '30%', shape: 'rgba(240,235,220,.35)', sx: '30%', sy: '60%', sw: '40%' },
  sea: { a: '#5ec4d6', b: '#0b3f52', c: '#04141c', x: '50%', y: '20%', shape: 'rgba(255,160,90,.55)', sx: '62%', sy: '58%', sw: '36%' },
  clay: { a: '#e8a37c', b: '#a3472a', c: '#2a110a', x: '30%', y: '40%', shape: 'rgba(20,10,10,.5)', sx: '45%', sy: '55%', sw: '42%' },
  ink: { a: '#5a6dff', b: '#16164a', c: '#07071a', x: '65%', y: '35%', shape: 'rgba(255,255,255,.25)', sx: '40%', sy: '50%', sw: '38%' },
  rose: { a: '#ff9fb5', b: '#8a1f3d', c: '#240812', x: '45%', y: '30%', shape: 'rgba(255,230,200,.35)', sx: '55%', sy: '58%', sw: '40%' },
} satisfies Record<string, ArtProps>

export type ArtKey = keyof typeof art

export const site = {
  // Wordmark besar di hero & footer
  name: 'Ikhsan',
  fullName: 'Ikhsan Arlatin Sani',
  // Nama Web3
  alias: 'Sabny',
  // Teks logo di header hero
  logo: 'Ikhsan as Sabny',
  role: 'Fullstack Developer',
  email: 'arlatinikhsan13@gmail.com',
  github: 'https://github.com/sabnyyyyyy',
  year: '2026',
  location: 'Malang, Indonesia',
  // Foto hero (efek WebGL tetap jalan). Set null untuk kembali ke gradient placeholder.
  heroImage: '/images/hero.jpg' as string | null,
  // Bagian foto yang dipertahankan saat di-crop: [x, y] 0–1, y dihitung dari BAWAH foto.
  heroFocus: [0.5, 0.39] as readonly [number, number],
  // Sama, untuk fallback CSS (object-position, y dihitung dari ATAS).
  heroPosition: '50% 57%',
}

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  lead: 'Fullstack developer building web products from database to interface,',
  leadDim: 'and shipping them live.',
  cta: 'See My Work',
  tags: ['Frontend', 'Backend', 'Deployment'],
}

export const about = {
  label: 'About',
  meta: 'D3 Information Technology, Universitas Brawijaya',
  statement:
    'Hi, I’m Ikhsan Arlatin Sani, known as Sabny in Web3, a fullstack developer and D3 Information Technology student at Universitas Brawijaya, building web products that plan for tomorrow®.',
  // Foto di strip About. Posisi (x% y%) menggeser fokus crop ke orang di tengah.
  photo: { src: '/images/sabny.jpg', position: '48% 100%', alt: 'Ikhsan Arlatin Sani (Sabny) speaking on stage' },
  cta: 'See My Work',
  rows: [
    {
      k: '(Learn)',
      v: 'Every project starts with understanding the problem. I read, prototype and test before committing to a stack, so the build has a clear reason to exist.',
    },
    {
      k: '(+Build)',
      v: 'I build the whole thing: database, API and interface. Some of it ships live like veilio.fun and ChargeFlow, and some stays on my machine as practice.',
    },
    {
      k: '(=Now)',
      v: '',
      stats: [
        ['Live projects', '4'],
        ['Leadership roles', '3'],
        ['Studying', 'D3 TI · UB'],
      ] as const,
    },
  ],
}

// Marquee di bawah About
export const logos = ['FRONTEND', 'BACKEND', 'API DESIGN', 'DATABASE', 'WEB3', 'DEPLOYMENT', 'UI / UX', 'FULLSTACK']

export const work = {
  label: 'Selected Work',
  meta: '2024 — 2026',
  cta: 'Get In Touch',
  all: 'See all (04)',
  items: [
    {
      title: 'Veilio',
      cat: 'Web3 Marketplace',
      art: 'gold' as ArtKey,
      href: 'https://veilio.fun',
      src: '/images/veilio.png' as string | null,
    },
    { title: 'ChargeFlow', cat: 'EV Charging Payments', art: 'sea' as ArtKey, href: 'https://chargerflow.vercel.app', src: '/images/chargeflow.png' },
    { title: 'Dental Happy', cat: 'Clinic Website', art: 'sage' as ArtKey, href: 'https://project-pbl-five.vercel.app', src: '/images/dental-happy.png' },
    { title: 'Pokémon Dashboard', cat: 'API Dashboard', art: 'clay' as ArtKey, href: 'https://tugas-api-tau.vercel.app', src: null },
  ],
}

export const services = {
  label: 'Services',
  meta: 'Frontend · Backend · Deployment',
  statement:
    'Independent developer building websites, web apps and APIs that help ambitious ideas get online and stay reliable, by Ikhsan®.',
  cta: 'Explore More',
  items: [
    {
      n: '01',
      tag: 'Frontend',
      title: 'Interfaces',
      text: 'Responsive, accessible interfaces with smooth motion. Clear layouts and fast pages that feel good on every screen.',
      art: 'sea' as ArtKey,
      src: '/images/dental-happy.png' as string | null,
      pos: '50% 0%',
    },
    {
      n: '02',
      tag: 'Backend',
      title: 'APIs & Data',
      text: 'Databases, authentication and APIs designed to stay simple. Reliable server logic that your product can grow on.',
      art: 'mono' as ArtKey,
      src: '/images/chargeflow.png' as string | null,
      pos: '50% 0%',
    },
    {
      n: '03',
      tag: 'Fullstack',
      title: 'Ship It Live',
      text: 'From idea to deployed product. I take features across the whole stack and put them online, like veilio.fun.',
      art: 'sand' as ArtKey,
      src: '/images/veilio.png' as string | null,
      pos: '50% 30%',
    },
  ],
}

// Menggantikan "Pricing" — kartu organisasi & kepemimpinan
export const profile = {
  label: 'Organization',
  meta: 'Leadership & community',
  plans: [
    {
      name: 'HMPSTI',
      desc: 'Himpunan Mahasiswa Program Studi Teknologi Informasi Vokasi Brawijaya.',
      big: 'PSDM',
      unit: 'Staff Ahli · 2026',
      dark: false,
      cta: 'Instagram',
      href: 'https://www.instagram.com/psdmhmpsti26',
      features: ['Staff Ahli, bidang PSDM', 'Period 2026', 'Student association of the Information Technology program'],
    },
    {
      name: 'Sambut Maba TI & TRPL',
      desc: 'Event welcoming new Information Technology and TRPL students.',
      big: 'Wakil Ketua',
      unit: 'Pelaksana 1 · 2026',
      dark: false,
      cta: 'Instagram',
      href: 'https://www.instagram.com/sambati.ub',
      features: ['Wakil Ketua Pelaksana 1', 'Period 2026', 'Appointed to the committee leadership'],
    },
    {
      name: 'Brawijaya Web3 Labs',
      desc: 'A Web3 community at Universitas Brawijaya.',
      big: 'Lead',
      unit: '2025 — Now',
      dark: true,
      cta: 'Instagram',
      href: 'https://www.instagram.com/brawijayaweb3_labs',
      features: ['Lead of Brawijaya Web3 Labs', 'Period 2025 until now', 'Hands-on Web3 work, including veilio.fun'],
    },
  ],
}

// Menggantikan "Testimonials" — prinsip kerja
export const testimonials = {
  label: 'Principles',
  meta: 'How I build',
  items: [
    {
      quote: 'I start with the problem, not the framework. When the idea is clear, the stack becomes the easy part.',
      name: 'Ikhsan Arlatin Sani',
      role: 'a.k.a. Sabny · Fullstack Developer',
      art: 'mono' as ArtKey,
      src: '/images/sabny.jpg' as string | null,
      pos: '48% 40%',
    },
    {
      quote: 'I like projects that go online, where real people can use them, and I keep improving them after launch.',
      name: 'Ikhsan Arlatin Sani',
      role: 'a.k.a. Sabny · Fullstack Developer',
      art: 'gold' as ArtKey,
      src: '/images/hero.jpg' as string | null,
      pos: '50% 60%',
    },
    {
      quote: 'Not everything I build lives on GitHub, but all of it taught me something: clean data, clear APIs and interfaces that stay out of the way.',
      name: 'Ikhsan Arlatin Sani',
      role: 'a.k.a. Sabny · Fullstack Developer',
      art: 'sage' as ArtKey,
      src: null as string | null,
      pos: '50% 50%',
    },
  ],
}

export const banner = {
  text: 'Built To Ship',
  cta: 'Contact Now',
}

// Menggantikan "In Numbers" — ringkasan stack kerja (tanpa angka karangan)
export const numbers = {
  label: 'In Short',
  meta: 'Malang, Indonesia',
  items: [
    { big: '01', title: 'Frontend', text: 'Interfaces that are responsive, fast and pleasant to use.' },
    { big: '02', title: 'Backend', text: 'APIs, authentication and databases that stay simple and reliable.' },
    { big: '03', title: 'Web3', text: 'Smart-contract-backed flows, like the escrow and auctions behind veilio.fun.' },
    { big: '04', title: 'Deployment', text: 'Taking a build from my machine to a live domain people can visit.' },
  ],
}

export const faq = {
  label: 'FAQ',
  items: [
    { q: 'What do you build?', a: 'Fullstack web products: interfaces, APIs, databases and deployment, with some Web3 experience from veilio.fun.' },
    { q: 'Which projects are live?', a: 'veilio.fun, ChargeFlow, Dental Happy and a Pokémon API dashboard are live. More code is on GitHub, and some projects stay local and are not published.' },
    { q: 'Where do you study?', a: 'I study D3 Information Technology (Teknologi Informasi) at Universitas Brawijaya.' },
    { q: 'What do you do outside of coding?', a: 'In 2026 I am Staff Ahli PSDM at HMPSTI and Wakil Ketua Pelaksana 1 of Sambut Maba TI & TRPL. Since 2025 I lead Brawijaya Web3 Labs.' },
    { q: 'Can we work together?', a: 'Yes, get in touch with a short brief about what you want to build and we can take it from there.' },
    { q: 'How can I reach you?', a: 'Use the contact link at the bottom of the page.' },
  ],
}

export const footer = {
  lead: 'Let’s build together',
  cta: 'Contact Now',
  rights: '© 2026, Ikhsan Arlatin Sani as Sabny',
}
