interface Props {
  total: number;
  current: number;
  onJump(i: number): void;
}

export function PageDots({ total, current, onJump }: Props) {
  return (
    <nav className="page-dots" aria-label="页码" data-no-advance>
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          className={`page-dots__dot ${i === current ? "is-active" : ""}`}
          aria-label={`第 ${i + 1} 页`}
          aria-current={i === current ? "page" : undefined}
          onClick={() => onJump(i)}
        />
      ))}
    </nav>
  );
}
