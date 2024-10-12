/**
 *  name: @jswork/alo7-develop-assistant
 *  description: Develop assistant for alo7.
 *  homepage: https://github.com/afeiship
 *  version: 1.0.91
 *  date: 2024-10-12T04:38:29.802Z
 *  license: MIT
 */

!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){var t=/redmine.*\/issues\/(\d+)/,e={Bug:"fix",TechTask:"refactor",Task:"feat"},n={Bug:"bug",TechTask:"refactor",Task:"issue"},i={3:"Resolved",2:"Assigned"},s=GM_getResourceText("JQ_TOAST");GM_addStyle(s),gmsdk.addStyle('\n    #git_msg{\n      display: flex;\n      align-items: center;\n      justify-content:space-between;\n      background: #f9f9f9;\n      transition: all 0.3s;\n    }\n\n    #git_msg>.left{\n      flex: 1;\n    }\n\n    #git_msg>.right{\n      text-align: right;\n      color: #999;\n      font-size: 12px;\n    }\n\n    .git_action{\n      display: inline-block;\n      width: auto;\n      min-width: 1em;\n      margin-top: 3px;\n      padding: 1px 8px;\n      border-radius: 3px;\n      color: #fff;\n      font-size: .86em;\n      font-weight: bold;\n      text-align: center;\n      text-transform: uppercase;\n    }\n\n\n    .git_action[data-git-action="feat"]{\n      background-color: #584492;\n    }\n\n    .git_action[data-git-action="refactor"]{\n      background-color: #f71692;\n    }\n\n    .git_action[data-git-action="fix"]{\n      background-color: #e74c3c;\n    }\n'),$(document).ready((function(){if(t.exec(location.href)){var s=$("#content h2").eq(0).text(),[a,o]=s.split(" #"),r=$("#content h3").eq(0).text(),c=""+(e[a]||"feat"),d=`${r} - (REDMINE-${o})`,l=$(".fixed-version .value").text();$("#content h2").eq(0).after(`\n    <header id="git_msg" class="issue tracker-58 1-2 priority-4 priority-default details left">\n      <div class="left">\n        <span class="git_action" data-git-action="${c}">${c}</span>\n        :\n        <span class="git_msg">${d}</span>\n      </div>\n      <div class="right">\n        <button id="mark-as-resolved" class="gm-btn gm-btn-primary is-large">\n          <i class="icon icon-attachment"></i>\n          切换状态Resolved/Assigned\n        </button>\n        <button id="gitmsg" class="gm-btn gm-btn-positive is-large">\n          <i class="icon icon-comment"></i>\n          复制: git message\n        </button>\n        <button id="gitflow" class="gm-btn gm-btn-negative is-large">\n          <i class="icon icon-projects"></i>\n          复制: gitflow branch name\n        </button>\n      </div>\n    </header>\n  `),$("#mark-as-resolved").click(()=>{const t="Assigned"===$("#content .attributes .status .value").text()?3:2;$.toast({icon:"info",heading:"开始切换，请稍等...",position:"top-right",stack:!1,hideAfter:1e4}),fetch(`https://redmine.saybot.net/issues/${o}.json`,{method:"PUT",headers:{"x-redmine-api-key":"7d0d1e1e5b59da84cd4974395e764b0a36894318","content-type":"application/json"},body:JSON.stringify({issue:{status_id:t}})}).then(e=>{$.toast({icon:"success",heading:"已经标记为"+i[t],position:"top-right",stack:!1,hideAfter:1e3}),window.location.reload()})}),$("#gitmsg").click((function(){var t=`${c}: ${d}`,e=$(".fixed-version").text();if(e.includes(".")){var n=e.split(":")[1].toLowerCase();t=`${c}(${n}): ${d}`}gmsdk.setClipboard(t),$.toast({icon:"success",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3,text:t})})),$("#gitflow").click((function(){var t=nx.kebabCase(l.replace(/[._()-]/g,"")),e=`${t?t+"/":""}redmine-${n[a]||"issue"}-${o}`;gmsdk.setClipboard(e),$.toast({icon:"info",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3,text:e})}))}})),$(document).ready(()=>{location.href.includes("swagger-ui")&&(gmsdk.addStyle("\n    #resources .circle-index{\n      padding: 5px;\n      background: #547e03;\n      color: #fff;\n      border-radius: 50px;\n    }\n    #resources .resource .heading > h2{\n      font-size: 14px;\n    }\n    .operations li .heading .options li{\n      display: flex;\n      align-items: center;\n    }\n    .operations li .heading .options li a{\n      margin-left: 10px;\n      width: 120px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      display: block;\n    }\n  "),nx.waitToDisplay("#resources .resource .heading > h2",1e3,(function(){$("#resources .resource .heading > h2").each((t,e)=>{var n="0"+(t+1);$(e).prepend(`<i class="circle-index">${n.slice(-2)}</i>`),$(e).append('<button class="clipboard items">Copy</button>')}),$(".operations li .heading .options li").prepend('<button class="clipboard item">Copy</button>'),$(".clipboard.item").click(t=>{var e=$(t.target).parents(".heading").find(".path").text().trim(),n=$(t.target).parents(".heading").find(".http_method a").text().trim();gmsdk.setClipboard(`['${n.toLowerCase()}', '${e}']`)}),$(".clipboard.items").click(t=>{var e=$(t.target).parents(".heading").next(".endpoints").find(".operation > div.heading > h3 > span.path").text().split("\n").map(t=>t.trim()).filter(Boolean);gmsdk.setClipboard(JSON.stringify(e,null,2))})})))}),$(document).ready((function(){if(!document.URL.includes("download.sdclient.saybot.net"))return!1;const t=nx.declare({methods:{start:function(){this.maxRows=parseInt(localStorage.getItem("gm_max_rows"))||5,this.indexedTable(),this.styledTable(),this.fulltitle(),this.checkStore()},indexedTable(){$("#list tr").each((t,e)=>{$(e).prepend("<td>-</td>")})},styledTable(){$("#list").css({"font-size":"14px"}),$("col").eq(0).attr("width","2%"),$("col").eq(1).attr("width","78%"),$("col").eq(2).attr("width","10%"),$("col").eq(3).attr("width","10%")},fulltitle(){const t=this.maxRows+2,e=$("#list tr").slice(0,t);if(e.length<t)return!1;e.each((t,e)=>{const n=$(e).find("td a"),i=(t-2)%5;if($(e).find("td").eq(0).text(i+1),t>1){const t=0===i?"#6eb4f7":"#5bd46d";$(e).css("background-color",t);const s=n.get(0),a=$(s).attr("href"),o=a.includes(".md5"),r=$(s);if(r.text(a),o){const t=a.split(".").slice(-2,-1)[0];r.click(e=>{e.preventDefault(),gmsdk.setClipboard(t),$.toast({icon:"success",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3})})}}})},checkStore(){localStorage.getItem("gm_max_rows")||localStorage.setItem("gm_max_rows",this.maxRows)}}});nx.waitToDisplay("table#list",1e3,e=>{(new t).start()})}))}));
