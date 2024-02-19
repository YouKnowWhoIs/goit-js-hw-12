import{S,a as b,i as m}from"./assets/vendor-64b55ca9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const E=document.querySelector(".gallery");function A(t){const r=t.hits.map(f).join("");E.innerHTML=r,document.querySelectorAll(".gallery-link").forEach(e=>{e.setAttribute("href",e.querySelector("img").getAttribute("src"))}),new S(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}function f(t){const{largeImageURL:r,webformatURL:s,tags:a,likes:e,views:o,comments:i,downloads:u}=t;return`<li class="gallery-item" >
    <a class="gallery-link" href="${r}">
      <img
        class="gallery-image"
        src="${s}"
        alt="${a}"
      />
    </a>
    <div class="item-text">
      <ul>Likes<li>${e}</li></ul>
      <ul>Views<li>${o}</li></ul>
      <ul>Comments<li>${i}</li></ul>
      <ul>Downloads<li>${u}</li></ul>
    </div>
  </li>`}function q(t){return t.map(f).join("")}const $=document.querySelector(".loader");async function y(t,r){const s="https://pixabay.com/api/",a="42272316-28c697ce0580eb37211383c7d",u=`${s}?key=${a}&image_type=photo&orientation=horizontal&safesearch=true`,L={key:a,q:t,per_page:15,page:r};try{const n=await b.get(u,{params:L});return n.data&&n.data.hits&&n.data.hits.length>0?A(n.data):m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),n.data}catch(n){console.error("Error:",n)}finally{$.style.display="none"}}const I=document.querySelector(".form"),g=document.querySelector(".gallery"),w=document.querySelector(".loader"),d=document.querySelector(".load_button");I.addEventListener("submit",T);d.addEventListener("click",O);let c,l,p;async function T(t){if(t.preventDefault(),c=t.target.elements.query.value.trim(),l=1,c==="")return m.error({message:"Please enter a search query.",position:"topRight"});w.style.display="inline-block",g.innerHTML="";const r=await y(c,l);console.log(r),p=Math.ceil(r.totalHits/15),h(),t.target.reset()}async function O(){l+=1;const t=await y(c,l);P(t.articles),h()}function P(t){const r=q(t);g.insertAdjacentHTML("beforeend",r)}function R(){d.classList.remove("hidden")}function k(){d.classList.add("hidden")}function h(){l>=p?k():R()}
//# sourceMappingURL=commonHelpers.js.map
