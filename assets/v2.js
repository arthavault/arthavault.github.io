(function(){
"use strict";
var C=window.ARTHAVAULT_SITE||{},D=document,$=function(s,r){return(r||D).querySelector(s)};
D.documentElement.classList.add('js');
/* official-host warning */
try{var h=location.hostname;if(h&&(C.officialHosts||[]).indexOf(h)<0){$('#offbar').hidden=false}}catch(e){}
/* mobile menu */
var bg=$('#burger'),mn=$('#menu');
if(bg)bg.addEventListener('click',function(){var o=mn.classList.toggle('open');bg.setAttribute('aria-expanded',o)});
if(mn)mn.addEventListener('click',function(e){if(e.target.tagName==='A'){mn.classList.remove('open');bg.setAttribute('aria-expanded','false')}});
/* progress + totop + active link */
var pr=$('#prog'),tt=$('#totop');
function sc(){var d=D.documentElement,m=d.scrollHeight-d.clientHeight;pr.style.width=(m>0?d.scrollTop/m*100:0)+'%';tt.hidden=d.scrollTop<700}
addEventListener('scroll',sc,{passive:true});sc();
tt.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
/* reveal */
var rv=D.querySelectorAll('.rv');
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});rv.forEach(function(n){io.observe(n)});
var links=[].slice.call(D.querySelectorAll('.menu a'));var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
links.forEach(function(a){var t=$(a.getAttribute('href'));if(t)so.observe(t)})}
else rv.forEach(function(n){n.classList.add('in')});
setTimeout(function(){rv.forEach(function(n){n.classList.add('in')})},4000);
/* lightbox */
var lb=$('#lb'),cur=0,G=window.GAL||[];
function T(k,f){return(window.AV_T&&window.AV_T(k))||f}
function show(i){cur=(i+G.length)%G.length;var g=G[cur];$('#lbimg').src='assets/shots/'+g.f+'.webp';$('#lbimg').alt='ARTHAVAULT '+g.t;$('#lbt').textContent=T(g.k,g.t);$('#lbd').textContent=T(g.dk,g.d)}
function open(i){show(i);if(lb.showModal)lb.showModal();else lb.setAttribute('open','')}
D.querySelectorAll('.gs').forEach(function(b){b.addEventListener('click',function(){open(+b.dataset.i)})});
$('#lbc').onclick=function(){lb.close()};$('#lbp').onclick=function(){show(cur-1)};$('#lbx').onclick=function(){show(cur+1)};
lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lbi'))lb.close()});
D.addEventListener('keydown',function(e){if(!lb.open)return;if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
var sx=null;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1));sx=null});
/* feedback form -> mailto */
var f=$('#fbf');
if(f){var m=$('#fm'),cc=$('#fc');m.addEventListener('input',function(){cc.textContent=m.value.length+' / 500'});
f.addEventListener('submit',function(e){e.preventDefault();var msg=m.value.trim(),out=$('#fmsg');
if(msg.length<10){out.textContent=T('ferr','Please write at least 10 characters.');m.focus();return}
var t=$('#ft').value,n=$('#fn').value.trim(),v=$('#fv').value.trim();
var sub='ARTHAVAULT '+t+(v?' (v'+v+')':'');
var body=msg+'\n\n---\nType: '+t+(n?'\nName: '+n:'')+(v?'\nApp version: '+v:'')+'\nSent from the ARTHAVAULT website';
location.href='mailto:'+(C.contactEmail||'contact.arthavault@gmail.com')+'?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent(body);
out.textContent=T('fok','Your email app should open. Press send there to deliver your message.')})}
/* download wiring */
function mb(n){return n?(n/1048576).toFixed(1)+' MB':''}
fetch(C.versionsUrl||'versions.json',{cache:'no-cache'}).then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){
var list=j.versions||j.releases||(Array.isArray(j)?j:[]);var L=null;
for(var i=0;i<list.length;i++){var s=(list[i].status||'').toLowerCase();if(s==='latest'||s==='recommended'){L=list[i];break}}
if(!L&&list.length)L=list[0];if(!L)return;
var url=C.apkUrlOverride||L.url||L.file||L.apk;
if(url)D.querySelectorAll('.js-dl').forEach(function(a){if(a.closest('.v2n')||a.closest('.f2'))return;a.href=url;a.setAttribute('download','')});
var bits=[T('vl','Latest version')+': '+(L.version||L.name||'')];
if(L.size)bits.push(typeof L.size==='number'?mb(L.size):L.size);else if(L.bytes)bits.push(mb(L.bytes));
if(L.sha256)bits.push('SHA-256: '+L.sha256);
$('#vinfo').textContent=bits.join(' · ')}).catch(function(){});
})();
