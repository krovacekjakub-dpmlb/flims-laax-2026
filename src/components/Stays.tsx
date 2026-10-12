import { useRef, useState, type KeyboardEvent } from 'react';
import { LuBath, LuBedDouble, LuCircleAlert, LuExternalLink, LuMaximize2, LuSquareParking, LuStar, LuUsers, LuCheck } from 'react-icons/lu';
import { STAYS, czk, mapyPoint, type Stay } from '../data';
import { Img, useLightbox } from './Lightbox';
import { MapBoard } from './MapBoard';

const NIGHTS = 4;
const PEOPLE = 5;

export function Stays() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let n = i;
    if (e.key === 'ArrowRight') n = (i + 1) % STAYS.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + STAYS.length) % STAYS.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = STAYS.length - 1;
    else return;
    e.preventDefault();
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <section id="ubytovani" className="section" aria-labelledby="ubytovani-title">
      <div className="wrap">
        <header className="section__head reveal">
          <p className="eyebrow">Ubytování</p>
          <h2 id="ubytovani-title">Tři nabídky, jeden obývák pro pět lidí</h2>
          <p className="section__lead">
            Tři konkrétní nabídky z Airbnb pro termín 28. 10.–1. 11. 2026 a 5 hostů. Ceny jsou za celý pobyt. Fotky,
            vybavení a rozložení postelí pochází přímo z nabídek; co se z nich nedá vyčíst, je označené k ověření.
          </p>
        </header>

        <div className="tabs" role="tablist" aria-label="Varianty ubytování">
          {STAYS.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => { tabs.current[i] = el; }}
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={active === i}
              aria-controls={`panel-${s.id}`}
              tabIndex={active === i ? 0 : -1}
              className={`tab ${active === i ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="tab__name">
                {s.tab}
                {s.favorite && <span className="tab__fav"><LuStar aria-hidden="true" /> favorit</span>}
              </span>
              <span className="tab__price">{czk(s.price)}</span>
            </button>
          ))}
        </div>

        {STAYS.map((s, i) => (
          <div
            key={s.id}
            role="tabpanel"
            id={`panel-${s.id}`}
            aria-labelledby={`tab-${s.id}`}
            hidden={active !== i}
            className="stay"
          >
            {active === i && <StayPanel stay={s} />}
          </div>
        ))}

        <PriceCompare />
        <StayMap active={active} onPick={setActive} />
        <Recommendation />
      </div>
    </section>
  );
}

function StayPanel({ stay }: { stay: Stay }) {
  const open = useLightbox();
  const perPerson = stay.price / PEOPLE;
  return (
    <div className="stay__grid">
      <div className="stay__photos">
        <button className="stay__main" onClick={() => open(stay.photos, 0)} aria-label={`Zvětšit: ${stay.photos[0].alt}`}>
          <Img photo={stay.photos[0]} eager />
          <span className="stay__count"><LuMaximize2 aria-hidden="true" /> {stay.photos.length} fotek</span>
        </button>
        <div className="stay__thumbs">
          {stay.photos.slice(1, 7).map((p, i) => (
            <button key={p.src} onClick={() => open(stay.photos, i + 1)} aria-label={`Zvětšit: ${p.alt}`}>
              <Img photo={p} />
            </button>
          ))}
        </div>
        <p className="credit-note">Fotografie: nabídka na Airbnb. Kliknutím otevřete galerii.</p>
      </div>

      <div className="stay__info">
        <p className="stay__kind">{stay.kind} · {stay.place}</p>
        <h3 className="stay__title">{stay.title}</h3>
        <p className="stay__focus">{stay.focus}</p>

        <div className="stay__price">
          <div>
            <span className="label">Cena za celý pobyt</span>
            <strong>{czk(stay.price)}</strong>
          </div>
          <div>
            <span className="label">Na osobu</span>
            <span>≈ {czk(perPerson)}</span>
          </div>
          <div>
            <span className="label">Na osobu a noc</span>
            <span>≈ {czk(perPerson / NIGHTS)}</span>
          </div>
        </div>

        <ul className="stay__facts" aria-label="Kapacita">
          <li><LuUsers aria-hidden="true" /> až {stay.facts.guests} hostů</li>
          <li><LuBedDouble aria-hidden="true" /> {stay.facts.bedrooms} ložnice · {stay.facts.beds} lůžek</li>
          <li><LuBath aria-hidden="true" /> {stay.facts.baths} {stay.facts.baths === 1 ? 'koupelna' : 'koupelny'}</li>
        </ul>

        <p className="stay__pitch">{stay.pitch}</p>

        <ul className="stay__highlights">
          {stay.highlights.map((h) => <li key={h}><LuCheck aria-hidden="true" /> {h}</li>)}
        </ul>

        <div className="stay__sleep">
          <span className="label">Kde se spí</span>
          <ul>{stay.sleeping.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>

        <div className="stay__parking">
          <LuSquareParking aria-hidden="true" />
          <p><strong>Parkování:</strong> {stay.parking}</p>
        </div>

        <div className="stay__actions">
          <a className="btn btn--forest" href={stay.url} target="_blank" rel="noopener noreferrer">
            Zobrazit nabídku na Airbnb <LuExternalLink aria-hidden="true" />
          </a>
          <a className="btn btn--line" href={mapyPoint(stay.lat, stay.lon, 14)} target="_blank" rel="noopener noreferrer">
            Přibližná poloha v Mapy.com
          </a>
        </div>
      </div>

      <div className="stay__amen">
        <h4>Vybavení podle nabídky</h4>
        <div className="amen">
          {stay.amenities.map((g) => (
            <div key={g.group} className="amen__group">
              <span className="label">{g.group}</span>
              <ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>

      <aside className="stay__verify" aria-label="Co ověřit">
        <h4><LuCircleAlert aria-hidden="true" /> Před rezervací ověřit</h4>
        <ul>{stay.verify.map((v) => <li key={v}>{v}</li>)}</ul>
        {stay.extra && <p className="stay__extra">{stay.extra}</p>}
      </aside>
    </div>
  );
}

function PriceCompare() {
  const max = 30000;
  const ticks = [0, 10000, 20000, 30000];
  const min = Math.min(...STAYS.map((s) => s.price));
  const top = Math.max(...STAYS.map((s) => s.price));
  return (
    <div className="prices reveal" aria-labelledby="prices-title">
      <div className="prices__head">
        <h3 id="prices-title">Porovnání cen</h3>
        <p>Všechny ceny jsou za celý pobyt (4 noci), ne za jednu noc. Přepočet na osobu počítá s 5 účastníky.</p>
      </div>

      <div className="chart" role="img" aria-label={`Sloupcový graf cen: ${STAYS.map((s) => `${s.tab} ${czk(s.price)}`).join(', ')}`}>
        {STAYS.map((s) => (
          <div key={s.id} className="chart__row">
            <span className="chart__name">{s.tab}{s.favorite ? ' ★' : ''}</span>
            <div className="chart__track">
              <div className={`chart__bar ${s.price === min ? 'is-min' : ''} ${s.favorite ? 'is-fav' : ''}`} style={{ width: `${(s.price / max) * 100}%` }} />
              <span className="chart__val" style={{ left: `${(s.price / max) * 100}%` }}>{czk(s.price)}</span>
            </div>
          </div>
        ))}
        <div className="chart__axis" aria-hidden="true">
          <span className="chart__name" />
          <div className="chart__ticks">
            {ticks.map((t) => (
              <span key={t} style={{ left: `${(t / max) * 100}%` }}>{t === 0 ? '0' : `${t / 1000} tis.`}</span>
            ))}
          </div>
        </div>
      </div>
      <p className="prices__diff">
        Rozdíl mezi nejlevnější a nejdražší nabídkou: <strong>{czk(top - min)}</strong> za pobyt, tedy{' '}
        <strong>{czk((top - min) / PEOPLE)}</strong> na osobu.
      </p>

      <div className="table-wrap">
        <table className="ptable">
          <thead>
            <tr>
              <th scope="col">Varianta</th>
              <th scope="col" className="num">Cena za pobyt</th>
              <th scope="col" className="num">Na osobu</th>
              <th scope="col" className="num">Na osobu / noc</th>
              <th scope="col">Charakteristika</th>
            </tr>
          </thead>
          <tbody>
            {STAYS.map((s) => (
              <tr key={s.id}>
                <th scope="row">{s.tab.replace('Varianta ', '')}{s.favorite ? ' ★' : ''}</th>
                <td className="num">{czk(s.price)}</td>
                <td className="num">≈ {czk(s.price / PEOPLE)}</td>
                <td className="num">≈ {czk(s.price / PEOPLE / NIGHTS)}</td>
                <td>{s.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StayMap({ active, onPick }: { active: number; onPick: (i: number) => void }) {
  return (
    <div id="mapa-ubytovani" className="staymap reveal">
      <div className="staymap__text">
        <h3>Kde nabídky leží</h3>
        <p>
          Body ukazují <strong>přibližnou polohu</strong>, kterou zveřejňuje Airbnb. Přesnou adresu hostitel sdělí až po
          rezervaci. Kliknutím na bod přepnete záložku nahoře.
        </p>
        <ul className="staymap__legend">
          {STAYS.map((s, i) => (
            <li key={s.id}>
              <button className={active === i ? 'is-active' : ''} onClick={() => onPick(i)}>
                <span className="pin-dot pin-dot--stay">{i + 1}</span> {s.place.split(',')[0]} · {czk(s.price)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <MapBoard
        crop={{ x: 4, y: 30, w: 60, h: 52 }}
        label="Mapa přibližných poloh ubytování"
        points={STAYS.map((s, i) => ({
          id: s.id,
          lat: s.lat,
          lon: s.lon,
          label: String(i + 1),
          title: `${s.tab}: ${s.place.split(',')[0]}`,
          kind: 'stay' as const,
          active: active === i,
          onClick: () => onPick(i),
        }))}
      />
    </div>
  );
}

function Recommendation() {
  const [v1, v2, v3] = STAYS;
  return (
    <div className="rec reveal" aria-labelledby="rec-title">
      <h3 id="rec-title">Fakta pro rozhodnutí</h3>
      <p className="rec__lead">Nerozhodujeme za skupinu, jen shrnujeme, co z nabídek vyplývá.</p>
      <div className="rec__grid">
        <div>
          <span className="label">Nejlevnější</span>
          <p><strong>Varianta 2</strong> za {czk(v2.price)}, tedy ≈ {czk(v2.price / PEOPLE)} na osobu. Spí se ale v jedné manželské posteli a dvou patrových.</p>
        </div>
        <div>
          <span className="label">Nejzajímavější doložené vybavení</span>
          <p><strong>Varianta 1</strong> má krb na dřevo, výhled na jezero, terasu s lehátky a stolní hry. <strong>Varianta 3</strong> má jako jediná dvě koupelny, tři ložnice a sadu na raclette a fondue.</p>
        </div>
        <div>
          <span className="label">Příplatek za favorita</span>
          <p>Varianta 3 stojí oproti variantě 2 o <strong>{czk(v3.price - v2.price)}</strong> víc, tj. ≈ {czk((v3.price - v2.price) / PEOPLE)} na osobu. Oproti variantě 1 o {czk(v3.price - v1.price)}.</p>
        </div>
        <div>
          <span className="label">Ověřit u všech</span>
          <p>Aktuální cenu a storno podmínky, čas příjezdu a odjezdu, spaní pro 5 dospělých a parkování pro naše auto.</p>
        </div>
      </div>
    </div>
  );
}
