import{a as u,S as f,i}from"./assets/vendor-rOMtvQ2t.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function o(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=o(r);fetch(r.href,a)}})();async function p(e){const o=`https://pixabay.com/api/?${new URLSearchParams({key:"51145498-f51992c20e23a6f6f425bd97f",q:e,image_type:"photo",orientation:"horizontal",max_width:320,max_height:200,safesearch:"true",per_page:9})}`;return await u.get(o).then(s=>s.data.hits).catch(s=>(console.error("Ошибка",s),[]))}const d=new f(".gallery a",{caption:!0,captionDelay:250}),m=document.querySelector(".gallery");function y(e){let t="";e.forEach(o=>{t+=`<li> 
      <a href= ${o.largeImageURL} class="large-img">
       <img src=${o.webformatURL} class="small-img" alt="${o.tags}">
       </a>
       <div class="under-image-info">
       <p> <span> Likes </span> <br> ${o.likes} </p>
       <p> <span> Views </span> <br> ${o.views} </p>
       <p> <span> Comments </span> <br> ${o.comments} </p>
       <p> <span> Downloads </span> <br> ${o.downloads} </p>
       </div>

    </li> `}),m.insertAdjacentHTML("beforeend",t),d.refresh()}function g(){const e=document.querySelector(".gallery");e&&(e.innerHTML="")}function h(){const e=document.querySelector(".loader");e&&(e.style.display="block")}function b(){const e=document.querySelector(".loader");e&&(e.style.display="none")}const c=document.querySelector(".form");let l="";c.addEventListener("submit",async function(e){e.preventDefault(),l=c.elements["search-text"].value,g();const t=await w();y(t)});async function w(){const e={position:"topRight",timeout:4e3,close:!0,progressBar:!0,icon:"fas fa-check",closeOnClick:!1,pauseOnHover:!0};try{h();const t=await p(l);return t.length===0?(i.warning({message:"Sorry, there are no images matching <br> your search query. Please try again!",color:"red",...e}),[]):t}catch(t){return i.error({message:`Oops, something went wrong! ${t}`,color:"red",...e}),[]}finally{b()}}
//# sourceMappingURL=index.js.map
