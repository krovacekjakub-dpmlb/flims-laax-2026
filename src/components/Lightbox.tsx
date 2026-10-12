import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { LuChevronLeft, LuChevronRight, LuX } from 'react-icons/lu';
import type { Photo } from '../data';

type Open = (photos: Photo[], index: number) => void;
const Ctx = createContext<Open>(() => {});
export const useLightbox = () => useContext(Ctx);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ photos: Photo[]; index: number } | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const open: Open = useCallback((photos, index) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setState({ photos, index });
  }, []);
  const close = useCallback(() => {
    setState(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setState((s) => (s ? { ...s, index: (s.index + d + s.photos.length) % s.photos.length } : s)),
    [],
  );

  useEffect(() => {
    if (!state) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [state, close, step]);

  const photo = state?.photos[state.index];
  return (
    <Ctx.Provider value={open}>
      {children}
      {state && photo && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Náhled fotografie" onClick={close}>
          <figure className="lightbox__fig" onClick={(e) => e.stopPropagation()}>
            <img src={photo.src} alt={photo.alt} />
            <figcaption>
              <span>{photo.alt}</span>
              <span className="lightbox__meta">
                {photo.credit} · {state.index + 1} / {state.photos.length}
              </span>
            </figcaption>
          </figure>
          <button ref={closeBtn} className="lightbox__btn lightbox__close" onClick={close} aria-label="Zavřít náhled">
            <LuX />
          </button>
          {state.photos.length > 1 && (
            <>
              <button className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Předchozí fotografie">
                <LuChevronLeft />
              </button>
              <button className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Další fotografie">
                <LuChevronRight />
              </button>
            </>
          )}
        </div>
      )}
    </Ctx.Provider>
  );
}

/** Obrázek s náhradním zobrazením, když se nenačte. */
export function Img({ photo, className, eager, sizes }: { photo: Photo; className?: string; eager?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div className={`img-fallback ${className ?? ''}`} role="img" aria-label={photo.alt}>
        <span>Fotografie se nenačetla</span>
        <small>{photo.alt}</small>
      </div>
    );
  return (
    <img
      className={className}
      src={photo.src}
      alt={photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  );
}
