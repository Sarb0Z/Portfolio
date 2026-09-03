import { cn } from '@/lib/utils'

export type CoverVariant =
  | 'fanout'
  | 'mesh'
  | 'tiers'
  | 'partition'
  | 'cipher'
  | 'raster'
  | 'faces'
  | 'wave'
  | 'grid'

// Deterministic pseudo-random so the server and client draw the same picture.
function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

const W = 480
const H = 300

function Fanout() {
  const targets = Array.from({ length: 14 }, (_, i) => 30 + i * 18)
  return (
    <g>
      <circle cx={70} cy={H / 2} r={9} className="fill-accent" />
      {targets.map((y, i) => (
        <g key={i}>
          <path
            d={`M 79 ${H / 2} C 220 ${H / 2}, 260 ${y}, 400 ${y}`}
            className={i % 5 === 2 ? 'stroke-accent' : 'stroke-current'}
            strokeOpacity={i % 5 === 2 ? 0.9 : 0.35}
            strokeWidth={1}
            fill="none"
          />
          <circle cx={404} cy={y} r={3} className="fill-current" opacity={0.7} />
        </g>
      ))}
      <text
        x={70}
        y={H / 2 + 34}
        textAnchor="middle"
        className="fill-current font-mono"
        fontSize={10}
        opacity={0.6}
      >
        200
      </text>
      <text x={430} y={H / 2 + 4} className="fill-current font-mono" fontSize={10} opacity={0.6}>
        5,000
      </text>
    </g>
  )
}

function Mesh() {
  const r = rng(7)
  const cols = 12
  const rows = 7
  const pts: [number, number, boolean][] = []
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++)
      pts.push([40 + x * 36 + (r() - 0.5) * 8, 36 + y * 38 + (r() - 0.5) * 8, r() > 0.86])
  return (
    <g>
      {pts.map(([x, y, hot], i) => {
        const nx = pts[i + 1]
        const ny = pts[i + cols]
        return (
          <g key={i}>
            {nx && (i + 1) % cols !== 0 && (
              <line
                x1={x}
                y1={y}
                x2={nx[0]}
                y2={nx[1]}
                className="stroke-current"
                strokeOpacity={0.18}
              />
            )}
            {ny && (
              <line
                x1={x}
                y1={y}
                x2={ny[0]}
                y2={ny[1]}
                className="stroke-current"
                strokeOpacity={0.18}
              />
            )}
          </g>
        )
      })}
      {pts.map(([x, y, hot], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={hot ? 4.5 : 2.2}
          className={hot ? 'fill-accent' : 'fill-current'}
          opacity={hot ? 1 : 0.6}
        />
      ))}
    </g>
  )
}

function Tiers() {
  const rows = [
    { y: 60, n: 1, w: 120 },
    { y: 130, n: 3, w: 96 },
    { y: 200, n: 7, w: 44 },
  ]
  return (
    <g>
      {rows.map((row, ri) => {
        const total = row.n * row.w + (row.n - 1) * 14
        const x0 = (W - total) / 2
        return Array.from({ length: row.n }, (_, i) => {
          const x = x0 + i * (row.w + 14)
          return (
            <g key={`${ri}-${i}`}>
              <rect
                x={x}
                y={row.y}
                width={row.w}
                height={38}
                rx={6}
                className={ri === 0 ? 'fill-accent' : 'fill-none stroke-current'}
                strokeOpacity={0.6}
              />
              {ri < rows.length - 1 && (
                <line
                  x1={x + row.w / 2}
                  y1={row.y + 38}
                  x2={W / 2}
                  y2={rows[ri + 1].y}
                  className="stroke-current"
                  strokeOpacity={0.25}
                />
              )}
            </g>
          )
        })
      })}
      <line x1={110} y1={250} x2={370} y2={250} className="stroke-accent" strokeDasharray="4 6" />
      <text
        x={W / 2}
        y={272}
        textAnchor="middle"
        className="fill-current font-mono"
        fontSize={10}
        opacity={0.6}
      >
        review gate
      </text>
    </g>
  )
}

function Partition() {
  const rects: { x: number; y: number; w: number; h: number; d: number }[] = []
  const r = rng(11)
  function split(x: number, y: number, w: number, h: number, d: number) {
    rects.push({ x, y, w, h, d })
    if (d >= 4 || (d >= 2 && r() > 0.55)) return
    if (w > h) {
      const k = 0.35 + r() * 0.3
      split(x, y, w * k, h, d + 1)
      split(x + w * k, y, w * (1 - k), h, d + 1)
    } else {
      const k = 0.35 + r() * 0.3
      split(x, y, w, h * k, d + 1)
      split(x, y + h * k, w, h * (1 - k), d + 1)
    }
  }
  split(40, 36, W - 80, H - 72, 0)
  return (
    <g>
      {rects.map((q, i) => (
        <rect
          key={i}
          x={q.x}
          y={q.y}
          width={q.w}
          height={q.h}
          className={
            q.d === 4 && i % 7 === 0 ? 'fill-accent/20 stroke-accent' : 'fill-none stroke-current'
          }
          strokeOpacity={q.d === 0 ? 0.8 : 0.35}
        />
      ))}
    </g>
  )
}

function Cipher() {
  const r = rng(3)
  const rows = 9
  const cols = 22
  const hex = '0123456789abcdef'
  return (
    <g className="font-mono">
      {Array.from({ length: rows }, (_, y) =>
        Array.from({ length: cols }, (_, x) => {
          const hot = y === 4 && x > 5 && x < 16
          const s = hex[Math.floor(r() * 16)] + hex[Math.floor(r() * 16)]
          return (
            <text
              key={`${y}-${x}`}
              x={36 + x * 19}
              y={44 + y * 27}
              fontSize={11}
              className={hot ? 'fill-accent' : 'fill-current'}
              opacity={hot ? 1 : 0.35}
            >
              {s}
            </text>
          )
        })
      )}
    </g>
  )
}

function Raster() {
  const cols = 30
  const rows = 15
  const cx = 15
  const cy = 6
  return (
    <g>
      {Array.from({ length: rows }, (_, y) =>
        Array.from({ length: cols }, (_, x) => {
          const dx = (x - cx) / 4.2
          const dy = (y - cy) / 3.4
          const balloon = dx * dx + dy * dy < 1
          const string = x === cx && y > cy + 3 && y < rows - 1
          const on = balloon || string
          return (
            <rect
              key={`${y}-${x}`}
              x={30 + x * 14}
              y={22 + y * 17}
              width={10}
              height={13}
              className={on ? 'fill-accent' : 'fill-current'}
              opacity={on ? 1 : 0.12}
            />
          )
        })
      )}
    </g>
  )
}

function Faces() {
  const r = rng(5)
  const n = 24
  return (
    <g>
      {Array.from({ length: n * 14 }, (_, i) => {
        const x = i % n
        const y = Math.floor(i / n)
        const cxr = 12
        const cyr = 7
        const d = Math.hypot((x - cxr) / 7, (y - cyr) / 5)
        const v = d < 1 ? 0.25 + r() * 0.55 : r() * 0.18
        const eye = (x === 9 || x === 15) && y === 5
        const mouth = y === 9 && x > 8 && x < 16
        return (
          <rect
            key={i}
            x={40 + x * 16.5}
            y={24 + y * 18}
            width={14}
            height={16}
            className={eye || mouth ? 'fill-accent' : 'fill-current'}
            opacity={eye || mouth ? 1 : v}
          />
        )
      })}
    </g>
  )
}

function Wave() {
  const r = rng(9)
  const n = 56
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const env = Math.sin((i / n) * Math.PI)
        const h = 8 + env * (60 + r() * 100)
        const hot = i > 30 && i < 36
        return (
          <rect
            key={i}
            x={30 + i * 7.6}
            y={H / 2 - h / 2}
            width={4}
            height={h}
            rx={2}
            className={hot ? 'fill-accent' : 'fill-current'}
            opacity={hot ? 1 : 0.55}
          />
        )
      })}
    </g>
  )
}

function Grid() {
  const r = rng(13)
  return (
    <g>
      {Array.from({ length: 6 * 4 }, (_, i) => {
        const x = i % 6
        const y = Math.floor(i / 6)
        const hot = (y === 1 && x >= 1 && x <= 3) || (x === 4 && y >= 1 && y <= 3)
        return (
          <circle
            key={i}
            cx={100 + x * 56}
            cy={60 + y * 60}
            r={16 + r() * 4}
            className={hot ? 'fill-accent' : 'fill-none stroke-current'}
            strokeOpacity={0.6}
          />
        )
      })}
    </g>
  )
}

const variants: Record<CoverVariant, () => JSX.Element> = {
  fanout: Fanout,
  mesh: Mesh,
  tiers: Tiers,
  partition: Partition,
  cipher: Cipher,
  raster: Raster,
  faces: Faces,
  wave: Wave,
  grid: Grid,
}

export default function Cover({
  variant,
  label,
  className,
}: {
  variant: CoverVariant
  label?: string
  className?: string
}) {
  const Art = variants[variant]
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border hairline bg-surface text-ink transition-colors group-hover:border-accent/60',
        className
      )}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={label ?? variant}
      >
        <Art />
      </svg>
      {label && (
        <span className="absolute bottom-3 left-3 rounded bg-paper/80 px-2 py-1 font-mono text-[11px] tracking-wide text-ink backdrop-blur">
          {label}
        </span>
      )}
    </div>
  )
}
