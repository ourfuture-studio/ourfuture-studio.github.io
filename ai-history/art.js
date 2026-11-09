/* Original explanatory artwork for ourfuture studio AI Atlas.
 * These diagrams are editorial illustrations, not paper figures or experiment outputs.
 * API: window.AtlasArt.cover(type, track) -> accessible decorative SVG string.
 */
(function () {
  'use strict';

  const palettes = { neural: '#667BDF', symbolic: '#57A69F', hybrid: '#D58A97', foundations:'#8492A5', industry:'#8492A5' };
  const ink = 'var(--art-ink, #CDD4E6)';
  const dim = 'var(--art-dim, #75809B)';
  const panel = 'var(--art-panel, #172137)';
  const sw = 'stroke-width="1.4" vector-effect="non-scaling-stroke"';

  function line(x1, y1, x2, y2, color = ink, extra = '') {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" ${sw} ${extra}/>`;
  }
  function path(d, color = ink, extra = '') {
    return `<path d="${d}" fill="none" stroke="${color}" ${sw} stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  }
  function dot(x, y, r = 3, color = ink, extra = '') {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" ${extra}/>`;
  }
  function ring(x, y, r = 10, color = ink, extra = '') {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${panel}" stroke="${color}" ${sw} ${extra}/>`;
  }
  function rect(x, y, w, h, color = ink, extra = '') {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="none" stroke="${color}" ${sw} ${extra}/>`;
  }
  function wash(x, y, w, h, color, opacity = 0.13, extra = '') {
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${color}" opacity="${opacity}" ${extra}/>`;
  }
  function text(x, y, value, color = dim, extra = '') {
    const size = extra.includes('font-size=') ? '' : 'font-size="10"';
    return `<text x="${x}" y="${y}" fill="${color}" font-family="'IBM Plex Mono',monospace" ${size} ${extra}>${value}</text>`;
  }
  function arrow(x1, y1, x2, y2, color = ink) {
    const a = Math.atan2(y2 - y1, x2 - x1), h = 5;
    return line(x1, y1, x2, y2, color) + path(`M${x2 - h * Math.cos(a - .55)},${y2 - h * Math.sin(a - .55)} L${x2},${y2} L${x2 - h * Math.cos(a + .55)},${y2 - h * Math.sin(a + .55)}`, color);
  }
  function grid(x, y, cols, rows, size, accent, values = []) {
    let s = '';
    for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
      const value = values[row * cols + col] || 0;
      s += `<rect x="${x + col * size}" y="${y + row * size}" width="${size - 3}" height="${size - 3}" rx="1" fill="${value ? accent : ink}" opacity="${value || .075}"/>`;
    }
    return s;
  }
  function flowNodes(items, accent) {
    let s = '';
    items.forEach((item, i) => {
      if (i) s += arrow(items[i - 1][0] + 17, items[i - 1][1], item[0] - 17, item[1], dim);
      s += ring(item[0], item[1], 15, i === items.length - 1 ? accent : ink);
    });
    return s;
  }

  const drawings = {
    neuron(a) {
      let s = '';
      [[42, 40], [31, 89], [43, 139]].forEach((p, i) => {
        s += path(`M${p[0]},${p[1]} C85,${p[1]} 82,90 132,90`, i === 1 ? a : dim);
        s += ring(p[0], p[1], 6, i === 1 ? a : ink);
      });
      s += ring(148, 90, 23, a) + dot(148, 90, 5, a);
      s += path('M171,90 H210 C221,90 225,79 235,79 H276', a);
      s += path('M213,90 C226,90 231,101 245,101 H270', dim);
      s += dot(280, 79, 4, a) + dot(274, 101, 3, ink);
      s += text(133, 143, 'Σ → θ', ink);
      return s;
    },
    perceptron(a) {
      let s = arrow(49, 144, 49, 28, dim) + arrow(49, 144, 280, 144, dim);
      s += path('M92,151 L225,28', a);
      s += path('M92,151 L225,28 L282,28 L282,144 L99,144 Z', a, 'opacity=".08"');
      [[80, 61], [112, 44], [130, 82], [82, 102], [154, 54]].forEach(p => s += ring(p[0], p[1], 5, ink));
      [[170, 119], [206, 87], [231, 123], [252, 69], [194, 137]].forEach(p => s += dot(p[0], p[1], 5, a));
      s += arrow(154, 91, 181, 119, a) + text(185, 121, 'w', a);
      return s;
    },
    network(a) {
      const levels = [[{x:61,y:48},{x:61,y:91},{x:61,y:134}], [{x:151,y:29},{x:151,y:70},{x:151,y:111},{x:151,y:152}], [{x:252,y:69},{x:252,y:111}]];
      let s = '';
      for (let n = 0; n < levels.length - 1; n++) levels[n].forEach(p => levels[n+1].forEach(q => s += line(p.x, p.y, q.x, q.y, dim, 'opacity=".32"')));
      s += line(61, 91, 151, 70, a) + line(151, 70, 252, 69, a);
      levels.forEach((level, i) => level.forEach((p, j) => s += ring(p.x, p.y, 9, i === 1 && j === 1 ? a : ink)));
      s += dot(151, 70, 3, a) + text(45, 174, 'input', dim) + text(235, 151, 'output', dim);
      return s;
    },
    convolution(a) {
      let s = grid(32, 31, 6, 6, 18, ink, [0,0,.25,.55,0,0,0,.2,.6,.2,0,0,0,.6,.2,0,0,0,.5,.25,0,0,0,0,.5,.25,.25,.25,0,0,0,.2,.45,.7,.7,0]);
      s += wash(48, 47, 55, 55, a, .17) + rect(48, 47, 55, 55, a);
      s += arrow(153, 86, 187, 86, dim);
      s += grid(204, 48, 4, 4, 20, a, [.15,.25,.2,.1,.2,.8,.55,.18,.4,.6,.35,.12,.2,.2,.18,.08]);
      s += text(50, 159, 'shared filter', dim) + text(210, 146, 'features', dim);
      return s;
    },
    memory(a) {
      let s = path('M30,39 H290', a);
      [68, 151, 234].forEach((x, i) => {
        s += line(x, 39, x, 63, a) + rect(x - 23, 63, 46, 47, ink);
        s += ring(x, 86, 7, a) + text(x - 4, 90, '×', a);
        s += arrow(x, 144, x, 113, dim) + dot(x, 149, 4, ink);
        s += arrow(x + 26, 86, x + 50, 86, dim);
        s += text(x - 7, 168, `t${i ? '+' + i : ''}`, dim);
      });
      s += dot(30, 39, 3, a) + dot(290, 39, 3, a) + text(99, 23, 'state', a);
      return s;
    },
    dataset(a) {
      let s = '';
      for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
        const x = 31 + col * 35, y = 34 + row * 36;
        s += wash(x, y, 28, 28, ink, .07) + rect(x, y, 28, 28, dim, 'opacity=".5"');
        if ((col + row) % 3 === 0) s += ring(x + 14, y + 14, 6, a);
        else if ((col + row) % 3 === 1) s += path(`M${x+6},${y+21} L${x+14},${y+7} L${x+22},${y+21} Z`, ink);
        else s += rect(x + 8, y + 8, 12, 12, a);
      }
      s += path('M182,88 H202 M202,48 V130 M202,48 H232 M202,88 H232 M202,130 H232', dim);
      [48, 88, 130].forEach((y, i) => s += ring(246, y, i === 1 ? 10 : 8, i === 1 ? a : ink));
      return s;
    },
    sequence(a) {
      let s = '';
      [39, 65, 91, 117].forEach((x, i) => s += rect(x, 42, 19, 23, i % 2 ? a : ink));
      s += path('M48,76 V98 H137', dim) + path('M126,75 V98', dim);
      s += ring(158, 98, 15, a) + dot(158, 98, 4, a);
      s += arrow(174, 98, 204, 98, a) + path('M204,98 V124 H282', dim);
      [210, 237, 264].forEach(x => s += rect(x, 129, 19, 23, a));
      s += text(49, 29, 'encode', dim) + text(214, 172, 'decode', dim);
      return s;
    },
    attention(a) {
      let s = grid(102, 29, 6, 6, 20, a, [.8,.13,.18,.14,.15,.23,.2,.6,.15,.2,.13,.3,.12,.2,.7,.15,.4,.18,.16,.2,.15,.65,.2,.12,.12,.15,.23,.13,.7,.3,.25,.2,.1,.15,.2,.8]);
      s += text(160, 20, 'K', ink) + text(84, 88, 'Q', ink);
      [42, 82, 122].forEach(y => s += arrow(45, y, 74, y, dim));
      s += path('M231,89 H250 V47 H277 M250,89 H277 M250,89 V130 H277', dim);
      s += dot(281, 47, 4, a) + dot(281, 89, 4, a) + dot(281, 130, 4, a);
      s += text(245, 158, 'V', ink);
      return s;
    },
    search(a) {
      const pts = [[160,32],[93,78],[227,78],[55,135],[123,135],[198,135],[267,135]];
      let s = '';
      [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]].forEach(([p,q]) => s += line(...pts[p], ...pts[q], dim));
      s += line(160,32,93,78,a) + line(93,78,123,135,a);
      pts.forEach((p,i)=>s+=ring(p[0],p[1], i===4?12:8, [0,1,4].includes(i)?a:ink));
      s += dot(123,135,4,a) + path('M251,123 L279,147 M279,123 L251,147',dim,'opacity=".45"');
      return s;
    },
    logic(a) {
      let s = rect(34,33,104,43,dim) + rect(34,104,104,43,dim);
      s += text(50,59,'P → Q',ink) + text(50,130,'P',a);
      s += path('M138,55 H163 V91 H191 M138,126 H163 V91',dim);
      s += arrow(163,91,198,91,a) + rect(208,62,70,58,a) + text(234,97,'Q',a,'font-size="18"');
      s += text(37,169,'facts + rule',dim);
      return s;
    },
    proof(a) {
      let s=rect(36,31,104,43,dim)+rect(181,31,104,43,dim);
      s += text(62,58,'P ∨ Q',ink)+text(218,58,'¬P',ink);
      s += path('M88,75 V100 H233 V75',dim)+arrow(160,100,160,120,a);
      s += rect(128,125,64,33,a)+text(155,147,'Q',a);
      s += dot(88,100,3,a)+dot(233,100,3,a);
      return s;
    },
    code(a) {
      let s=rect(35,29,250,123,dim)+line(35,54,285,54,dim);
      [47,57,67].forEach(x=>s+=dot(x,42,2,dim));
      s+=text(52,79,'p(X) :- q(X).',ink)+text(52,102,'q(a).',ink)+text(52,133,'?- p(a)',a);
      s+=path('M205,126 l6,6 l12,-15',a);
      return s;
    },
    planning(a) {
      let s=rect(34,37,250,105,dim)+line(118,37,118,78,dim)+line(118,106,118,142,dim)+line(201,37,201,108,dim)+line(201,134,201,142,dim);
      s+=path('M58,112 H94 V91 H157 V122 H250',a);
      [[58,112],[157,122],[250,122]].forEach(p=>s+=ring(p[0],p[1],6,a));
      s+=rect(72,53,18,18,ink)+rect(226,57,25,25,a)+text(230,74,'✓',a);
      s+=text(38,164,'state → action → goal',dim);
      return s;
    },
    frames(a) {
      let s=rect(56,24,197,131,dim)+wash(56,24,197,29,a,.13)+line(56,53,253,53,dim);
      s+=text(73,43,'FRAME',a);
      [[71,77,96],[71,103,121],[71,129,104]].forEach(([x,y,w],i)=>{
        s+=line(x,y,x+36,y,dim)+line(x+59,y,x+w+45,y,i===1?a:ink);
        s+=dot(x+48,y,2,dim);
      });
      s+=rect(203,96,31,15,a)+text(210,107,'↳',a);
      return s;
    },
    expert(a) {
      let s=rect(30,37,62,40,ink)+text(47,62,'IF',ink)+rect(30,106,62,40,ink)+text(47,131,'IF',ink);
      s+=path('M92,57 H118 V91 H145 M92,126 H118 V91',dim);
      s+=ring(161,91,15,a)+path('M154,91 H168 M161,84 V98',a);
      s+=arrow(177,91,211,91,a)+rect(222,64,68,54,a)+text(235,96,'THEN',a);
      s+=path('M161,111 V145 H261 V128',dim,'stroke-dasharray="3 5"');
      return s;
    },
    ontology(a) {
      let s=rect(116,23,88,30,a)+text(135,43,'concept',a);
      s+=path('M160,54 V76 H81 V96 M160,76 H239 V96',dim);
      s+=rect(44,98,75,31,ink)+rect(202,98,75,31,ink);
      s+=text(61,118,'class',ink)+text(218,118,'class',ink);
      [[67,155],[97,155],[226,155],[255,155]].forEach(p=>s+=ring(p[0],p[1],4,dim));
      s+=line(81,129,67,150,dim)+line(81,129,97,150,dim)+line(239,129,226,150,dim)+line(239,129,255,150,dim);
      return s;
    },
    bridge(a) {
      let s=rect(29,56,81,67,dim)+text(45,84,'P → Q',ink)+text(45,106,'Q → R',ink);
      s+=arrow(119,90,169,90,a);
      [[190,55],[190,122]].forEach(p=>[[239,39],[239,89],[239,139]].forEach(q=>s+=line(...p,...q,dim,'opacity=".65"')));
      [[239,39],[239,89],[239,139]].forEach(p=>s+=line(...p,287,89,dim,'opacity=".65"'));
      [[190,55],[190,122],[239,39],[239,89],[239,139],[287,89]].forEach((p,i)=>s+=ring(p[0],p[1],7,i===3?a:ink));
      s+=path('M167,145 H97 V133',a,'stroke-dasharray="3 5"');
      return s;
    },
    probability(a) {
      let s=rect(29,37,65,92,dim)+path('M46,62 H75 L55,112',ink);
      s+=arrow(103,83,131,83,dim);
      [12,35,21,7].forEach((h,i)=>s+=wash(144+i*17,121-h,11,h,a,.28+i*.18));
      s+=line(140,123,215,123,dim)+text(145,145,'P(digit)',dim);
      s+=arrow(224,83,245,83,dim)+ring(269,83,20,a)+text(260,88,'Σ',a,'font-size="17"');
      return s;
    },
    constraints(a) {
      let s=path('M36,133 C66,138 78,46 115,56 C146,67 140,137 180,126 C215,115 217,33 281,40',ink);
      s+=path('M36,122 C77,111 87,131 126,106 C169,79 215,83 281,59',a);
      s+=path('M36,143 H284 M36,143 V27',dim);
      s+=rect(201,24,58,22,a)+text(211,39,'∀x',a);
      s+=dot(167,89,5,a)+line(167,89,167,143,dim,'stroke-dasharray="2 5"');
      return s;
    },
    scene(a) {
      let s=rect(30,28,166,127,dim);
      s+=ring(72,69,17,a)+rect(123,94,29,29,ink)+path('M55,134 L80,91 L105,134 Z',ink);
      s+=path('M197,92 H216 V49 H276 M216,92 H276 M216,92 V135 H276',dim);
      [49,92,135].forEach((y,i)=>s+=rect(234,y-11,55,22,i===2?a:dim));
      s+=text(241,53,'filter',ink,'font-size="8"')+text(241,96,'relate',ink,'font-size="8"')+text(241,139,'count',a,'font-size="8"');
      return s;
    },
    program(a) {
      let s='';
      [35,96,157].forEach((x,i)=>{
        s+=rect(x,33,45,43,dim)+path(`M${x+11},62 V46 H${x+30}`,i===1?a:ink);
      });
      s+=path('M58,87 V109 H179 V87',dim)+arrow(119,109,119,130,a);
      s+=rect(87,136,65,25,a)+text(106,153,'f()',a);
      s+=path('M206,54 H247 V148 H165',a)+arrow(213,92,247,92,dim);
      s+=text(231,37,'reuse',dim);
      return s;
    },
    geometry(a) {
      let s=path('M51,141 L142,28 L276,141 Z',ink);
      s+=path('M142,28 L176,141 M51,141 L211,86',a);
      s+=path('M137,44 A21,21 0 0 1 156,46',dim)+path('M67,141 A18,18 0 0 0 62,127',dim);
      [[51,141],[142,28],[276,141]].forEach(p=>s+=dot(p[0],p[1],3,ink));
      s+=ring(176,141,5,a)+ring(211,86,5,a)+text(39,161,'A',dim)+text(138,19,'B',dim)+text(280,161,'C',dim);
      s+=path('M176,141 L211,86',dim,'stroke-dasharray="3 5"');
      return s;
    },
    lean(a) {
      let s=rect(31,35,155,110,dim)+text(46,57,'theorem',ink)+text(46,78,'  by',dim);
      s+=line(61,94,142,94,ink)+line(61,111,124,111,ink)+line(61,128,153,128,a);
      s+=arrow(194,90,219,90,dim)+ring(252,90,25,a)+path('M239,90 L248,99 L266,79',a);
      s+=text(225,141,'checked',dim);
      return s;
    }
  };

  window.AtlasArt = Object.freeze({
    types: Object.freeze(Object.keys(drawings)),
    cover(type, track) {
      const accent = `var(--art-accent, ${palettes[track] || palettes.hybrid})`;
      const draw = drawings[type] || drawings.bridge;
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180" aria-hidden="true" focusable="false" fill="none">${draw(accent)}</svg>`;
    }
  });
})();
