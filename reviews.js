(function(){
var list=document.getElementById('rv-list'),sum=document.getElementById('rv-sum');if(!list)return;
var limit=document.getElementById('rvf')?999:3;
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function stars(n){var o='';for(var i=1;i<=5;i++)o+=i<=n?'\u2605':'\u2606';return o}
fetch('reviews.json',{cache:'no-cache'}).then(function(r){return r.json()}).then(function(d){
var rs=(d.reviews||[]).filter(function(x){return x&&x.rating>=1&&x.rating<=5&&x.text}).slice(0,limit>3?200:100);
if(!rs.length){list.innerHTML='<p class="sub" style="text-align:center">No reviews yet. Be the first to write one.</p>';return}
var t=0;rs.forEach(function(x){t+=+x.rating});sum.textContent=(t/rs.length).toFixed(1)+' out of 5 \u00b7 '+rs.length+(rs.length===1?' review':' reviews');
list.innerHTML=rs.slice(0,limit).map(function(x){return '<article class="card rvc"><div class="rvs" aria-label="'+(+x.rating)+' out of 5">'+stars(+x.rating)+'</div><p>'+esc(String(x.text).slice(0,300))+'</p><div class="sub" style="margin:0;font-size:13px">'+esc(String(x.name||'User').slice(0,30))+(x.date?' \u00b7 '+esc(x.date):'')+'</div></article>'}).join('')
}).catch(function(){list.innerHTML='<p class="sub" style="text-align:center">Reviews could not be loaded.</p>'});
var f=document.getElementById('rvf');if(!f)return;var t=document.getElementById('rt'),c=document.getElementById('rc');
t.addEventListener('input',function(){c.textContent=t.value.length+' / 300'});
f.addEventListener('submit',function(e){e.preventDefault();var n=document.getElementById('rn').value.trim(),r=document.getElementById('rr').value,x=t.value.trim(),m=document.getElementById('rm');
if(n.length<2){m.textContent='Please enter your name or nickname.';return}
if(x.length<10){m.textContent='Please write at least 10 characters.';return}
var sub='ARTHAVAULT Review - '+r+' stars',body='Name: '+n+'\nRating: '+r+'/5\n\nReview:\n'+x+'\n\n(I agree that my name, rating and review text may be shown on the ARTHAVAULT website.)';
m.textContent='Opening your email app... Please press Send.';location.href='mailto:contact.arthavault@gmail.com?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent(body)})})();
