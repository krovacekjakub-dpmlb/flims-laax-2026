import { LuDice5, LuFootprints, LuMountainSnow, LuUsers } from 'react-icons/lu';

const GROUPS = [
  {
    icon: LuMountainSnow,
    title: 'Pro starší dospělé',
    items: [
      'Každý den lze vybrat kratší i delší trasu.',
      'Krásné výhledy bez nutnosti zdolávat vrcholy: Il Spir je od parkoviště hodinu po pohodlné cestě.',
      'Pohodlné ubytování a čas na odpočinek.',
      'Auto umožní přizpůsobit výchozí místa i program.',
    ],
  },
  {
    icon: LuFootprints,
    title: 'Pro dva osmnáctileté',
    items: [
      'Scenérie na fotky: bílé stěny soutěsky, tyrkysová jezera, mlhy nad lesem.',
      'Možnost aktivních výletů a delších tras, třeba okruh 4 jezer.',
      'Zážitek ze společné cesty do Švýcarska.',
      'Svoboda při plánování denního programu.',
    ],
  },
  {
    icon: LuUsers,
    title: 'Pro Adama',
    items: [
      'Dost příležitostí k pohybu a objevování: soutěsky, visutý most, vodopády v Bargis.',
      'Delší nebo náročnější varianta, když budou podmínky vhodné.',
      'Výhledy, lesy, soutěsky a horské prostředí.',
      'Do náročnějších akcí se nemusí pouštět, když nebudou vyhovovat zbytku skupiny.',
    ],
  },
  {
    icon: LuDice5,
    title: 'Pro všechny dohromady',
    items: [
      'Pět dní mimo běžný režim, bez každodenních povinností.',
      'Večerní posezení, společné vaření a deskové hry.',
      'Podzimní krajina a vlastní auto, které dává flexibilitu.',
      'Program se přizpůsobí počasí, energii i náladě.',
    ],
  },
];

export function Why() {
  return (
    <section id="proc-jet" className="section why" aria-labelledby="why-title">
      <div className="wrap">
        <header className="section__head reveal">
          <p className="eyebrow">Proč jet?</p>
          <h2 id="why-title">Pět dní, pět lidí, jeden pořádný alpský podzim.</h2>
          <p className="section__lead">
            Přes den vyrazíme tam, kam nás pustí počasí: nad soutěsku, k jezerům, do údolí pod skalními stěnami.
            Večer se vrátíme do tepla, uvaříme si, rozložíme hru na stole a nikdo nebude nikam spěchat. Každý den si
            vybereme, kolik kilometrů si dáme.
          </p>
        </header>

        <div className="why__grid">
          {GROUPS.map(({ icon: Icon, title, items }) => (
            <div key={title} className="why__card reveal">
              <Icon aria-hidden="true" className="why__icon" />
              <h3>{title}</h3>
              <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>

        <Meme />
      </div>
    </section>
  );
}

function Meme() {
  return (
    <figure className="meme reveal" aria-labelledby="meme-cap">
      <div className="meme__panels">
        <div className="meme__panel">
          <svg viewBox="0 0 200 150" role="img" aria-label="Hrnek čaje, deka a hory za oknem">
            <rect width="200" height="150" fill="var(--meme-sky)" />
            <path d="M0 110 L45 55 L75 85 L110 40 L160 100 L200 70 L200 150 L0 150Z" fill="var(--meme-hill)" />
            <path d="M110 40 L122 55 L98 55Z" fill="var(--meme-snow)" />
            <rect x="0" y="112" width="200" height="38" fill="var(--meme-floor)" />
            <rect x="40" y="96" width="120" height="30" rx="10" fill="var(--meme-sofa)" />
            <rect x="34" y="88" width="20" height="40" rx="8" fill="var(--meme-sofa)" />
            <rect x="146" y="88" width="20" height="40" rx="8" fill="var(--meme-sofa)" />
            <rect x="88" y="78" width="20" height="22" rx="3" fill="var(--meme-cup)" />
            <path d="M108 83 q9 0 9 7 q0 7 -9 7" fill="none" stroke="var(--meme-cup)" strokeWidth="3" />
            <path d="M94 72 q-4 -6 0 -12 M102 72 q-4 -6 0 -12" fill="none" stroke="var(--meme-ink)" strokeWidth="2" strokeLinecap="round" opacity=".5" />
          </svg>
          <p>Plán: pohodová podzimní dovolená.</p>
        </div>
        <div className="meme__panel">
          <svg viewBox="0 0 200 150" role="img" aria-label="Postavička nadšeně běží do strmého kopce, ukazatel hlásí 18 km">
            <rect width="200" height="150" fill="var(--meme-sky)" />
            <path d="M0 150 L200 30 L200 150Z" fill="var(--meme-hill)" />
            <g transform="translate(150 40)">
              <rect x="-2" y="0" width="4" height="40" fill="var(--meme-ink)" />
              <path d="M2 4 H44 L52 12 L44 20 H2Z" fill="var(--meme-sign)" />
              <text x="22" y="16" textAnchor="middle" fontSize="10" fontWeight="800" fill="var(--meme-ink)">18 km</text>
            </g>
            <g transform="translate(95 82) rotate(-25)" stroke="var(--meme-ink)" strokeWidth="4" strokeLinecap="round" fill="none">
              <circle cx="0" cy="-26" r="9" fill="var(--meme-skin)" />
              <path d="M0 -17 L0 6" />
              <path d="M0 -10 L14 -22 M0 -10 L-12 -18" />
              <path d="M0 6 L12 22 M0 6 L-14 16" />
            </g>
            <path d="M60 110 l-10 2 M58 100 l-12 0 M62 120 l-9 4" stroke="var(--meme-ink)" strokeWidth="2" strokeLinecap="round" opacity=".5" />
            <text x="18" y="34" fontSize="17" fontWeight="800" fill="var(--meme-ink)" transform="rotate(-6 18 34)">JUPÍ!</text>
          </svg>
          <p>Adam po zjištění, že „pohodová“ znamená 18 km túru.</p>
        </div>
        <div className="meme__panel">
          <svg viewBox="0 0 200 150" role="img" aria-label="Čtyři postavičky leží bez hnutí na gauči, na stole rozehraná desková hra">
            <rect width="200" height="150" fill="var(--meme-sky)" />
            <rect x="0" y="112" width="200" height="38" fill="var(--meme-floor)" />
            <rect x="14" y="80" width="172" height="34" rx="10" fill="var(--meme-sofa)" />
            {[30, 70, 110, 150].map((x, i) => (
              <g key={x} transform={`translate(${x} 86)`} stroke="var(--meme-ink)" strokeWidth="3.5" strokeLinecap="round" fill="none">
                <circle cx="0" cy="0" r="8" fill="var(--meme-skin)" />
                <path d="M8 2 L30 4" />
                <path d={i % 2 ? 'M-3 -2 l2 2 M3 -2 l-2 2' : 'M-4 -1 h3 M1 -1 h3'} strokeWidth="1.6" />
              </g>
            ))}
            <rect x="70" y="124" width="60" height="18" rx="2" fill="var(--meme-board)" />
            <circle cx="84" cy="133" r="3" fill="var(--meme-ink)" />
            <rect x="110" y="129" width="7" height="7" rx="1.5" fill="var(--meme-snow)" stroke="var(--meme-ink)" />
            <text x="150" y="40" fontSize="16" fontWeight="800" fill="var(--meme-ink)" opacity=".7">z z z</text>
          </svg>
          <p>Zbytek skupiny po návratu na ubytování.</p>
        </div>
      </div>
      <figcaption id="meme-cap">Vlastní ilustrace. Všechny podobnosti s účastníky zájezdu jsou čistě záměrné.</figcaption>
    </figure>
  );
}

export function Footer() {
  const sources = [
    ['Flims Laax – oficiální web', 'https://www.flimslaax.com/'],
    ['Rýnská soutěska (flimslaax.com)', 'https://www.flimslaax.com/en/outdoor-activities/natural-phenomena/rhine-gorge/'],
    ['Caumasee (flimslaax.com)', 'https://www.flimslaax.com/en/outdoor-activities/mountain-lakes/lake-cauma'],
    ['Crestasee (flimslaax.com)', 'https://www.flimslaax.com/en/outdoor-activities/mountain-lakes/lake-cresta'],
    ['Bargis (flimslaax.com)', 'https://www.flimslaax.com/en/outdoor-activities/natural-phenomena/bargis'],
    ['Okruh 4 jezer (graubuenden.ch)', 'https://www.graubuenden.ch/en/tours/4-lake-hike-caumasee-crestasee-felsbach-gorge'],
    ['Bargis – Fidaz – Flims (graubuenden.ch)', 'https://www.graubuenden.ch/en/tours/high-altitude-hike-bargis-fidaz-flims'],
    ['Okruh Bargis (myswitzerland.com)', 'https://www.myswitzerland.com/en/experiences/route/bargis-rundweg/'],
    ['Trasa z Česka (Mapy.com)', 'https://mapy.com/s/necuzezuge'],
    ['OpenTopoMap (mapový podklad)', 'https://opentopomap.org/'],
  ];
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <div>
          <p className="footer__brand"><span className="nav__cross" aria-hidden="true" /> FLIMS LAAX 2026</p>
          <p className="footer__small">
            Návrh společné dovolené, ne rezervační stránka. Údaje ověřeny k 12. 10. 2026. Ceny, otevírací doby a sjízdnost
            tras se mohou změnit, před cestou je zkontrolujte u zdroje. Časy chůze z Mapy.com počítají s rychlostí
            4 km/h po rovině.
          </p>
        </div>
        <div>
          <h2 className="footer__h">Zdroje</h2>
          <ul className="footer__links">
            {sources.map(([l, h]) => (
              <li key={h}><a href={h} target="_blank" rel="noopener noreferrer">{l}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
