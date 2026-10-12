import { useEffect, useState } from 'react';
import { LuMenu, LuX } from 'react-icons/lu';

export const SECTIONS = [
  { id: 'prehled', label: 'Přehled' },
  { id: 'doprava', label: 'Doprava' },
  { id: 'ubytovani', label: 'Ubytování' },
  { id: 'vylety', label: 'Výlety' },
  { id: 'proc-jet', label: 'Proč jet?' },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState('prehled');

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${solid || open ? 'nav--solid' : ''}`}>
      <div className="nav__inner">
        <a className="nav__brand" href="#prehled" onClick={() => setOpen(false)}>
          <span className="nav__cross" aria-hidden="true" />
          FLIMS LAAX <b>2026</b>
        </a>
        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Zavřít menu' : 'Otevřít menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <LuX /> : <LuMenu />}
        </button>
        <nav id="nav-menu" className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Hlavní navigace">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? 'is-active' : ''}
              aria-current={active === s.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
