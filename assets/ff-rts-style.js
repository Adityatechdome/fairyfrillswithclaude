// final-style.jsx — the FinalStyle component. Big CSS block, kept separate so
// final.jsx stays focused on markup. Mobile-first; 640 / 1024 breakpoints.

function FinalStyle() {
  return <style>{`
.ff {
  /* tokens */
  --ink:    #1F1A18;
  --ink-2:  #3B302B;
  --muted:  #6F635E;
  --line:   #E6DED5;
  --bg:     #FFFCF6;
  --cream:  #F6EFE3;
  --cream-2:#F1E6E8;
  --gold:   #B8923A;
  --glass:  rgba(255,253,246,.6);
  --glass-d:rgba(255,253,246,.78);
  --berry-d:#2A0E1B;

  --pad-x: 20px;
  --sec-y: 56px;

  font-family: 'Inter', system-ui, sans-serif;
  background: var(--bg); color: var(--ink);
  -webkit-font-smoothing: antialiased;
  font-size: 15px; line-height: 1.55;
  position: relative; overflow-x: hidden;
}
.ff[data-bg='dark'] { --bg: #1B1612; --cream: #2A2018; --cream-2: #25171F; --ink: #F6EFE3; --muted: #B8AC9F; --line: #3A2F25; --glass: rgba(43,33,28,.5); --glass-d: rgba(43,33,28,.7); }
.ff * { box-sizing: border-box; }
.ff button { font: inherit; cursor: pointer; }
.ff a { color: inherit; text-decoration: none; }
.ff em { font-style: italic; }
.ff img, .ff svg { display: block; max-width: 100%; }

.ff .serif, .ff h1, .ff h2, .ff h3, .ff h4, .ff blockquote { font-family: 'Cormorant Garamond', Georgia, serif; }
.ff h1, .ff h2, .ff h3 { font-weight: 500; letter-spacing: -0.005em; margin: 0; }

.ff-container { width: 100%; max-width: 1320px; margin: 0 auto; padding: 0 var(--pad-x); }

@media (min-width: 640px) { .ff { --pad-x: 32px; --sec-y: 72px; font-size: 15px; } }
@media (min-width: 1024px) { .ff { --pad-x: 56px; --sec-y: 96px; font-size: 16px; } }

/* ────────── announce ────────── */
.ff-announce { background: var(--ink); color: var(--bg); text-align: center; font-size: 11px; letter-spacing: 0.14em; padding: 10px 16px; height: 36px; display: flex; align-items: center; justify-content: center; }
.ff-announce__msg { animation: ffFadeUp .4s ease both; }
@keyframes ffFadeUp { from { opacity: 0; transform: translateY(6px); } }

/* ────────── nav ────────── */
.ff-nav { background: var(--bg); border-bottom: 1px solid var(--line); position: sticky; top: 0; z-index: 40; backdrop-filter: saturate(1.2); }
.ff-nav__inner { max-width: 1320px; margin: 0 auto; padding: 0 var(--pad-x); display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; height: 64px; }
.ff-nav__icon { background: transparent; border: 0; padding: 8px; color: var(--ink); position: relative; display: inline-flex; align-items: center; justify-content: center; transition: color .2s; }
.ff-nav__icon:hover { color: var(--ff-primary); }
.ff-nav__icon svg { width: 20px; height: 20px; }
.ff-nav__b { position: absolute; top: 2px; right: 0; background: var(--ff-primary); color: #fff; font-size: 9px; min-width: 14px; height: 14px; padding: 0 3px; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; font-weight: 600; line-height: 1; }
.ff-nav__logo { font-family: 'Cormorant Garamond', serif; font-size: 24px; text-align: center; font-weight: 500; line-height: 1; justify-self: center; }
.ff-nav__logo small { display: block; font-family: 'Inter'; font-size: 8px; letter-spacing: 0.36em; color: var(--muted); margin-top: 3px; text-transform: uppercase; }
.ff-nav__links { display: none; }
.ff-nav__r { display: flex; gap: 6px; justify-self: end; align-items: center; }
.ff-nav__drawer { display: flex; flex-direction: column; gap: 4px; padding: 12px 22px 18px; border-bottom: 1px solid var(--line); background: var(--bg); }
.ff-nav__drawer a { padding: 12px 0; font-family: 'Cormorant Garamond', serif; font-size: 22px; border-bottom: 1px solid var(--line); }
.ff-nav__pill { display: inline-block; font-size: 9px; letter-spacing: 0.18em; font-weight: 600; background: var(--ff-primary); color: #fff; padding: 2px 6px; border-radius: 2px; margin-left: 8px; vertical-align: 2px; }

@media (min-width: 1024px) {
  .ff-nav__inner { grid-template-columns: auto 1fr auto; height: 78px; gap: 36px; }
  .ff-nav__burger { display: none; }
  .ff-nav__logo { font-size: 26px; justify-self: start; }
  .ff-nav__links { display: flex; gap: 30px; font-size: 13px; letter-spacing: 0.04em; justify-self: center; }
  .ff-nav__links a { padding: 8px 0; position: relative; transition: color .2s; }
  .ff-nav__links a:hover { color: var(--ff-primary); }
  .ff-nav__links a.is-active { color: var(--ff-primary); font-weight: 500; }
  .ff-nav__drawer { display: none; }
}

/* ────────── HERO ────────── */
.ff-hero { position: relative; overflow: hidden; isolation: isolate; padding: 40px 0 56px; }

.ff-hero__mesh {
  position: absolute; inset: -15%; z-index: 0; pointer-events: none;
  background:
    radial-gradient(40% 35% at 12% 22%, color-mix(in srgb, var(--ff-primary) 35%, transparent) 0%, transparent 60%),
    radial-gradient(45% 40% at 88% 32%, #F4D4DC 0%, transparent 65%),
    radial-gradient(50% 45% at 30% 78%, #E8D6B0 0%, transparent 60%),
    radial-gradient(40% 40% at 80% 88%, #D9C09A 0%, transparent 60%);
  filter: blur(40px) saturate(1.1);
  animation: ffMesh 28s ease-in-out infinite;
}
@keyframes ffMesh { 50% { transform: scale(1.05) rotate(2deg); } }

.ff-petals { position: absolute; inset: 0; pointer-events: none; overflow: hidden; z-index: 1; }
.ff-petal { position: absolute; display: inline-flex; align-items: center; justify-content: center; opacity: 0.7; animation-name: ffDrift; animation-iteration-count: infinite; animation-timing-function: ease-in-out; will-change: transform; }
.ff-petal svg { width: 100%; height: 100%; }
.ff-petal--2 { border-radius: 50%; }
@keyframes ffDrift {
  0%   { transform: translate3d(0,0,0) rotate(0deg);    opacity: 0; }
  10%  { opacity: 0.7; }
  50%  { transform: translate3d(20px,30px,0) rotate(180deg); }
  90%  { opacity: 0.7; }
  100% { transform: translate3d(-10px,60px,0) rotate(360deg); opacity: 0; }
}

.ff-hero__grid { position: relative; z-index: 2; padding: 0 var(--pad-x); max-width: 1320px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 36px; align-items: center; }
.ff-hero__copy { text-align: center; }
.ff-hero__crown { margin: 0 auto 6px; width: 86px; }
.ff-hero__crown svg { width: 100%; height: 32px; }
.ff-hero__eyebrow { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 14px; color: var(--ff-primary); margin: 0 0 14px; display: flex; align-items: center; justify-content: center; gap: 10px; }
.ff-hero__eyebrow span { font-size: 10px; }
.ff-hero__title {
  font-size: clamp(46px, 9vw, 96px); line-height: 0.96; letter-spacing: -0.018em;
  text-wrap: balance; max-width: 14ch; margin: 0 auto 18px;
  background: linear-gradient(135deg, var(--ink) 30%, var(--ff-primary) 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.ff-hero__word { display: inline-block; opacity: 0; transform: translateY(14px); transition: all .7s cubic-bezier(.2,.7,.2,1); transition-delay: var(--d); }
.ff-hero.is-in .ff-hero__word { opacity: 1; transform: none; }
.ff-hero__sub { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: clamp(17px, 2vw, 21px); color: var(--muted); max-width: 38ch; margin: 0 auto 26px; line-height: 1.4; }
.ff-hero__sub em { color: var(--ff-primary); }

.ff-hero__ctas { display: flex; flex-direction: column; align-items: center; gap: 14px; margin-bottom: 28px; }
.ff-cta { position: relative; display: inline-flex; align-items: center; gap: 12px; padding: 18px 26px; min-width: 240px; border-radius: 100px; background: var(--ff-primary); color: #fff; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 500; overflow: hidden; transition: transform .25s; justify-content: center; }
.ff-cta:hover { transform: translateY(-2px); }
.ff-cta__bg { position: absolute; inset: 0; background: linear-gradient(110deg, var(--ff-primary), color-mix(in srgb, var(--ff-primary) 70%, #fff), var(--ff-primary)); background-size: 200% 100%; animation: ffShine 4s linear infinite; z-index: 0; }
@keyframes ffShine { to { background-position: 200% 0; } }
.ff-cta__t, .ff-cta__a { position: relative; z-index: 1; }
.ff-cta__a { transition: transform .2s; }
.ff-cta:hover .ff-cta__a { transform: translateX(4px); }
.ff-link { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 15px; color: var(--ff-primary); border-bottom: 1px dashed currentColor; padding-bottom: 2px; }

.ff-hero__facts { list-style: none; padding: 0; margin: 0; display: flex; gap: 24px; justify-content: center; flex-wrap: wrap; }
.ff-hero__facts li { font-size: 12px; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }
.ff-hero__facts strong { display: block; font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--ff-primary); font-size: 28px; font-weight: 500; line-height: 1; margin-bottom: 4px; letter-spacing: -0.005em; text-transform: none; }

.ff-hero__stage { position: relative; height: 380px; max-width: 460px; margin: 0 auto; width: 100%; }
.ff-hero__blob { position: absolute; border-radius: 50%; filter: blur(40px); opacity: .55; z-index: 0; }
.ff-hero__blob--a { width: 220px; height: 220px; background: var(--ff-primary); left: -20px; top: 30px; animation: ffBlob 14s ease-in-out infinite; }
.ff-hero__blob--b { width: 180px; height: 180px; background: #D9C09A; right: -20px; bottom: 0; animation: ffBlob 14s ease-in-out infinite reverse; }
@keyframes ffBlob { 50% { transform: translate(20px,-10px) scale(1.1); } }
.ff-hero__plate { position: absolute; overflow: hidden; box-shadow: 0 30px 50px -20px rgba(31,26,24,.28); border-radius: 4px; }
.ff-hero__plate--main { left: 50%; top: 50%; width: 54%; height: 86%; transform: translate(-50%,-50%); z-index: 3; animation: ffFloatMain 9s ease-in-out infinite; }
@keyframes ffFloatMain { 0%,100% { transform: translate(-50%,-50%); } 50% { transform: translate(-50%, calc(-50% - 10px)); } }
.ff-hero__plate--s1 { right: 4px; top: 28px; width: 32%; height: 50%; z-index: 2; transform: rotate(4deg); animation: ffFloat 9s ease-in-out infinite reverse; }
.ff-hero__plate--s2 { left: 4px; bottom: 14px; width: 30%; height: 46%; z-index: 2; transform: rotate(-3deg); animation: ffFloat 9s ease-in-out infinite; animation-delay: -3s; }
@keyframes ffFloat { 50% { transform: translateY(-10px) rotate(var(--rz,0deg)); } }
.ff-hero__plate--s1 { --rz: 4deg; }
.ff-hero__plate--s2 { --rz: -3deg; }

.ff-hero__glass {
  position: absolute; left: 12px; right: 12px; bottom: 12px;
  background: var(--glass); backdrop-filter: blur(18px) saturate(1.4); -webkit-backdrop-filter: blur(18px) saturate(1.4);
  border: 1px solid rgba(255,255,255,.5);
  border-radius: 12px; padding: 10px 14px;
  box-shadow: 0 4px 20px -4px rgba(31,26,24,.18);
}
.ff-hero__gtag { font-size: 9px; letter-spacing: 0.18em; color: var(--ff-primary); text-transform: uppercase; font-weight: 600; }
.ff-hero__gname { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 500; margin: 2px 0 1px; line-height: 1.15; color: var(--ink); }
.ff-hero__gprice { font-size: 12px; margin: 0; color: var(--ink); }
.ff-hero__gprice s { color: var(--muted); margin-left: 4px; }

@media (min-width: 1024px) {
  .ff-hero { padding: 80px 0 120px; }
  .ff-hero__grid { grid-template-columns: 1.05fr 1fr; gap: 64px; min-height: 580px; }
  .ff-hero__copy { text-align: left; }
  .ff-hero__crown { margin: 0 0 12px; }
  .ff-hero__eyebrow { justify-content: flex-start; }
  .ff-hero__title { margin: 0 0 22px; max-width: 13ch; }
  .ff-hero__sub { margin: 0 0 32px; max-width: 44ch; }
  .ff-hero__ctas { flex-direction: row; align-items: center; justify-content: flex-start; gap: 22px; }
  .ff-hero__facts { justify-content: flex-start; gap: 38px; }
  .ff-hero__facts strong { font-size: 34px; }
  .ff-hero__stage { height: 560px; max-width: none; }
}

/* ────────── trust ────────── */
.ff-trust { background: var(--cream); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.ff-trust__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
.ff-trust__cell { display: flex; align-items: center; gap: 14px; padding: 18px 16px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.ff-trust__cell:nth-child(2n) { border-right: 0; }
.ff-trust__cell:nth-child(n+3) { border-bottom: 0; }
.ff-trust__t { font-size: 13px; font-weight: 500; margin: 0 0 2px; line-height: 1.2; }
.ff-trust__d { font-size: 11px; color: var(--muted); margin: 0; letter-spacing: 0.02em; }
.ff-trust__i { flex: 0 0 28px; display: inline-flex; }
@media (min-width: 640px) {
  .ff-trust__grid { grid-template-columns: repeat(4, 1fr); }
  .ff-trust__cell { border-bottom: 0 !important; padding: 22px 24px; }
  .ff-trust__cell:last-child { border-right: 0; }
}

/* ────────── section + heads ────────── */
.ff-sec { padding: var(--sec-y) 0; position: relative; }
.ff-head { text-align: center; margin: 0 auto 36px; max-width: 720px; transform: translateY(20px); opacity: 0; transition: all .8s cubic-bezier(.2,.7,.2,1); }
.ff-head.is-in { transform: none; opacity: 1; }
.ff-head__e { font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--ff-primary); margin: 0 0 6px; font-size: 14px; }
.ff-head__e::before, .ff-head__e::after { content: ' · '; opacity: .6; }
.ff-head__t { font-size: clamp(30px, 4.4vw, 48px); line-height: 1.04; }
.ff-head__l { display: inline-block; margin-top: 14px; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; border-bottom: 1px solid var(--ink); padding-bottom: 2px; }
.ff-head__l:hover { color: var(--ff-primary); border-color: var(--ff-primary); }
@media (min-width: 1024px) { .ff-head { margin-bottom: 56px; } }

/* ────────── occasions ────────── */
.ff-occ-sec {}
.ff-occ {
  display: grid; grid-auto-flow: column; grid-auto-columns: 66%;
  gap: 14px; overflow-x: auto; padding-bottom: 4px;
  margin: 0 calc(-1 * var(--pad-x)); padding-left: var(--pad-x); padding-right: var(--pad-x);
  scroll-snap-type: x mandatory;
}
.ff-occ::-webkit-scrollbar { display: none; }
.ff-occ__tile { scroll-snap-align: start; opacity: 0; transform: translateY(20px); animation: ffUp .8s var(--d) both cubic-bezier(.2,.7,.2,1); animation-delay: var(--d); display: block; }
@keyframes ffUp { to { opacity: 1; transform: none; } }
.ff-occ__img { aspect-ratio: 3/4; overflow: hidden; margin-bottom: 12px; transition: transform .35s; }
.ff-occ__tile:hover .ff-occ__img { transform: scale(1.02); }
.ff-occ__row { display: flex; justify-content: space-between; align-items: baseline; }
.ff-occ__name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 500; }
.ff-occ__count { font-size: 11px; color: var(--ff-primary); letter-spacing: 0.12em; }

@media (min-width: 640px) {
  .ff-occ { grid-auto-flow: initial; grid-template-columns: repeat(3, 1fr); grid-auto-columns: initial; overflow: visible; margin: 0; padding: 0; gap: 18px; }
}
@media (min-width: 1024px) {
  .ff-occ { grid-template-columns: repeat(6, 1fr); gap: 22px; }
  .ff-occ__name { font-size: 22px; }
}

/* ────────── ages ────────── */
.ff-ages-sec { background: var(--cream); }
.ff-ages { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 6px;
  margin: 0 calc(-1 * var(--pad-x)); padding-left: var(--pad-x); padding-right: var(--pad-x); justify-content: flex-start; }
.ff-ages::-webkit-scrollbar { display: none; }
.ff-age { flex: 0 0 auto; padding: 12px 22px; border-radius: 999px; border: 1px solid var(--ff-primary); background: var(--bg); color: var(--ff-primary); font-size: 13px; letter-spacing: 0.04em; transition: all .25s; }
.ff-age.is-on, .ff-age:hover { background: var(--ff-primary); color: var(--bg); }
.ff-ages__note { font-family: 'Cormorant Garamond', serif; font-size: 18px; text-align: center; margin: 24px auto 0; color: var(--muted); max-width: 36ch; }
.ff-ages__note strong { color: var(--ink); font-weight: 500; }
@media (min-width: 1024px) {
  .ff-ages { justify-content: center; flex-wrap: wrap; margin: 0; padding: 0; }
  .ff-age { padding: 14px 28px; font-size: 14px; }
  .ff-ages__note { font-size: 20px; }
}

/* ────────── how-it-works ────────── */
.ff-how__list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr; gap: 36px; max-width: 36ch; margin-inline: auto; }
.ff-how__step { padding-left: 60px; position: relative; opacity: 0; transform: translateX(-10px); transition: all .8s cubic-bezier(.2,.7,.2,1); transition-delay: var(--d); }
.ff-how__step.is-in { opacity: 1; transform: none; }
.ff-how__n { position: absolute; left: 0; top: -10px; font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 46px; color: var(--ff-primary); line-height: 1; }
.ff-how__t { font-size: 22px; margin: 0 0 6px; }
.ff-how__d { color: var(--muted); font-size: 14px; margin: 0; line-height: 1.55; }
@media (min-width: 768px) {
  .ff-how__list { grid-template-columns: repeat(3, 1fr); gap: 32px; max-width: none; }
  .ff-how__step { padding-left: 0; padding-top: 56px; }
  .ff-how__n { left: 0; top: 0; font-size: 56px; }
}
@media (min-width: 1024px) {
  .ff-how__list { gap: 48px; }
  .ff-how__t { font-size: 26px; }
  .ff-how__d { font-size: 15px; max-width: 32ch; }
  .ff-how__n { font-size: 72px; }
}

/* ────────── filter bar ────────── */
.ff-filter { background: var(--bg); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); position: sticky; top: 64px; z-index: 30; }
@media (min-width: 1024px) { .ff-filter { top: 78px; } }
.ff-filter__row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 0; }
.ff-filter__btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 4px; border: 1px solid var(--ink); background: transparent; color: var(--ink); font-size: 12px; letter-spacing: 0.08em; }
.ff-filter__count { font-size: 12px; color: var(--muted); }
.ff-filter__count strong { color: var(--ink); font-weight: 500; }
.ff-filter__sort { appearance: none; border: 1px solid var(--line); border-radius: 4px; padding: 10px 32px 10px 14px; background: transparent; color: var(--ink); font: inherit; font-size: 12px; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231F1A18' stroke-width='1.5'><path d='M6 9l6 6 6-6'/></svg>"); background-repeat: no-repeat; background-position: right 10px center; background-size: 12px; }

/* ────────── product grid ────────── */
.ff-grid-sec { padding-top: 28px; }
.ff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 36px var(--ff-cardGap, 22px); }
@media (min-width: 640px) { .ff-grid { grid-template-columns: repeat(3, 1fr); gap: 48px var(--ff-cardGap, 24px); } }
@media (min-width: 1024px) { .ff-grid { grid-template-columns: repeat(4, 1fr); gap: 64px var(--ff-cardGap, 32px); } }

.ff-card { opacity: 0; transform: translateY(20px); transition: all .8s cubic-bezier(.2,.7,.2,1); transition-delay: var(--d, 0ms); }
.ff-card.is-in { opacity: 1; transform: none; }
.ff-card__media { position: relative; aspect-ratio: var(--ff-ratio, 3/4); overflow: hidden; margin-bottom: 12px; background: var(--cream); }
.ff-card__alt { position: absolute; inset: 0; opacity: 0; transition: opacity .35s; }
.ff-card__alt.is-on { opacity: 1; }
.ff-card__tag { position: absolute; top: 10px; left: 10px; padding: 5px 9px; background: var(--bg); color: var(--ink); font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600; border-radius: 2px; }
.ff-card__tag--bestseller { background: var(--ff-primary); color: var(--bg); }
.ff-card__tag--lastfew    { background: var(--ink); color: var(--bg); }
.ff-card__heart { position: absolute; top: 10px; right: 10px; width: 34px; height: 34px; border-radius: 50%; border: 0; background: var(--bg); display: inline-flex; align-items: center; justify-content: center; color: var(--ink); transition: color .2s, transform .2s; }
.ff-card__heart svg { width: 16px; height: 16px; }
.ff-card__heart:hover { color: var(--ff-primary); transform: scale(1.08); }
.ff-card__qv { position: absolute; left: 12px; right: 12px; bottom: 12px; padding: 10px; background: var(--bg); border: 0; color: var(--ink); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600; opacity: 0; transform: translateY(6px); transition: all .3s; }
@media (min-width: 768px) { .ff-card:hover .ff-card__qv { opacity: 1; transform: none; } }

.ff-card__cat { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 12px; color: var(--ff-primary); margin: 0 0 2px; }
.ff-card__name { font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 500; line-height: 1.18; margin: 0 0 6px; }
.ff-card__price { font-size: 13px; margin: 0; }
.ff-card__price s { color: var(--muted); margin-left: 6px; }
@media (min-width: 1024px) { .ff-card__name { font-size: 19px; } .ff-card__price { font-size: 14px; } }

/* ────────── testimonials ────────── */
.ff-tst-sec { background: var(--cream); }
.ff-tst__row { display: grid; gap: 16px; }
.ff-tst__card { position: relative; background: var(--bg); padding: 24px 22px 20px; margin: 0; border: 1px solid var(--line); opacity: 0; transform: translateY(20px); transition: all .8s cubic-bezier(.2,.7,.2,1); transition-delay: var(--d); }
.ff-tst__card.is-in { opacity: 1; transform: none; }
.ff-tst__quote { position: absolute; top: 14px; right: 16px; width: 24px; height: 24px; opacity: .28; }
.ff-tst__card blockquote { font-family: 'Cormorant Garamond', serif; font-size: 19px; line-height: 1.35; margin: 0 0 12px; font-weight: 500; letter-spacing: -0.005em; }
.ff-tst__card figcaption { font-size: 12px; color: var(--muted); letter-spacing: 0.02em; }
.ff-tst__card figcaption strong { color: var(--ink); font-weight: 600; }
.ff-tst__card figcaption em { color: var(--ff-primary); font-style: italic; }
@media (min-width: 640px) { .ff-tst__row { grid-template-columns: 1fr 1fr; gap: 20px; } }
@media (min-width: 1024px) {
  .ff-tst__row { grid-template-columns: repeat(4, 1fr); gap: 24px; }
  .ff-tst__card { padding: 32px 26px 26px; }
  .ff-tst__card blockquote { font-size: 20px; }
}

/* ────────── accessories ────────── */
.ff-acc {
  display: grid; grid-auto-flow: column; grid-auto-columns: 44%;
  gap: 14px; overflow-x: auto; padding-bottom: 4px;
  margin: 0 calc(-1 * var(--pad-x)); padding-left: var(--pad-x); padding-right: var(--pad-x);
  scroll-snap-type: x mandatory;
}
.ff-acc::-webkit-scrollbar { display: none; }
.ff-acc__item { scroll-snap-align: start; opacity: 0; transform: translateY(20px); animation: ffUp .8s var(--d) both cubic-bezier(.2,.7,.2,1); animation-delay: var(--d); }
.ff-acc__img { position: relative; aspect-ratio: 1/1; margin-bottom: 10px; overflow: hidden; }
.ff-acc__n { font-family: 'Cormorant Garamond', serif; font-size: 15px; margin: 0 0 2px; font-weight: 500; }
.ff-acc__p { font-size: 12px; margin: 0; color: var(--muted); }
@media (min-width: 640px) { .ff-acc { grid-auto-flow: initial; grid-template-columns: repeat(4, 1fr); grid-auto-columns: initial; overflow: visible; margin: 0; padding: 0; gap: 18px; } }
@media (min-width: 1024px) { .ff-acc { grid-template-columns: repeat(8, 1fr); gap: 18px; } .ff-acc__n { font-size: 16px; } }

/* ────────── concierge — V2 chat bubbles, responsive ────────── */
.ff-con-sec { padding: var(--sec-y) 0; background: var(--cream-2); position: relative; overflow: hidden; }
.ff-con-sec::before, .ff-con-sec::after { content: ''; position: absolute; width: 320px; height: 320px; border-radius: 50%; background: radial-gradient(circle, var(--ff-primary) 0%, transparent 70%); opacity: .08; pointer-events: none; }
.ff-con-sec::before { left: -100px; top: -80px; }
.ff-con-sec::after  { right: -120px; bottom: -100px; }

.ff-con { display: grid; grid-template-columns: 1fr; gap: 36px; position: relative; z-index: 2; align-items: center; }
.ff-con__left { text-align: center; }
.ff-con__idx { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ff-primary); font-weight: 600; }
.ff-con__t { font-size: clamp(34px, 5.5vw, 56px); line-height: 1.02; margin: 14px 0 16px; letter-spacing: -0.015em; }
.ff-con__t em { color: var(--ff-primary); font-style: italic; }
.ff-con__d { font-size: 14px; color: var(--muted); line-height: 1.6; max-width: 38ch; margin: 0 auto 22px; }
.ff-con__cta { display: inline-flex; align-items: center; gap: 10px; background: #25D366; color: #fff; padding: 16px 24px; font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 500; border-radius: 100px; transition: transform .2s, box-shadow .2s; box-shadow: 0 14px 28px -10px rgba(37,211,102,.55); }
.ff-con__cta:hover { transform: translateY(-2px); }
.ff-con__cta svg { width: 16px; height: 16px; }
.ff-con__avail { font-size: 11px; color: var(--muted); margin: 14px 0 0; display: inline-flex; align-items: center; gap: 8px; letter-spacing: 0.04em; }
.ff-con__dot { width: 8px; height: 8px; border-radius: 50%; background: #25D366; box-shadow: 0 0 0 0 rgba(37,211,102,.5); animation: ffPulse 1.8s ease-in-out infinite; flex: 0 0 8px; }
@keyframes ffPulse { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,.5); } 100% { box-shadow: 0 0 0 10px rgba(37,211,102,0); } }

.ff-con__right { display: flex; justify-content: center; }
.ff-con__phone { width: 100%; max-width: 360px; background: var(--bg); border: 1px solid var(--line); border-radius: 28px; padding: 18px 18px 24px; box-shadow: 0 30px 60px -25px rgba(31,26,24,.25); overflow: hidden; }
.ff-con__phHead { display: flex; align-items: center; gap: 12px; padding-bottom: 14px; border-bottom: 1px solid var(--line); margin-bottom: 14px; }
.ff-con__avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--ff-primary); color: #fff; display: inline-flex; align-items: center; justify-content: center; font-family: 'Cormorant Garamond', serif; font-weight: 600; letter-spacing: 0.04em; flex: 0 0 38px; }
.ff-con__phName { margin: 0; font-family: 'Cormorant Garamond', serif; font-size: 17px; font-weight: 500; line-height: 1.1; }
.ff-con__phStatus { margin: 2px 0 0; font-size: 11px; color: var(--muted); display: inline-flex; align-items: center; gap: 6px; }

.ff-con__bubbles { display: flex; flex-direction: column; gap: 8px; }
.ff-con__bubble { padding: 11px 14px; font-size: 13px; line-height: 1.4; max-width: 88%; border-radius: 16px; opacity: 0; transform: translateY(8px); animation: ffBubbleIn .5s ease both; }
.ff-con__bubble:nth-child(1) { animation-delay: .2s; }
.ff-con__bubble:nth-child(2) { animation-delay: 1s; }
.ff-con__bubble:nth-child(3) { animation-delay: 1.7s; }
.ff-con__bubble:nth-child(4) { animation-delay: 2.5s; }
@keyframes ffBubbleIn { to { opacity: 1; transform: none; } }
.ff-con__bubble--in { background: var(--cream); color: var(--ink); border-bottom-left-radius: 4px; align-self: flex-start; }
.ff-con__bubble--out { background: #DCF8C6; color: #1A1F1A; align-self: flex-end; border-bottom-right-radius: 4px; }
.ff-con__bubble--img { padding: 6px; max-width: 92%; }
.ff-con__triplet { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; border-radius: 10px; overflow: hidden; }
.ff-con__triplet > div { overflow: hidden; border-radius: 6px; aspect-ratio: 1/1; }
.ff-con__bubble--typing { display: inline-flex; gap: 4px; padding: 14px 16px; }
.ff-con__bubble--typing span { width: 6px; height: 6px; border-radius: 50%; background: var(--muted); animation: ffTyping 1.2s ease-in-out infinite; }
.ff-con__bubble--typing span:nth-child(2) { animation-delay: .15s; }
.ff-con__bubble--typing span:nth-child(3) { animation-delay: .3s; }
@keyframes ffTyping { 0%, 60%, 100% { opacity: .3; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }

@media (min-width: 768px) {
  .ff-con { grid-template-columns: 1fr 1fr; gap: 56px; }
  .ff-con__left { text-align: left; }
  .ff-con__d { margin: 0 0 24px; }
  .ff-con__right { justify-content: flex-end; }
}
@media (min-width: 1024px) {
  .ff-con { gap: 88px; }
  .ff-con__phone { max-width: 400px; padding: 22px 20px 28px; }
}

/* ────────── FAQ ────────── */
.ff-faq { list-style: none; padding: 0; margin: 0 auto; max-width: 880px; }
.ff-faq__item { border-bottom: 1px solid var(--line); }
.ff-faq__item:first-child { border-top: 1px solid var(--line); }
.ff-faq__q { width: 100%; text-align: left; background: transparent; border: 0; padding: 22px 0; display: flex; align-items: flex-start; justify-content: space-between; gap: 24px; color: var(--ink); font-family: 'Cormorant Garamond', serif; font-size: clamp(18px, 2.2vw, 22px); font-weight: 500; line-height: 1.25; }
.ff-faq__q:hover { color: var(--ff-primary); }
.ff-faq__plus { position: relative; width: 16px; height: 16px; flex: 0 0 16px; margin-top: 4px; }
.ff-faq__plus::before, .ff-faq__plus::after { content: ''; position: absolute; background: currentColor; }
.ff-faq__plus::before { left: 0; right: 0; top: 50%; height: 1.4px; transform: translateY(-50%); }
.ff-faq__plus::after  { top: 0; bottom: 0; left: 50%; width: 1.4px; transform: translateX(-50%); transition: transform .25s, opacity .25s; }
.ff-faq__item.is-on .ff-faq__plus::after { transform: translateX(-50%) rotate(90deg); opacity: 0; }
.ff-faq__a { max-height: 0; overflow: hidden; transition: max-height .35s cubic-bezier(.2,.7,.2,1); }
.ff-faq__item.is-on .ff-faq__a { max-height: 320px; }
.ff-faq__a p { color: var(--muted); font-size: 14px; line-height: 1.65; padding: 0 0 22px; margin: 0; max-width: 56ch; }

/* ────────── newsletter ────────── */
.ff-news-sec { background: var(--cream); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: var(--sec-y) 0; }
.ff-news { display: grid; grid-template-columns: 1fr; gap: 22px; text-align: center; }
.ff-news__eyebrow { font-family: 'Cormorant Garamond', serif; font-style: italic; color: var(--ff-primary); margin: 0 0 4px; font-size: 14px; }
.ff-news__t { font-size: clamp(28px, 4vw, 44px); line-height: 1.02; margin: 0 0 12px; }
.ff-news__t em { color: var(--ff-primary); }
.ff-news__d { font-size: 14px; color: var(--muted); max-width: 42ch; margin: 0 auto; line-height: 1.55; }
.ff-news__form { display: flex; gap: 0; max-width: 460px; margin: 0 auto; border: 1px solid var(--ink); border-radius: 4px; overflow: hidden; background: var(--bg); width: 100%; }
.ff-news__form input { flex: 1; padding: 14px 16px; border: 0; background: transparent; font: inherit; font-size: 14px; color: var(--ink); }
.ff-news__form input::placeholder { color: var(--muted); }
.ff-news__form input:focus { outline: none; }
.ff-news__form button { background: var(--ink); color: var(--bg); border: 0; padding: 0 20px; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 500; transition: background .2s; }
.ff-news__form button:hover { background: var(--ff-primary); }
@media (min-width: 768px) {
  .ff-news { grid-template-columns: 1fr 1fr; gap: 64px; text-align: left; align-items: center; }
  .ff-news__d { margin: 0; }
}
@media (min-width: 1024px) { .ff-news { gap: 96px; } }

/* ────────── footer ────────── */
.ff-footer { background: var(--ink); color: var(--bg); padding: 64px 0 28px; }
.ff-footer__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px 28px; padding-bottom: 36px; }
.ff-footer__brand { grid-column: 1 / -1; }
.ff-footer__logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 500; margin: 0 0 12px; }
.ff-footer__tag { color: rgba(255,253,246,.7); font-size: 13px; line-height: 1.6; max-width: 36ch; margin: 0 0 18px; }
.ff-footer__social { display: flex; gap: 12px; }
.ff-footer__social a { width: 36px; height: 36px; border-radius: 50%; border: 1px solid rgba(255,253,246,.2); display: inline-flex; align-items: center; justify-content: center; color: var(--bg); transition: all .2s; }
.ff-footer__social a:hover { background: var(--ff-primary); border-color: var(--ff-primary); }
.ff-footer__social svg { width: 16px; height: 16px; }
.ff-footer h4 { font-family: 'Inter', sans-serif; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,253,246,.5); font-weight: 500; margin: 0 0 16px; }
.ff-footer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; font-size: 13px; }
.ff-footer ul a:hover { color: var(--bg); opacity: .8; text-decoration: underline; text-underline-offset: 3px; }
.ff-footer__form { display: flex; gap: 0; border: 1px solid rgba(255,253,246,.25); border-radius: 4px; overflow: hidden; background: rgba(255,255,255,.04); margin-bottom: 14px; }
.ff-footer__form input { flex: 1; min-width: 0; background: transparent; border: 0; padding: 10px 12px; font: inherit; font-size: 12px; color: var(--bg); }
.ff-footer__form input::placeholder { color: rgba(255,253,246,.4); }
.ff-footer__form input:focus { outline: none; }
.ff-footer__form button { background: var(--ff-primary); color: #fff; border: 0; padding: 0 14px; font-size: 14px; }
.ff-footer__pay { display: flex; gap: 8px; flex-wrap: wrap; }
.ff-footer__pay span { font-size: 9px; padding: 4px 8px; border: 1px solid rgba(255,253,246,.18); border-radius: 3px; letter-spacing: 0.1em; color: rgba(255,253,246,.6); font-weight: 500; }
.ff-footer__base { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 22px; border-top: 1px solid rgba(255,253,246,.12); font-size: 11px; color: rgba(255,253,246,.4); letter-spacing: 0.06em; }
@media (min-width: 768px) {
  .ff-footer__grid { grid-template-columns: 1.6fr 1fr 1fr 1.4fr; gap: 48px; }
  .ff-footer__brand { grid-column: auto; }
}
@media (min-width: 1024px) { .ff-footer { padding: 88px 0 32px; } .ff-footer__grid { gap: 64px; padding-bottom: 56px; } }

  `}</style>;
}

Object.assign(window, { FinalStyle });
