import type { CSSProperties } from "react";
import type { TargetUniversityRegion } from "../data/regions";

interface Props {
  regions: TargetUniversityRegion[];
}

function RegionCard({
  region,
  delayMs,
  flexWeight,
}: {
  region: TargetUniversityRegion;
  delayMs: number;
  flexWeight: number;
}) {
  const dense = region.schools.length > 14;
  const compact = region.schools.length <= 6;
  return (
    <article
      className={[
        "card",
        "tu34-card",
        dense ? "tu34-card--dense" : "",
        compact ? "tu34-card--compact" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          animationDelay: `${delayMs}ms`,
          flex: `${flexWeight} 1 0`,
        } as CSSProperties
      }
    >
      <header className="tu34-card__head">
        <h2 className="tu34-card__name">{region.name}</h2>
        <span className="tu34-card__count label-mono">{region.count}</span>
      </header>
      <ul className="tu34-card__schools">
        {region.schools.map((school) => (
          <li key={school} className="tu34-card__school">
            {school}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function RegionPage({ regions }: Props) {
  const alone = regions.length === 1;
  const counts = regions.map((r) => r.schools.length);
  const maxCount = Math.max(...counts, 1);

  return (
    <div className="scene-pad tu34-regions">
      <header className="tu34-regions__head">
        <h1 className="tu34-regions__title">
          <span className="serif-cn">华为目标院校</span>
        </h1>
      </header>

      <div
        className={`tu34-regions__stack ${alone ? "is-alone" : "is-duo"}`}
        role="list"
      >
        {regions.map((region, i) => (
          <RegionCard
            key={region.id}
            region={region}
            delayMs={120 + i * 80}
            flexWeight={Math.max(0.7, region.schools.length / maxCount)}
          />
        ))}
      </div>
    </div>
  );
}
