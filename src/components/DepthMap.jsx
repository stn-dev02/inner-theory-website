import { useState } from 'react';
import { depthMap } from '../content/site.js';
import Section, { SectionHead } from './Section.jsx';

/**
 * The organising idea of the page: treatments plotted against the layer they
 * act on, deepest last. One layer open at a time, so the axis stays readable.
 */
export default function DepthMap() {
  const [openId, setOpenId] = useState(depthMap.layers[0].id);

  return (
    <Section id="treatments" label={depthMap.label} className="depthband">
      <SectionHead title={depthMap.title} body={depthMap.body} hint={depthMap.hint} />

      <div className="depth">
        <ol className="depth__layers">
          {depthMap.layers.map((layer, i) => {
            const isOpen = layer.id === openId;
            const panelId = `layer-panel-${layer.id}`;

            return (
              <li
                key={layer.id}
                className={`layer reveal${isOpen ? ' is-open' : ''}`}
                style={{ '--reveal-delay': `${i * 70}ms` }}
              >
                <button
                  type="button"
                  className="layer__bar"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : layer.id)}
                >
                  <span className="layer__tick" aria-hidden="true" />
                  <span className="layer__name t-display-m">
                    {layer.name}
                    <span className="layer__range">{layer.range}</span>
                  </span>
                  <span className="layer__summary">{layer.summary}</span>
                  <span className="layer__toggle">
                    {layer.treatments.length} treatments
                    <span className="layer__sign" aria-hidden="true" />
                  </span>
                </button>

                <div className="layer__panel" id={panelId} role="region" aria-label={layer.name}>
                  <div className="layer__panelInner">
                    <ul className="layer__list">
                      {layer.treatments.map((tx) => (
                        <li className="tx" key={tx.name}>
                          <div className="tx__head">
                            <h3 className="tx__name">{tx.name}</h3>
                            <p className="tx__price">{tx.price}</p>
                          </div>
                          <p className="tx__detail">{tx.detail}</p>
                          <dl className="tx__meta">
                            <div>
                              <dt>Depth</dt>
                              <dd>{tx.depth}</dd>
                            </div>
                            <div>
                              <dt>Downtime</dt>
                              <dd>{tx.downtime}</dd>
                            </div>
                            <div>
                              <dt>Chair time</dt>
                              <dd>{tx.time}</dd>
                            </div>
                          </dl>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
