/** Educational ordinary broadcast subnets, /8 through /30. No networking. */
function parseAddress(ip){
  if(typeof ip!=='string')throw new RangeError('IPv4 address required.');
  const parts=ip.trim().split('.');
  if(parts.length!==4||parts.some(x=>!/^\d{1,3}$/.test(x)||String(Number(x))!==x||Number(x)>255))throw new RangeError('Use four decimal octets from 0 to 255 without leading zeros.');
  return parts.reduce((value,part)=>value*256+Number(part),0);
}
const dotted=n=>[24,16,8,0].map(shift=>Math.floor(n/2**shift)%256).join('.');
const binary=n=>n.toString(2).padStart(32,'0');
export function calculateSubnet(ip,prefix){
  const ipInt=parseAddress(ip);
  if(!Number.isInteger(prefix)||prefix<8||prefix>30)throw new RangeError('This ordinary broadcast-subnet model supports /8 through /30.');
  const addressCount=2**(32-prefix),base=Math.floor(ipInt/addressCount)*addressCount,end=base+addressCount-1,maskInt=2**32-addressCount;
  return {ip:dotted(ipInt),prefix,ipInt,network:dotted(base),broadcast:dotted(end),mask:dotted(maskInt),firstHost:dotted(base+1),lastHost:dotted(end-1),addressCount,usableHosts:addressCount-2,networkBits:prefix,hostBits:32-prefix,isBoundary:ipInt===base||ipInt===end,ipBits:binary(ipInt),maskBits:binary(maskInt),networkBitsString:binary(base),broadcastBits:binary(end)};
}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function bitsRow(label,bits,prefix){
  return `<div class="ipv-bit-row"><strong>${label}</strong><div class="ipv-bit-octets">${[0,1,2,3].map(o=>`<div class="ipv-bit-octet">${[...bits.slice(o*8,o*8+8)].map((bit,i)=>`<span class="${o*8+i<prefix?'ipv-network-bit':'ipv-host-bit'}">${bit}</span>`).join('')}</div>`).join('')}</div></div>`;
}
export function mountNetwork(root=document){
  const panel=root.querySelector('[data-ipv-network]');if(!panel||panel.dataset.ipvMounted)return;panel.dataset.ipvMounted='true';
  const address=panel.querySelector('#ipv-address'),prefix=panel.querySelector('#ipv-prefix'),slider=panel.querySelector('#ipv-prefix-range'),error=panel.querySelector('#ipv-network-error');
  const render=()=>{
    let model;try{model=calculateSubnet(address.value,Number(prefix.value));}catch(e){error.hidden=false;error.textContent='주소는 0~255의 옥텟 4개로, 프리픽스는 8~30의 정수로 입력하세요. 아래 그림은 마지막 유효 입력입니다.';return;}
    error.hidden=true;slider.value=model.prefix;
    for(const key of ['mask','addressCount','usableHosts','hostBits'])panel.querySelector(`[data-net-output="${key}"]`).textContent=String(model[key]);
    panel.querySelector('[data-net-output="bits"]').innerHTML=bitsRow('IP 주소',model.ipBits,model.prefix)+bitsRow('서브넷 마스크',model.maskBits,model.prefix)+bitsRow('비트 AND 결과',model.networkBitsString,model.prefix);
    panel.querySelector('[data-net-output="prefix-note"]').textContent=`앞 ${model.prefix}비트는 네트워크 프리픽스(Network Prefix), 뒤 ${model.hostBits}비트는 호스트 부분(Host Part)입니다.`;
    const values=[['네트워크 주소 (Network Address)',model.network,'all host bits 0'],['첫 호스트 (First Host)',model.firstHost,'네트워크 + 1'],['마지막 호스트 (Last Host)',model.lastHost,'브로드캐스트 − 1'],['브로드캐스트 주소 (Broadcast Address)',model.broadcast,'all host bits 1']];
    panel.querySelector('[data-net-output="addresses"]').innerHTML=values.map(([label,value,note],i)=>`<div class="ipv-address-card ${i===0||i===3?'ipv-boundary':''}"><span>${label}</span><strong>${value}</strong><small>${note}</small></div>`).join('<span class="ipv-address-arrow" aria-hidden="true">→</span>');
    panel.querySelector('[data-net-output="formula"]').textContent=`주소 수 = 2^${model.hostBits} = ${model.addressCount.toLocaleString('en-US')} · 일반 호스트 수 = ${model.addressCount.toLocaleString('en-US')} − 2 = ${model.usableHosts.toLocaleString('en-US')}`;
    panel.querySelector('[data-net-output="status"]').textContent=`${model.ip}/${model.prefix} → 네트워크 ${model.network}, 브로드캐스트 ${model.broadcast}. ${model.isBoundary?'입력 주소 자체가 네트워크 또는 브로드캐스트 경계입니다.':'입력 주소는 이 모형의 호스트 범위 안에 있습니다.'} 실제 예약·할당 가능성은 별도입니다.`;
  };
  address.addEventListener('input',render);prefix.addEventListener('input',render);slider.addEventListener('input',()=>{prefix.value=slider.value;render();});
  panel.querySelector('[data-net-reset]').addEventListener('click',()=>{address.value='192.0.2.75';prefix.value='27';slider.value='27';render();});
  render();
}
