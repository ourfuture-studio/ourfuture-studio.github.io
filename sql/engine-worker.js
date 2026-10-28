/* sql.js 1.13.0; all SQL runs in an isolated browser worker. */
importScripts('vendor/sql-wasm.js');
const ready=initSqlJs({locateFile:file=>new URL('vendor/'+file,self.location.href).href});
let db=null,tables=[];
const LIMIT=200;
function quote(identifier){return '"'+identifier.replaceAll('"','""')+'"';}
function snapshot(){return tables.map(table=>{
  try {
    const result=db.exec('SELECT '+table.columns.map(quote).join(',')+' FROM '+quote(table.name)+' LIMIT '+(LIMIT+1));
    return {...table,columns:table.columns,values:result[0]?.values.slice(0,LIMIT)||[],truncated:(result[0]?.values.length||0)>LIMIT};
  }catch(error){return {...table,values:[],error:error.message};}
});}
function execute(sql){
  const output=[];
  for(const statement of db.iterateStatements(sql)){
    const columns=statement.getColumnNames();const values=[];let truncated=false;
    while(statement.step()){
      if(values.length<LIMIT)values.push(statement.get());else{truncated=true;break;}
    }
    if(columns.length)output.push({columns,values,truncated});
  }
  return output;
}
self.onmessage=async event=>{
  const {id,type,...payload}=event.data;
  try{
    const SQL=await ready;
    if(type==='init'){
      if(db)db.close();db=new SQL.Database();tables=payload.tables;
      db.run('PRAGMA foreign_keys=ON;');db.run(payload.schema);if(payload.setup)db.run(payload.setup);
      const version=db.exec('SELECT sqlite_version() AS version')[0].values[0][0];
      self.postMessage({id,ok:true,version,tables:snapshot()});
    }else if(type==='run'){
      if(!db)throw new Error('먼저 자료를 불러와 주세요.');
      try{const results=execute(payload.sql);let trace=null;if(payload.trace){try{trace={title:payload.trace.title,results:execute(payload.trace.sql)};}catch(error){trace={error:error.message};}}self.postMessage({id,ok:true,results,trace,tables:snapshot()});}
      catch(error){self.postMessage({id,ok:false,error:error.message,tables:snapshot()});}
    }else throw new Error('지원하지 않는 요청입니다.');
  }catch(error){self.postMessage({id,ok:false,error:error.message});}
};
