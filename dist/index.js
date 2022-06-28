/**
 *  name: @jswork/alo7-develop-assistant
 *  description: Develop assistant for alo7.
 *  homepage: https://github.com/afeiship
 *  version: 1.0.78
 *  date: 2022-06-28T07:50:33.751Z
 *  license: MIT
 */

!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){$(document).ready(()=>{if(!document.URL.includes("bio-platform-frontend.beta"))return!1;var t=nx.declare({properties:{devUrl:{set:function(t){localStorage.setItem("gm.dev_url",t)},get:function(){return localStorage.getItem("gm.dev_url")||""}},ifm:function(){return document.querySelector("iframe")}},methods:{start(){this.iniEvents(),this.initElements(),this.syncIframe()},iniEvents(){var t=this;$("body").on("submit",'[data-action="submit"]',(function(n){n.preventDefault(),t.inject()})),$("body").on("dblclick",'[data-action="input"]',(function(t){this.select()})),$("body").on("click",'[data-action="get-iframe"]',(function(n){gmsdk.setClipboard(t.ifm.src),$.toast({icon:"success",heading:"已为你复制到剪贴板",position:"top-right",stack:!1,hideAfter:1e3})})),$("body").on("click",'[data-action="token"]',(function(t){gmsdk.setClipboard(localStorage.getItem("COMMON_SSO_TOKEN")),$.toast({icon:"success",heading:"已为你复制到剪贴板",position:"top-right",stack:!1,hideAfter:1e3})})),$("body").on("input",'[data-action="input"]',(function(n){t.devUrl=n.target.value})),$("body").on("click",'[data-action="reset"]',(function(t){localStorage.removeItem("gm.dev_url"),window.location.reload()}))},initElements(){$('[class^="Header___StyledHeader"]').prepend(`\n          <form class="gm-row gm-row-center ml-10_ ml_" data-action="submit">\n            <span class="gm-tag gm-tag-positive">v 1.0.78</span>\n            <input type="search" data-action="input" value="${this.devUrl}" class="gm-form-control" placeholder="请输入你的开发URL地址">\n            <button class="gm-btn gm-btn-primary is-large" data-action="inject">注入URL</button>\n            <button type="button" class="gm-btn gm-btn-default is-large" data-action="reset">重置</button>\n            <button type="button" class="gm-btn gm-btn-default is-large" data-action="get-iframe">获取iframe地址</button>\n            <button type="button" class="gm-btn gm-btn-warning is-large" data-action="token">获取TOKEN</button>\n          </form>\n        `)},syncIframe(){this.devUrl&&(this.ifm.src=this.devUrl)},inject(){const t=document.querySelector('[data-action="input"]');this.devUrl=t.value,this.syncIframe(),window.location.reload()}}});nx.waitToDisplay("iframe",1e3,()=>{(new t).start()})})}));
