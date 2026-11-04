import {CATALOG} from './catalog.mjs?v=cedc4a26530a';
import {mountRecordTools} from './record-tools.mjs?v=a015cbb8dcce';
let current=null,currentCode=null;
function connect(code){
 if(code===currentCode||!CATALOG.some(r=>r.code===code))return;
 current?.unsubscribe();let mount=document.getElementById('learning-record');
 if(!mount){mount=document.createElement('div');mount.id='learning-record';const head=document.querySelector('main .intro')??document.querySelector('main')??document.body;head.append(mount)}
 current=mountRecordTools({code,mount,kind:'lab',includeLinks:true});
 currentCode=code;
}
const selector=document.getElementById('episode-select');
connect(new URLSearchParams(location.search).get('episode')??selector?.value??'E001');
selector?.addEventListener('change',event=>connect(event.currentTarget.value));
addEventListener('popstate',()=>connect(new URLSearchParams(location.search).get('episode')??selector?.value??'E001'));
addEventListener('sqld:episodechange',event=>connect(event.detail?.code));
