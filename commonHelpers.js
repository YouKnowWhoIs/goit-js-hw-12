import{i as a,a as y,S as b}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const L=document.querySelector(".form"),g=document.querySelector(".gallery"),w=document.querySelector("input"),p=document.querySelector(".load_button"),f=document.querySelector(".loader");let n,u="",d=1;L.addEventListener("submit",S);p.addEventListener("click",v);async function S(r){if(r.preventDefault(),u=w.value.trim(),n=1,!u)return a.error({message:"Please enter a search query.",position:"topRight"});g.innerHTML="";try{await h()}catch(o){console.error(o),a.error({message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}m(),r.target.reset()}async function v(){n+=1,m();try{await h()}catch(o){console.error(o),a.error({message:"An error occurred while fetching images. Please try again later.",position:"topRight"})}const r=g.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"}),m()}async function h(){P();const r="42288638-d7f8a30b0a31b090439479823",o=15,c=`https://pixabay.com/api/?key=${r}&q=${u}&image_type=photo&orientation=horizontal&safesearch=true&page=${n}&per_page=${o}`;try{const e=(await y.get(c)).data;if(d=Math.ceil(e.totalHits/o)||1,e.hits.length===0)a.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});else{const t=e.hits.map(i=>`<li class="gallery-item" >
    <a class="gallery-link" href="${i.largeImageURL}">
      <img
        class="gallery-image"
        src="${i.webformatURL}"
        alt="${i.tags}"
      />
    </a>
    <div class="item-text">
      <ul>Likes<li>${i.likes}</li></ul>
      <ul>Views<li>${i.views}</li></ul>
      <ul>Comments<li>${i.comments}</li></ul>
      <ul>Downloads<li>${i.downloads}</li></ul>
    </div>
  </li>`).join("");g.insertAdjacentHTML("beforeend",t),new b(".gallery a",{captions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",fadeSpeed:150,captionSelector:"img",captionDelay:250}).on("show.simplelightbox").refresh(),$(),n>=d&&a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}}catch(s){throw new Error(s.message)}}function P(){f.style.display="inline-block"}function $(){f.style.display="none"}function q(){p.classList.remove("hidden")}function x(){p.classList.add("hidden")}function m(){n>=d?x():q()}
//# sourceMappingURL=commonHelpers.js.map
