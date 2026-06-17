import { useState, useCallback, useMemo } from 'react';
import type { ComponentPlaygroundProps } from './types';
import { PropControl } from './PropControl';
import './ComponentPlayground.css';

export function ComponentPlayground({
  meta,
  Component,
  renderPreview,
  wrapper,
}: Readonly<ComponentPlaygroundProps>) {
  const [props, setProps] = useState<Record<string, unknown>>({ ...meta.defaults });
  const [activeTab, setActiveTab] = useState<'props' | 'events'>('props');

  const handlePropChange = useCallback((name: string, value: unknown) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  }, []);

  /** Filtra props: fusiona defaults + estado, convierte strings vacíos en undefined */
  const cleanProps = useMemo(() => {
    const merged = { ...meta.defaults, ...props };
    const cleaned: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(merged)) {
      cleaned[key] = val === '' ? undefined : val;
    }
    return cleaned;
  }, [meta.defaults, props]);

  const preview = renderPreview ? (
    renderPreview(cleanProps)
  ) : Component ? (
    <Component {...cleanProps} />
  ) : null;

  const layout = (
    <div className="cpg">
      {/* Preview */}
      <section className="cpg__preview">
        <div className="cpg__preview-label">Preview</div>
        <div className={`cpg__preview-stage${meta.fullWidthPreview ? ' cpg__preview-stage--full' : ''}`}>
          {preview}
        </div>
      </section>

      {/* Controls panel */}
      <aside className="cpg__panel">
        {/* Header */}
        <div className="cpg__panel-header">
          <h2 className="cpg__panel-title">{meta.name}</h2>
          <code className="cpg__panel-path">{meta.sourcePath}</code>
          <p className="cpg__panel-desc">{meta.description}</p>
        </div>

        {/* Tabs */}
        <div className="cpg__tabs">
          <button
            className={`cpg__tab${activeTab === 'props' ? ' cpg__tab--active' : ''}`}
            onClick={() => setActiveTab('props')}
          >
            Props
          </button>
          <button
            className={`cpg__tab${activeTab === 'events' ? ' cpg__tab--active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            Eventos ({meta.events.length})
          </button>
        </div>

        {/* Props tab */}
        {activeTab === 'props' && (
          <div className="cpg__props">
            {meta.sections.map((section) => (
              <div key={section.title} className="cpg__section">
                <h3 className="cpg__section-title">{section.title}</h3>
                {section.props.map((prop) => {
                  // Check dependency visibility
                  if (prop.dependsOn) {
                    const depValue = props[prop.dependsOn.prop];
                    if (JSON.stringify(depValue) !== JSON.stringify(prop.dependsOn.value)) {
                      return null;
                    }
                  }
                  return (
                    <PropControl
                      key={prop.name}
                      meta={prop}
                      value={props[prop.name] ?? prop.defaultValue}
                      onChange={(v) => handlePropChange(prop.name, v)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {/* Events tab */}
        {activeTab === 'events' && (
          <div className="cpg__events">
            {meta.events.length === 0 && (
              <p className="cpg__events-empty">Este componente no expone callbacks públicos.</p>
            )}
            {meta.events.map((event) => (
              <div key={event.name} className="cpg__event">
                <div className="cpg__event-header">
                  <code className="cpg__event-name">{event.name}</code>
                  <code className="cpg__event-signature">{event.signature}</code>
                </div>
                <p className="cpg__event-desc">{event.description}</p>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );

  return wrapper ? wrapper(layout, cleanProps) : layout;
}
