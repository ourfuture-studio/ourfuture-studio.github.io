/* Original SVG illustrations for the LeNet visual-system section.
 * The experiment refers to Hubel & Wiesel (1962), Text-fig.4, but does not
 * reproduce its measured traces. The pathway is a representative human
 * retina -> LGN -> V1 -> distributed visual-area route, not an atlas section.
 * No anatomical coordinates, response rates, or recording times are claimed.
 */
(function(){
  'use strict';
  const INK='var(--ink, #1b2340)',ACCENT='var(--accent, #7a1f2e)',BG='var(--bg, #fcf9f1)',SOFT='var(--soft, #f5f0e5)',MUTED='var(--muted, #777b86)';
  const TEAL='#5c8983',GOLD='#b49a70';
  const STAGES=Object.freeze(['retina','lgn','v1','higher','overview']);
  const svg=(title,desc,body)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 330" role="img" aria-label="${title}" style="font-family:inherit"><title>${title}</title><desc>${desc}</desc>${body}</svg>`;
  const arrow=(d,color=INK,opacity=1,width=2.2)=>`<path d="${d}" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const label=(x,y,text,anchor='middle',color=INK,size=17)=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-size="${size}">${text}</text>`;

  function experiment(angle=45){
    if(![0,45,90].includes(angle))throw new RangeError('Vision stimulus angle must be 0, 45, or 90.');
    const preferred=angle===45;
    // Schematic spike-like marks: no time scale, unit, sampling interval, or
    // number-of-spikes interpretation. Only a qualitative comparison is made.
    const pulses=preferred
      ?'M537 188h9l2-21 3 34 3-13h8l2-35 3 48 3-13h7l2-18 3 30 3-12h5l2-42 3 55 3-13h9l2-27 3 40 3-13h7l2-39 3 52 3-13h6l2-19 3 31 3-12h8l2-32 3 45 3-13h9l2-23 3 35 3-12h7'
      :'M537 188h32l2-12 3 22 3-10h57l2-18 3 28 3-10h58';
    return svg(
      '선 자극을 보는 고양이와 한 시각 피질 뉴런의 반응을 기록하는 실험의 개념도',
      `왼쪽 화면의 선 기울기는 ${angle}도이다. 가운데에는 둥근 얼굴의 고양이가 있고, 머리 위의 별도 뇌 표시와 미세전극이 오른쪽 기록 장치로 연결된다. 이 도식은 45도를 선호하는 세포를 가정해 ${preferred?'뚜렷한':'약한'} 반응을 표시한다. 고양이와 뇌 표시는 삽화이며, 전극 위치와 발화 틱도 관계를 보여 주는 그림으로 원논문의 실제 배선, 발화 횟수, 파형, 시간 기록이 아니다.`,
      `<g fill="none" stroke="${INK}" stroke-linejoin="round">
        <path d="M40 78H174V227H40Z" fill="${SOFT}" stroke-width="1.6"/>
        <path d="M174 78L191 89V216L174 227Z" fill="${BG}" stroke-width="1.6"/>
        <path d="M40 78L56 67H191V216M174 78L191 67" stroke-opacity=".45" stroke-width="1.2"/>
        <rect x="51" y="90" width="111" height="125" rx="2" fill="${BG}" stroke-opacity=".22"/>
        <path d="M102 228V245M80 249H124" stroke-opacity=".5" stroke-width="2"/>
      </g>
      <circle cx="107" cy="152" r="37" fill="${ACCENT}" fill-opacity=".035" stroke="${ACCENT}" stroke-opacity=".4" stroke-dasharray="4 5" stroke-width="1.2"/>
      <path d="M76 152H138" transform="rotate(${-angle} 107 152)" fill="none" stroke="${ACCENT}" stroke-width="7" stroke-linecap="round"/>
      ${arrow('M211 153H255M247 147L255 153L247 159',INK,.55,2)}
      <g data-art="cute-cat" stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M394 247C410 257 431 260 440 246C447 234 441 223 431 226C422 228 428 237 430 238" fill="none" stroke="${SOFT}" stroke-width="15"/>
        <path d="M394 247C410 257 431 260 440 246C447 234 441 223 431 226C422 228 428 237 430 238" fill="none" stroke-width="1.7"/>
        <path d="M330 215C320 229 319 249 326 259C338 269 390 269 401 257C407 244 402 225 391 214Z" fill="${SOFT}" stroke-width="1.8"/>
        <ellipse cx="363" cy="244" rx="24" ry="19" fill="${BG}" stroke="none"/>
        <path d="M335 234Q331 245 333 255M390 234Q394 245 392 255" fill="none" stroke-opacity=".3" stroke-width="1.3"/>
        <ellipse cx="339" cy="258" rx="17" ry="9" fill="${BG}" stroke-width="1.6"/>
        <ellipse cx="388" cy="258" rx="17" ry="9" fill="${BG}" stroke-width="1.6"/>
        <path d="M333 257V261M340 257V261M383 257V261M390 257V261" stroke-opacity=".35" stroke-width="1.1"/>
        <path d="M297 163C292 150 297 140 306 134L304 113Q304 107 310 111L333 128C348 120 369 121 384 127L405 110Q410 106 412 113L418 139C432 149 437 166 434 185C437 207 421 225 398 231C375 240 339 238 317 226C295 218 287 193 292 177Z" fill="${SOFT}" stroke-width="2"/>
        <path d="M311 120L314 137L327 132Z" fill="${ACCENT}" fill-opacity=".16" stroke="none"/>
        <path d="M404 120L392 132L410 139Z" fill="${ACCENT}" fill-opacity=".16" stroke="none"/>
        <path d="M340 138L344 147M356 133L357 144M372 137L369 146" fill="none" stroke-opacity=".3" stroke-width="2.8"/>
        <ellipse cx="328" cy="178" rx="13.5" ry="16" fill="${BG}" stroke-width="1.4"/>
        <ellipse cx="384" cy="178" rx="14" ry="16.5" fill="${BG}" stroke-width="1.4"/>
        <ellipse cx="324" cy="178" rx="9" ry="12" fill="${INK}" stroke="none"/>
        <ellipse cx="380" cy="178" rx="9.5" ry="12.5" fill="${INK}" stroke="none"/>
        <circle cx="321" cy="173" r="3.2" fill="${BG}" stroke="none"/>
        <circle cx="377" cy="173" r="3.4" fill="${BG}" stroke="none"/>
        <circle cx="327" cy="183" r="1.4" fill="${BG}" stroke="none"/>
        <circle cx="383" cy="183" r="1.4" fill="${BG}" stroke="none"/>
        <ellipse cx="318" cy="201" rx="13" ry="7" fill="${ACCENT}" fill-opacity=".11" stroke="none"/>
        <ellipse cx="394" cy="201" rx="13" ry="7" fill="${ACCENT}" fill-opacity=".11" stroke="none"/>
        <ellipse cx="349" cy="207" rx="13" ry="10" fill="${BG}" stroke="none"/>
        <ellipse cx="366" cy="207" rx="13" ry="10" fill="${BG}" stroke="none"/>
        <path d="M351 196Q357 193 363 196L358 202Q357 203 356 202Z" fill="${ACCENT}" stroke="none"/>
        <path d="M357 202V207M357 207Q351 214 345 208M357 207Q363 214 369 208" fill="none" stroke-width="1.5"/>
        <path d="M311 199L286 194M311 207L282 208M313 214L289 220M402 199L427 193M403 207L432 207M401 214L425 220" fill="none" stroke-opacity=".52" stroke-width="1.3"/>
      </g>
      <g data-art="brain-inset">
        <path d="M411 108L405 124" fill="none" stroke="${MUTED}" stroke-opacity=".6" stroke-width="1.2" stroke-dasharray="3 4"/>
        <circle cx="412" cy="79" r="27" fill="${BG}" stroke="${MUTED}" stroke-opacity=".55" stroke-width="1.3" stroke-dasharray="3 4"/>
        <path d="M395 82C391 77 395 70 401 70C402 64 409 63 413 67C421 63 428 69 427 74C433 78 430 87 424 89C421 95 411 95 407 91C401 94 394 90 395 82Z" fill="${ACCENT}" fill-opacity=".09" stroke="${INK}" stroke-opacity=".65" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M403 72Q398 77 404 82L403 88M413 69Q408 76 414 80L412 91M423 73Q417 78 423 85" fill="none" stroke="${INK}" stroke-opacity=".35" stroke-width="1.1" stroke-linecap="round"/>
        <path d="M423 61L418 77" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M418 77L416 83" stroke="${ACCENT}" stroke-width="3" stroke-linecap="round"/>
      </g>
      <circle cx="423" cy="61" r="4" fill="${BG}" stroke="${INK}" stroke-width="1.4"/>
      ${arrow('M427 61H548V91M542 83L548 91L554 83',ACCENT,.8,1.8)}
      <rect x="511" y="101" width="224" height="137" rx="9" fill="${SOFT}" stroke="${INK}" stroke-opacity=".4" stroke-width="1.4"/>
      <rect x="524" y="113" width="198" height="104" rx="3" fill="${BG}" stroke="${INK}" stroke-opacity=".14"/>
      <path d="M536 188H709" stroke="${INK}" stroke-opacity=".16" stroke-width="1"/>
      <path d="${pulses}" fill="none" stroke="${preferred?ACCENT:INK}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="708" cy="227" r="3" fill="${ACCENT}" fill-opacity="${preferred?'.9':'.25'}"/>
      ${label(107,282,'선 자극')}
      ${label(363,297,'고양이 시각 피질')}
      ${label(623,282,preferred?'선호 기울기와 일치':'선호 기울기와 다름','middle',preferred?ACCENT:INK)}
      ${label(423,44,'미세전극','middle',MUTED,13)}
      ${label(623,136,'한 뉴런의 반응','middle',MUTED,13)}
      ${label(623,306,'기록의 관계를 재구성한 도식','middle',MUTED,12)}`
    );
  }

  function rose(){
    return `<g stroke="${ACCENT}" stroke-linecap="round" stroke-linejoin="round">
      <path d="M65 203C63 181 66 160 66 142" fill="none" stroke="${TEAL}" stroke-width="3"/>
      <path d="M63 185C48 185 40 175 39 166C51 163 62 170 64 180M66 174C78 169 87 171 91 178C83 188 73 187 66 182" fill="${TEAL}" fill-opacity=".28" stroke="${TEAL}" stroke-width="1.5"/>
      <path d="M49 147C37 138 42 122 48 117C49 105 63 102 72 108C84 105 93 117 89 127C96 138 85 153 73 152C63 159 53 153 49 147Z" fill="${ACCENT}" fill-opacity=".12" stroke-width="1.7"/>
      <path d="M48 121Q62 113 75 115Q89 124 80 137Q66 149 51 139Q42 129 48 121M55 117Q51 133 66 140Q81 140 84 126M50 137Q65 133 67 120Q80 118 78 129Q72 137 62 132Q55 126 62 121Q68 118 72 124Q72 130 66 129M58 149Q75 150 86 136" fill="none" stroke-width="1.4"/>
    </g>`;
  }

  function pathway(stage='retina'){
    if(!STAGES.includes(stage))throw new RangeError('Vision pathway stage must be retina, lgn, v1, higher, or overview.');
    const active=id=>stage===id;
    const color=id=>active(id)?ACCENT:MUTED;
    const width=id=>active(id)?3.8:2;
    const focus=stage==='overview'?'특정 영역을 강조하거나 대응시키지 않은 전체 경로다.':`현재 강조한 단계는 ${stage==='retina'?'망막':stage==='lgn'?'시상 깊은 곳의 LGN':stage==='v1'?'뒤쪽 후두엽의 V1':'그 이후 여러 시각영역'}이다.`;
    return svg(
      '물체를 본 뒤 망막, LGN, V1과 여러 시각영역으로 이어지는 사람 시각경로의 개요',
      `${focus} 왼쪽 장미에서 눈으로 들어온 빛이 망막 이후 신경 신호로 전달된다. 눈 뒤에서 LGN을 거쳐 뇌 뒤쪽 V1로 향하는 굵은 대표 경로와, V1 이후 여러 영역으로 갈라지는 경로 및 되먹임을 표시한다. 뇌 속 LGN은 점선 표식이다. 모양과 위치는 배치 이해를 위한 개요이며 실제 해부학적 단면이나 모든 경로를 나타낸 것이 아니다. V2, V3, V4, LOC를 필수적인 단일 직렬 단계로 제시하지 않는다.`,
      `${rose()}
      <g fill="none" stroke="${GOLD}" stroke-opacity=".65" stroke-width="1.5">
        <path d="M96 128L150 178M96 144L150 190M93 153L150 201"/>
      </g>
      <g>
        <path d="M170 173C186 158 215 162 232 176C246 188 246 212 232 225C214 242 184 239 167 225C153 213 152 187 170 173Z" fill="${BG}" stroke="${INK}" stroke-width="1.8"/>
        <path d="M168 176C155 171 144 181 144 199C144 216 155 226 168 223C162 210 162 190 168 176Z" fill="${SOFT}" stroke="${INK}" stroke-opacity=".7" stroke-width="1.4"/>
        <ellipse cx="152" cy="199" rx="7" ry="17" fill="${INK}" fill-opacity=".2"/>
        <ellipse cx="151" cy="199" rx="3" ry="10" fill="${INK}"/>
        <path d="M220 171C242 188 243 211 222 229" fill="none" stroke="${active('retina')?ACCENT:GOLD}" stroke-width="${active('retina')?5:3.5}" stroke-linecap="round"/>
        <path d="M177 176C191 169 208 171 217 176M174 224C186 232 208 233 219 225" fill="none" stroke="${INK}" stroke-opacity=".13" stroke-width="1.1"/>
        <path d="M238 195L259 198V210L239 210" fill="${SOFT}" stroke="${INK}" stroke-opacity=".28" stroke-width="1.2"/>
      </g>
      <g>
        <path d="M351 234C326 221 316 198 320 173C307 152 319 126 334 115C337 90 361 76 386 76C405 58 435 62 456 67C481 53 515 62 531 75C561 72 584 85 595 103C621 111 638 134 635 156C650 179 639 203 621 217C607 238 574 247 550 242C528 256 500 250 482 239C457 251 431 241 418 233C394 246 369 244 351 234Z" fill="${SOFT}" stroke="${INK}" stroke-opacity=".7" stroke-width="1.8" stroke-linejoin="round"/>
        <path d="M536 235C546 251 549 275 559 286L575 291L573 278C560 267 562 251 554 237" fill="${SOFT}" stroke="${INK}" stroke-opacity=".42" stroke-width="1.4"/>
        <path d="M576 235C585 217 615 219 628 232C645 244 635 267 616 270C597 274 578 263 576 250Z" fill="${BG}" stroke="${INK}" stroke-opacity=".42" stroke-width="1.4"/>
        <g fill="none" stroke="${INK}" stroke-opacity=".25" stroke-width="1.3" stroke-linecap="round">
          <path d="M335 160C328 143 343 135 353 140C367 147 374 138 371 127C367 117 378 109 388 113M342 119C354 122 358 112 357 104C356 93 367 86 379 90M328 184C341 180 355 186 354 199C353 212 362 223 374 221M344 210C357 202 369 207 376 214C385 222 396 217 395 205M380 87C394 80 408 90 406 101C403 115 414 121 424 113M387 127C383 139 391 150 404 148C418 145 425 151 423 164M371 163C385 155 395 166 390 176C383 191 395 198 407 195M415 77C427 73 443 78 444 90C446 103 457 107 467 99M428 130C442 121 453 131 451 144C449 157 461 162 471 155M416 217C425 205 437 207 444 217C454 227 466 227 475 217M462 77C479 70 492 80 490 92C488 106 501 113 511 103M470 177C482 166 497 172 496 185C496 198 510 207 518 197M490 124C503 114 514 124 513 136C511 151 521 160 533 152M521 83C530 93 540 92 551 93C565 93 574 104 569 116M536 178C550 166 560 174 559 187C557 199 565 209 577 208M561 130C573 122 587 133 581 145C576 158 587 165 598 157M594 113C606 123 602 137 611 145C620 153 620 162 614 171M594 183C607 178 619 188 611 201M586 243C599 232 618 237 626 246M584 251C595 243 611 246 622 254M591 260C600 254 609 256 615 264"/>
          <path d="M340 166C366 157 379 147 401 156C421 165 435 159 456 166C479 175 492 162 511 171C529 180 548 168 566 177" stroke-width="2.2" stroke-opacity=".6"/>
          <path d="M455 68C442 89 451 110 447 126M533 76C520 102 529 120 524 143"/>
        </g>
      </g>
      <path d="M235 205C284 219 317 216 356 211C394 208 422 197 449 187" fill="none" stroke="${color('retina')}" stroke-width="${width('retina')}" stroke-linecap="round"/>
      ${arrow('M440 184L449 187L443 194',color('retina'),1,width('retina'))}
      <circle cx="461" cy="183" r="22" fill="${BG}" fill-opacity=".8" stroke="${color('lgn')}" stroke-width="${active('lgn')?2.8:1.8}" stroke-dasharray="4 4"/>
      <circle cx="461" cy="183" r="8" fill="${color('lgn')}" fill-opacity="${active('lgn')?'.85':'.35'}"/>
      <path d="M482 183C529 188 570 177 610 159" fill="none" stroke="${color('lgn')}" stroke-width="${width('lgn')}" stroke-linecap="round"/>
      ${arrow('M600 157L610 159L605 167',color('lgn'),1,width('lgn'))}
      <path d="M620 128C632 139 637 157 631 174L618 188L607 177C616 159 613 143 620 128Z" fill="${active('v1')?ACCENT:GOLD}" fill-opacity="${active('v1')?'.45':'.23'}" stroke="${color('v1')}" stroke-width="${active('v1')?2.8:1.6}"/>
      <path d="M613 143C599 118 579 109 556 111M612 174C589 204 565 218 536 209" fill="none" stroke="${color('higher')}" stroke-width="${width('higher')}" stroke-linecap="round"/>
      ${arrow('M563 105L556 111L566 116M544 203L536 209L546 215',color('higher'),1,width('higher'))}
      <ellipse cx="548" cy="107" rx="22" ry="14" fill="${active('higher')?ACCENT:TEAL}" fill-opacity="${active('higher')?'.3':'.17'}" stroke="${color('higher')}" stroke-width="1.5"/>
      <ellipse cx="524" cy="209" rx="23" ry="15" fill="${active('higher')?ACCENT:TEAL}" fill-opacity="${active('higher')?'.3':'.17'}" stroke="${color('higher')}" stroke-width="1.5"/>
      <path d="M548 220C578 231 610 213 619 190" fill="none" stroke="${color('higher')}" stroke-opacity=".5" stroke-width="1.4" stroke-dasharray="4 5"/>
      ${arrow('M613 196L619 190L621 199',color('higher'),.5,1.4)}
      <g fill="none" stroke="${MUTED}" stroke-opacity=".65" stroke-width="1.1">
        <path d="M223 235V258H190M461 207V270M632 163H684V141M547 89V45H585"/>
      </g>
      ${label(65,241,'물체','middle',MUTED,15)}
      ${label(190,282,'망막','middle',color('retina'),19)}
      ${label(461,294,'LGN','middle',color('lgn'),19)}
      ${label(461,315,'시상 깊은 곳','middle',MUTED,12)}
      ${label(684,125,'V1','middle',color('v1'),19)}
      ${label(684,146,'뒤쪽 후두엽','middle',MUTED,12)}
      ${label(585,29,'그 이후 여러 시각영역','middle',color('higher'),17)}
      ${label(666,257,'분기·되먹임','middle',MUTED,12)}
      ${label(335,294,'망막 이후는 신경 신호','middle',MUTED,12)}`
    );
  }
  window.AtlasVisionArt=Object.freeze({experiment,pathway});
})();
