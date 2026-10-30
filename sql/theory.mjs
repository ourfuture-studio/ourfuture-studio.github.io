import {mountRecordTools} from './record-tools.mjs';
const mount=document.getElementById('learning-record');
const code=mount?.dataset.code??document.body.dataset.code;
mountRecordTools({code,mount,base:'../',kind:'theory'});
document.documentElement.dataset.ready='true';
