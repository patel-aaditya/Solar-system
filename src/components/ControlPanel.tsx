import type { ReactNode } from 'react';

export type PlanetFact = {
  label: string;
  value: string;
  note?: string;
};

export type ControlHint = {
  keyLabel: string;
  description: string;
};

export type ControlPanelProps = {
  title?: string;
  eyebrow?: string;
  description: string;
  selectedBody?: string;
  status?: string;
  facts: PlanetFact[];
  hints: ControlHint[];
  footer?: ReactNode;
  className?: string;
};

export default function ControlPanel({
  title = 'Solar System Atlas',
  eyebrow = 'Live orbital view',
  description,
  selectedBody = 'Sun',
  status = 'In motion',
  facts,
  hints,
  footer,
  className = '',
}: ControlPanelProps) {
  return (
    <aside className={`control-panel ${className}`.trim()}>
      <div className="control-panel__glow" aria-hidden="true" />

      <header className="control-panel__header">
        <p className="control-panel__eyebrow">{eyebrow}</p>
        <h1 className="control-panel__title">{title}</h1>
        <p className="control-panel__description">{description}</p>
      </header>

      <section className="control-panel__status" aria-label="Selected body status">
        <div>
          <p className="control-panel__label">Focused body</p>
          <p className="control-panel__focus">{selectedBody}</p>
        </div>
        <span className="control-panel__pill">{status}</span>
      </section>

      <section className="control-panel__facts" aria-label="Planet facts">
        {facts.map((fact) => (
          <article key={`${fact.label}-${fact.value}`} className="control-panel__fact">
            <p className="control-panel__fact-label">{fact.label}</p>
            <p className="control-panel__fact-value">{fact.value}</p>
            {fact.note ? <p className="control-panel__fact-note">{fact.note}</p> : null}
          </article>
        ))}
      </section>

      <section className="control-panel__hints" aria-label="Controls">
        <p className="control-panel__label">Controls</p>
        <div className="control-panel__hint-list">
          {hints.map((hint) => (
            <div key={`${hint.keyLabel}-${hint.description}`} className="control-panel__hint">
              <span className="control-panel__key">{hint.keyLabel}</span>
              <span className="control-panel__hint-copy">{hint.description}</span>
            </div>
          ))}
        </div>
      </section>

      {footer ? <footer className="control-panel__footer">{footer}</footer> : null}
    </aside>
  );
}
