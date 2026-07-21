import type { CSSProperties } from "react";
import type { ExemptionCategory } from "../data/categories";

interface Props {
  categories: ExemptionCategory[];
}

function ContestCard({
  category,
  delayMs,
  flexWeight,
}: {
  category: ExemptionCategory;
  delayMs: number;
  flexWeight: number;
}) {
  const isPaper = category.kind === "paper";
  const compact = !isPaper && category.items.length <= 2;

  return (
    <article
      className={[
        "card",
        "ex34-card",
        isPaper ? "ex34-card--paper" : "",
        compact ? "ex34-card--compact" : "",
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
      <header className="ex34-card__head">
        <span className="ex34-card__idx display-en">{category.id}</span>
        <h2 className="ex34-card__title serif-cn">{category.title}</h2>
      </header>

      {isPaper ? (
        <p className="ex34-card__hint">{category.hint}</p>
      ) : (
        <ul className="ex34-card__list">
          {category.items.map((item) => (
            <li key={item} className="ex34-card__item">
              {item}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function CategoryPage({ categories }: Props) {
  const alone = categories.length === 1;
  const counts = categories.map((c) =>
    c.kind === "paper" ? 4 : Math.max(c.items.length, 1),
  );
  const maxCount = Math.max(...counts, 1);

  return (
    <div className="scene-pad ex34-page">
      <header className="ex34-page__head">
        <h1 className="ex34-page__title">
          <span className="serif-cn">竞赛免机考</span>
        </h1>
      </header>

      <div
        className={`ex34-page__stack ${alone ? "is-alone" : "is-duo"}`}
        role="list"
      >
        {categories.map((category, i) => (
          <ContestCard
            key={category.id}
            category={category}
            delayMs={120 + i * 80}
            flexWeight={Math.max(
              0.7,
              (category.kind === "paper" ? 4 : category.items.length) /
                maxCount,
            )}
          />
        ))}
      </div>
    </div>
  );
}
