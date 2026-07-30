"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const obligations = [
  { name: "NCA ECC", detail: "Access control" },
  { name: "SAMA CSF", detail: "Identity and access" },
  { name: "ISO 27001", detail: "Access rights" },
  { name: "PCI DSS", detail: "User access" },
];

const outcomes = [
  { name: "Test once", detail: "One control test" },
  { name: "Reuse evidence", detail: "One approved proof set" },
  { name: "Update coverage", detail: "Four frameworks refreshed" },
];

interface ConnectorGeometry {
  width: number;
  height: number;
  inputBases: string[];
  inputSignals: string[];
  outputBases: string[];
  outputSignals: string[];
  stubs: string[];
}

const defaultGeometry: ConnectorGeometry = {
  width: 1200,
  height: 480,
  inputBases: [
    "M145 72 H290 L336 240",
    "M155 184 H330 L336 240",
    "M145 296 H330 L336 240",
    "M130 408 H290 L336 240",
  ],
  inputSignals: [
    "M145 72 H290 L336 240 H400",
    "M155 184 H330 L336 240 H400",
    "M145 296 H330 L336 240 H400",
    "M130 408 H290 L336 240 H400",
  ],
  outputBases: [
    "M864 240 L895 92 H930",
    "M864 240 H930",
    "M864 240 L895 388 H930",
  ],
  outputSignals: [
    "M800 240 H864 L895 92 H930",
    "M800 240 H930",
    "M800 240 H864 L895 388 H930",
  ],
  stubs: ["M336 240 H400", "M800 240 H864"],
};

export default function ConnectedAssurance() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const coreTitleRef = useRef<HTMLElement>(null);
  const obligationItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const outcomeItemRefs = useRef<Array<HTMLElement | null>>([]);
  const [isActive, setIsActive] = useState(false);
  const [geometry, setGeometry] = useState(defaultGeometry);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsActive(true);
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const coreTitle = coreTitleRef.current;
    if (!canvas || !coreTitle) return;

    let frame = 0;

    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const canvasRect = canvas.getBoundingClientRect();
        const coreRect = coreTitle.getBoundingClientRect();
        const leftItems = obligationItemRefs.current;
        const rightItems = outcomeItemRefs.current;

        if (
          !canvasRect.width ||
          leftItems.some((item) => !item) ||
          rightItems.some((item) => !item)
        ) {
          return;
        }

        const coreY = coreRect.top - canvasRect.top + coreRect.height / 2;
        const coreLeft = coreRect.left - canvasRect.left - 32;
        const coreRight = coreRect.right - canvasRect.left + 32;
        const inputJunctionX = coreLeft - 64;
        const outputJunctionX = coreRight + 64;

        const inputBases = leftItems.map((item) => {
          const itemRect = item!.getBoundingClientRect();
          const titleRect =
            item!.querySelector("strong")?.getBoundingClientRect() ?? itemRect;
          const startX = titleRect.right - canvasRect.left + 24;
          const startY = itemRect.top - canvasRect.top + itemRect.height / 2;
          const elbowX = startX + (inputJunctionX - startX) * 0.58;
          return `M${startX} ${startY} H${elbowX} L${inputJunctionX} ${coreY}`;
        });

        const inputSignals = inputBases.map(
          (path) => `${path} H${coreLeft}`,
        );

        const outputBases = rightItems.map((item) => {
          const itemRect = item!.getBoundingClientRect();
          const titleRect =
            item!.querySelector("h3")?.getBoundingClientRect() ?? itemRect;
          const endX = titleRect.left - canvasRect.left - 28;
          const endY = itemRect.top - canvasRect.top + itemRect.height / 2;
          const finalTurnX = endX - Math.min(46, Math.max(24, (endX - outputJunctionX) * 0.24));
          return `M${outputJunctionX} ${coreY} L${finalTurnX} ${endY} H${endX}`;
        });

        const outputSignals = outputBases.map((path) =>
          path.replace(/^M[^ ]+ [^ ]+/, `M${coreRight} ${coreY} H${outputJunctionX}`),
        );

        setGeometry({
          width: canvasRect.width,
          height: canvasRect.height,
          inputBases,
          inputSignals,
          outputBases,
          outputSignals,
          stubs: [
            `M${inputJunctionX} ${coreY} H${coreLeft}`,
            `M${coreRight} ${coreY} H${outputJunctionX}`,
          ],
        });
      });
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(canvas);
    resizeObserver.observe(coreTitle);
    obligationItemRefs.current.forEach((item) => item && resizeObserver.observe(item));
    outcomeItemRefs.current.forEach((item) => item && resizeObserver.observe(item));
    measure();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`control-spine-section${isActive ? " is-active" : ""}`}
      aria-labelledby="control-spine-heading"
    >
      <div className="control-spine-panel">
        <header className="control-spine-intro">
          <div className="control-spine-kicker">Unified Control Library</div>
          <h2 id="control-spine-heading">Test once. Satisfy many.</h2>
          <p>
            Frameworks repeat the same requirements. Compliverse maps them to
            one internal control, collects evidence once, and updates coverage
            across every connected framework.
          </p>
        </header>

        <div ref={canvasRef} className="control-spine-canvas">
          <svg
            className="control-spine-lines"
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {[
              ...geometry.inputBases,
              ...geometry.stubs,
              ...geometry.outputBases,
            ].map((path, index) => (
              <path key={`base-${index}`} className="control-path-base" d={path} />
            ))}

            {geometry.inputSignals.map((path, index) => (
              <path
                key={`input-${index}`}
                className="control-signal control-signal-input"
                d={path}
                pathLength="100"
              />
            ))}
            {geometry.outputSignals.map((path, index) => (
              <path
                key={`output-${index}`}
                className="control-signal control-signal-output"
                d={path}
                pathLength="100"
              />
            ))}
          </svg>

          <div className="control-spine-obligations">
            <div className="control-spine-column-label">Overlapping requirements</div>
            {obligations.map((obligation, index) => (
              <div
                key={obligation.name}
                className="control-spine-obligation"
                ref={(element) => {
                  obligationItemRefs.current[index] = element;
                }}
              >
                <strong>
                  {obligation.name}
                </strong>
                <span>{obligation.detail}</span>
              </div>
            ))}
          </div>

          <div className="control-spine-core">
            <span>Unified control</span>
            <strong ref={coreTitleRef}>Access management</strong>
            <div>One owner · One test · One evidence set</div>
          </div>

          <div className="control-spine-outcomes">
            <div className="control-spine-column-label">Shared outcomes</div>
            {outcomes.map((outcome, index) => (
              <article
                key={outcome.name}
                className="control-spine-outcome"
                ref={(element) => {
                  outcomeItemRefs.current[index] = element;
                }}
              >
                <h3>
                  {outcome.name}
                </h3>
                <p>{outcome.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="control-spine-mobile">
          <div className="control-spine-mobile-label">Overlapping requirements</div>
          <div className="control-spine-mobile-inputs">
            {obligations.map((obligation) => (
              <span key={obligation.name}>{obligation.name}</span>
            ))}
          </div>
          <div className="control-spine-mobile-line" aria-hidden="true"><span /></div>
          <div className="control-spine-mobile-core">
            <span>Unified control</span>
            <strong>Access management</strong>
            <small>One owner · One test · One evidence set</small>
          </div>
          <div className="control-spine-mobile-line control-spine-mobile-line-output" aria-hidden="true"><span /></div>
          <div className="control-spine-mobile-outcomes">
            {outcomes.map((outcome) => (
              <article key={outcome.name}>
                <h3>{outcome.name}</h3>
                <p>{outcome.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
