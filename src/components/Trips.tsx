import { useState } from 'react';
import { LuChevronRight, LuClock, LuExternalLink, LuMaximize2, LuNavigation, LuSnowflake, LuUsers } from 'react-icons/lu';
import { STAYS, TRIPS, mapyPoint, type Trip } from '../data';
import { Img, useLightbox } from './Lightbox';
import { MapBoard } from './MapBoard';

export function Trips() {
  const [selected, setSelected] = useState(TRIPS[0].id);
  const sel = TRIPS.find((t) => t.id === selected)!;

  const pick = (id: string) => {
    setSelected(id);
  };

  return (
    <section id="vylety" className="section section--tint" aria-labelledby="vylety-title">
      <div className="wrap">
        <header className="section__head reveal">
          <p className="eyebrow">Nápady na výlety</p>
          <h2 id="vylety-title">Pět výletů, každý do čtvrt hodiny autem</h2>
          <p className="section__lead">
            Na přelomu října a listopadu už je po hlavní sezóně. Část vyhlídek a občerstvení zavírá, ve výškách může
            sněžit a stmívá se brzo. Proto u každého výletu uvádíme, co platí právě pro náš termín, a délky tras
            bereme z oficiálních zdrojů nebo z výpočtu Mapy.com.
          </p>
        </header>

        <div className="trips">
          {TRIPS.map((t, i) => (
            <TripCard key={t.id} trip={t} index={i} onShowOnMap={() => pick(t.id)} />
          ))}
        </div>

        <div id="mapa-vyletu" className="tripmap reveal">
          <div className="tripmap__side">
            <h3>Mapa výchozích bodů</h3>
            <p className="tripmap__hint">Klikněte na bod nebo na výlet v seznamu. Čísla odpovídají kartám výše, písmena V označují přibližnou polohu ubytování.</p>
            <ol className="tripmap__list">
              {TRIPS.map((t, i) => (
                <li key={t.id}>
                  <button className={selected === t.id ? 'is-active' : ''} onClick={() => pick(t.id)} aria-pressed={selected === t.id}>
                    <span className="pin-dot">{i + 1}</span>
                    <span>{t.short}</span>
                    <LuChevronRight aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ol>
            <div className="tripmap__detail" aria-live="polite">
              <span className="label">{sel.start.label}</span>
              <strong>{sel.name}</strong>
              <p>{sel.intro.split('. ')[0]}.</p>
              <div className="tripmap__links">
                <a href={mapyPoint(sel.start.lat, sel.start.lon)} target="_blank" rel="noopener noreferrer">
                  <LuNavigation aria-hidden="true" /> Výchozí bod v Mapy.com
                </a>
                <a href={`#trip-${sel.id}`}>Detail výletu</a>
              </div>
            </div>
          </div>
          <MapBoard
            crop={{ x: 12, y: 14, w: 82, h: 66 }}
            label="Mapa výchozích bodů výletů a ubytování"
            points={[
              ...STAYS.map((s, i) => ({
                id: s.id,
                lat: s.lat,
                lon: s.lon,
                label: `V${i + 1}`,
                title: `Ubytování ${i + 1} (přibližně): ${s.place.split(',')[0]}`,
                kind: 'stay' as const,
              })),
              ...TRIPS.map((t, i) => ({
                id: t.id,
                lat: t.start.lat,
                lon: t.start.lon,
                label: String(i + 1),
                title: `${i + 1}. ${t.short}: ${t.start.label}`,
                kind: 'trip' as const,
                active: selected === t.id,
                onClick: () => pick(t.id),
              })),
            ]}
          />
        </div>

        <Itinerary />
      </div>
    </section>
  );
}

function TripCard({ trip, index, onShowOnMap }: { trip: Trip; index: number; onShowOnMap: () => void }) {
  const [open, setOpen] = useState(false);
  const lightbox = useLightbox();
  return (
    <article id={`trip-${trip.id}`} className={`trip reveal ${index === 0 ? 'trip--lead' : ''}`} aria-labelledby={`trip-${trip.id}-t`}>
      <button className="trip__photo" onClick={() => lightbox([trip.photo], 0)} aria-label={`Zvětšit: ${trip.photo.alt}`}>
        <Img photo={trip.photo} />
        <span className="trip__num" aria-hidden="true">{index + 1}</span>
        <span className="trip__tag">{trip.tag}</span>
        <span className="trip__zoom" aria-hidden="true"><LuMaximize2 /></span>
      </button>
      <div className="trip__body">
        <h3 id={`trip-${trip.id}-t`}>{trip.name}</h3>
        <p className="trip__intro">{trip.intro}</p>

        <dl className="signs">
          {trip.stats.map((s) => (
            <div key={s.label} className="sign">
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
              {s.note && <span className="sign__note">{s.note}</span>}
            </div>
          ))}
        </dl>

        <p className="trip__who"><LuUsers aria-hidden="true" /> <span><strong>Pro koho:</strong> {trip.forWhom}</span></p>

        <div className="trip__season">
          <LuSnowflake aria-hidden="true" />
          <div>
            <strong>Konec října</strong>
            <ul>{trip.season.map((s) => <li key={s}>{s}</li>)}</ul>
          </div>
        </div>

        <button className="trip__more" aria-expanded={open} aria-controls={`trip-${trip.id}-more`} onClick={() => setOpen((o) => !o)}>
          {open ? 'Skrýt podrobnosti' : 'Podrobnosti, varianty a odkazy'}
          <LuChevronRight aria-hidden="true" />
        </button>
        <div id={`trip-${trip.id}-more`} className="trip__details" hidden={!open}>
          <ul className="trip__list">{trip.details.map((d) => <li key={d}>{d}</li>)}</ul>
          <div className="trip__links">
            {trip.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} <LuExternalLink aria-hidden="true" />
              </a>
            ))}
            <a href="#mapa-vyletu" onClick={onShowOnMap}>Ukázat na mapě <LuChevronRight aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

const PLAN = [
  { day: 'St 28. 10.', title: 'Cesta do Švýcarska', items: ['Brzký odjezd.', 'Příjezd, ubytování, nákup a odpočinek.'] },
  { day: 'Čt 29. 10.', title: 'Rýnská soutěska', items: ['Hlavní přírodní zážitek dovolené: Il Spir.', 'Vyhlídky a pěší trasa podle počasí.', 'Večer společné vaření.'] },
  { day: 'Pá 30. 10.', title: 'Jezera a lesy', items: ['Caumasee a případně Crestasee.', 'Klidnější pěší den a fotografování.', 'Večer odpočinek na ubytování.'] },
  { day: 'So 31. 10.', title: 'Větší výlet', items: ['Bargis, Trin nebo jiná trasa podle aktuálních podmínek.', 'Aktivnější část si může zvolit delší variantu.', 'Společná večeře.'] },
  { day: 'Ne 1. 11.', title: 'Krátká procházka a návrat', items: ['Snídaně, případně krátký výlet podle času a počasí.', 'Odjezd zpět do Česka.', 'Předpokládaný návrat navečer podle provozu.'] },
];

function Itinerary() {
  return (
    <div className="plan reveal" aria-labelledby="plan-title">
      <div className="plan__head">
        <h3 id="plan-title">Orientační plán pěti dnů</h3>
        <p><LuClock aria-hidden="true" /> Jen návrh. Pořadí výletů prohodíme podle počasí: nejhezčí den patří soutěsce nebo Bargis, deštivý den jezerům v lese.</p>
      </div>
      <ol className="plan__days">
        {PLAN.map((d) => (
          <li key={d.day}>
            <span className="plan__day">{d.day}</span>
            <strong>{d.title}</strong>
            <ul>{d.items.map((i) => <li key={i}>{i}</li>)}</ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
