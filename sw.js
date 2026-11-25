const C='pi-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icon-192.png','icon-512.png'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
e.respondWith(caches.open(C).then(async c=>{const m=await c.match(r),n=fetch(r).then(x=>{if(x.ok)c.put(r,x.clone());return x}).catch(()=>m);return r.mode==='navigate'?(n.then(x=>x||m)):(m||n)}))});
