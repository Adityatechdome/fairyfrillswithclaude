// final.jsx — "Once Upon a Frill" hybrid, fully responsive.
// Base structure & language from V1 (storybook editorial), but:
//   • hero swapped for V3's gradient-mesh + petal-field + glass-card hero
//   • concierge swapped for V2's WhatsApp chat-bubble mock
// All styles scoped with .ff- prefix; mobile-first with 640 / 1024 breakpoints.

/* ─────────────────────────────────────────────────────────────────────────
   Top-level page
   ───────────────────────────────────────────────────────────────────────── */
function FinalPage({ tweaks: t = {}, primary = '#8B2D4A' }) {
  const productCount = t.productCount || 18;
  const P = SHARED_PRODUCTS.slice(0, productCount);
  return (
    <div className="ff" data-bg={t.darkSections ? 'dark' : 'light'}
         style={{ '--ff-primary': primary,
                  '--ff-ratio': t.imageRatio || '3/4',
                  '--ff-cardGap': t.cardDensity === 'comfy' ? '40px' : t.cardDensity === 'compact' ? '14px' : '22px' }}>
      <FinalStyle />
      <FFAnnounce />
      <FFNav />
      <FFHero hero={t.heroCopy} />
      {t.showTrustStrip !== false && <FFTrust />}
      <FFOccasions />
      <FFAges />
      <FFHowItWorks />
      <FFFilter total={SHARED_PRODUCTS.length} />
      <FFGrid products={P} />
      <FFTestimonials />
      <FFAccessories />
      <FFConcierge />
      <FFFAQ />
      <FFNewsletter />
      <FFFooter />
    </div>
  );
}

/* ─── Announce + Nav ──────────────────────────────────────────────────── */
function FFAnnounce() {
  const msgs = [
    'Dispatched in 24 hrs · Tissue-wrapped · Ribbon-tied',
    'Free shipping above ₹2,499 · COD across India',
    'Personal stylist on WhatsApp · Reply within 1 hr',
  ];
  const [i, set] = React.useState(0);
  React.useEffect(() => { const t = setInterval(() => set((x) => (x + 1) % msgs.length), 4200); return () => clearInterval(t); }, []);
  return (
    <div className="ff-announce" role="region" aria-label="Announcements">
      <span key={i} className="ff-announce__msg">{msgs[i]}</span>
    </div>
  );
}

function FFNav() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="ff-nav">
      <div className="ff-nav__inner">
        <button className="ff-nav__icon ff-nav__burger" aria-label="Menu" onClick={() => setOpen((x) => !x)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 7h16M4 12h16M4 17h10"/></svg>
        </button>

        <a href="#" className="ff-nav__logo" aria-label="Fairy Frills home">
          Fairy Frills
          <small>Atelier · India</small>
        </a>

        <nav className="ff-nav__links">
          <a href="#">New In</a>
          <a href="#" className="is-active">Ready to Ship<span className="ff-nav__pill">FAST</span></a>
          <a href="#">Occasions</a>
          <a href="#">Age</a>
          <a href="#">Stylist</a>
        </nav>

        <div className="ff-nav__r">
          <button className="ff-nav__icon" aria-label="Search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></button>
          <button className="ff-nav__icon" aria-label="Wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 20s-7-4.6-7-10.1A4 4 0 0 1 12 7a4 4 0 0 1 7 2.9C19 15.4 12 20 12 20Z"/></svg></button>
          <button className="ff-nav__icon" aria-label="Bag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M6 8h12l-1 12H7L6 8Zm3 0V6a3 3 0 0 1 6 0v2"/></svg>
            <span className="ff-nav__b">2</span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="ff-nav__drawer">
          {['New In', 'Ready to Ship', 'Occasions', 'Age', 'Personalise', 'Stylist'].map((x) => <a key={x} href="#">{x}</a>)}
        </nav>
      )}
    </header>
  );
}

/* ─── HERO — gradient mesh + petal field + glass card (V3 spirit) ─────── */
function FFHero({ hero }) {
  const [ref, seen] = useInView();
  const title = hero?.title || 'Once upon a 24-hour dispatch.';
  const words = title.split(' ');
  return (
    <section ref={ref} className={`ff-hero ${seen ? 'is-in' : ''}`}>
      <div className="ff-hero__mesh" aria-hidden="true" />
      <FFPetalField count={28} />

      <div className="ff-hero__grid">
        <div className="ff-hero__copy">
          <p className="ff-hero__crown">
            <CrownGlyph />
          </p>
          <p className="ff-hero__eyebrow">
            <span>✦</span> Ready to Ship · Chapter XXIV <span>✦</span>
          </p>
          <h1 className="ff-hero__title">
            {words.map((w, i) => (
              <React.Fragment key={i}>
                <span className="ff-hero__word" style={{ '--d': `${i*90}ms` }}>{w}</span>{' '}
              </React.Fragment>
            ))}
          </h1>
          <p className="ff-hero__sub">
            {hero?.sub || <>Pulled from the atelier, tissue-wrapped, and out the door before the kettle's boiled. <em>Magic, basically.</em></>}
          </p>

          <div className="ff-hero__ctas">
            <a className="ff-cta" href="#grid">
              <span className="ff-cta__bg" />
              <span className="ff-cta__t">Open the wardrobe</span>
              <span className="ff-cta__a">→</span>
            </a>
            <a className="ff-link" href="#how">peek behind the curtain</a>
          </div>

          <ul className="ff-hero__facts">
            <li><strong>24 hrs</strong> to dispatch</li>
            <li><strong>30</strong> in-stock pieces</li>
            <li><strong>8</strong> sizes · 0–12 yrs</li>
          </ul>
        </div>

        <div className="ff-hero__stage">
          <div className="ff-hero__blob ff-hero__blob--a" />
          <div className="ff-hero__blob ff-hero__blob--b" />
          <div className="ff-hero__plate ff-hero__plate--s1">
            <DressPlate palette={SHARED_PRODUCTS[5].palette} dress={1} floral={false} />
          </div>
          <div className="ff-hero__plate ff-hero__plate--main">
            <DressPlate palette={SHARED_PRODUCTS[0].palette} dress={2} floral={false} />
            <div className="ff-hero__glass">
              <span className="ff-hero__gtag">In stock · 4 left</span>
              <p className="ff-hero__gname">Sugarplum Twirl Gown</p>
              <p className="ff-hero__gprice">{INR(4290)} <s>{INR(5390)}</s></p>
            </div>
          </div>
          <div className="ff-hero__plate ff-hero__plate--s2">
            <DressPlate palette={SHARED_PRODUCTS[10].palette} dress={3} floral={false} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CrownGlyph() {
  return (
    <svg viewBox="0 0 100 36" fill="none" stroke="var(--ff-primary)" strokeWidth="1">
      <path d="M4 32 Q50 4 96 32" />
      <circle cx="20" cy="22" r="2.4" fill="var(--ff-primary)"/>
      <circle cx="50" cy="12" r="3.4" fill="var(--ff-primary)"/>
      <circle cx="80" cy="22" r="2.4" fill="var(--ff-primary)"/>
    </svg>
  );
}

function FFPetalField({ count = 28 }) {
  const colors = ['#F4D4DC', '#E8AFC0', '#D9C09A', '#C76B85'];
  const petals = React.useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i, l: Math.random() * 100, t: Math.random() * 100, s: 6 + Math.random() * 14,
    d: 12 + Math.random() * 14, delay: -Math.random() * 14, r: Math.random() * 360,
    c: colors[i % colors.length], kind: i % 3,
  })), [count]);
  return (
    <div className="ff-petals" aria-hidden="true">
      {petals.map((p) => (
        <span key={p.id} className={`ff-petal ff-petal--${p.kind}`}
              style={{ left: `${p.l}%`, top: `${p.t}%`, width: p.s, height: p.s,
                       background: p.kind === 2 ? p.c : 'transparent', color: p.c,
                       animationDuration: `${p.d}s`, animationDelay: `${p.delay}s`,
                       transform: `rotate(${p.r}deg)` }}>
          {p.kind === 0 && <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 1 C 4 6, 4 14, 10 19 C 16 14, 16 6, 10 1Z"/></svg>}
          {p.kind === 1 && <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 0 L11 9 L20 10 L11 11 L10 20 L9 11 L0 10 L9 9 Z"/></svg>}
        </span>
      ))}
    </div>
  );
}

/* ─── Trust ───────────────────────────────────────────────────────────── */
function FFTrust() {
  const items = [
    { i: <TI k="clock"/>, t: 'Dispatched in 24 hrs',     d: 'Order before 4pm IST' },
    { i: <TI k="truck"/>, t: 'Free shipping > ₹2,499',   d: 'Across India' },
    { i: <TI k="swap"/>,  t: '7-day easy exchange',      d: '1,800+ pincodes' },
    { i: <TI k="cash"/>,  t: 'COD across India',         d: 'Including remote PIN codes' },
  ];
  return (
    <div className="ff-trust">
      <div className="ff-container ff-trust__grid">
        {items.map((x, i) => (
          <div key={i} className="ff-trust__cell">
            <span className="ff-trust__i">{x.i}</span>
            <div>
              <p className="ff-trust__t">{x.t}</p>
              <p className="ff-trust__d">{x.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function TI({ k }) {
  const C = { stroke: 'var(--ff-primary)', strokeWidth: 1.4, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (k) {
    case 'clock': return <svg viewBox="0 0 24 24" width="24" height="24" {...C}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'truck': return <svg viewBox="0 0 24 24" width="24" height="24" {...C}><rect x="2" y="6" width="13" height="10"/><path d="M15 9h4l3 3v4h-7M6 19a2 2 0 1 0 4 0 2 2 0 1 0-4 0M16 19a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/></svg>;
    case 'swap':  return <svg viewBox="0 0 24 24" width="24" height="24" {...C}><path d="M4 9l4-4 4 4M8 5v10M20 15l-4 4-4-4M16 19V9"/></svg>;
    case 'cash':  return <svg viewBox="0 0 24 24" width="24" height="24" {...C}><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>;
  }
}

/* ─── Occasions ───────────────────────────────────────────────────────── */
function FFOccasions() {
  return (
    <section className="ff-sec ff-occ-sec">
      <div className="ff-container">
        <FFHead eyebrow="The Edit" title="Shop by Occasion" link="See all 12" />
        <div className="ff-occ">
          {SHARED_OCCASIONS.map((o, i) => (
            <a key={o.id} className="ff-occ__tile" style={{ '--d': `${i*70}ms` }}>
              <div className="ff-occ__img">
                <DressPlate palette={[tint(o.accent, 0.85), o.accent, tint(o.accent, -0.15) || o.accent]} dress={i % 5} />
              </div>
              <div className="ff-occ__row">
                <span className="ff-occ__name">{o.label}</span>
                <span className="ff-occ__count">{o.count}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Ages ────────────────────────────────────────────────────────────── */
function FFAges() {
  const [active, setActive] = React.useState('2-3y');
  return (
    <section className="ff-sec ff-ages-sec">
      <div className="ff-container">
        <FFHead eyebrow="Find Her Size" title="Shop by Age" />
        <div className="ff-ages">
          {SHARED_AGES.map((a) => (
            <button key={a} onClick={() => setActive(a)} className={`ff-age ${active === a ? 'is-on' : ''}`}>{a}</button>
          ))}
        </div>
        <p className="ff-ages__note"><em>Showing pieces in stock for <strong>{active}</strong></em> — every gown comes with a printed fit card.</p>
      </div>
    </section>
  );
}

/* ─── How it works ────────────────────────────────────────────────────── */
function FFHowItWorks() {
  const steps = [
    { n: 'i',   t: 'Pick a gown',            d: 'Browse the in-stock edit. Every piece on this page ships within 24 hours.' },
    { n: 'ii',  t: 'We press & pack',        d: 'Tissue-wrapped, ribbon-tied, with a printed fit & care card slipped inside.' },
    { n: 'iii', t: 'At her door tomorrow',   d: 'Metro pin codes 24–48 hrs. Anywhere in India in 3–4 working days.' },
  ];
  return (
    <section id="how" className="ff-sec ff-how">
      <div className="ff-container">
        <FFHead eyebrow="The Story" title="From Atelier to Door" />
        <ol className="ff-how__list">
          {steps.map((s, i) => {
            const [r, seen] = useInView();
            return (
              <li key={i} ref={r} className={`ff-how__step ${seen ? 'is-in' : ''}`} style={{ '--d': `${i*120}ms` }}>
                <span className="ff-how__n">{s.n}.</span>
                <h3 className="ff-how__t">{s.t}</h3>
                <p className="ff-how__d">{s.d}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ─── Filter bar (sticky) ─────────────────────────────────────────────── */
function FFFilter({ total }) {
  return (
    <div className="ff-filter" id="grid">
      <div className="ff-container ff-filter__row">
        <button className="ff-filter__btn">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
          Filter
        </button>
        <span className="ff-filter__count"><strong>{total}</strong> in stock</span>
        <select className="ff-filter__sort"><option>Newest first</option><option>Price: low</option><option>Price: high</option></select>
      </div>
    </div>
  );
}

/* ─── Grid ────────────────────────────────────────────────────────────── */
function FFGrid({ products }) {
  return (
    <section className="ff-sec ff-grid-sec">
      <div className="ff-container">
        <div className="ff-grid">
          {products.map((p, i) => <FFCard key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
function FFCard({ p, i }) {
  const [ref, seen] = useInView();
  const [hover, setHover] = React.useState(false);
  return (
    <article ref={ref} className={`ff-card ${seen ? 'is-in' : ''}`}
             style={{ '--d': `${(i % 8) * 50}ms` }}
             onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="ff-card__media">
        <DressPlate palette={p.palette} dress={p.dress} />
        <div className={`ff-card__alt ${hover ? 'is-on' : ''}`}>
          <DressPlate palette={[p.palette[0], p.palette[2], p.palette[1]]} dress={(p.dress + 2) % 5} />
        </div>
        {p.tag && <span className={`ff-card__tag ff-card__tag--${p.tag.replace(/\W/g,'').toLowerCase()}`}>{p.tag}</span>}
        <button className="ff-card__heart" aria-label="Wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 20s-7-4.6-7-10.1A4 4 0 0 1 12 7a4 4 0 0 1 7 2.9C19 15.4 12 20 12 20Z"/></svg>
        </button>
        <button className="ff-card__qv">Quick view</button>
      </div>
      <div className="ff-card__body">
        <p className="ff-card__cat">{p.occasion}</p>
        <h3 className="ff-card__name">{p.name}</h3>
        <p className="ff-card__price">{INR(p.price)} {p.was && <s>{INR(p.was)}</s>}</p>
      </div>
    </article>
  );
}

/* ─── Testimonials ────────────────────────────────────────────────────── */
function FFTestimonials() {
  return (
    <section className="ff-sec ff-tst-sec">
      <div className="ff-container">
        <FFHead eyebrow="From the Postbag" title="Two-Day Twirls" />
        <div className="ff-tst__row">
          {SHARED_TESTIMONIALS.map((tm, i) => {
            const [r, seen] = useInView();
            return (
              <figure key={i} ref={r} className={`ff-tst__card ${seen ? 'is-in' : ''}`} style={{ '--d': `${i*90}ms` }}>
                <svg className="ff-tst__quote" viewBox="0 0 24 24" fill="var(--ff-primary)"><path d="M9 7c-3 1-5 4-5 8h4v-5h-3c1-2 3-3 4-3V7zm9 0c-3 1-5 4-5 8h4v-5h-3c1-2 3-3 4-3V7z"/></svg>
                <blockquote>{tm.body}</blockquote>
                <figcaption>
                  <strong>{tm.who}</strong>
                  <span> · {tm.age}</span>
                  <em> · {tm.dress}</em>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Accessories ─────────────────────────────────────────────────────── */
function FFAccessories() {
  return (
    <section className="ff-sec ff-acc-sec">
      <div className="ff-container">
        <FFHead eyebrow="Finish the Look" title="Pair With" link="View all"/>
        <div className="ff-acc">
          {SHARED_ACCESSORIES.map((a, i) => (
            <div key={a.id} className="ff-acc__item" style={{ '--d': `${i*50}ms` }}>
              <div className="ff-acc__img" style={{ background: `linear-gradient(160deg, ${a.palette[0]}, ${tint(a.palette[1], 0.5)})` }}>
                <Sparkle color={a.palette[1]} style={{ position: 'absolute', top: 14, right: 14, width: 12, opacity: .8 }} />
                <AccessoryGlyph kind={a.id} color={a.palette[1]} />
              </div>
              <p className="ff-acc__n">{a.name}</p>
              <p className="ff-acc__p">{INR(a.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Concierge — V2 chat-bubble WhatsApp (now responsive) ───────────── */
function FFConcierge() {
  return (
    <section className="ff-con-sec">
      <div className="ff-container ff-con">
        <div className="ff-con__left">
          <span className="ff-con__idx">No. 08 — The Concierge</span>
          <h3 className="ff-con__t">A stylist,<br/><em>on WhatsApp.</em></h3>
          <p className="ff-con__d">
            Tell us the occasion, her age, a colour you adore — and three options come back within the hour, hand-picked from what's already pressed and packed.
          </p>
          <a className="ff-con__cta" href="#">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 4.5A11 11 0 0 0 3.6 18.3L2 22l3.8-1.4A11 11 0 1 0 20 4.5Zm-5.4 12c-.4 1.2-2.2 2.3-3.2 2.3-.8.1-1.7.1-2.7-.3-2.2-.9-3.7-3.2-3.8-3.4-.1-.1-1-1.3-1-2.5 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.1.1.3 0 .4-.1.2-.2.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.1.3.7 1.1 1.5 1.8.9.8 1.7 1.1 1.9 1.2.2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.4.1.1.1.6-.3 1.7Z"/></svg>
            Chat with us
          </a>
          <p className="ff-con__avail"><span className="ff-con__dot" /> Online now · replies in 12 min</p>
        </div>

        <div className="ff-con__right">
          <div className="ff-con__phone">
            <div className="ff-con__phHead">
              <span className="ff-con__avatar">FF</span>
              <div>
                <p className="ff-con__phName">Fairy Frills Stylist</p>
                <p className="ff-con__phStatus"><span className="ff-con__dot" /> online</p>
              </div>
            </div>
            <div className="ff-con__bubbles">
              <div className="ff-con__bubble ff-con__bubble--in">Need an ivory gown for a 5 y.o. <br/>by Saturday — any luck?</div>
              <div className="ff-con__bubble ff-con__bubble--out">All three pressed & ready! Quick swipe — which feels most like her?</div>
              <div className="ff-con__bubble ff-con__bubble--out ff-con__bubble--img">
                <div className="ff-con__triplet">
                  <div><DressPlate palette={SHARED_PRODUCTS[1].palette} dress={1} ratio="1/1" floral={false} /></div>
                  <div><DressPlate palette={SHARED_PRODUCTS[4].palette} dress={4} ratio="1/1" floral={false} /></div>
                  <div><DressPlate palette={SHARED_PRODUCTS[8].palette} dress={2} ratio="1/1" floral={false} /></div>
                </div>
              </div>
              <div className="ff-con__bubble ff-con__bubble--in ff-con__bubble--typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─────────────────────────────────────────────────────────────── */
function FFFAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="ff-sec ff-faq-sec">
      <div className="ff-container">
        <FFHead eyebrow="Good to Know" title="Questions, Answered" />
        <ul className="ff-faq">
          {SHARED_FAQ.map((f, i) => (
            <li key={i} className={`ff-faq__item ${open === i ? 'is-on' : ''}`}>
              <button className="ff-faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="ff-faq__plus" />
              </button>
              <div className="ff-faq__a"><p>{f.a}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ─── Newsletter ──────────────────────────────────────────────────────── */
function FFNewsletter() {
  return (
    <section className="ff-news-sec">
      <div className="ff-container ff-news">
        <div className="ff-news__copy">
          <p className="ff-news__eyebrow">— The Postscript —</p>
          <h3 className="ff-news__t">A letter,<br/><em>once a fortnight.</em></h3>
          <p className="ff-news__d">Early access to ready-to-ship drops, occasion edits, and one good story about a small person who twirled too hard.</p>
        </div>
        <form className="ff-news__form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="your-email@example.com" />
          <button>Subscribe</button>
        </form>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────────────── */
function FFFooter() {
  return (
    <footer className="ff-footer">
      <div className="ff-container ff-footer__grid">
        <div className="ff-footer__brand">
          <p className="ff-footer__logo">Fairy Frills</p>
          <p className="ff-footer__tag">Heirloom-quality occasionwear for the tiniest twirlers. Hand-finished in Jaipur, dispatched from Mumbai, twirled in 47 countries.</p>
          <div className="ff-footer__social">
            <a aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>
            <a aria-label="Pinterest"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/><path d="M11 8v8M9 12c0-2 1.5-3 3-3s3 1 3 3-1.5 3-3 3"/></svg></a>
            <a aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4.5A11 11 0 0 0 3.6 18.3L2 22l3.8-1.4A11 11 0 1 0 20 4.5Z"/></svg></a>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <ul><li><a>Ready to Ship</a></li><li><a>Made to Order</a></li><li><a>Accessories</a></li><li><a>Gift Cards</a></li><li><a>Sale</a></li></ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul><li><a>Sizing</a></li><li><a>Shipping</a></li><li><a>Exchanges</a></li><li><a>FAQ</a></li><li><a>Contact</a></li></ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <form className="ff-footer__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="email@example.com" />
            <button>→</button>
          </form>
          <div className="ff-footer__pay">
            <span>VISA</span><span>UPI</span><span>RuPay</span><span>COD</span>
          </div>
        </div>
      </div>
      <div className="ff-footer__base">
        <span>© 2026 — Fairy Frills Atelier · Jaipur · Mumbai</span>
        <span>Privacy · Terms · Sizing · Contact</span>
      </div>
    </footer>
  );
}

/* ─── Section head ────────────────────────────────────────────────────── */
function FFHead({ eyebrow, title, link }) {
  const [ref, seen] = useInView();
  return (
    <header ref={ref} className={`ff-head ${seen ? 'is-in' : ''}`}>
      <p className="ff-head__e">{eyebrow}</p>
      <h2 className="ff-head__t">{title}</h2>
      {link && <a className="ff-head__l" href="#">{link}</a>}
    </header>
  );
}

Object.assign(window, { FinalPage });
