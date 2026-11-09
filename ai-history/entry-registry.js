/* A card's content and its visual stay independent of the shared view. */
(function(){
  'use strict';
  const entries=new Map(),visuals=new Map();
  window.AtlasEntries={
    register(entry){
      if(!entry?.id||entries.has(entry.id))throw new Error('Missing or duplicate entry: '+entry?.id);
      if(!entry.content?.article)throw new Error('Missing article: '+entry.id);
      entries.set(entry.id,entry);
    },
    applyTo(events,profiles){
      for(const [id,entry] of entries){
        const event=events.find(e=>e.id===id);if(!event)throw new Error('Entry has no timeline target: '+id);
        Object.assign(event,entry.record,{content:entry.content});
        for(const p of profiles)for(const work of p.works||[])if((work.eventId||work.id)===id){
          work.summary=event.summary;work.caveat=event.caveat;work.content=entry.content;
          for(const field of ['year','dateLabel','people','sources','authorNote','track'])if(Object.hasOwn(entry.record||{},field))work[field]=event[field];
          if(Object.hasOwn(entry.record||{},'subtitle'))work.title=event.subtitle;
        }
      }
    },
    get:id=>entries.get(id),get all(){return [...entries.values()];}
  };
  window.AtlasVisuals={
    register(id,visual){if(visuals.has(id))throw new Error('Duplicate visual: '+id);visuals.set(id,visual);},
    get:id=>visuals.get(id),has:id=>visuals.has(id)
  };
})();
