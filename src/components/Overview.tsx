import { LuCalendarDays, LuCar, LuTrees, LuUsers, LuMaximize2 } from 'react-icons/lu';
import { GALLERY, TRIP } from '../data';
import { Img, useLightbox } from './Lightbox';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <img
        className="hero__img"
        src="img/hero.webp"
        alt="Rýnská soutěska v ranní mlze, bílé skalní stěny a lesy nad řekou"
        fetchPriority="high"
      />
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__content wrap">
        <p className="eyebrow eyebrow--light">Flims Laax · Švýcarsko</p>
        <h1 id="hero-title">Pět dní mezi alpskými velikány</h1>
        <p className="hero__lead">Podzimní vzduch, tyrkysová jezera, hluboké soutěsky a večery, kdy nikam nemusíme.</p>
        <div className="hero__actions">
          <a className="btn btn--gold" href="#rychly-prehled">Objevit plán</a>
          <a className="btn btn--ghost" href="#ubytovani">Prohlédnout ubytování</a>
        </div>
      </div>
      <div className="hero__bar">
        <ul className="wrap hero__facts" aria-label="Základní parametry">
          <li><b>{TRIP.dates}</b></li>
          <li>5 lidí</li>
          <li>4 noci</li>
          <li>Roadtrip autem</li>
        </ul>
      </div>
      <p className="hero__credit">Foto: Flims Laax Falera</p>
    </section>
  );
}

const QUICK = [
  { icon: LuCalendarDays, big: '5 dní', text: 'Od středečního rána do nedělního večera.' },
  { icon: LuUsers, big: '5 cestovatelů', text: 'Tři věkové skupiny v jedné výpravě.' },
  { icon: LuCar, big: 'Autem', text: 'Svoboda při přesunech a výběru výchozích bodů túr.' },
  { icon: LuTrees, big: 'Příroda a pohoda', text: 'Aktivní dny, pohodové večery.' },
];

export function Overview() {
  const open = useLightbox();
  return (
    <section id="prehled" className="section" aria-labelledby="prehled-title">
      <div className="wrap">
        <div id="rychly-prehled" className="quick">
          {QUICK.map(({ icon: Icon, big, text }) => (
            <div key={big} className="quick__item reveal">
              <Icon aria-hidden="true" className="quick__icon" />
              <strong>{big}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="intro">
          <div className="intro__text reveal">
            <p className="eyebrow">Proč právě Flims Laax?</p>
            <h2 id="prehled-title">Lyžařský ráj, který na podzim patří chodcům</h2>
            <p>
              Flims Laax zná většina lidí ze zimy. Na konci října se ale lanovky zastaví, davy zmizí a krajina zůstane
              chodcům. Lesy pod stěnami Flimsersteinu rostou na troskách flimského sesuvu, největšího známého skalního
              řícení v Alpách. Rýn si jimi prořízl soutěsku Ruinaulta, švýcarský Grand Canyon.
            </p>
            <p>
              V lese schovaná jezera Caumasee a Crestasee mají i v říjnu tyrkysovou barvu. Na vyhlídky nad soutěskou
              dojdeme z Flimsu za hodinu. Oficiální web uvádí v oblasti asi 250 km značených tras. Na pět dní je to
              víc než dost, a když jeden den zaprší, máme kam uhnout.
            </p>
            <dl className="intro__facts">
              <div><dt>Kanton</dt><dd>Graubünden</dd></div>
              <div><dt>Flims Waldhaus</dt><dd>≈ 1 100 m n. m.</dd></div>
              <div><dt>Údolí Bargis</dt><dd>≈ 1 550 m n. m.</dd></div>
            </dl>
          </div>

          <div className="gallery reveal" aria-label="Fotogalerie destinace">
            {GALLERY.map((p, i) => (
              <button key={p.src} className={`gallery__item g${i}`} onClick={() => open(GALLERY, i)} aria-label={`Zvětšit: ${p.alt}`}>
                <Img photo={p} />
                <span className="gallery__zoom" aria-hidden="true"><LuMaximize2 /></span>
              </button>
            ))}
          </div>
        </div>
        <p className="credit-note">Fotografie destinace: Flims Laax Falera (flimslaax.com). Poslední snímek je z nabídky ubytování na Airbnb.</p>
      </div>
    </section>
  );
}
