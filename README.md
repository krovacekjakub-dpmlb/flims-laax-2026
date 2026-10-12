# Flims Laax 2026

Interaktivní jednostránková prezentace podzimní dovolené ve Flims Laax (28. 10. – 1. 11. 2026, 5 lidí, 4 noci, autem).
Sekce: **Přehled · Doprava · Ubytování · Výlety · Proč jet?**

Postaveno na **React 19 + Vite + TypeScript**, ikony Lucide (přes `react-icons/lu`). Čistě statický web, žádný server ani API klíče.

## Požadavky

- [Node.js](https://nodejs.org/) 20 nebo novější (obsahuje `npm`)

## Spuštění lokálně

```bash
npm install
npm run dev
```

Vite vypíše adresu (obvykle <http://localhost:5173>), otevřete ji v prohlížeči. Změny v kódu se projeví okamžitě.

## Produkční verze

```bash
npm run build      # výsledek ve složce dist/
npm run preview    # lokální náhled produkční verze
npm run typecheck  # volitelná kontrola typů TypeScriptu
```

Složka `dist/` je hotový statický web. Díky `base: './'` ve `vite.config.ts` používá relativní cesty, takže funguje v kořeni domény i v libovolné podsložce.

## Nasazení na GitHub Pages

1. Vytvořte na GitHubu nový repozitář a nahrajte do něj obsah této složky:
   ```bash
   git init
   git add .
   git commit -m "Flims Laax 2026"
   git branch -M main
   git remote add origin https://github.com/<uzivatel>/<repozitar>.git
   git push -u origin main
   ```
2. V repozitáři otevřete **Settings → Pages** a jako **Source** zvolte **GitHub Actions**.
3. Přiložený workflow `.github/workflows/deploy.yml` při každém pushi do `main` web sestaví a nasadí.
   Adresa bude `https://<uzivatel>.github.io/<repozitar>/`.

**Jiný hosting** (Netlify, Vercel, Cloudflare Pages, běžný webhosting): spusťte `npm run build` a nahrajte obsah složky `dist/`. U Netlify/Vercelu stačí nastavit build příkaz `npm run build` a výstupní složku `dist`.

## Struktura projektu

```
├── index.html               vstupní HTML (fonty, meta, favicon)
├── public/img/              optimalizované fotografie (WebP) a mapový podklad
├── src/
│   ├── main.tsx             start aplikace
│   ├── App.tsx              poskládání sekcí
│   ├── data.ts              VŠECHNA DATA: ubytování, ceny, výlety, souřadnice, odkazy
│   ├── styles.css           design (barvy jako CSS proměnné, světlý i tmavý režim)
│   └── components/
│       ├── Nav.tsx          přichycená navigace + mobilní menu
│       ├── Overview.tsx     úvodní obrazovka, rychlý přehled, galerie
│       ├── Transport.tsx    trasa, časová osa, praktické poznámky
│       ├── Stays.tsx        záložky ubytování, cenové srovnání, mapa, shrnutí
│       ├── Trips.tsx        karty výletů, mapa výchozích bodů, plán pěti dnů
│       ├── Why.tsx          „Proč jet?“, meme a patička se zdroji
│       ├── MapBoard.tsx     interaktivní mapa nad statickým podkladem
│       └── Lightbox.tsx     zvětšení fotografií (klávesy ← → Esc)
└── .github/workflows/deploy.yml
```

Texty, ceny a odkazy se upravují v `src/data.ts` (ubytování a výlety) a přímo v komponentách (ostatní texty).

## Zdroje dat a fotografií

- **Ubytování:** veřejné stránky tří nabídek na Airbnb (fotografie, kapacita, rozložení postelí, vybavení), staženo 12. 10. 2026.
  Polohy jsou přibližné, takové, jaké Airbnb zveřejňuje před rezervací. Ceny pochází z původního návrhu; cenu varianty 1 jsme na Airbnb ověřili.
- **Destinace a výlety:** [flimslaax.com](https://www.flimslaax.com/), [graubuenden.ch](https://www.graubuenden.ch/), [myswitzerland.com](https://www.myswitzerland.com/).
  Fotografie destinace © Flims Laax Falera.
- **Délky a časy tras:** výpočet v [Mapy.com](https://mapy.com/) (pěší rychlost 4 km/h), u každé hodnoty je uveden zdroj.
- **Mapový podklad:** © přispěvatelé [OpenStreetMap](https://www.openstreetmap.org/copyright), SRTM; styl © [OpenTopoMap](https://opentopomap.org/) (CC-BY-SA).
  Podklad je uložený jako obrázek (`public/img/map.webp`), takže mapa funguje i bez připojení k mapovým serverům. Body se umisťují přesnou projekcí Web Mercator (viz `project()` v `data.ts`).

Fotografie z Airbnb a z flimslaax.com slouží jen pro soukromou prezentaci v rámci skupiny. Před veřejným zveřejněním webu je vhodné je nahradit vlastními nebo si vyžádat svolení.

## Mapa trasy z Mapy.com

V sekci Doprava je vložená mapa trasy z Mapy.com (`<iframe>` s adresou `https://mapy.com/s/jozopohezu`, nastavuje se v `src/data.ts` jako `TRIP.embedUrl`).
Iframe se přizpůsobuje šířce obrazovky. Vedle něj zůstává tlačítko, které otevře trasu přímo v Mapy.com.
