import {mountRecordTools} from './record-tools.mjs?v=a015cbb8dcce';
const mount=document.getElementById('learning-record');
const code=mount?.dataset.code??document.body.dataset.code;
mountRecordTools({code,mount,base:'../',kind:'theory'});
document.documentElement.dataset.ready='true';
