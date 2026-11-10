/* Modern untyped lambda notation. Pure, bounded, capture-avoiding normal-order steps.
 * AST: {type:'var',name}, {type:'lam',param,body}, {type:'app',fn,arg}.
 * Paths contain 'body', 'fn', 'arg'. Alpha-renaming is shown as its own step.
 * This engine is broader than the variable-occurrence restriction in Church 1936 §2.
 */
(function(){
  'use strict';
  const limits=Object.freeze({inputLength:4096,tokens:2048,nodes:2048,depth:128,steps:256,numeral:32});
  const name=value=>typeof value==='string'&&/^[A-Za-z_][A-Za-z0-9_']{0,39}$/.test(value);
  const object=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
  const keys=(value,allowed)=>object(value)&&Reflect.ownKeys(value).every(key=>typeof key==='string'&&allowed.includes(key));
  function freeze(value){if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.values(value).forEach(freeze);Object.freeze(value);}return value;}
  function sizeError(){const e=new RangeError('식이 화면에서 다룰 수 있는 크기나 깊이를 넘었습니다.');e.code='TERM_SIZE_LIMIT';return e;}
  function checkSize(state,depth){if(++state.nodes>limits.nodes||depth>limits.depth)throw sizeError();}
  function read(value,state={nodes:0,active:new WeakSet()},depth=0){
    checkSize(state,depth);
    if(!object(value)||state.active.has(value))throw new TypeError('순환하지 않는 λ식 AST가 필요합니다.');
    state.active.add(value);let result;
    if(value.type==='var'&&keys(value,['type','name'])&&name(value.name))result={type:'var',name:value.name};
    else if(value.type==='lam'&&keys(value,['type','param','body'])&&name(value.param))result={type:'lam',param:value.param,body:read(value.body,state,depth+1)};
    else if(value.type==='app'&&keys(value,['type','fn','arg']))result={type:'app',fn:read(value.fn,state,depth+1),arg:read(value.arg,state,depth+1)};
    else throw new TypeError('변수·추상화·적용으로 구성된 λ식 AST가 필요합니다.');
    state.active.delete(value);return result;
  }
  function parse(text){
    if(typeof text!=='string'||!text.trim())throw new SyntaxError('λ식을 입력해 주세요.');
    if(text.length>limits.inputLength)throw sizeError();
    const tokens=[];let position=0;
    while(position<text.length){
      const char=text[position];if(/\s/.test(char)){position++;continue;}
      if('λ\\.()'.includes(char)){tokens.push({value:char==='\\'?'λ':char,at:position++});}
      else{const token=/^[A-Za-z_][A-Za-z0-9_']*/.exec(text.slice(position));if(!token||!name(token[0]))throw new SyntaxError((position+1)+'번째 위치에 변수 또는 λ·점·괄호가 필요합니다.');tokens.push({value:token[0],at:position});position+=token[0].length;}
      if(tokens.length>limits.tokens)throw sizeError();
    }
    let index=0;
    const peek=()=>tokens[index]?.value;
    const syntax=message=>{throw new SyntaxError(message+' ('+(tokens[index]?.at+1||text.length+1)+'번째 위치)');};
    function term(depth=0){
      if(depth>limits.depth)throw sizeError();
      if(peek()==='λ'){
        index++;const params=[];while(name(peek()))params.push(tokens[index++].value);
        if(!params.length)syntax('λ 뒤에 변수 이름이 필요합니다.');if(peek()!=='.')syntax('변수 뒤에 점이 필요합니다.');index++;
        let body=term(depth+params.length);for(let i=params.length-1;i>=0;i--)body={type:'lam',param:params[i],body};return body;
      }
      let current=atom(depth+1);
      while(name(peek())||peek()==='(')current={type:'app',fn:current,arg:atom(depth+1)};
      return current;
    }
    function atom(depth){
      if(depth>limits.depth)throw sizeError();
      if(name(peek()))return{type:'var',name:tokens[index++].value};
      if(peek()==='('){index++;const body=term(depth+1);if(peek()!==')')syntax('닫는 괄호가 필요합니다.');index++;return body;}
      syntax('변수 또는 괄호로 묶은 식이 필요합니다.');
    }
    const result=term();if(index!==tokens.length)syntax('식을 끝까지 읽을 수 없습니다.');return freeze(read(result));
  }
  function formatRaw(term,precedence=0){
    if(term.type==='var')return term.name;
    if(term.type==='lam'){const text='λ'+term.param+'. '+formatRaw(term.body);return precedence>0?'('+text+')':text;}
    const text=formatRaw(term.fn,1)+' '+formatRaw(term.arg,2);return precedence>1?'('+text+')':text;
  }
  const format=term=>formatRaw(read(term));
  function freeSet(term,bound=new Set(),result=new Set()){
    if(term.type==='var'){if(!bound.has(term.name))result.add(term.name);}
    else if(term.type==='lam'){const inner=new Set(bound);inner.add(term.param);freeSet(term.body,inner,result);}
    else{freeSet(term.fn,bound,result);freeSet(term.arg,bound,result);}return result;
  }
  const freeVariables=term=>Object.freeze([...freeSet(read(term))].sort());
  function allNames(term,result=new Set()){
    if(term.type==='var')result.add(term.name);else if(term.type==='lam'){result.add(term.param);allNames(term.body,result);}else{allNames(term.fn,result);allNames(term.arg,result);}return result;
  }
  function findRedex(term,path=[]){
    if(term.type==='app'){if(term.fn.type==='lam')return{term,path};return findRedex(term.fn,path.concat('fn'))||findRedex(term.arg,path.concat('arg'));}
    if(term.type==='lam')return findRedex(term.body,path.concat('body'));return null;
  }
  function firstCapture(term,variable,argumentFree,path=[]){
    if(term.type==='var')return null;
    if(term.type==='app')return firstCapture(term.fn,variable,argumentFree,path.concat('fn'))||firstCapture(term.arg,variable,argumentFree,path.concat('arg'));
    if(term.param===variable)return null;
    if(argumentFree.has(term.param)&&freeSet(term.body).has(variable))return{term,path};
    return firstCapture(term.body,variable,argumentFree,path.concat('body'));
  }
  function renameBound(term,from,to){
    if(term.type==='var')return{type:'var',name:term.name===from?to:term.name};
    if(term.type==='lam')return{type:'lam',param:term.param,body:term.param===from?term.body:renameBound(term.body,from,to)};
    return{type:'app',fn:renameBound(term.fn,from,to),arg:renameBound(term.arg,from,to)};
  }
  function replaceAt(term,path,replacement){
    if(!path.length)return replacement;const [part,...rest]=path;
    if(term.type==='lam')return{type:'lam',param:term.param,body:replaceAt(term.body,rest,replacement)};
    return{type:'app',fn:part==='fn'?replaceAt(term.fn,rest,replacement):term.fn,arg:part==='arg'?replaceAt(term.arg,rest,replacement):term.arg};
  }
  function occurrences(term,variable,path=[],result=[]){
    if(term.type==='var'){if(term.name===variable)result.push(path);}
    else if(term.type==='lam'){if(term.param!==variable)occurrences(term.body,variable,path.concat('body'),result);}
    else{occurrences(term.fn,variable,path.concat('fn'),result);occurrences(term.arg,variable,path.concat('arg'),result);}return result;
  }
  function copyBudget(term,state,depth){
    checkSize(state,depth);
    if(term.type==='var')return{type:'var',name:term.name};
    if(term.type==='lam')return{type:'lam',param:term.param,body:copyBudget(term.body,state,depth+1)};
    return{type:'app',fn:copyBudget(term.fn,state,depth+1),arg:copyBudget(term.arg,state,depth+1)};
  }
  function substitute(term,variable,argument,state={nodes:0},depth=0){
    if(term.type==='var'&&term.name===variable)return copyBudget(argument,state,depth);
    if(term.type==='lam'&&term.param===variable)return copyBudget(term,state,depth);
    checkSize(state,depth);
    if(term.type==='var')return{type:'var',name:term.name};
    if(term.type==='lam')return{type:'lam',param:term.param,body:substitute(term.body,variable,argument,state,depth+1)};
    return{type:'app',fn:substitute(term.fn,variable,argument,state,depth+1),arg:substitute(term.arg,variable,argument,state,depth+1)};
  }
  function freshName(from,used){let index=1,candidate;const base=from.slice(0,32);do{candidate=base+index++;}while(used.has(candidate));return candidate;}
  function stepRaw(before){
    const redex=findRedex(before);if(!redex)return null;
    const fn=redex.term.fn,argument=redex.term.arg,variable=fn.param;
    const capture=firstCapture(fn.body,variable,freeSet(argument));
    const occurrencePaths=occurrences(fn.body,variable).map(path=>redex.path.concat(['fn','body'],path));
    const common={before,redexPath:redex.path,binder:variable,applicationBinder:variable,argument,body:fn.body,substitution:{variable,replacement:argument,occurrencePaths}};
    if(capture){
      const from=capture.term.param,to=freshName(from,allNames(before)),path=redex.path.concat(['fn','body'],capture.path);
      const replacement={type:'lam',param:to,body:renameBound(capture.term.body,from,to)};
      const after=read(replaceAt(before,path,replacement));
      return freeze({...common,after,rule:'alpha',path,renamed:{from,to,path}});
    }
    const replacement=substitute(fn.body,variable,argument),after=read(replaceAt(before,redex.path,replacement));
    return freeze({...common,after,rule:'beta',path:redex.path});
  }
  function step(term){return stepRaw(freeze(read(term)));}
  function trace(term,options={}){
    if(!keys(options,['limit']))throw new TypeError('limit 설정만 사용할 수 있습니다.');
    const limit=options.limit===undefined?24:options.limit;if(!Number.isInteger(limit)||limit<0||limit>limits.steps)throw new RangeError('단계 수는 0–'+limits.steps+' 범위의 정수여야 합니다.');
    const initial=freeze(read(term)),steps=[];let current=initial,status='normal-form';
    for(let i=0;i<limit;i++){
      let next;try{next=stepRaw(current);}catch(error){if(error.code!=='TERM_SIZE_LIMIT')throw error;status='size-limit';break;}
      if(!next)break;steps.push(next);current=next.after;
    }
    if(status!=='size-limit'&&findRedex(current))status='step-limit';
    return freeze({initial,steps,term:current,status,limit});
  }
  function variable(value){return freeze(read({type:'var',name:value}));}
  function abstraction(param,body){return freeze(read({type:'lam',param,body}));}
  function application(fn,arg){return freeze(read({type:'app',fn,arg}));}
  function numeral(n){if(!Number.isInteger(n)||n<0||n>limits.numeral)throw new RangeError('수 표현은 0–'+limits.numeral+' 범위의 정수만 만들 수 있습니다.');let body={type:'var',name:'x'};for(let i=0;i<n;i++)body={type:'app',fn:{type:'var',name:'f'},arg:body};return freeze(read({type:'lam',param:'f',body:{type:'lam',param:'x',body}}));}
  const successor=()=>parse('λn. λf. λx. f (n f x)');
  const examples=Object.freeze({identity:'(λx. x) a',duplication:'(λx. x x) (λy. y)',capture:'(λx. λy. x y) y',successor:'(λn. λf. λx. f (n f x)) (λf. λx. f x)',omega:'(λx. x x) (λx. x x)'});
  window.AtlasChurchLambda=Object.freeze({parse,format,freeVariables,step,trace,variable,abstraction,application,numeral,successor,examples,limits});
})();
