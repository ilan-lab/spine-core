const TP={START:{setup:295000,anc:.3,fixedNoPhysio:19336.25,physioCost:22100,physioMin:1},PROFESSIONAL:{setup:473000,anc:.8,fixedNoPhysio:43381.25,physioCost:22100,physioMin:1},PREMIUM:{setup:677000,anc:1.2,fixedNoPhysio:79141.25,physioCost:22100,physioMin:2}};
const C={discount:.05,anc_price:350,cons:8,card:.012,tpp:9,paid:.7,conv:.2,cpl:120,load:.5,cap:9};
const nis=v=>(v<0?"-":"")+Math.round(Math.abs(v)).toLocaleString("en-US")+" ₪";
const $=id=>document.getElementById(id);
function calc(){const P=TP[$("c-track").value];const d=Math.max(0,parseFloat($("c-daily").value)||0),p=Math.max(0,parseFloat($("c-price").value)||0),dm=Math.max(0,parseFloat($("c-days").value)||0);
const tx=d*dm,anc=tx*P.anc,grossD=tx*p*(1-C.discount),gross=grossD+anc*C.anc_price,net=gross/1.18;
const variable=(tx+anc)*C.cons+gross*C.card+(tx/C.tpp)*(C.paid/C.conv)*C.cpl;
const fte=Math.max(P.physioMin,Math.ceil(((d*(C.load+P.anc))/C.cap)*2)/2);const fixed=P.fixedNoPhysio+fte*P.physioCost;const e=net-variable-fixed;const m=e>0?P.setup/e:null;
$("r-gross").textContent=nis(gross);$("r-net").textContent=nis(net);$("r-e").textContent=nis(e);$("r-e").classList.toggle("p",e>=0);
$("r-m").textContent=m==null?"אין החזר":m.toLocaleString("en-US",{maximumFractionDigits:1,minimumFractionDigits:1})+" חודשים";
$("r-setup").textContent=nis(P.setup)+" ÷ EBITDA";$("r-fte").textContent=fte.toLocaleString("en-US",{maximumFractionDigits:1,minimumFractionDigits:1});}
[["c-daily","s-daily"],["c-price","s-price"],["c-days","s-days"]].forEach(([a,b])=>{$(a).addEventListener("input",()=>{$(b).value=$(a).value;calc()});$(b).addEventListener("input",()=>{$(a).value=$(b).value;calc()})});
$("c-track").addEventListener("change",calc);calc();
// chart
const E2={START:[54203,329923,564948],PROFESSIONAL:[-9084,246662,631856],PREMIUM:[-523201,-44755,460574]};const COL=["#9aa4a0","#3d6f99","#1f6b4f"];
const mx=700000,mn=-600000,rg=mx-mn,zero=(mx/rg)*100;const bars=$("bars");
Object.entries(E2).forEach(([k,vals])=>{const g=document.createElement("div");g.className="grp";let h='<div class="area"><div class="zero" style="top:'+zero+'%"></div>';
vals.forEach((v,i)=>{const hh=Math.abs(v)/rg*100;h+='<div class="col"><i class="'+(v<0?"n":"")+'" data-h="'+hh+'" style="background:'+COL[i]+';height:0;'+(v>=0?'bottom:'+(100-zero)+'%':'top:'+zero+'%')+'"></i><em style="'+(v>=0?'bottom:calc('+(100-zero+hh)+'% + 2px)':'top:calc('+(zero+hh)+'% + 2px)')+'">'+Math.round(v/1000)+'K</em></div>'});
g.innerHTML=h+'</div><b>'+k+'</b>';bars.appendChild(g)});
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");e.target.querySelectorAll("[data-h]").forEach(i=>i.style.height=i.dataset.h+"%");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));
const nav=document.querySelector("header.nav");const sc=()=>nav.classList.toggle("s",scrollY>40);addEventListener("scroll",sc,{passive:true});sc();
document.querySelectorAll(".tw table").forEach(t=>{const h=[...t.querySelectorAll("th")].map(x=>x.textContent);t.querySelectorAll("tbody tr").forEach(r=>[...r.children].forEach((td,i)=>td.dataset.l=h[i]))});
