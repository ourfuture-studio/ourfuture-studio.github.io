/* Original diagram of the organization in Rosenblatt (1958), Fig.1, p.389.
 * S -> A_I -> A_II -> R is retained, including R -> A_II feedback (p.390).
 * The comparison uses the separate discussion of A-unit value V on pp.391–392.
 * It is NOT Fig.3A/B relabelled as learning before/after: those are response phases.
 * Unit counts, routes and relative line widths are an original reconstruction,
 * not measurements, inferred probabilities, or a complete biological model.
 * The input pattern, network topology and set of active A-units remain identical.
 */
(function () {
  'use strict';
  const node = (tag, cls, text) => {
    const element = document.createElement(tag);
    if (cls) element.className = cls;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const ink = 'var(--ink, #1b2340)';
  const accent = 'var(--accent, #7a1f2e)';
  const bg = 'var(--bg, #fcf9f1)';
  const soft = 'var(--soft, #f5f0e5)';
  const arrow = (x, y, angle, color, size = 4) => `<path d="M${-size} ${-size * .68} L${size * .5} 0 L${-size} ${size * .68}Z" transform="translate(${x} ${y}) rotate(${angle})" fill="${color}" stroke="none"/>`;

  function drawing(after) {
    const inputDots = [];
    const activeS = new Set([1, 4, 6, 7, 8, 10, 13]);
    for (let row = 0; row < 5; row++) for (let col = 0; col < 3; col++) {
      const active = activeS.has(row * 3 + col);
      inputDots.push(`<circle cx="${39 + col * 14}" cy="${128 + row * 17}" r="${active ? 3.8 : 2.9}" fill="${active ? accent : ink}" fill-opacity="${active ? 1 : .2}"/>`);
    }
    const a1 = [[153, 134], [173, 145], [151, 164], [171, 180], [153, 191]];
    const a2 = [[247, 138], [267, 139], [244, 163], [268, 165], [249, 189], [270, 188]];
    const activeA1 = new Set([1, 2, 4]), activeA2 = new Set([0, 2, 4]);
    const units = (points, active) => points.map(([x, y], index) => `<circle class="perceptron-a-unit" cx="${x}" cy="${y}" r="4.5" fill="${active.has(index) ? accent : bg}" stroke="${active.has(index) ? accent : ink}" stroke-width="1.3"/>`).join('');
    const vRings = [...activeA2].map(index => `<circle class="perceptron-value-ring" cx="${a2[index][0]}" cy="${a2[index][1]}" r="${after ? 8.8 : 7}" fill="none" stroke="${after ? accent : ink}" stroke-opacity="${after ? .65 : .14}" stroke-width="${after ? 2 : 1}"/>`).join('');
    const vStroke = after ? accent : ink;
    const vWidth = after ? 3.3 : 1.3;
    const vOpacity = after ? .9 : .42;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 330" role="img" aria-label="${after ? '같은 입력과 조직에서 경험이 남은 뒤의 A단위 출력 영향과 R1 반응 경향' : '같은 입력과 조직에서 경험 전의 A단위와 반응'}" class="perceptron-association-drawing">
      <title>${after ? '경험이 남은 뒤의 연합과 반응 경향' : '경험 전의 연합과 반응 경향'}</title>
      <desc>같은 감각 무늬가 망막 S, 투사 영역 AⅠ, 연합 영역 AⅡ, 반응 R₁·R₂·R₃에 연결된다. 반응에서 연합 영역으로 되돌아가는 피드백도 있다. ${after ? '활동한 A단위의 출력 영향 V와 R₁에 연결된 경향을 색과 굵기로 강조했다.' : '입력과 연결 조직은 오른쪽 그림과 같다.'} 부품 수와 연결 경로는 자체 구성했으며 논문 실험값을 표시하지 않는다.</desc>
      <rect x="8" y="8" width="404" height="314" rx="15" fill="${soft}"/>

      <g class="neuron-feature" data-feature="input">
        <g fill="none" stroke="${ink}" stroke-opacity=".32" stroke-width="1.2">
          <path d="M67 128 C102 119 123 123 153 134 M67 145 C109 136 143 139 173 145 M67 162 C96 159 120 163 151 164 M67 179 C111 183 143 183 171 180 M67 196 C98 203 123 198 153 191"/>
        </g>
        <ellipse cx="53" cy="162" rx="30" ry="55" fill="${bg}" stroke="${ink}" stroke-width="1.8"/>
        <g class="perceptron-input-pattern">${inputDots.join('')}</g>
        ${arrow(112, 162, 0, ink, 4)}
        <ellipse class="neuron-glow" cx="53" cy="162" rx="33" ry="58" fill="none" stroke="${accent}" stroke-width="2"/>
      </g>

      <g class="neuron-feature" data-feature="association">
        <g fill="none" stroke="${ink}" stroke-opacity=".3" stroke-width="1.2">
          <path d="M153 134 L247 138 M173 145 L244 163 M173 145 L249 189 M151 164 L267 139 M151 164 L244 163 M171 180 L268 165 M153 191 L249 189 M153 191 L270 188"/>
        </g>
        <ellipse cx="163" cy="162" rx="31" ry="55" fill="${bg}" stroke="${ink}" stroke-width="1.6"/>
        <ellipse cx="258" cy="162" rx="33" ry="55" fill="${bg}" stroke="${ink}" stroke-width="1.6"/>
        ${units(a1, activeA1)}
        ${vRings}
        ${units(a2, activeA2)}
        <g fill="none" stroke="${vStroke}" stroke-width="${vWidth}" stroke-opacity="${vOpacity}" stroke-linecap="round">
          <path d="M247 138 C289 127 314 98 348 98 M244 163 C286 159 315 103 348 98 M249 189 C296 176 315 114 348 98"/>
        </g>
        ${arrow(341, 99, -5, vStroke, after ? 5.3 : 4)}
        ${arrow(210, 162, 0, ink, 4)}
        <g class="neuron-glow" fill="none" stroke="${accent}" stroke-width="2">
          <ellipse cx="163" cy="162" rx="34" ry="58"/>
          <ellipse cx="258" cy="162" rx="36" ry="58"/>
        </g>
        <text x="258" y="250" text-anchor="middle" fill="${after ? accent : ink}" font-size="14" font-family="var(--sans, sans-serif)" font-weight="${after ? 600 : 400}">출력 영향 V</text>
      </g>

      <g class="neuron-feature" data-feature="response">
        <g fill="none" stroke="${ink}" stroke-opacity=".35" stroke-width="1.25" stroke-linecap="round">
          <path d="M267 139 C298 141 320 158 348 162 M268 165 C301 177 323 165 348 162 M270 188 C301 200 325 225 348 226 M267 139 C304 157 317 216 348 226"/>
        </g>
        ${arrow(340, 163, 0, ink, 4)}
        ${arrow(340, 225, 0, ink, 4)}
        <g fill="none" stroke="${ink}" stroke-opacity=".44" stroke-width="1.25" stroke-dasharray="4 4" stroke-linecap="round">
          <path d="M354 85 C330 64 297 74 281 115"/>
          <path d="M353 173 C332 193 305 202 288 186"/>
          <path d="M355 239 C329 272 291 273 272 214"/>
        </g>
        ${arrow(281, 115, 115, ink, 4)}
        ${arrow(288, 186, 220, ink, 4)}
        ${arrow(272, 214, 251, ink, 4)}
        <circle cx="367" cy="98" r="18" fill="${after ? accent : bg}" fill-opacity="${after ? .12 : 1}" stroke="${after ? accent : ink}" stroke-width="${after ? 3 : 1.7}"/>
        <circle cx="367" cy="162" r="18" fill="${bg}" stroke="${ink}" stroke-width="1.7"/>
        <circle cx="367" cy="226" r="18" fill="${bg}" stroke="${ink}" stroke-width="1.7"/>
        <g fill="${ink}" font-family="var(--mono, monospace)" font-size="16" text-anchor="middle">
          <text x="367" y="104" fill="${after ? accent : ink}">R₁</text>
          <text x="367" y="168">R₂</text>
          <text x="367" y="232">R₃</text>
        </g>
        <circle class="neuron-glow" cx="367" cy="98" r="23" fill="none" stroke="${accent}" stroke-width="2"/>
        <text x="331" y="285" text-anchor="middle" fill="${ink}" font-family="var(--sans, sans-serif)" font-size="13">R → AⅡ 피드백</text>
      </g>

      <g fill="${ink}" font-family="var(--sans, sans-serif)" text-anchor="middle">
        <text x="53" y="45" font-size="17" font-weight="500">감각 S</text>
        <text x="163" y="45" font-size="18" font-weight="500">AⅠ</text>
        <text x="163" y="65" font-size="13">투사 영역</text>
        <text x="258" y="45" font-size="18" font-weight="500">AⅡ</text>
        <text x="258" y="65" font-size="13">연합 영역</text>
        <text x="367" y="45" font-size="17" font-weight="500">반응</text>
        <text x="53" y="250" font-size="13">망막 무늬</text>
      </g>
    </svg>`;
  }

  window.AtlasVisuals.register('perceptron-association', {
    mount(host, config) {
      const order = ['input', 'association', 'response'];
      const mappings = order.map(id => config.mappings.find(map => map.id === id));
      if (mappings.some(map => !map || !map.label || !map.text)) throw new Error('Perceptron visual requires input, association and response mappings.');
      const root = node('div', 'neuron-comparison perceptron-comparison');
      const controls = node('div', 'neuron-compare-controls');
      controls.setAttribute('role', 'group');
      controls.setAttribute('aria-label', '같은 입력에서 경험 전후의 연합과 반응 비교');
      const grid = node('div', 'neuron-figure-grid');
      const listeners = [], buttons = [];
      function panel(label, caption, after) {
        const figure = node('figure', 'neuron-figure');
        const heading = node('figcaption');
        heading.append(node('h4', '', label));
        const art = node('div', 'neuron-drawing');
        // The only HTML assignment is the static, locally constructed SVG above.
        art.innerHTML = drawing(after);
        figure.append(heading, art, node('p', 'neuron-figure-meaning', caption));
        return figure;
      }
      grid.append(panel(config.beforeLabel, config.beforeCaption, false), panel(config.afterLabel, config.afterCaption, true));
      const result = node('div', 'neuron-compare-result');
      const explanation = node('p', 'perceptron-explanation');
      explanation.setAttribute('role', 'status');
      explanation.setAttribute('aria-live', 'polite');
      explanation.setAttribute('aria-atomic', 'true');
      result.append(explanation);
      let disposed = false;
      function select(id) {
        if (disposed) return;
        const mapping = mappings.find(map => map.id === id);
        root.dataset.focus = id;
        for (const button of buttons) {
          const selected = button.dataset.mapping === id;
          button.classList.toggle('active', selected);
          button.setAttribute('aria-pressed', String(selected));
        }
        for (const feature of root.querySelectorAll('.neuron-feature')) feature.dataset.emphasis = String(feature.dataset.feature === id);
        explanation.textContent = mapping.text;
      }
      for (const mapping of mappings) {
        const button = node('button', '', mapping.label);
        button.type = 'button';
        button.dataset.mapping = mapping.id;
        button.setAttribute('aria-pressed', 'false');
        const click = () => select(mapping.id);
        button.addEventListener('click', click);
        listeners.push(() => button.removeEventListener('click', click));
        buttons.push(button);
        controls.append(button);
      }
      root.append(controls, grid, result);
      if (config.source) {
        const credits = node('div', 'neuron-figure-sources');
        const link = node('a', '', config.source.title + ' ↗');
        link.href = config.source.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        credits.append(link);
        root.append(credits);
      }
      host.append(root);
      select('association');
      return () => {
        if (disposed) return;
        disposed = true;
        for (const remove of listeners) remove();
        root.remove();
      };
    }
  });
})();
