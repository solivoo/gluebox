import type { PropMeta } from './types';
import './PropControl.css';

interface PropControlProps {
  meta: PropMeta;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function PropControl({ meta, value, onChange }: Readonly<PropControlProps>) {
  const { name, type, defaultValue, description, control, options } = meta;

  const showDefault = JSON.stringify(value) === JSON.stringify(defaultValue);

  return (
    <div className="pc-control" title={description}>
      <div className="pc-control__header">
        <code className="pc-control__name">{name}</code>
        <span className="pc-control__type">{type}</span>
        {showDefault && <span className="pc-control__default-tag">default</span>}
      </div>

      <div className="pc-control__body">
        {control === 'select' && options && (
          <select
            className="pc-control__select"
            value={String(value)}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}

        {control === 'boolean' && (
          <label className="pc-control__toggle">
            <input
              type="checkbox"
              checked={Boolean(value)}
              onChange={(e) => onChange(e.target.checked)}
            />
            <span className="pc-control__toggle-track" />
            <span className="pc-control__toggle-label">
              {String(value) === 'true' ? 'true' : 'false'}
            </span>
          </label>
        )}

        {control === 'text' && (
          <input
            className="pc-control__text"
            type="text"
            value={String(value ?? '')}
            onChange={(e) => onChange(e.target.value)}
          />
        )}

        {control === 'number' && (
          <input
            className="pc-control__number"
            type="number"
            value={Number(value)}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        )}

        {control === 'color' && (
          <div className="pc-control__color-row">
            <input
              className="pc-control__color-swatch"
              type="color"
              value={String(value)}
              onChange={(e) => onChange(e.target.value)}
            />
            <code className="pc-control__color-hex">{String(value)}</code>
          </div>
        )}

        {control === 'slot' && (
          <div className="pc-control__slot">
            <code className="pc-control__slot-hint">
              {Array.isArray(value)
                ? `${value.length} ítem(s) — definido en defaults del demo`
                : 'Valor fijo del demo (no editable en panel)'}
            </code>
          </div>
        )}
      </div>

      <p className="pc-control__desc">{description}</p>
    </div>
  );
}
