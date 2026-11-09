/* Original vector drawing, not a micrograph or a traced textbook figure.
 * Anatomical reference: OpenStax Biology 2e, §35.1, Fig.35.3 and Parts of a Neuron.
 * https://openstax.org/books/biology-2e/pages/35-1-neurons-and-glial-cells
 * One multipolar neuron is shown; neuron shapes vary. The synaptic cleft stays open.
 * Parent UI may style .neuron-feature[data-feature] and toggle .neuron-glow opacity.
 * No animation, timers, event handlers, external images, or document-level SVG IDs.
 */
(function () {
  'use strict';
  window.AtlasNeuronDrawing = {
    svg: () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 300" role="img" aria-label="수상돌기, 세포체, 하나의 축삭, 다른 뉴런과의 시냅스를 보여 주는 생물학적 뉴런 구조도" class="biological-neuron-drawing">
      <title>생물학적 뉴런의 구조</title>
      <desc>다극성 뉴런의 자체 구성도다. 왼쪽의 여러 수상돌기에서 세포체로 들어온 신호가 오른쪽의 한 축삭과 가지 친 말단을 통해 다른 뉴런과의 시냅스로 전달되는 방향을 표시한다. 두 세포 사이에는 틈이 있으며, 모든 뉴런이 이 형태인 것은 아니다.</desc>
      <rect x="0" y="0" width="420" height="300" rx="18" fill="var(--bg, #fcf9f1)"/>
      <rect x="8" y="9" width="404" height="282" rx="16" fill="var(--soft, #f5f0e5)"/>

      <g class="neuron-feature neuron-dendrites" data-feature="cell" fill="none" stroke="var(--ink, #1b2340)" stroke-linecap="round" stroke-linejoin="round">
        <g stroke-width="3.2">
          <path d="M105 124 C103 108 92 99 85 85 L74 72"/>
          <path d="M89 137 C76 131 68 119 56 117 L40 122"/>
          <path d="M87 153 C75 151 66 158 56 168 L42 180"/>
          <path d="M103 170 C101 184 88 196 77 204 L69 223"/>
          <path d="M124 170 C128 184 138 195 149 207 L155 226"/>
          <path d="M129 127 C140 117 146 104 151 92 L151 75"/>
        </g>
        <g stroke-width="1.9">
          <path d="M85 85 L63 80 L48 68 M63 80 L47 86 L29 80"/>
          <path d="M96 104 L100 76 L91 58 L92 44 M100 76 L116 57 L119 43"/>
          <path d="M56 117 L51 98 L37 93 L30 99 M51 98 L48 82"/>
          <path d="M40 122 L28 112 L18 114 M40 122 L27 133"/>
          <path d="M64 160 L41 151 L23 157 M41 151 L31 143"/>
          <path d="M42 180 L24 183 L18 174 M42 180 L34 197 L19 205"/>
          <path d="M91 190 L100 212 L95 231 L101 242 M100 212 L112 222"/>
          <path d="M77 204 L58 211 L48 229 M69 223 L73 240 L64 250"/>
          <path d="M138 195 L137 221 L126 238 M137 221 L144 242"/>
          <path d="M149 207 L168 214 L176 230 M155 226 L163 242"/>
          <path d="M151 92 L173 88 L188 74 M173 88 L187 96"/>
          <path d="M151 75 L165 60 L166 45 M151 75 L139 58 L140 43"/>
        </g>
        <g class="neuron-glow" opacity="0" stroke="var(--accent, #7a1f2e)" stroke-width="6">
          <path d="M40 122 C57 113 72 126 89 137"/>
          <path d="M119 43 L116 57 L100 76 L96 104 L105 124"/>
        </g>
      </g>

      <g class="neuron-feature neuron-axon" data-feature="signal" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path d="M138 147 C164 142 174 151 196 159 S244 176 279 165" stroke="var(--ink, #1b2340)" stroke-width="6.2"/>
        <path d="M139 147 C164 142 174 151 196 159 S244 176 279 165" stroke="var(--bg, #fcf9f1)" stroke-width="2.2"/>
        <path class="neuron-glow" opacity="0" d="M139 147 C164 142 174 151 196 159 S244 176 279 165" stroke="var(--accent, #7a1f2e)" stroke-width="8"/>
      </g>

      <g class="neuron-feature neuron-soma" data-feature="cell">
        <path d="M105 119 C115 116 125 119 132 129 C138 135 140 140 149 146 C141 151 139 158 133 165 C126 174 120 180 109 177 C101 174 98 167 90 161 C81 154 82 143 88 135 C94 129 97 122 105 119Z" fill="var(--bg, #fcf9f1)" stroke="var(--ink, #1b2340)" stroke-width="2.5" stroke-linejoin="round"/>
        <ellipse cx="113" cy="148" rx="13" ry="14" fill="var(--accent, #7a1f2e)" fill-opacity=".13" stroke="var(--accent, #7a1f2e)" stroke-width="1.7"/>
        <circle cx="116" cy="146" r="3.6" fill="var(--accent, #7a1f2e)"/>
        <path d="M96 142 Q99 137 103 137 M123 162 Q128 158 129 154" fill="none" stroke="var(--ink, #1b2340)" stroke-opacity=".25" stroke-width="1.5" stroke-linecap="round"/>
        <path class="neuron-glow" opacity="0" d="M105 119 C115 116 125 119 132 129 C138 135 140 140 149 146 C141 151 139 158 133 165 C126 174 120 180 109 177 C101 174 98 167 90 161 C81 154 82 143 88 135 C94 129 97 122 105 119Z" fill="var(--accent, #7a1f2e)" fill-opacity=".13" stroke="var(--accent, #7a1f2e)" stroke-width="3.5"/>
      </g>

      <g class="neuron-feature neuron-connections" data-feature="connection" stroke-linecap="round" stroke-linejoin="round">
        <g fill="none" stroke="var(--ink, #1b2340)" stroke-width="2.5">
          <path d="M278 165 C289 153 294 143 315 139"/>
          <path d="M278 165 C293 164 307 169 320 167"/>
          <path d="M278 165 C292 175 299 189 317 194"/>
        </g>
        <g fill="var(--accent, #7a1f2e)">
          <ellipse cx="316" cy="139" rx="4.7" ry="3.8" transform="rotate(-12 316 139)"/>
          <ellipse cx="321" cy="167" rx="4.7" ry="3.8"/>
          <ellipse cx="318" cy="194" rx="4.7" ry="3.8" transform="rotate(17 318 194)"/>
        </g>
        <g fill="none" stroke="var(--ink, #1b2340)" stroke-opacity=".58" stroke-width="2.1">
          <path d="M374 157 C360 153 347 143 329 141 M348 145 L344 125 L334 114 M344 125 L357 113"/>
          <path d="M372 168 C357 163 346 166 334 167"/>
          <path d="M374 179 C358 185 346 192 331 194 M349 189 L345 211 L334 224 M345 211 L359 226"/>
          <path d="M382 138 L371 120 L371 104 M371 120 L386 112"/>
          <path d="M386 195 L381 213 L388 231 M381 213 L369 222"/>
        </g>
        <path d="M383 136 C397 131 410 143 412 159 C414 173 411 190 399 198 C388 203 378 193 373 181 C369 172 371 162 374 154 C376 147 376 140 383 136Z" fill="var(--bg, #fcf9f1)" stroke="var(--ink, #1b2340)" stroke-opacity=".58" stroke-width="2.1"/>
        <ellipse cx="392" cy="167" rx="10" ry="13" fill="var(--ink, #1b2340)" fill-opacity=".07" stroke="var(--ink, #1b2340)" stroke-opacity=".35" stroke-width="1.2"/>
        <g class="neuron-glow" opacity="0" fill="none" stroke="var(--accent, #7a1f2e)" stroke-width="2">
          <ellipse cx="324" cy="140" rx="13" ry="11"/>
          <ellipse cx="329" cy="167" rx="13" ry="11"/>
          <ellipse cx="326" cy="194" rx="13" ry="11"/>
        </g>
      </g>

      <g class="neuron-feature neuron-direction" data-feature="signal" fill="var(--accent, #7a1f2e)">
        <path d="M70 123 L80 130 L69 131Z"/>
        <path d="M207 158 L219 165 L206 168Z"/>
        <path d="M281 153 L290 148 L287 158Z"/>
      </g>

      <g class="neuron-label-lines" fill="none" stroke="var(--ink, #1b2340)" stroke-opacity=".44" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
        <path d="M67 39 L68 57 L74 69"/>
        <path d="M77 269 C111 260 115 223 113 184"/>
        <path d="M240 114 L240 156"/>
        <path d="M330 68 L330 105 L324 128"/>
      </g>
      <g class="neuron-labels" fill="var(--ink, #1b2340)" font-family="var(--sans, 'Malgun Gothic', sans-serif)" font-size="16" font-weight="500">
        <text x="23" y="31">수상돌기</text>
        <text x="22" y="278">세포체</text>
        <text x="224" y="105">축삭</text>
        <text x="303" y="58">시냅스</text>
      </g>
    </svg>`
  };
})();
