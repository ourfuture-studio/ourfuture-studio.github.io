/* A finite score identity derived from the four-case argument in Perceptrons,
 * Introduction §0.8. The optional product feature is authored here; no learning
 * procedure or full connectedness theorem is simulated. */
(function(){
  'use strict';
  const cases=Object.freeze([[0,0],[0,1],[1,0],[1,1]].map(([left,right])=>Object.freeze({id:String(left)+right,left,right,target:Number(left!==right)})));
  function evaluate(options){
    if(!options||!['local','joint'].includes(options.mode))throw new TypeError('Choose local or joint features.');
    for(const k of ['left','right','joint','threshold'])if(typeof options[k]!=='number'||!Number.isFinite(options[k]))throw new TypeError('Finite score parameters required.');
    const rows=cases.map(item=>{const product=item.left*item.right,score=options.left*item.left+options.right*item.right+(options.mode==='joint'?options.joint*product:0)-options.threshold;return{...item,product,score,output:Number(score>0),correct:Number(score>0)===item.target};});
    return{options:{...options},rows,correct:rows.filter(r=>r.correct).length,leftSum:rows[0].score+rows[3].score,rightSum:rows[1].score+rows[2].score,identityResidual:rows[0].score+rows[3].score-rows[1].score-rows[2].score,rawFeatureBound:3};
  }
  window.AtlasPapertPerceptronsModel=Object.freeze({cases,evaluate});
})();
