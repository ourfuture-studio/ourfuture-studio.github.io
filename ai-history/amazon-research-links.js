/* Reading paths, not claims that these systems were deployed together. */
(function(){
  'use strict';
  const records=[...(window.TIMELINE_DATA||[]),...(window.ATLAS_PEOPLE_PROFILES||[]).flatMap(p=>p.works||[])];
  const paths=[
    ['amazon-item-to-item-2003','amazon-dsstne-spark-2016'],
    ['amazon-deepar-2017','aws-chronos-2024'],
    ['kiva-warehouse-coordination-2008','amazon-deepfleet-2025']
  ];
  for(const [a,b] of paths)for(const [from,to] of [[a,b],[b,a]]){
    if(!records.some(w=>w.id===to))throw Error('Missing Amazon reading path: '+to);
    for(const w of records.filter(w=>w.id===from))w.related=[...new Set([...(w.related||[]),to])];
  }
})();
