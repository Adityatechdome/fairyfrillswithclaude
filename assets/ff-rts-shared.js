// shared.jsx — data + reusable motion hooks + SVG dress placeholders.
// Real product photography is not provided, so we render each product card
// as an illustrated "dress plate": a gradient stage with a hand-drawn-feel
// gown silhouette. Reads as intentional storybook artwork instead of a
// missing-image gap. Swap for real CDN URLs by replacing DressPlate.

/* ── Motion hooks ───────────────────────────────────────────────────────── */
function useInView(opts = { threshold: 0.15, once: true }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); if (opts.once) io.disconnect(); }
      else if (!opts.once) setSeen(false);
    }, { threshold: opts.threshold, root: opts.root || null });
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return [ref, seen];
}

function useParallax(strength = 0.2) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const root = el.closest('[data-scroll-root]') || window;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const rootR = root === window ? { top: 0, height: window.innerHeight }
                                    : root.getBoundingClientRect();
      const center = (r.top - rootR.top) + r.height / 2 - rootR.height / 2;
      el.style.setProperty('--py', `${-center * strength}px`);
    };
    tick();
    root.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    return () => { root.removeEventListener('scroll', tick); window.removeEventListener('resize', tick); };
  }, []);
  return ref;
}

/* ── Data ───────────────────────────────────────────────────────────────── */
const SHARED_OCCASIONS = [
  { id: 'birthday',  label: 'Birthday',      count: 48, hue: 340, accent: '#E9B7C5' },
  { id: 'mehendi',   label: 'Mehendi',       count: 22, hue:  40, accent: '#D9B96A' },
  { id: 'festive',   label: 'Festive',       count: 36, hue:  10, accent: '#C97A6B' },
  { id: 'wedding',   label: 'Wedding Guest', count: 18, hue: 320, accent: '#B7536F' },
  { id: 'flower',    label: 'Flower Girl',   count: 27, hue:   0, accent: '#F0CDD0', light: true },
  { id: 'twirl',     label: 'Twirl & Play',  count: 31, hue: 200, accent: '#A8C0D6' },
];

const SHARED_AGES = ['0-1y', '1-2y', '2-3y', '3-4y', '4-6y', '6-8y', '8-10y', '10-12y'];

const SHARED_PRODUCTS = [
  { id: 'p01', name: 'Sugarplum Twirl Gown',          price: 4290, was: 5390, tag: 'Bestseller',  occasion: 'Birthday',     palette: ['#FBE9EC', '#E8AFC0', '#8B2D4A'], dress: 0 },
  { id: 'p02', name: 'Moonlit Ivory Lehenga',         price: 6890, was: null, tag: 'New',          occasion: 'Wedding',      palette: ['#F4ECDC', '#D9C09A', '#8B6B2D'], dress: 1 },
  { id: 'p03', name: 'Berry Tutu Frock',              price: 2990, was: 3490, tag: 'Last Few',     occasion: 'Birthday',     palette: ['#F7D8DD', '#C76B85', '#5A1A30'], dress: 2 },
  { id: 'p04', name: 'Almond Blossom Anarkali',       price: 5490, was: null, tag: null,           occasion: 'Festive',      palette: ['#F8E4D6', '#E0A380', '#6B3823'], dress: 3 },
  { id: 'p05', name: 'Cinderella Tulle Ballgown',     price: 7290, was: 8590, tag: 'Bestseller',   occasion: 'Birthday',     palette: ['#E9EEF7', '#B2C4DE', '#33486B'], dress: 4 },
  { id: 'p06', name: 'Mehendi Mirror Sharara',        price: 4590, was: null, tag: 'New',          occasion: 'Mehendi',      palette: ['#EFE9D2', '#C9B86A', '#6F5C1F'], dress: 1 },
  { id: 'p07', name: 'Petal Pink Princess',           price: 3890, was: null, tag: null,           occasion: 'Flower Girl',  palette: ['#FBE8EA', '#F2BDC2', '#A03555'], dress: 0 },
  { id: 'p08', name: 'Saffron Bell Lehenga',          price: 5290, was: 5890, tag: 'Last Few',     occasion: 'Festive',      palette: ['#FAE1C2', '#E8A85F', '#7A4318'], dress: 1 },
  { id: 'p09', name: 'Snowdrop Pearl Frock',          price: 3490, was: null, tag: null,           occasion: 'Wedding',      palette: ['#F3F1EC', '#D9D2C2', '#574B36'], dress: 2 },
  { id: 'p10', name: 'Rose Garden Tutu',              price: 2790, was: 3290, tag: null,           occasion: 'Twirl',        palette: ['#F8DEE0', '#D58A9A', '#6B2138'], dress: 2 },
  { id: 'p11', name: 'Plum Velvet Anarkali',          price: 6290, was: null, tag: 'New',          occasion: 'Festive',      palette: ['#E9DEEC', '#A476B0', '#3D1E48'], dress: 3 },
  { id: 'p12', name: 'Whispering Willow Gown',        price: 5890, was: null, tag: 'Bestseller',   occasion: 'Birthday',     palette: ['#E7EEDF', '#A7C079', '#3D5523'], dress: 4 },
  { id: 'p13', name: 'Goldenrod Mirror Choli',        price: 4890, was: 5390, tag: null,           occasion: 'Mehendi',      palette: ['#F5E2A8', '#C99A2A', '#5C4012'], dress: 1 },
  { id: 'p14', name: 'Cloud Nine Tutu Dress',         price: 3290, was: null, tag: null,           occasion: 'Birthday',     palette: ['#F2EFF2', '#C7BDD0', '#4A4055'], dress: 2 },
  { id: 'p15', name: 'Persimmon Petal Frock',         price: 3590, was: null, tag: 'New',          occasion: 'Festive',      palette: ['#FDDCC6', '#E68559', '#7C3415'], dress: 0 },
  { id: 'p16', name: 'Lilac Fairy Tutu',              price: 3190, was: 3690, tag: 'Bestseller',   occasion: 'Twirl',        palette: ['#EDE2F2', '#B58FCC', '#43285A'], dress: 2 },
  { id: 'p17', name: 'Champagne Pearl Lehenga',       price: 7890, was: null, tag: 'New',          occasion: 'Wedding',      palette: ['#F1E8D4', '#CBAF74', '#5C4519'], dress: 1 },
  { id: 'p18', name: 'Honey Pleat Gown',              price: 4990, was: null, tag: null,           occasion: 'Birthday',     palette: ['#F7E8C4', '#D9A856', '#6A411A'], dress: 4 },
  { id: 'p19', name: 'Bluebell Smocked Frock',        price: 2890, was: null, tag: null,           occasion: 'Twirl',        palette: ['#DDE6F0', '#86A2C4', '#1F385E'], dress: 2 },
  { id: 'p20', name: 'Crimson Ruffle Anarkali',       price: 6590, was: null, tag: 'Last Few',     occasion: 'Festive',      palette: ['#F7CFD1', '#C24050', '#3D0C1A'], dress: 3 },
  { id: 'p21', name: 'Vanilla Sparkle Ballgown',      price: 7490, was: null, tag: 'Bestseller',   occasion: 'Birthday',     palette: ['#F7F1E5', '#E0CDA0', '#574429'], dress: 4 },
  { id: 'p22', name: 'Mint Meadow Frock',             price: 3090, was: null, tag: 'New',          occasion: 'Twirl',        palette: ['#DCEEDF', '#86BD9A', '#234835'], dress: 2 },
  { id: 'p23', name: 'Blush Cape Gown',               price: 5790, was: 6490, tag: null,           occasion: 'Wedding',      palette: ['#F6DDE0', '#D293A2', '#5C2438'], dress: 0 },
  { id: 'p24', name: 'Coral Drop Sharara',            price: 4290, was: null, tag: null,           occasion: 'Mehendi',      palette: ['#FBD9C7', '#E68367', '#6F2614'], dress: 1 },
  { id: 'p25', name: 'Indigo Star Frock',             price: 3490, was: null, tag: 'Last Few',     occasion: 'Twirl',        palette: ['#DDDDF0', '#7676BD', '#1A1A5C'], dress: 2 },
  { id: 'p26', name: 'Buttercup Bow Gown',            price: 4690, was: null, tag: null,           occasion: 'Birthday',     palette: ['#FBF1C3', '#E2C44C', '#6E5A14'], dress: 0 },
  { id: 'p27', name: 'Rosé Velvet Lehenga',           price: 6990, was: null, tag: 'New',          occasion: 'Festive',      palette: ['#F1D4D7', '#B86577', '#4A1B2C'], dress: 1 },
  { id: 'p28', name: 'Pistachio Pleated Frock',       price: 2990, was: null, tag: null,           occasion: 'Birthday',     palette: ['#E9F0D9', '#A8C273', '#3F541E'], dress: 2 },
  { id: 'p29', name: 'Old Rose Princess Gown',        price: 5990, was: 6890, tag: 'Bestseller',   occasion: 'Wedding',      palette: ['#F0D7DA', '#B47280', '#4A1F2E'], dress: 4 },
  { id: 'p30', name: 'Cocoa Mirror Anarkali',         price: 5290, was: null, tag: null,           occasion: 'Festive',      palette: ['#EDDDC8', '#B4865C', '#4A2D17'], dress: 3 },
];

const SHARED_TESTIMONIALS = [
  { who: 'Aanya M.', age: 'Mum to Mira, 5',   body: 'Ordered Wednesday, arrived Friday. Mira refused to take it off all weekend. The tulle is impeccable.', dress: 'Sugarplum Twirl Gown' },
  { who: 'Pooja R.', age: 'Mum to Ira, 3',    body: "I've never bought twice from the same kids' label — until now. The fit notes are exactly right.",       dress: 'Petal Pink Princess' },
  { who: 'Devi S.',  age: 'Mum to Zoya, 7',   body: 'The mehendi sharara held up through three dances, two ice-creams and a haldi. Built like couture.',     dress: 'Mehendi Mirror Sharara' },
  { who: 'Tara K.',  age: 'Mum to twins, 4',  body: 'Last-minute panic at 11pm, two gowns at the door by lunch. Genuine sorcery.',                            dress: 'Cinderella Tulle Ballgown' },
];

const SHARED_ACCESSORIES = [
  { id: 'a1', name: 'Pearl Tiara',           price:  890, palette: ['#F6F0DF', '#D9C58A'] },
  { id: 'a2', name: 'Silk Hair Bow, Berry',  price:  490, palette: ['#F4D4DC', '#8B2D4A'] },
  { id: 'a3', name: 'Floral Garland Crown',  price: 1190, palette: ['#FBE7E4', '#D58A6F'] },
  { id: 'a4', name: 'Ballet Pumps, Ivory',   price: 1290, palette: ['#F4ECDD', '#C9B189'] },
  { id: 'a5', name: 'Velvet Wand',           price:  390, palette: ['#E9D9F0', '#7A4A9C'] },
  { id: 'a6', name: 'Gauze Cape, Sky',       price: 1490, palette: ['#DDE9F5', '#7295BB'] },
  { id: 'a7', name: 'Beaded Potli Bag',      price:  890, palette: ['#F4E0C2', '#B58740'] },
  { id: 'a8', name: 'Lace Anklet Pair',      price:  290, palette: ['#FAE9EC', '#C76B85'] },
];

const SHARED_FAQ = [
  { q: 'How fast does Ready to Ship actually ship?',
    a: 'Orders placed before 4pm IST dispatch the same day; later orders go the next morning. Metro pin codes typically arrive in 24–48 hours, the rest of India in 3–4 working days.' },
  { q: 'What if the fit is off?',
    a: 'Easy size exchanges within 7 days of delivery, free pick-up across 1,800+ pin codes. Tags must be attached. Ready to Ship orders are not eligible for refund — only exchange — because they go out so quickly.' },
  { q: 'Can I personalise a Ready to Ship piece?',
    a: 'Light personalisation (initials embroidered on the inside hem, hair bow colour swap) is offered as an add-on at checkout and adds 24 hours to dispatch.' },
  { q: 'Are these the same gowns as the made-to-order range?',
    a: 'Yes — Ready to Ship pieces are pulled from our most-loved silhouettes, pre-sewn in our atelier in fixed sizes. Same fabrics, same hand-finishing, same quality control.' },
  { q: 'Do you ship outside India?',
    a: 'Yes. International Ready to Ship orders ship via DHL Express and arrive in 4–7 working days. Duties calculated at checkout.' },
];

/* ── DressPlate ─────────────────────────────────────────────────────────────
   Stylised dress silhouette over a gradient stage. 5 variants × any palette.
   Built as inline SVG so it scales crisply and animates. */
function DressPlate({ palette, dress = 0, ratio = '3/4', floral = true, style }) {
  const [bg, mid, dk] = palette;
  return (
    <div style={{
      position: 'relative',
      width: '100%', aspectRatio: ratio,
      background: `linear-gradient(165deg, ${bg} 0%, ${tint(mid, 0.6)} 100%)`,
      overflow: 'hidden',
      ...style
    }}>
      {/* watercolour halo */}
      <div style={{
        position: 'absolute', left: '50%', top: '54%',
        transform: 'translate(-50%, -50%)',
        width: '85%', aspectRatio: '1/1', borderRadius: '50%',
        background: `radial-gradient(circle, ${tint(mid, 0.35)} 0%, transparent 65%)`,
        filter: 'blur(8px)',
      }} />
      {/* floral sprig top-left */}
      {floral && <FloralCorner color={tint(dk, 0.7)} style={{ position: 'absolute', top: 10, left: 10, width: '32%', opacity: 0.7 }} />}
      {floral && <Sparkle  color={tint(dk, 0.6)} style={{ position: 'absolute', top: '14%', right: '12%', width: 14 }} />}
      {floral && <Sparkle  color={tint(dk, 0.5)} style={{ position: 'absolute', bottom: '24%', left: '14%', width: 10 }} />}
      <Dress variant={dress} colors={{ light: tint(mid, 0.4), mid, dark: dk }}
             style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -47%)', width: '60%', height: '78%' }} />
    </div>
  );
}

function tint(hex, amt) {
  // lighten hex toward white by amt (0..1)
  const c = hex.replace('#',''); const n = parseInt(c, 16);
  const r = (n>>16)&255, g = (n>>8)&255, b = n&255;
  const m = (v) => Math.round(v + (255 - v) * amt);
  return '#' + ((m(r)<<16) | (m(g)<<8) | m(b)).toString(16).padStart(6,'0');
}

function Dress({ variant, colors, style }) {
  const { light, mid, dark } = colors;
  const paths = [
    // 0 — A-line gown w/ puffed sleeves
    <g key="0">
      <ellipse cx="100" cy="38" rx="8" ry="10" fill={tint(mid, 0.7)} />
      <path d="M82 56 Q72 70 78 80 Q90 78 92 70" fill={mid} />
      <path d="M118 56 Q128 70 122 80 Q110 78 108 70" fill={mid} />
      <path d="M88 56 L112 56 L116 96 L84 96 Z" fill={mid} />
      <path d="M84 96 Q66 168 50 220 L150 220 Q134 168 116 96 Z" fill={light} />
      <path d="M84 96 Q66 168 50 220 L150 220 Q134 168 116 96 Z" fill={`url(#g${variant})`} opacity=".5" />
      <path d="M88 96 L112 96 L110 104 L90 104 Z" fill={dark} />
      <circle cx="100" cy="100" r="2" fill={dark} />
    </g>,
    // 1 — Lehenga (cropped choli + flared skirt)
    <g key="1">
      <ellipse cx="100" cy="38" rx="8" ry="10" fill={tint(mid, 0.7)} />
      <path d="M86 56 L114 56 L116 92 L84 92 Z" fill={dark} />
      <path d="M76 56 Q66 64 70 78 Q80 78 86 74" fill={dark} />
      <path d="M124 56 Q134 64 130 78 Q120 78 114 74" fill={dark} />
      <path d="M80 100 Q60 170 42 220 L158 220 Q140 170 120 100 Z" fill={mid} />
      <path d="M80 100 L120 100 L120 108 L80 108 Z" fill={dark} opacity=".6" />
      <g stroke={tint(dark, 0.4)} strokeWidth="0.5" fill="none" opacity=".7">
        <path d="M52 200 Q100 195 148 200" /><path d="M58 175 Q100 170 142 175" /><path d="M65 150 Q100 145 135 150" />
      </g>
    </g>,
    // 2 — Frock w/ tutu skirt (volume)
    <g key="2">
      <ellipse cx="100" cy="40" rx="8" ry="10" fill={tint(mid, 0.7)} />
      <path d="M86 58 L114 58 L116 100 L84 100 Z" fill={mid} />
      <path d="M88 70 L112 70 L114 82 L86 82 Z" fill={dark} opacity=".4" />
      <ellipse cx="100" cy="150" rx="62" ry="64" fill={light} />
      <ellipse cx="100" cy="150" rx="62" ry="64" fill={mid} opacity=".4" />
      <path d="M38 148 L162 148 L158 220 L42 220 Z" fill={light} opacity=".1" />
      <circle cx="100" cy="102" r="3" fill={dark} />
    </g>,
    // 3 — Anarkali (long flowy)
    <g key="3">
      <ellipse cx="100" cy="38" rx="8" ry="10" fill={tint(mid, 0.7)} />
      <path d="M84 56 L116 56 L120 110 L80 110 Z" fill={mid} />
      <path d="M80 110 Q56 180 44 230 L156 230 Q144 180 120 110 Z" fill={mid} />
      <path d="M80 110 Q56 180 44 230 L156 230 Q144 180 120 110 Z" fill={`url(#g${variant})`} opacity=".4" />
      <path d="M100 60 L100 230" stroke={dark} strokeWidth="0.8" opacity=".5" />
      <g fill={dark} opacity=".7">
        <circle cx="100" cy="78" r="1.5" /><circle cx="100" cy="98" r="1.5" />
        <circle cx="100" cy="125" r="1.5" /><circle cx="100" cy="150" r="1.5" />
      </g>
    </g>,
    // 4 — Ballgown with full skirt + bodice cinch
    <g key="4">
      <ellipse cx="100" cy="38" rx="8" ry="10" fill={tint(mid, 0.7)} />
      <path d="M84 54 Q78 80 88 100 L112 100 Q122 80 116 54 Z" fill={dark} />
      <path d="M88 100 L112 100 L114 108 L86 108 Z" fill={tint(dark, 0.4)} />
      <path d="M86 108 Q40 160 28 232 L172 232 Q160 160 114 108 Z" fill={mid} />
      <path d="M86 108 Q40 160 28 232 L172 232 Q160 160 114 108 Z" fill={`url(#g${variant})`} opacity=".5" />
      <g fill={light} opacity=".75">
        <path d="M60 170 Q100 200 140 170 L138 200 Q100 220 62 200 Z" />
      </g>
    </g>,
  ];
  return (
    <svg viewBox="0 0 200 240" style={style}>
      <defs>
        <linearGradient id={`g${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={dark} stopOpacity=".55" />
        </linearGradient>
      </defs>
      {paths[variant]}
    </svg>
  );
}

function FloralCorner({ color, style }) {
  return (
    <svg viewBox="0 0 80 80" style={style} fill="none" stroke={color} strokeWidth="0.8" strokeLinecap="round">
      <path d="M6 6 Q22 12 30 28" />
      <circle cx="14" cy="14" r="3" />
      <circle cx="14" cy="14" r="1.2" fill={color} />
      <circle cx="28" cy="22" r="2.4" />
      <path d="M14 14 L8 8 M14 14 L20 8" />
      <path d="M22 24 Q26 30 22 36" />
      <ellipse cx="6" cy="28" rx="4" ry="1.6" transform="rotate(-30 6 28)" />
    </svg>
  );
}
function Sparkle({ color, style }) {
  return (
    <svg viewBox="0 0 20 20" style={style} fill={color}>
      <path d="M10 0 L11 9 L20 10 L11 11 L10 20 L9 11 L0 10 L9 9 Z" />
    </svg>
  );
}

/* ── small reusable bits ────────────────────────────────────────────────── */
function INR(n) { return '₹' + n.toLocaleString('en-IN'); }

Object.assign(window, {
  useInView, useParallax,
  SHARED_OCCASIONS, SHARED_AGES, SHARED_PRODUCTS, SHARED_TESTIMONIALS, SHARED_ACCESSORIES, SHARED_FAQ,
  DressPlate, Dress, FloralCorner, Sparkle, tint, INR,
});
