/**
 *  name: @jswork/alo7-develop-assistant
 *  description: Develop assistant for alo7.
 *  homepage: https://github.com/afeiship
 *  version: 1.0.75
 *  date: 2022-06-27T09:58:54.193Z
 *  license: MIT
 */

!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){$(document).ready(()=>{if(!document.URL.includes("bio-platform-frontend.beta"))return!1;var t=nx.declare({methods:{start(){this.iniEvents(),this.initElements(),this.syncIframe()},iniEvents(){var t=this;$("body").on("submit",'[data-action="form"]',(function(e){e.preventDefault(),t.inject()})),$("body").on("input","#dev-input",(function(t){localStorage.setItem("__dev_url__",t.target.value)})),$("body").on("click",'[data-action="reset"]',(function(t){console.log("click reset.",t),localStorage.removeItem("__dev_url__"),window.location.reload()}))},initElements(){const t=localStorage.getItem("__dev_url__");$('[class^="Header___StyledHeader"]').prepend(`\n          <form class="gm-row gm-row-center" data-role="form">\n            <input type="text" id="dev-input" value="${t}" class="gm-form-control" placeholder="请输入你的开发URL地址">\n            <button style="margin-left: 10px" class="gm-btn gm-btn-primary is-large" data-action="inject">注入URL</button>\n            <button type="button" style="margin-left: 10px" class="gm-btn gm-btn-default is-large" data-action="reset">重置</button>\n          </form>\n        `)},syncIframe(){const t=localStorage.getItem("__dev_url__");t&&(document.querySelector("iframe").src=t)},inject(){const t=document.getElementById("dev-input");localStorage.setItem("__dev_url__",t.value),this.syncIframe(),window.location.reload()}}});nx.waitToDisplay("iframe",1e3,e=>{(new t).start()})})}));
