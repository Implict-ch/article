export function CoverPage() {
  return (
    <div className="scene-pad ex34-cover">
      <header className="ex34-cover__mag">
        <span className="ex34-cover__mag-line" aria-hidden="true" />
        <span className="ex34-cover__mag-tag">华为校招求职分享</span>
        <span className="ex34-cover__mag-line" aria-hidden="true" />
      </header>

      <section className="ex34-cover__hero">
        <h1 className="ex34-cover__title">
          <span className="ex34-cover__line">华为秋招如何免机考？</span>
          <span className="ex34-cover__line">
            <span className="ex34-accent">这几类人可直接进入面试</span>
          </span>
        </h1>

        <ul className="ex34-cover__points" aria-label="三种免机考路径">
          <li className="ex34-cover__point">
            <span className="ex34-cover__point-num">01</span>
            <span className="ex34-cover__point-rule" aria-hidden="true" />
            <span className="ex34-cover__point-text">机考沿用</span>
          </li>
          <li className="ex34-cover__point">
            <span className="ex34-cover__point-num">02</span>
            <span className="ex34-cover__point-rule" aria-hidden="true" />
            <span className="ex34-cover__point-text">竞赛免考</span>
          </li>
          <li className="ex34-cover__point">
            <span className="ex34-cover__point-num">03</span>
            <span className="ex34-cover__point-rule" aria-hidden="true" />
            <span className="ex34-cover__point-text">论文免考</span>
          </li>
        </ul>
      </section>

      <footer className="ex34-cover__foot">
        <span className="ex34-cover__foot-label" aria-hidden="true">
          01
        </span>
        <span className="ex34-cover__foot-rule" aria-hidden="true" />
        <div className="ex34-cover__foot-copy">
          <span className="ex34-cover__foot-step">GUIDE</span>
          <span className="ex34-cover__foot-name">免机考政策</span>
        </div>
      </footer>
    </div>
  );
}
