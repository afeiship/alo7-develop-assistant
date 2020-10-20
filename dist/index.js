/**
 *  name: @feizheng/alo7-develop-assistant
 *  description: Develop assistant for alo7.
 *  homepage: https://github.com/afeiship
 *  version: 1.0.33
 *  date: 2020-10-20T00:46:06.739Z
 *  license: MIT
 */

!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){$(document).ready(()=>{var t=document.URL,e=["1. 需要登录自己的 EHR","2. 使用F12打开开发者工具","3. 切换到 Console 这个 Tab","4. 刷新页面，等待统计结果"].join("<br/>");if(!t.includes("hr.saybot.net"))return!1;var n=nx.declare({statics:{help(){$.toast({icon:"info",heading:"EHR小助手",position:"top-right",stack:!1,hideAfter:5e4,text:e})}},methods:{start(){if(t.includes("/Alo7HR/login"))return!1;console.log("🍏 等待统计....");var e,n=this.params(),i=nx.rangeDate.apply(null,n),a=0;this.stat=[],Promise.all(i.map(t=>this.api(t))).then(t=>{a=t.reduce((t,e)=>{if(!e.length)return t;var n=e[0],i=e[e.length-1],a=this.sub(i.CARDTIME),o=new Date(i.CARDTIME)-new Date(n.CARDTIME)-a;return this.stat.push({"上班":n.CARDTIME,"下班":i.CARDTIME,"扣除":this.val(a),"实际工时":this.humanize(this.val(o))}),o+t},a),e=this.val(a),this.stat.push({"上班":"开始时间: "+n[0],"下班":"结束时间: "+n[1],"扣除":0,"实际工时":this.humanize(e)}),console.table(this.stat)})},val:t=>parseFloat(t/1e3/60/60).toFixed(2),humanize(t){var[e,n]=t.split(".");return`${e}小时${parseInt(60*parseFloat("0."+n))}分钟`},params(){var t=new Date,e=t.getFullYear(),n=t.getDate(),i=t.getMonth(),a=n<=15?0:1;return[`${e}-${i+a}-16`,`${e}-${i+a+1}-15`,!0]},sub(t){var[e,n]=t.split(" "),i=new Date(e+" 18:30:00"),a=new Date(e+" 19:30:00"),o=new Date(t);return o>a?72e5:o>i&&o<a?o-i+36e5:o<i?36e5:void 0},apiKey:()=>$(".essPolication2 .submenu li").eq(1).attr("id"),api(t){var e=`https://hr.saybot.net:8443/Alo7HR/ajax/function/alist!${this.apiKey()}.SE0302`;return gmsdk.http.post({url:e,data:{appParam:{TERM:t},appFnKey:"SE0301",formData:{}}})}}});n.help(),nx.waitToDisplay("#portal_ehr",1e3,t=>{(new n).start()})}),$(document).ready(()=>{if(!document.URL.includes("kellis-ng."))return!1;var t=nx.declare({methods:{start(){$(".alo7-layout-header .alo7-dropdown-trigger").after('<button id="copy-token" class="alo7-btn alo7-btn-primary">复制Token</button>'),this.attachEvents()},attachEvents(){$("#copy-token").click(()=>{var t=alo7Account.token;gmsdk.setClipboard(t),$.toast({icon:"success",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3})})}}});setTimeout(()=>{(new t).start()},1e3)});var t=/redmine.*\/issues\/(\d+)/,e={Bug:"fix",Task:"feat"},n=GM_getResourceText("JQ_TOAST");GM_addStyle(n),gmsdk.addStyle('\n    #git_msg{\n      display: flex;\n      align-items: center;\n      justify-content:space-between;\n      cursor: pointer;\n      background: #f9f9f9;\n      transition: all 0.3s;\n    }\n    #git_msg:hover {\n      border:1px solid #ccc;\n      background: #f1f1f1;\n    }\n    #git_msg:active{\n      background: #eee;\n    }\n\n    #git_msg>.left{\n      flex: 1;\n    }\n\n    #git_msg>.right{\n      text-align: right;\n      color: #999;\n      font-size: 12px;\n    }\n\n    .git_action{\n      display: inline-block;\n      width: auto;\n      min-width: 1em;\n      margin-top: 3px;\n      padding: 1px 8px;\n      border-radius: 3px;\n      color: #fff;\n      font-size: .86em;\n      font-weight: bold;\n      text-align: center;\n      text-transform: uppercase;\n    }\n\n\n    .git_action[data-git-action="feat"]{\n      background-color: #584492;\n    }\n\n    .git_action[data-git-action="fix"]{\n      background-color: #e74c3c;\n    }\n'),$(document).ready((function(){if(t.exec(location.href)){var n=$("#content h2").text(),[i,a]=n.split(" #"),o=$("#content h3").eq(0).text(),s=""+(e[i]||"feat"),r=`${o} - (REDMINE-${a})`;$("#content h2").after(`\n    <header id="git_msg" class="issue tracker-58 1-2 priority-4 priority-default details left">\n      <div class="left">\n        <span class="git_action" data-git-action="${s}">${s}</span>\n        :\n        <span class="git_msg">${r}</span>\n      </div>\n      <div class="right">\n        <span class="icon icon-copy">[ 点击/右键 ]</span> 可以复制内容到简体板\n      </div>\n    </header>\n  `),$("#content #git_msg").contextmenu((function(t){var e=r;t.preventDefault(),gmsdk.setClipboard(e),$.toast({icon:"info",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3,text:e})})),$("#content #git_msg").click((function(){var t=`${s}: ${r}`,e=$(".fixed-version").text();if(e.includes(".")){var n=e.split(":")[1].toLowerCase();t=`${s}(${n}): ${r}`}gmsdk.setClipboard(t),$.toast({icon:"success",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3,text:t})}))}})),$(document).ready(()=>{if($(".page-metadata .author").text().includes("Tinny Tao")){var t=$('h1:contains("功能描述")');t.css({display:"flex","align-items":"center","justify-content":"space-between"}),t.append('<button id="rnotes-copy" class="aui-button aui-button-primary">Release Notes</button>');var e=t.next(".table-wrap").find(".relative-table tbody tr"),n=[];e.each((t,e)=>{var i=$(e).find("td:eq(1)").text();i&&n.push(`${t}. ${i}`)}),$("#rnotes-copy").click(()=>{gmsdk.setClipboard(n.join("\n")),$.toast({icon:"success",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3})})}}),$(document).ready(()=>{gmsdk.addStyle("\n    #resources .circle-index{\n      padding: 5px;\n      background: #547e03;\n      color: #fff;\n      border-radius: 50px;\n    }\n    #resources .resource .heading > h2{\n      font-size: 14px;\n    }\n    .operations li .heading .options li{\n      display: flex;\n      align-items: center;\n    }\n    .operations li .heading .options li a{\n      margin-left: 10px;\n      width: 120px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      display: block;\n    }\n  "),setTimeout(()=>{$("#resources .resource .heading > h2").each((t,e)=>{var n="0"+(t+1);$(e).prepend(`<i class="circle-index">${n.slice(-2)}</i>`),$(e).append('<button class="clipboard items">Copy</button>')}),$(".operations li .heading .options li").prepend('<button class="clipboard item">Copy</button>'),$(".clipboard.item").click(t=>{var e=$(t.target).parents(".heading").find(".path").text().trim(),n=$(t.target).parents(".heading").find(".http_method a").text().trim();gmsdk.setClipboard(`['${n.toLowerCase()}', '${e}']`)}),$(".clipboard.items").click(t=>{var e=$(t.target).parents(".heading").next(".endpoints").find(".operation > div.heading > h3 > span.path").text().split("\n").map(t=>t.trim()).filter(Boolean);gmsdk.setClipboard(JSON.stringify(e,null,2))})},1e3)})}));
