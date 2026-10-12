import { project } from '../data';

export type MapPoint = {
  id: string;
  lat: number;
  lon: number;
  label: string;
  title: string;
  kind: 'stay' | 'trip';
  active?: boolean;
  onClick?: () => void;
};

type Crop = { x: number; y: number; w: number; h: number }; // v procentech celého podkladu

const MAP_W = 1792;
const MAP_H = 1536;

/**
 * Interaktivní mapa nad statickým topografickým podkladem (OpenTopoMap).
 * Body se umisťují přesnou projekcí Web Mercator, takže poloha odpovídá souřadnicím.
 */
export function MapBoard({ points, crop, label }: { points: MapPoint[]; crop: Crop; label: string }) {
  const ratio = (crop.w * MAP_W) / (crop.h * MAP_H);
  return (
    <figure className="mapboard" aria-label={label}>
      <div className="mapboard__frame" style={{ aspectRatio: String(ratio) }}>
        <img
          className="mapboard__img"
          src="img/map.webp"
          alt=""
          loading="lazy"
          style={{
            width: `${(100 / crop.w) * 100}%`,
            left: `${(-crop.x / crop.w) * 100}%`,
            top: `${(-crop.y / crop.h) * 100}%`,
          }}
        />
        {points.map((p) => {
          const { x, y } = project(p.lat, p.lon);
          const left = ((x - crop.x) / crop.w) * 100;
          const top = ((y - crop.y) / crop.h) * 100;
          if (left < 0 || left > 100 || top < 0 || top > 100) return null;
          return (
            <button
              key={p.id}
              className={`pin pin--${p.kind} ${p.active ? 'is-active' : ''}`}
              style={{ left: `${left}%`, top: `${top}%` }}
              onClick={p.onClick}
              aria-pressed={p.active}
              aria-label={p.title}
            >
              <span className="pin__dot">{p.label}</span>
              <span className="pin__tip" aria-hidden="true">{p.title}</span>
            </button>
          );
        })}
      </div>
      <figcaption className="mapboard__credit">
        Podklad: © přispěvatelé OpenStreetMap, SRTM · styl © OpenTopoMap (CC-BY-SA)
      </figcaption>
    </figure>
  );
}
