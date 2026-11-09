/* Shared header + footer. Edit links here once, every page updates. */
const NAV=[["index.html","Home"],["about.html","About"],["services.html","Services"],["testimonials.html","Testimonials"],["insights.html","Insights"],["packages.html","Packages"],["contact.html","Contact"],["work-with-me.html","Work With Me"]];
const EMAIL="elijah.carter.books@gmail.com";
const here=location.pathname.split("/").pop()||"index.html";
const links=NAV.map(([h,t])=>`<li><a href="${h}"${h===here?' aria-current="page"':''}>${t}</a></li>`).join("");
document.getElementById("site-header").innerHTML=`<a class="skip" href="#main">Skip to content</a><div class="wrap nav"><a class="brand" href="index.html" aria-label="Elijah Carter home"><img src="brand%20logo.png" alt="Elijah Carter"></a><button class="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span></button><ul class="menu" id="menu">${links}<li><a class="btn btn-gold" href="contact.html">Start a Project</a></li></ul></div>`;
document.getElementById("site-footer").innerHTML=`<div class="wrap"><div class="foot"><div><img src="brand%20logo.png" alt="Elijah Carter"><p>Elijah Carter is a Book Discovery Strategist helping authors build visibility, credibility and readership.</p></div><div><h3>Explore</h3><ul>${NAV.slice(0,6).map(([h,t])=>`<li><a href="${h}">${t}</a></li>`).join("")}</ul></div><div><h3>Get in touch</h3><ul><li><a href="mailto:${EMAIL}">${EMAIL}</a></li><li><a href="privacy.html">Privacy Policy</a></li><li><a href="terms.html">Terms and Conditions</a></li><li><a href="faq.html">FAQ</a></li></ul></div></div><div class="copy"><span>© ${new Date().getFullYear()} Elijah Carter. All rights reserved.</span><span>Book Discovery Strategist</span></div></div>`;
const burger=document.querySelector(".burger"),menu=document.getElementById("menu");
burger.addEventListener("click",()=>{const o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o)});
/* Reveal on scroll */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
/* Contact form -> Formspree */
const form=document.getElementById("contact-form");
if(form){const status=document.getElementById("form-status");
form.addEventListener("submit",async e=>{e.preventDefault();let ok=true;
form.querySelectorAll("[required]").forEach(f=>{const er=document.getElementById(f.id+"-err");const bad=!f.checkValidity();f.setAttribute("aria-invalid",bad);if(er)er.textContent=bad?(f.type==="email"?"Enter a valid email address.":"This field is required."):"";if(bad&&ok){f.focus();ok=false}});
if(!ok)return;
const btn=form.querySelector("button[type=submit]");btn.disabled=true;btn.textContent="Sending…";status.className="status";
try{const r=await fetch(form.action,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});
if(r.ok){form.reset();status.textContent="Thank you. Your enquiry has been sent, and I will reply by email.";status.className="status show ok"}
else{const d=await r.json().catch(()=>({}));throw new Error(d.errors?d.errors.map(x=>x.message).join(", "):"Send failed")}}
catch(err){status.innerHTML=`Your message could not be sent (${err.message}). Please try again or email <a href="mailto:${EMAIL}">${EMAIL}</a>.`;status.className="status show bad"}
btn.disabled=false;btn.textContent="Send enquiry"})}
/* Page transitions + prefill service from ?service= */
document.addEventListener("click",e=>{const a=e.target.closest("a[href]");if(!a||a.target||e.metaKey||e.ctrlKey||a.hasAttribute("download"))return;const u=new URL(a.href,location);if(u.origin!==location.origin||u.pathname===location.pathname)return;e.preventDefault();document.body.classList.add("leaving");setTimeout(()=>location.href=a.href,250)});
addEventListener("pageshow",()=>document.body.classList.remove("leaving"));
const sv=new URLSearchParams(location.search).get("service"),sel=document.getElementById("service");
if(sv&&sel){let o=[...sel.options].find(x=>x.text===sv);if(!o){o=new Option(sv,sv);sel.add(o)}sel.value=o.value}

/* Count-up stats */
document.querySelectorAll("[data-count]").forEach(el=>{const end=+el.dataset.count,suf=el.dataset.suffix||"";if(matchMedia("(prefers-reduced-motion:reduce)").matches)return;el.textContent="0"+suf;
new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();const t0=performance.now();(function f(t){const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)))+suf;if(p<1)requestAnimationFrame(f)})(t0)}},{threshold:.5}).observe(el)});