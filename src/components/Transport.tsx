import { LuExternalLink, LuRoute, LuTriangleAlert } from 'react-icons/lu';
import { TRIP } from '../data';

declare const __EMBED_MAP__: boolean | undefined;
const EMBED_MAP = typeof __EMBED_MAP__ === 'undefined' ? true : __EMBED_MAP__;

const DAYS = [
  {
    day: 'Středa 28. 10.',
    title: 'Cesta do Alp',
    items: ['Brzký ranní odjezd.', 'Cesta autem do oblasti Flims Laax.', 'Zastávky na občerstvení a protažení podle potřeby.', 'Po příjezdu ubytování, nákup potravin a odpočinek.'],
  },
  {
    day: 'Čtvrtek–sobota',
    title: 'Výlety',
    items: ['Každý den vyrazíme autem na zvolené místo.', 'Výchozí body vybíráme podle počasí, všechny jsou do 15 minut jízdy.', 'Po návratu společná večeře a relaxace na ubytování.'],
  },
  {
    day: 'Neděle 1. 11.',
    title: 'Návrat domů',
    items: ['Snídaně a odjezd podle podmínek ubytování.', 'Případně krátká zastávka po cestě, pokud bude čas.', 'Návrat do Česka navečer, podle skutečného provozu.'],
  },
];

const NOTES = [
  'Ověřit aktuální dopravní situaci a dálniční poplatky ve všech zemích na trase (Švýcarsko vyžaduje dálniční známku).',
  'Před cestou zkontrolovat počasí a horské podmínky.',
  'Zkontrolovat vybavení auta a vhodnost pneumatik, koncem října už může v horách sněžit.',
  'U každého výletu zjistit možnosti parkování u výchozího bodu.',
  'Neplánovat túry tak, aby návrat vycházel na tmu. Po přechodu na zimní čas 25. 10. zapadá slunce už kolem čtvrt na šest.',
];

export function Transport() {
  return (
    <section id="doprava" className="section section--tint" aria-labelledby="doprava-title">
      <div className="wrap">
        <header className="section__head reveal">
          <p className="eyebrow">Doprava</p>
          <h2 id="doprava-title">Jedno auto, jedna trasa, žádné přestupy</h2>
          <p className="section__lead">
            Na místo pojedeme vlastním autem a stejně se budeme přesouvat i k výchozím bodům výletů. Všechny jsou do čtvrt
            hodiny jízdy od ubytování.
          </p>
        </header>

        <div className="route">
          <div className="route__card reveal">
            <div className="route__ends">
              <div>
                <span className="route__label">Start</span>
                <strong>Česko</strong>
              </div>
              <span className="route__line" aria-hidden="true"><LuRoute /></span>
              <div>
                <span className="route__label">Cíl</span>
                <strong>Flims, Graubünden</strong>
              </div>
            </div>
            <dl className="route__stats">
              <div><dt>Vzdálenost</dt><dd>≈ {TRIP.distance}</dd></div>
              <div><dt>Doba jízdy</dt><dd>≈ {TRIP.duration}</dd></div>
              <div><dt>Odjezd</dt><dd>St 28. 10. ráno</dd></div>
              <div><dt>Návrat</dt><dd>Ne 1. 11. navečer</dd></div>
            </dl>
            <p className="route__note">
              Údaje jsou z naplánované trasy v Mapy.com a nejsou zaručené. Skutečná doba jízdy se liší podle provozu,
              počasí, zastávek a zvolené varianty trasy.
            </p>
            <a className="btn btn--forest" href={TRIP.routeUrl} target="_blank" rel="noopener noreferrer">
              Otevřít trasu v Mapy.com <LuExternalLink aria-hidden="true" />
            </a>
          </div>

          <figure className="route__map reveal">
            {EMBED_MAP ? (
              <div className="route__frame">
                <iframe
                  src={TRIP.embedUrl}
                  title="Mapa trasy z Česka do Flims (Mapy.com)"
                  width="700"
                  height="466"
                  loading="lazy"
                  style={{ border: 'none' }}
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="route__noframe">
                <p>Tady se zobrazuje mapa trasy z Mapy.com. V tomto náhledu ji vložit nejde, otevřete ji tlačítkem „Otevřít trasu v Mapy.com“.</p>
              </div>
            )}
            <figcaption className="route__map-text">
              Trasa z Mapy.com. Pokud se mapa nenačte, otevřete ji tlačítkem „Otevřít trasu v Mapy.com“. Mapu výchozích
              bodů výletů a poloh ubytování najdete níž v sekci <a href="#mapa-vyletu">Výlety</a>.
            </figcaption>
          </figure>
        </div>

        <ol className="timeline" aria-label="Organizace dopravy">
          {DAYS.map((d) => (
            <li key={d.day} className="timeline__item reveal">
              <span className="timeline__day">{d.day}</span>
              <h3>{d.title}</h3>
              <ul>
                {d.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </li>
          ))}
        </ol>

        <aside className="notes reveal" aria-labelledby="notes-title">
          <h3 id="notes-title"><LuTriangleAlert aria-hidden="true" /> Než vyrazíme</h3>
          <ul>
            {NOTES.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </aside>
      </div>
    </section>
  );
}
