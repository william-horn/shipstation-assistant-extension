(()=>{"use strict";const a=()=>{const a=["Central Market - Huston","Etaly","Loco Pops","Farm to People","Ace Hardware"],o=Math.floor(23*Math.random()),t=Math.floor(10*Math.random());return{products:{Jar:{caseAmount:Math.floor(21*Math.random()),remaining:Math.floor(5*Math.random()),handlingCost:Math.floor(45*Math.random()),weight:Math.floor(97*Math.random())},Bar:{caseAmount:Math.floor(7*Math.random()),remaining:Math.floor(2*Math.random()),handlingCost:Math.floor(13*Math.random()),weight:Math.floor(23*Math.random())},Mini:{caseAmount:Math.floor(10*Math.random()),remaining:Math.floor(6*Math.random()),handlingCost:Math.floor(27*Math.random()),weight:Math.floor(45*Math.random())}},shippingCost:o,totalHandling:t,totalShipping:o+t,totalWeight:Math.floor(103*Math.random()),orderName:a[Math.floor(Math.random()*(a.length-1))]}};chrome.runtime.onMessage.addListener(((o,t,r)=>{r("parseOrder"===o.request?{status:200,payload:a()}:{status:200,payload:"Not Available"})}))})();