/**
 *  name: @jswork/alo7-develop-assistant
 *  description: Develop assistant for alo7.
 *  homepage: https://github.com/afeiship
 *  version: 1.0.75
 *  date: 2022-06-27T10:35:20.107Z
 *  license: MIT
 */

!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){$(document).ready(()=>{if(!document.URL.includes("bio-platform-frontend.beta"))return!1;var t=nx.declare({properties:{devUrl:{set:function(t){localStorage.setItem("__dev_url__",t)},get:function(){return localStorage.getItem("__dev_url__")}}},methods:{start(){this.iniEvents(),this.initElements(),this.syncIframe()},iniEvents(){var t=this;$("body").on("submit",'[data-action="form"]',(function(e){e.preventDefault(),t.inject()})),$("body").on("input",'[data-action="input"]',(function(e){t.devUrl=e.target.value})),$("body").on("click",'[data-action="reset"]',(function(t){console.log("click reset.",t),localStorage.removeItem("__dev_url__"),window.location.reload()}))},initElements(){$('[class^="Header___StyledHeader"]').prepend(`\n          <form class="gm-row gm-row-center" data-role="form">\n            <input type="text" data-action="input" value="${this.devUrl}" class="gm-form-control" placeholder="请输入你的开发URL地址">\n            <button style="margin-left: 10px" class="gm-btn gm-btn-primary is-large" data-action="inject">注入URL</button>\n            <button type="button" style="margin-left: 10px" class="gm-btn gm-btn-default is-large" data-action="reset">重置</button>\n          </form>\n        `)},syncIframe(){this.devUrl&&(document.querySelector("iframe").src=this.devUrl)},inject(){const t=document.querySelector('[data-action="input"]');this.devUrl=t.value,this.syncIframe(),window.location.reload()}}});nx.waitToDisplay("iframe",1e3,()=>{(new t).start()})})}));
