/* Python executes inside a worker so the page remains responsive. */
let python;
const base = 'https://cdn.jsdelivr.net/pyodide/v0.28.3/full/';
async function prepare(code) {
  if (!python) {
    postMessage({type:'phase',text:'처음 실행 준비 중입니다. Python 도구를 내려받습니다.'});
    importScripts(base+'pyodide.js');
    python=await loadPyodide({indexURL:base});
  }
  postMessage({type:'phase',text:'코드에 필요한 계산 도구를 준비합니다.'});
  await python.loadPackagesFromImports(code);
}
onmessage=async ({data})=>{
  let scope;
  try {
    await prepare(data.codes.join('\n'));
    postMessage({type:'phase',text:'입력한 Python 코드를 실행합니다.'});
    scope=python.runPython('dict(__name__="__main__")');
    const results=[];
    for (let i=0;i<data.codes.length;i++) {
      let output='';
      python.setStdout({batched:s=>{output+=s+'\n';}});
      python.setStderr({batched:s=>{output+=s+'\n';}});
      try {
        await python.runPythonAsync(data.codes[i],{globals:scope});
        results.push({index:i,text:output||'실행했습니다. 출력할 값은 없습니다.',error:false});
      } catch (error) {
        results.push({index:i,text:output+String(error),error:true});
        postMessage({type:'result',results,failed:true});
        return;
      }
    }
    let homework=null;
    if(data.check) {
      const value=scope.get('homework');
      homework=value?.toJs?value.toJs():value;
      if(value?.destroy)value.destroy();
    }
    postMessage({type:'result',results,homework,failed:false});
  } catch(error) {
    postMessage({type:'failure',text:String(error)});
  } finally {if(scope)scope.destroy();}
};
