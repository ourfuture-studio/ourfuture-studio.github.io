/* File-specific Commons metadata and shared remote-photo rendering. */
(function(){
  'use strict';
  const hasText=value=>typeof value==='string'&&value.trim().length>0;
  const normalizeName=value=>String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/\s+/g,' ');
  const legacy={
    'john-mccarthy':{personId:'john-mccarthy',name:'John McCarthy',imageUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/John_McCarthy_2006.jpg?width=480',sourceUrl:'https://commons.wikimedia.org/wiki/File:John_McCarthy_2006.jpg',author:'Tom Varco',license:{name:'CC BY-SA 3.0',url:'https://creativecommons.org/licenses/by-sa/3.0/'},localFile:'john-mccarthy.jpg'},
    'geoffrey-hinton':{personId:'geoffrey-hinton',name:'Geoffrey Hinton',imageUrl:'https://commons.wikimedia.org/wiki/Special:FilePath/Geoffrey_Hinton_at_UBC_(cropped).jpg?width=480',sourceUrl:'https://commons.wikimedia.org/wiki/File:Geoffrey_Hinton_at_UBC_(cropped).jpg',author:'Eviatar Bach · crop: WikiPedant',license:{name:'CC BY-SA 3.0',url:'https://creativecommons.org/licenses/by-sa/3.0/'},localFile:'geoffrey-hinton.jpg'}
  };
  function https(value){
    if(!hasText(value)||/[\u0000-\u0020<>"`\\]/.test(value))return null;
    try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password&&(!url.port||url.port==='443')?url:null;}catch{return null;}
  }
  function fileKey(value){const url=https(value);if(!url||url.hostname!=='commons.wikimedia.org')return'';try{const path=decodeURIComponent(url.pathname);return path.startsWith('/wiki/File:')?path.slice(11).replace(/_/g,' ').normalize('NFC'):'';}catch{return'';}}
  function imageUrl(value){const url=https(value);if(!url)return null;let path;try{path=decodeURIComponent(url.pathname);}catch{return null;}const uploaded=['upload.wikimedia.org','thumb.wikimedia.org'].includes(url.hostname)&&path.startsWith('/wikipedia/commons/'),redirect=url.hostname==='commons.wikimedia.org'&&path.startsWith('/wiki/Special:FilePath/');return uploaded||redirect?url.href:null;}
  function position(value){if(!hasText(value))return'50% 25%';const match=value.match(/^(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);return match&&Number(match[1])<=100&&Number(match[2])<=100?value:'50% 25%';}
  const invalidEntries=[],byId=new Map();
  function normalizeRecord(id,raw){
    if(!raw||typeof raw!=='object'||!raw.imageUrl)return null;
    const fail=reason=>{invalidEntries.push(Object.freeze({personId:id,reason}));return null;};
    if(!hasText(id)||(raw.personId!==undefined&&raw.personId!==id)||!hasText(raw.name)||!hasText(raw.author))return fail('identity-or-author');
    const image=imageUrl(raw.imageUrl),source=https(raw.sourceUrl),license=raw.license,licenseUrl=license&&https(license.url);
    if(!image||!source||!fileKey(raw.sourceUrl)||!license||!hasText(license.name)||!licenseUrl)return fail('image-source-or-license-url');
    if(raw.aliases!==undefined&&(!Array.isArray(raw.aliases)||!Array.from(raw.aliases).every(hasText)))return fail('aliases');
    let localFile='';const sameLegacy=Object.values(legacy).find(p=>fileKey(p.sourceUrl)===fileKey(raw.sourceUrl));
    if(raw.localFile!==undefined){if(!sameLegacy||raw.localFile!==sameLegacy.localFile)return fail('local-file-must-match-source');localFile=raw.localFile;}
    else if(sameLegacy)localFile=sameLegacy.localFile;
    return Object.freeze({personId:id,name:raw.name,aliases:Object.freeze([...new Set(raw.aliases||[])]),imageUrl:image,sourceUrl:source.href,author:raw.author,license:Object.freeze({name:license.name,url:licenseUrl.href}),localFile,position:position(raw.position)});
  }
  const raw=window.ATLAS_PERSON_PORTRAITS;
  if(raw&&typeof raw==='object'&&!Array.isArray(raw))for(const [id,value] of Object.entries(raw)){const record=normalizeRecord(id,value);if(record)byId.set(id,record);}
  for(const [id,value] of Object.entries(legacy))if(!byId.has(id)){const record=normalizeRecord(id,value);if(record)byId.set(id,record);}
  const records=Object.freeze([...byId.values()]),byName=new Map();
  for(const record of records)for(const name of [record.name,...record.aliases]){const key=normalizeName(name);if(!key)continue;const found=byName.get(key);if(found===undefined)byName.set(key,record);else if(found&&found.personId!==record.personId)byName.set(key,null);}
  function resolve(subject){
    if(!subject)return null;
    if(typeof subject==='string')return byId.get(subject)||byName.get(normalizeName(subject))||null;
    if(typeof subject!=='object')return null;
    const id=subject.personId||subject.id;if(hasText(id)&&byId.has(id))return byId.get(id);
    for(const name of [subject.name,subject.nameKo,...(Array.isArray(subject.aliases)?subject.aliases:[])])if(hasText(name)){const record=byName.get(normalizeName(name));if(record)return record;}
    return null;
  }
  function pick(subjects){if(!Array.isArray(subjects))return null;for(const subject of subjects){const record=resolve(subject);if(record)return record;}return null;}
  function initials(name){const parts=String(name||'').replace(/[.’']/g,'').split(/\s+/).filter(Boolean);return((parts[0]?.[0]||'')+(parts.length>1?parts.at(-1)[0]:'')).toUpperCase();}
  const mounts=new WeakMap();
  function clear(container){const mounted=mounts.get(container);if(mounted)mounted();mounts.delete(container);container.replaceChildren();container.classList.remove('atlas-portrait-host','has-photo');for(const key of ['personId','portraitState','portraitSource'])delete container.dataset[key];container.removeAttribute('aria-busy');}
  function localSource(record){if(!record.localFile)return'';const embedded=window.ATLAS_EMBEDDED_IMAGES?.[record.localFile];return typeof embedded==='string'&&/^data:image\/(?:jpeg|png|webp|gif);base64,/i.test(embedded)?embedded:'assets/'+record.localFile;}
  function render(container,subject,options={}){
    clear(container);const record=resolve(subject),name=(subject&&typeof subject==='object'&&hasText(subject.name)?subject.name:record?.name)||(typeof subject==='string'?subject:'이름'),personId=record?.personId||(subject&&typeof subject==='object'&&subject.id)||'';
    container.classList.add('atlas-portrait-host');container.dataset.personId=personId;
    const fallback=document.createElement('div');fallback.className='atlas-portrait-fallback';
    const custom=typeof options.fallback==='function'?options.fallback():null;
    if(custom)fallback.append(custom);else{const text=document.createElement('span');text.textContent=initials(name);text.setAttribute('aria-hidden','true');fallback.append(text);}
    const fallbackLabel=options.fallbackLabel||name+' 이름 약자';fallback.setAttribute('role','img');fallback.setAttribute('aria-label',fallbackLabel);container.append(fallback);
    let alive=true,attempt=0,activeImage=null,removeHandlers=()=>{};
    const dispose=()=>{if(!alive)return;alive=false;attempt++;removeHandlers();};mounts.set(container,dispose);
    function state(value,kind){if(!alive)return;container.dataset.portraitState=value;container.dataset.portraitSource=kind||'none';container.classList.toggle('has-photo',value==='loaded');container.setAttribute('aria-busy',String(value==='loading'));if(value==='loaded'||value==='loading')fallback.setAttribute('aria-hidden','true');else fallback.removeAttribute('aria-hidden');if(value==='error')fallback.setAttribute('aria-label',options.fallbackLabel||name+' 사진을 불러오지 못해 이름 약자 표시');}
    if(!record){state('missing','none');return dispose;}
    const caption=options.caption?document.createElement('span'):null;if(caption){caption.className='atlas-portrait-caption';caption.textContent=options.caption===true?record.name:String(options.caption);container.append(caption);}
    function load(src,kind){
      const current=++attempt,img=document.createElement('img');let settled=false;activeImage=img;
      img.className='atlas-portrait-image';img.alt=record.name+' 인물 사진';img.loading=options.loading==='eager'?'eager':'lazy';img.decoding='async';img.referrerPolicy='no-referrer';img.draggable=false;img.style.objectPosition=record.position;
      const finish=loaded=>{
        if(!alive||settled||current!==attempt||activeImage!==img)return;settled=true;removeHandlers();
        if(loaded){state('loaded',kind);return;}
        img.remove();const local=kind==='remote'?localSource(record):'';if(local){load(local,'local');return;}state('error',kind);
      };
      const onLoad=()=>finish(true),onError=()=>finish(false);removeHandlers=()=>{img.removeEventListener('load',onLoad);img.removeEventListener('error',onError);};img.addEventListener('load',onLoad);img.addEventListener('error',onError);container.append(img);state('loading',kind);img.src=src;
    }
    load(record.imageUrl,'remote');return dispose;
  }
  function createAvatar(person,options={}){const box=document.createElement('div');box.className='person-avatar'+(options.className?' '+options.className:'');render(box,person,options);return box;}
  function credit(subject,options={}){
    const record=resolve(subject);if(!record)return null;const p=document.createElement('p');p.className='atlas-portrait-credit'+(options.className?' '+options.className:'');
    p.append(document.createTextNode((options.prefix||'인물 사진: ')+record.name+' · '+record.author+' · '));
    for(const [label,url] of [['원본 파일',record.sourceUrl],[record.license.name,record.license.url]]){const a=document.createElement('a');a.textContent=label;a.href=url;a.target='_blank';a.rel='noopener noreferrer';p.append(a,document.createTextNode(' · '));}
    p.append(document.createTextNode('화면에서 흑백·영역 맞춤 적용. 촬영 시점은 연구 연도와 별개입니다.'));return p;
  }
  function appendCredit(parent,subject,options){const p=credit(subject,options);if(p)parent.append(p);return p;}
  window.AtlasPortraits=Object.freeze({resolve,pick,normalizeName,initials,createAvatar,render,clear,credit,appendCredit,records,invalidEntries:Object.freeze(invalidEntries.slice())});
})();
