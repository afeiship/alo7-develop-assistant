/**
 *  name: @feizheng/alo7-develop-assistant
 *  description: Develop assistant for alo7.
 *  homepage: https://github.com/afeiship
 *  version: 1.0.18
 *  date: 2020-10-13T08:31:48.121Z
 *  license: MIT
 */

!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){var t;t=new(nx.declare({methods:{start(){if(!document.URL.includes("hr.saybot.net"))return!1;console.log("☘️ 等待统计....");var t,n=this.params(),e=nx.rangeDate.apply(null,n),i=0;this.stat=[],Promise.all(e.map(t=>this.api(t))).then(e=>{i=e.reduce((t,n)=>{if(!n.length)return t;var e=n[0],i=n[n.length-1],a=this.sub(i.CARDTIME),s=new Date(i.CARDTIME)-new Date(e.CARDTIME)-a;return this.stat.push({start:e.CARDTIME,end:i.CARDTIME,sub:(a/1e3/60).toFixed(2),duration:(s/1e3/60/60).toFixed(2)}),s+t},i),t=(i/1e3/60/60).toFixed(2),this.stat.push({start:"开始时间: "+n[0],end:"结束时间: "+n[1],sub:0,duration:t}),console.table(this.stat)})},params(){var t=new Date,n=t.getFullYear(),e=t.getMonth();return[`${n}-${e}-16`,`${n}-${e+1}-15`,!0]},sub(t){var[n,e]=t.split(" "),i=new Date(n+" 18:30:00"),a=new Date(n+" 19:30:00"),s=new Date(t);return s>a?72e5:s>i&&s<a?s-i:s<i?36e5:void 0},apiKey:()=>$(".essPolication2 .submenu li").eq(1).attr("id"),api(t){var n=`https://hr.saybot.net:8443/Alo7HR/ajax/function/alist!${this.apiKey()}.SE0302`;return gmsdk.http.post({url:n,data:{appParam:{TERM:t},appFnKey:"SE0301",formData:{}}})}}})),setTimeout(()=>{t.start()},4e3);var n=/redmine.*\/issues\/(\d+)/,e={Bug:"fix",Task:"feat"},i=GM_getResourceText("JQ_TOAST");GM_addStyle(i),gmsdk.addStyle('\n    #git_msg{\n      display: flex;\n      align-items: center;\n      justify-content:space-between;\n      cursor: pointer;\n      background: #f9f9f9;\n      transition: all 0.3s;\n    }\n    #git_msg:hover {\n      border:1px solid #ccc;\n      background: #f1f1f1;\n    }\n    #git_msg:active{\n      background: #eee;\n    }\n\n    #git_msg>.left{\n      flex: 1;\n    }\n\n    #git_msg>.right{\n      text-align: right;\n      color: #999;\n      font-size: 12px;\n    }\n\n    .git_action{\n      display: inline-block;\n      width: auto;\n      min-width: 1em;\n      margin-top: 3px;\n      padding: 1px 8px;\n      border-radius: 3px;\n      color: #fff;\n      font-size: .86em;\n      font-weight: bold;\n      text-align: center;\n      text-transform: uppercase;\n    }\n\n\n    .git_action[data-git-action="feat"]{\n      background-color: #584492;\n    }\n\n    .git_action[data-git-action="fix"]{\n      background-color: #e74c3c;\n    }\n'),$(document).ready((function(){if(n.exec(location.href)){var t=$("#content h2").text(),[i,a]=t.split(" #"),s=$("#content h3").eq(0).text(),o=""+(e[i]||"feat"),r=`${s} - (REDMINE-${a})`;$("#content h2").after(`\n    <header id="git_msg" class="issue tracker-58 1-2 priority-4 priority-default details left">\n      <div class="left">\n        <span class="git_action" data-git-action="${o}">${o}</span>\n        :\n        <span class="git_msg">${r}</span>\n      </div>\n      <div class="right">\n        <span class="icon icon-copy">[ 点击/右键 ]</span> 可以复制内容到简体板\n      </div>\n    </header>\n  `),$("#content #git_msg").contextmenu((function(t){var n=r;t.preventDefault(),gmsdk.setClipboard(n),$.toast({icon:"info",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3,text:n})})),$("#content #git_msg").click((function(){var t=`${o}: ${r}`,n=$(".fixed-version").text();if(n.includes(".")){var e=n.split(":")[1].toLowerCase();t=`${o}(${e}): ${r}`}gmsdk.setClipboard(t),$.toast({icon:"success",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3,text:t})}))}})),$(document).ready(()=>{gmsdk.addStyle("\n    #resources .circle-index{\n      padding: 5px;\n      background: #547e03;\n      color: #fff;\n      border-radius: 50px;\n    }\n    #resources .resource .heading > h2{\n      font-size: 14px;\n    }\n    .operations li .heading .options li{\n      display: flex;\n      align-items: center;\n    }\n    .operations li .heading .options li a{\n      margin-left: 10px;\n      width: 120px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      display: block;\n    }\n  "),setTimeout(()=>{$("#resources .resource .heading > h2").each((t,n)=>{var e="0"+(t+1);$(n).prepend(`<i class="circle-index">${e.slice(-2)}</i>`),$(n).append('<button class="clipboard items">Copy</button>')}),$(".operations li .heading .options li").prepend('<button class="clipboard item">Copy</button>'),$(".clipboard.item").click(t=>{var n=$(t.target).parents(".heading").find(".path").text().trim(),e=$(t.target).parents(".heading").find(".http_method a").text().trim();gmsdk.setClipboard(`['${e.toLowerCase()}', '${n}']`)}),$(".clipboard.items").click(t=>{var n=$(t.target).parents(".heading").next(".endpoints").find(".operation > div.heading > h3 > span.path").text().split("\n").map(t=>t.trim()).filter(Boolean);gmsdk.setClipboard(JSON.stringify(n,null,2))})},1e3)})}));
