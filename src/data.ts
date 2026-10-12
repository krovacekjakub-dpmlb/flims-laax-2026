// Všechna data webu na jednom místě. Údaje jsou ověřené k 12. 10. 2026
// (Airbnb nabídky, flimslaax.com, graubuenden.ch, myswitzerland.com, výpočty Mapy.com).

export type Photo = { src: string; alt: string; credit?: string };

const img = (name: string) => `img/${name}.webp`;

/* ---------- Mapa (statický podklad OpenTopoMap, Web Mercator, zoom 14) ---------- */
// Podklad pokrývá dlaždice x 8612–8618, y 5771–5776 → 7 × 6 dlaždic (1792 × 1536 px).
const Z = 2 ** 14;
const TX0 = 8612, TY0 = 5771, TW = 7, TH = 6;
export function project(lat: number, lon: number) {
  const tx = ((lon + 180) / 360) * Z;
  const r = (lat * Math.PI) / 180;
  const ty = ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * Z;
  return { x: ((tx - TX0) / TW) * 100, y: ((ty - TY0) / TH) * 100 };
}

export const mapyPoint = (lat: number, lon: number, zoom = 15) =>
  `https://mapy.com/fnc/v1/showmap?mapset=outdoor&center=${lon},${lat}&zoom=${zoom}&marker=true`;
export const mapyRoute = (from: [number, number], to: [number, number], type = 'foot_hiking', via?: [number, number][]) =>
  `https://mapy.com/fnc/v1/route?mapset=outdoor&start=${from[1]},${from[0]}&end=${to[1]},${to[0]}&routeType=${type}` +
  (via ? `&waypoints=${via.map(([la, lo]) => `${lo},${la}`).join(';')}` : '');

// Ověřené body (OpenStreetMap / Nominatim)
export const P = {
  waldhausParking: [46.82594, 9.28971] as [number, number],
  caumasee: [46.8202, 9.29634] as [number, number],
  conn: [46.81321, 9.31606] as [number, number],
  ilSpir: [46.8127, 9.31982] as [number, number],
  crestasee: [46.83133, 9.32104] as [number, number],
  fidaz: [46.84096, 9.30972] as [number, number],
  bargis: [46.85391, 9.32635] as [number, number],
  trin: [46.82821, 9.36216] as [number, number],
  trinStation: [46.81645, 9.35966] as [number, number],
  puntRuinaulta: [46.81622, 9.35686] as [number, number],
};

/* ---------- Trip & route ---------- */
export const TRIP = {
  routeUrl: 'https://mapy.com/s/necuzezuge',
  embedUrl: 'https://mapy.com/s/jozopohezu',
  distance: '746,3 km',
  duration: '7 h 39 min',
  dates: '28. 10. – 1. 11. 2026',
};

/* ---------- Ubytování ---------- */
export type Stay = {
  id: string;
  tab: string;
  favorite?: boolean;
  title: string;
  place: string;
  kind: string;
  price: number;
  url: string;
  facts: { guests: number; bedrooms: number; beds: number; baths: number };
  sleeping: string[];
  lat: number;
  lon: number;
  focus: string;
  pitch: string;
  highlights: string[];
  amenities: { group: string; items: string[] }[];
  parking: string;
  verify: string[];
  extra?: string;
  photos: Photo[];
};

const air = 'Foto: nabídka na Airbnb';

export const STAYS: Stay[] = [
  {
    id: 'v1',
    tab: 'Varianta 1',
    title: 'Okouzlující chata s výhledem na jezero',
    place: 'Laax, Graubünden',
    kind: 'Celá horská chata',
    price: 22472,
    url: 'https://www.airbnb.cz/rooms/818739716347452779?adults=5&check_in=2026-10-28&check_out=2026-11-01',
    facts: { guests: 6, bedrooms: 3, beds: 6, baths: 1 },
    sleeping: ['Ložnice 1: 2 jednolůžka', 'Ložnice 2: 2 jednolůžka', 'Ložnice 3: 1 patrová postel'],
    lat: 46.81,
    lon: 9.2586,
    focus: 'Výhledy, krb, terasa',
    pitch:
      'Rustikální chata nad jezerem Laaxersee. Podle popisu má obývák s jídelnou o 31 m² s výstupem na balkon, krb na dřevo a výhled na jezero, vesnici i hory. Ideální kulisa pro večery po túře.',
    highlights: ['Výhled na jezero, údolí a hory', 'Vnitřní krb na dřevo', 'Terasa s venkovním posezením', 'Stolní hry a knihy'],
    amenities: [
      { group: 'Kuchyně', items: ['Lednice V-ZUG', 'Elektrický sporák a trouba', 'Myčka nádobí', 'Toustovač, mixér, sklenice na víno', 'Jídelní stůl'] },
      { group: 'Pohodlí', items: ['Krb na dřevo + ústřední topení', 'Wi-Fi a TV', 'Zatemňovací závěsy', 'Pračka a sušička v budově (v ceně)'] },
      { group: 'Venku', items: ['Soukromá terasa / balkon', 'Venkovní jídelna a lehátka', 'Přístup k jezeru po stezce'] },
      { group: 'Příjezd', items: ['Samoobslužný příjezd', 'Schránka na klíče', 'Nabíječka elektromobilů'] },
    ],
    parking: '1 místo v krytém přístřešku zdarma + 1 placené parkovací místo v areálu.',
    verify: [
      'Cenu placeného parkovacího místa (pokud by bylo potřeba druhé auto).',
      'Rozdělení postelí: dvě ložnice s jednolůžky a jedna s patrovou postelí.',
      'Jen 1 koupelna pro 5 lidí.',
      'Přesná poloha: Airbnb ukazuje jen přibližné místo.',
    ],
    extra: 'Popis nabídky uvádí název Casa la Runtga.',
    photos: [
      { src: img('v1_1'), alt: 'Obývací pokoj chaty s velkými okny a výhledem do údolí', credit: air },
      { src: img('v1_2'), alt: 'Balkon s výhledem na jezero Laaxersee a okolní hory', credit: air },
      { src: img('v1_3'), alt: 'Pohled na chatu a terasu z venku', credit: air },
      { src: img('v1_4'), alt: 'Obývací část s krbem a sedačkou', credit: air },
      { src: img('v1_5'), alt: 'Jídelní kout s dřevěným obložením', credit: air },
      { src: img('v1_7'), alt: 'Chata a terasa za slunečného dne', credit: air },
      { src: img('v1_8'), alt: 'Ložnice s jednolůžky a kostkovaným povlečením', credit: air },
      { src: img('v1_9'), alt: 'Druhá ložnice s dřevěným obložením', credit: air },
      { src: img('v1_10'), alt: 'Malý pokoj s patrovou postelí', credit: air },
    ],
  },
  {
    id: 'v2',
    tab: 'Varianta 2',
    title: 'Světlý rodinný apartmán s výhledem • Srdce Flimsu',
    place: 'Flims, Graubünden',
    kind: 'Celý apartmán',
    price: 20719,
    url: 'https://www.airbnb.cz/rooms/1564345659098090866?adults=5&check_in=2026-10-28&check_out=2026-11-01',
    facts: { guests: 6, bedrooms: 2, beds: 6, baths: 1 },
    sleeping: ['Ložnice 1: 1 manželská postel', 'Ložnice 2: 2 patrové postele'],
    lat: 46.8342,
    lon: 9.283,
    focus: 'Nejnižší cena, vana, káva',
    pitch:
      'Nejlevnější z variant a přímo ve Flimsu. Prostorný obývák s velkými okny a balkonem, vana na prohřátí po túře a kávovar Nespresso na ranní start.',
    highlights: ['Nejnižší cena za pobyt', 'Vana a kosmetika Rituals', 'Nespresso i french press', 'Zvukový systém Loewe'],
    amenities: [
      { group: 'Kuchyně', items: ['Lednice a mrazák AEG', 'Indukční sporák a trouba AEG', 'Myčka nádobí', 'Rychlovarná konvice, toustovač', 'Káva v ceně'] },
      { group: 'Pohodlí', items: ['Vana', 'Wi-Fi, ethernet a TV', 'Vyhrazený pracovní prostor', 'Polštáře a přikrývky navíc'] },
      { group: 'Venku', items: ['Soukromá terasa / balkon', 'Venkovní nábytek'] },
      { group: 'Příjezd', items: ['Samoobslužný příjezd', 'Schránka na klíče', 'Možnost nechat zavazadla', 'Úklid za příplatek'] },
    ],
    parking: 'Parkování na pozemku zdarma.',
    verify: [
      'Spaní: jedna manželská postel a dvě patrové postele. Ověřit, zda patrové postele vyhovují dospělým.',
      'Pračka není v seznamu vybavení uvedena.',
      'Na pozemku jsou venkovní kamery a monitor hluku (uvádí hostitel).',
      'Přesná poloha: Airbnb ukazuje jen přibližné místo.',
    ],
    extra: 'Hodnocení na Airbnb: 4,68 z 5 (22 hodnocení), stav k 12. 10. 2026.',
    photos: [
      { src: img('v2_1'), alt: 'Dům s apartmánem ve Flimsu a dřevěnými balkony', credit: air },
      { src: img('v2_10'), alt: 'Obývací pokoj s velkými okny, sedačkou a jídelním stolem', credit: air },
      { src: img('v2_11'), alt: 'Obývací pokoj z jiného úhlu', credit: air },
      { src: img('v2_2'), alt: 'Výhled z balkonu na zasněžené lesy nad Flimsem', credit: air },
      { src: img('v2_3'), alt: 'Dřevěný balkon se zábradlím a výhledem', credit: air },
      { src: img('v2_5'), alt: 'Výhled z balkonu na městečko a hory', credit: air },
      { src: img('v2_9'), alt: 'Ložnice s manželskou postelí', credit: air },
      { src: img('v2_8'), alt: 'Detail postele v ložnici', credit: air },
      { src: img('v2_6'), alt: 'Koupelna', credit: air },
    ],
  },
  {
    id: 'v3',
    tab: 'Varianta 3',
    favorite: true,
    title: 'Prostorný byt s výhledem na hory · Flims Dorf',
    place: 'Flims Dorf, Graubünden',
    kind: 'Celá nájemní jednotka',
    price: 27009,
    url: 'https://www.airbnb.cz/rooms/1767224133294554664?adults=5&children=0&infants=0&pets=0&check_in=2026-10-28&check_out=2026-11-01',
    facts: { guests: 6, bedrooms: 3, beds: 4, baths: 2 },
    sleeping: ['Ložnice 1: 1 menší manželská postel', 'Ložnice 2: 1 menší manželská postel', 'Ložnice 3: 2 jednolůžka (podkroví)'],
    lat: 46.8358,
    lon: 9.3002,
    focus: 'Favorit podle původního návrhu',
    pitch:
      'V původním návrhu označená jako nejlepší, zároveň nejdražší. Podle popisu jde o světlý byt se 4,5 pokoji na dvou podlažích, se slunným balkonem na jih, sadou na raclette a fondue a parkováním v podzemní garáži.',
    highlights: ['Jako jediná má 2 koupelny', '3 ložnice na dvou podlažích', 'Balkon orientovaný na jih', 'Sada na raclette a fondue'],
    amenities: [
      { group: 'Kuchyně', items: ['Lednice', 'Základní vybavení na vaření', 'Kávovar Nespresso', 'Rozkládací jídelní stůl', 'Sada na raclette a fondue'] },
      { group: 'Pohodlí', items: ['Pračka a sušička', 'Wi-Fi, chytrá TV s Apple TV', 'Vyhrazený pracovní prostor', 'Žehlička'] },
      { group: 'Venku', items: ['Balkon na jih', 'Venkovní nábytek'] },
      { group: 'Příjezd', items: ['Samoobslužný check-in'] },
    ],
    parking: 'Parkování na pozemku zdarma; popis upřesňuje, že jde o místo v podzemní garáži v ceně.',
    verify: [
      'Podkrovní ložnice má podle popisu nízký strop a strmé schody.',
      'Manželské postele jsou uvedeny jako „menší“.',
      'Nová nabídka zatím bez hodnocení.',
      'Bezbariérový přístup není zajištěn.',
      'Přesná poloha: Airbnb ukazuje jen přibližné místo.',
    ],
    photos: [
      { src: img('v3_1'), alt: 'Světlý obývací pokoj s jídelním stolem a výhledem na hory', credit: air },
      { src: img('v3_2'), alt: 'Obývací část s bílou sedačkou', credit: air },
      { src: img('v3_11'), alt: 'Jídelní stůl u oken s výhledem do údolí', credit: air },
      { src: img('v3_3'), alt: 'Obývací pokoj s pohovkou', credit: air },
      { src: img('v3_4'), alt: 'Jídelní a obývací část', credit: air },
      { src: img('v3_5'), alt: 'Ložnice s manželskou postelí', credit: air },
      { src: img('v3_9'), alt: 'Další ložnice', credit: air },
      { src: img('v3_6'), alt: 'Kávovar Nespresso v kuchyni', credit: air },
    ],
  },
];

/* ---------- Výlety ---------- */
export type Stat = { label: string; value: string; note?: string };
export type Trip = {
  id: string;
  name: string;
  short: string;
  tag: string;
  photo: Photo;
  intro: string;
  stats: Stat[];
  forWhom: string;
  details: string[];
  season: string[];
  start: { label: string; lat: number; lon: number };
  links: { label: string; href: string }[];
};

const fl = 'Foto: Flims Laax Falera (flimslaax.com)';

export const TRIPS: Trip[] = [
  {
    id: 'ruinaulta',
    name: 'Rýnská soutěska a vyhlídka Il Spir',
    short: 'Il Spir',
    tag: 'Hlavní výlet',
    photo: { src: img('gorge_aerial'), alt: 'Rýnská soutěska Ruinaulta z výšky, bílé vápencové stěny a tyrkysový Rýn', credit: fl },
    intro:
      'Ruinaulta, „švýcarský Grand Canyon“, vznikla po obřím sesuvu u Flimsu. Rýn se tu mezi Ilanzem a Reichenau zařezává do bílých skalních stěn. Nejsnazší pohled shora nabízí vyhlídka Il Spir, vysunutá nad hranu soutěsky s výhledem do 180 stupňů.',
    stats: [
      { label: 'Flims Waldhaus → Il Spir', value: '3,8 km', note: 'jedna cesta, Mapy.com' },
      { label: 'Čas chůze', value: '≈ 45–60 min', note: 'oficiálně 45 min, Mapy.com 59 min' },
      { label: 'Tam a zpět', value: '≈ 7,6 km', note: 'orientačně 2 h čisté chůze' },
      { label: 'Autem z Flims Dorf', value: '6 min', note: '2,8 km k parkovišti Waldhaus' },
    ],
    forWhom: 'Pro všechny. Cesta z Waldhausu je podle oficiálního webu vhodná i pro kočárky, takže zvládne celá skupina. Aktivnější část může přidat okruh přes Crestasee.',
    details: [
      'Kratší varianta: Waldhaus → Caumasee → Conn → Il Spir a stejnou cestou zpět.',
      'Delší varianta: okruh Waldhaus – Caumasee – Il Spir – Crestasee – Waldhaus, 10,7 km a asi 3 h 20 min chůze podle Mapy.com.',
      'U Connu je restaurace, vyhlídka leží pár minut od ní.',
      'Parkování: garáž Flims Bergbahnen (750 placených míst) nebo parkoviště u Caumasee (45 placených míst).',
    ],
    season: [
      'Il Spir je podle flimslaax.com přístupná celoročně.',
      'Ostatní vyhlídky mají sezónu: Zault březen–listopad; Islabord, Spitg, Alix a Wackenau květen–říjen.',
      'Za mokra a při námraze kloužou kořeny a kamení. Den předem zkontrolovat počasí.',
    ],
    start: { label: 'Parkoviště Flims Waldhaus', lat: P.waldhausParking[0], lon: P.waldhausParking[1] },
    links: [
      { label: 'Trasa Waldhaus → Il Spir (Mapy.com)', href: mapyRoute(P.waldhausParking, P.ilSpir) },
      { label: 'Okruh přes Crestasee (Mapy.com)', href: mapyRoute(P.waldhausParking, P.waldhausParking, 'foot_hiking', [P.caumasee, P.ilSpir, P.crestasee]) },
      { label: 'Oficiální info: Rýnská soutěska', href: 'https://www.flimslaax.com/en/outdoor-activities/natural-phenomena/rhine-gorge/' },
    ],
  },
  {
    id: 'caumasee',
    name: 'Caumasee a podzimní Flimský les',
    short: 'Caumasee',
    tag: 'Klidný den',
    photo: { src: img('caumasee_forest'), alt: 'Tyrkysové jezero Caumasee obklopené smrkovým lesem', credit: fl },
    intro:
      'Lag la Cauma je klenot Flimsu: jezero se zalesněným ostrůvkem uprostřed, ze tří stran obklopené lesem Flimserwald. Na podzim tu bývá ticho a voda si drží svou tyrkysovou barvu i bez letních davů.',
    stats: [
      { label: 'Parkoviště Waldhaus → jezero', value: '1,6 km', note: 'Mapy.com, ≈ 27 min' },
      { label: 'Pokračování ke Connu a Il Spir', value: '+ 2,5 km', note: 'Mapy.com, ≈ 43 min' },
      { label: 'Autem z Flims Dorf', value: '6 min', note: 'k parkovišti Waldhaus' },
    ],
    forWhom: 'Pro celou skupinu. Krátké lesní cesty, žádné velké stoupání k jezeru. Dobrý program i pro den s horším počasím.',
    details: [
      'Procházka kolem jezera a lesními cestami Flimserwaldu.',
      'Spojení s výletem 1: od jezera pokračovat přes Conn na vyhlídku Il Spir.',
      'Restaurace Ustria La Cauma u jezera má otevřeno celoročně, večer jen s rezervací.',
      'Parkoviště u jezera: 45 placených míst.',
    ],
    season: [
      'Koupací sezóna skončila: vstup je zdarma, ale bez plavčíka, a lodičky jsou uklizené.',
      'Samoobslužná Terrassa La Cauma měla otevřeno jen do 18. října.',
      'Na koupání nespoléhat, říjnové jezero je na procházky a fotky.',
    ],
    start: { label: 'Caumasee', lat: P.caumasee[0], lon: P.caumasee[1] },
    links: [
      { label: 'Trasa Waldhaus → Caumasee (Mapy.com)', href: mapyRoute(P.waldhausParking, P.caumasee) },
      { label: 'Oficiální info: Caumasee', href: 'https://www.flimslaax.com/en/outdoor-activities/mountain-lakes/lake-cauma' },
    ],
  },
  {
    id: 'crestasee',
    name: 'Crestasee a lesní cesty',
    short: 'Crestasee',
    tag: 'Kombinace',
    photo: { src: img('crestasee'), alt: 'Jezero Crestasee s molem a lesem v pozadí (letní snímek)', credit: fl },
    intro:
      'Menší a tišší soused Caumasee leží na východním okraji Flimsu směrem k Trinu. Jezero je 375 m dlouhé a 180 m široké, chráněné jako přírodní památka a dostupné jen pěšky. Zpátky do Flimsu vede cesta soutěskou Felsbach.',
    stats: [
      { label: 'Okruh 4 jezer', value: '13,4 km', note: 'graubuenden.ch' },
      { label: 'Čas chůze', value: '3 h 50 min', note: 'graubuenden.ch' },
      { label: 'Převýšení', value: '345 m', note: 'graubuenden.ch' },
      { label: 'Il Spir → Crestasee', value: '3,3 km', note: 'Mapy.com, ≈ 52 min' },
    ],
    forWhom: 'Celý okruh je pro zdatnější chodce, graubuenden.ch ho hodnotí jako náročný na fyzičku. Kratší procházka k jezeru zvládne každý.',
    details: [
      'Okruh 4 jezer: Flims Waldhaus → Lag Prau Pulté → Prau la Selva → Caumasee → Conn a Il Spir → Crestasee → soutěska Felsbach → Waldhaus.',
      'Doporučení: spojit Crestasee s výletem 2 do jednoho pátečního dne.',
      'Kdo chce kratší den, dojde z Il Spir jen ke Crestasee a zpět.',
      'Doporučená obuv: trekové boty; na cestách se potkávají pěší a cyklisté.',
    ],
    season: [
      'Kiosk u jezera má otevřeno jen o víkendech od poloviny dubna a za dobrého počasí. Na konci října s občerstvením nepočítat.',
      'Fotografie jsou z léta, podzimní jezero bude klidnější a bez koupajících.',
    ],
    start: { label: 'Crestasee', lat: P.crestasee[0], lon: P.crestasee[1] },
    links: [
      { label: 'Trasa Il Spir → Crestasee (Mapy.com)', href: mapyRoute(P.ilSpir, P.crestasee) },
      { label: 'Okruh 4 jezer (graubuenden.ch)', href: 'https://www.graubuenden.ch/en/tours/4-lake-hike-caumasee-crestasee-felsbach-gorge' },
      { label: 'Oficiální info: Crestasee', href: 'https://www.flimslaax.com/en/outdoor-activities/mountain-lakes/lake-cresta' },
    ],
  },
  {
    id: 'bargis',
    name: 'Bargis, horské údolí pod Flimserstein',
    short: 'Bargis',
    tag: 'Podmíněně',
    photo: { src: img('bargis_valley'), alt: 'Horské údolí Bargis se skalními stěnami a zelenými loukami (letní snímek)', credit: fl },
    intro:
      'Skryté údolí ve výšce asi 1 550 m n. m. za skalní stěnou, kterou vytvořil flimský sesuv. Silnice je pro soukromá auta uzavřená, takže tu je ticho. Pod stěnami Flimsersteinu vede rovinatý okruh a v zadní části údolí je malá soutěska se dvěma vodopády.',
    stats: [
      { label: 'Fidaz → Bargis pěšky', value: '3,2 km', note: 'Mapy.com, ≈ 1 h 30 min do kopce' },
      { label: 'Okruh údolím Bargis', value: '3 km', note: 'myswitzerland.com, 55 min, ±50 m' },
      { label: 'Sestup Bargis → Fidaz → Flims', value: '5,1 km', note: 'graubuenden.ch, 1 h 30 min' },
      { label: 'Autem z Flimsu do Fidaz', value: '5 min', note: '2,5 km, Mapy.com' },
    ],
    forWhom: 'Pro aktivnější část skupiny výstup z Fidaz, pro všechny rovinatý okruh nahoře. Kdo nechce stoupat, může zůstat u zříceniny Belmont mezi Fidaz a Bargis.',
    details: [
      'Silnice z Fidaz do Bargis je soukromá a autem se tam jet nesmí.',
      'Parkování: 12 míst u Milchseilbahn Fidaz a 30 míst na parkovišti Fidaz Waldrand (graubuenden.ch).',
      'Cestou lze odbočit ke zřícenině hradu Belmont na skále nad lesem.',
      'Scala Mola (do skály tesaná stezka na Flimserstein, asi 500 m převýšení) je jen pro ideální podmínky a zkušené chodce. Na konci října ji nedoporučujeme.',
    ],
    season: [
      'Uskutečnit jen při suchém počasí bez sněhu a ledu. Ve výšce 1 550 m už koncem října může sněžit.',
      'Kyvadlový autobus do Bargis existuje, jeho provoz v termínu ale musíme ověřit (sbb.ch nebo informační centrum).',
      'Trasy mohou být podle sezóny a počasí uzavřené. Info centrum: +41 81 920 92 00.',
    ],
    start: { label: 'Fidaz (výchozí bod)', lat: P.fidaz[0], lon: P.fidaz[1] },
    links: [
      { label: 'Trasa Fidaz → Bargis (Mapy.com)', href: mapyRoute(P.fidaz, P.bargis) },
      { label: 'Oficiální info: Bargis', href: 'https://www.flimslaax.com/en/outdoor-activities/natural-phenomena/bargis' },
      { label: 'Okruh Bargis (myswitzerland.com)', href: 'https://www.myswitzerland.com/en/experiences/route/bargis-rundweg/' },
    ],
  },
  {
    id: 'trin',
    name: 'Trin a visutý most Punt Ruinaulta',
    short: 'Punt Ruinaulta',
    tag: 'Soutěska zdola',
    photo: { src: img('punt_ruinaulta'), alt: 'Visutý most přes Rýn u stanice Trin', credit: fl },
    intro:
      'Doplněk k vyhlídkám shora: z vesnice Trin sejdeme až k Rýnu. U železniční zastávky Trin se klene visutý most Punt Ruinaulta, dokončený v roce 2010, 105 m dlouhý a 1,8 m široký. Podél řeky vede pobřežní stezka.',
    stats: [
      { label: 'Trin → Punt Ruinaulta', value: '2,9 km', note: 'Mapy.com, ≈ 52 min z kopce' },
      { label: 'Délka mostu', value: '105 m', note: 'flimslaax.com' },
      { label: 'Autem z Flimsu do Trinu', value: '8 min', note: '7 km, Mapy.com' },
      { label: 'Autem k zastávce Trin', value: '13 min', note: '9,3 km, Mapy.com' },
    ],
    forWhom: 'Pro všechny, kdo zvládnou návrat do kopce. Zpáteční cesta do Trinu vede vzhůru a potrvá déle než sestup.',
    details: [
      'Varianta A: zaparkovat v Trinu, sejít k mostu a vrátit se stejnou cestou.',
      'Varianta B: dojet autem k zastávce Trin a projít jen most a břeh řeky.',
      'Pro zdatné: od zastávky Trin vede pěšina na vyhlídku Spitg (asi 1,5 h). Výstup je místy exponovaný.',
      'Vyhlídka Wackenau na konci soutěsky je dostupná od zastávky Trin.',
    ],
    season: [
      'Wackenau a Spitg jsou otevřené květen–říjen, v sobotu 31. 10. tedy poslední den sezóny. Před výletem ověřit.',
      'Parkování u zastávky Trin jsme v oficiálních zdrojích nenašli, je potřeba ho ověřit.',
      'S kabrioletem Ruinaulta bus nepočítáme, jeho provoz v termínu je nutné ověřit a místa se rezervují předem.',
    ],
    start: { label: 'Trin', lat: P.trin[0], lon: P.trin[1] },
    links: [
      { label: 'Trasa Trin → Punt Ruinaulta (Mapy.com)', href: mapyRoute(P.trin, P.puntRuinaulta) },
      { label: 'Oficiální info: visutý most', href: 'https://www.flimslaax.com/en/outdoor-activities/natural-phenomena/rhine-gorge/' },
    ],
  },
];

/* ---------- Galerie destinace ---------- */
export const GALLERY: Photo[] = [
  { src: img('gorge_river'), alt: 'Pohled z lesa do Rýnské soutěsky s řekou na dně', credit: fl },
  { src: img('lake_mist'), alt: 'Mlha nad hladinou jezera Caumasee a zrcadlící se smrky', credit: fl },
  { src: img('caumasee_aerial'), alt: 'Jezero Caumasee s ostrůvkem z ptačí perspektivy', credit: fl },
  { src: img('flimserstein'), alt: 'Skalní stěny Flimsersteinu v mracích', credit: fl },
  { src: img('gorge_hikers'), alt: 'Turisté na stezce pod bílými skalami Ruinaulty', credit: fl },
  { src: img('bargis_waterfall'), alt: 'Vodopád v zadní části údolí Bargis', credit: fl },
  { src: img('v1_2'), alt: 'Výhled z balkonu chaty (varianta 1) na Laaxersee a hory', credit: 'Foto: nabídka na Airbnb (varianta 1)' },
];

export const czk = (n: number) => new Intl.NumberFormat('cs-CZ').format(Math.round(n)) + ' Kč';
