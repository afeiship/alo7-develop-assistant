/**
 *  name: @jswork/alo7-develop-assistant
 *  description: Develop assistant for alo7.
 *  homepage: https://github.com/afeiship
 *  version: 1.0.73
 *  date: 2021-11-12T03:21:00.954Z
 *  license: MIT
 */

!function(t){"function"==typeof define&&define.amd?define(t):t()}((function(){$(document).ready((function(){var t=document.URL;if(!t.includes("git.saybot.net/ACE/kellis/kellis-ng-front"))return!1;if(!t.includes("scope=all&ref=master&username=aric.zheng&status=success"))return!1;const e=nx.declare({methods:{start:function(){this.renderList()},piplines:function(){return fetch("/api/v4/projects/1719/pipelines?page=1&ref=master&username=aric.zheng&status=success&order_by=updated_at",{headers:{"PRIVATE-TOKEN":"PbCriht1U4PxQrYBnEed"}}).then(t=>t.json())},renderList:function(){this.piplines().then(t=>{$(".commit.gl-responsive-table-row").each((function(e,n){const i=$(n),a=t[e],s=nx.Date.create(nx.get(a,"created_at")),o=nx.Date.format(s),r=nx.Weeks.day(s.getDay(),"cn"),c=(t=>{const e=t.toLocaleString([],{hour12:!0}).slice(-2);return{en:e,cn:"AM"===e?"上午":"下午"}})(s),d=nx.get(a,"web_url");i.before(`<a href="${d}" style="\n    display: flex;\n    align-items: center;\n    margin:10px 0 0 0;\n  " class="gm-btn gm-btn-default is-large">\n              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 40 40"><g fill="#8F8F8F" fill-rule="evenodd"><path d="M29.513 10.134A15.922 15.922 0 0 0 23 7.28V6h2.993C26.55 6 27 5.552 27 5V2a1 1 0 0 0-1.007-1H14.007C13.45 1 13 1.448 13 2v3a1 1 0 0 0 1.007 1H17v1.28C9.597 8.686 4 15.19 4 23c0 8.837 7.163 16 16 16s16-7.163 16-16c0-3.461-1.099-6.665-2.967-9.283l1.327-1.58a2.498 2.498 0 0 0-.303-3.53 2.499 2.499 0 0 0-3.528.315l-1.016 1.212zM20 34c6.075 0 11-4.925 11-11s-4.925-11-11-11S9 16.925 9 23s4.925 11 11 11z"></path><path d="M19 21h-4.002c-.552 0-.998.452-.998 1.01v1.98c0 .567.447 1.01.998 1.01h7.004c.274 0 .521-.111.701-.291a.979.979 0 0 0 .297-.704v-8.01c0-.54-.452-.995-1.01-.995h-1.98a.997.997 0 0 0-1.01.995V21z"></path></g></svg>\n              <em class="gm-tag gm-tag-positive">#${e+1}.</em> 上次发版时间: 星期${r} ${c.cn} ${o} </a>`)}))})}}});nx.waitToDisplay(".js-pipelines-tab-all",1e3,t=>{(new e).start()})})),$(document).ready((function(){var t=document.URL;if(!t.includes("git.saybot.net/ACE/kellis/kellis-ng-front"))return!1;const e=nx.declare({properties:{isMergeRequest:function(){return t.endsWith("-/merge_requests/new")}},methods:{start:function(){this.inertToolbar(),this.bindEvents(),this.isMergeRequest&&(this.bindMrEvents(),this.insertMRToolbar())},inertToolbar:function(){$(".home-panel-title-row").append(' <button\n            style="margin:6px 0 0 20px; height: 50px; "\n            data-action="fill-elements"\n            type="button"\n            class="gm-btn gm-btn-primary">\n            <svg class="s16" data-testid="rocket-icon"><use xlink:href="/assets/icons-81bca028cfa382a852fa2c8a6dfb4fb2b7467093d38f9fe9a07a519ca785299c.svg#rocket"></use></svg>\n            版本回滚请点我\n          </button> ')},insertMRToolbar:function(){$("#content-body .page-title").append('\n          <div class="gm-mr-toolbar mt-2">\n            <button data-action="-beta" class="gm-btn gm-btn-default">any -> beta</button>\n            <button data-action="develop-beta" class="gm-btn gm-btn-primary">develop -> beta</button>\n            <button data-action="beta-staging" class="gm-btn gm-btn-positive">beta -> staging</button>\n            <button data-action="staging-master" class="gm-btn gm-btn-negative">staging -> master</button>\n          </div>\n        ')},bindEvents:function(){$("body").on("click",'[data-action="fill-elements"]',(function(){window.open("https://git.saybot.net/ACE/kellis/kellis-ng-front/-/pipelines?page=1&scope=all&ref=master&username=aric.zheng&status=success","_blank")}))},bindMrEvents:function(){var t=this;$("body").on("click",".gm-mr-toolbar",(function(e){const n=$(e.target).data("action"),i=n.split("-");n&&i.forEach((e,n)=>{t.setValue(n,e)}),n&&i[0]&&$("#new_merge_request").submit()}))},setValue:function(t,e){const n=$(".card-new-merge-request").eq(t).find(".merge-request-select").eq(1),i=n.find(".dropdown-menu-toggle .dropdown-toggle-text"),a=n.find('input[type="hidden"]');i.text(e||"Select source branch"),a.val(e)}}});nx.waitToDisplay(".logo-text",1e3,t=>{(new e).start()})})),$(document).ready((function(){if(!document.URL.includes("huba.saybot.net"))return!1;const t={"发布内容":"https://confluence.alo7.cn/pages/viewpage.action?pageId=52550787","数据库修改信息":"-","影响范围":"<p>仅影响前端</p>","回滚方案、步骤":'<p>1. 找到这个回滚到上次记录: <a href="https://git.saybot.net/ACE/kellis/kellis-ng-front/-/pipelines?page=1&amp;scope=all&amp;ref=master&amp;username=aric.zheng&amp;status=success" rel="noopener noreferrer" target="_blank">https://git.saybot.net/ACE/kellis/kellis-ng-front/-/pipelines?page=1&amp;scope=all&amp;ref=master&amp;username=aric.zheng&amp;status=success</a></p><p>2. 执行 deploy</p>',"发布步骤":"<p>1. 合并代码: staging -&gt; master</p><p>2. 等ci运行完成，确认后端发布状态ready</p><p>3. 手动点击deploy</p>"},e=nx.declare({methods:{start:function(){this.inertToolbar(),this.bindEvents()},inertToolbar:function(){$(".el-dialog__header").css({display:"flex",alignItems:"center"}),$(".el-dialog__header").append('<button\n            style="margin-left: 10px;"\n            data-action="fill-elements"\n            type="button"\n            class="gm-btn gm-btn-positive">\n            一键填表\n          </button>')},bindEvents:function(){$("body").on("click",'[data-action="fill-elements"]',this.fillElements.bind(this))},fillElements:function(){nx.forIn(t,this.fillEditor,this)},fillEditor:function(t,e){$(`.el-form-item__label:contains('${t}')`).next(".el-form-item__content").find(".quill-editor .ql-editor").html(e)}}});nx.waitToDisplay(".quill-editor",1e3,t=>{(new e).start()})})),$(document).ready(()=>{if(!document.URL.includes("kellis-ng."))return!1;var t=nx.declare({methods:{start(){$('[class^="Dashboard__HeaderOption"]').after('<button id="copy-token" class="ant-btn ant-btn-primary">复制Token</button>'),this.attachEvents()},attachEvents(){$("#copy-token").click(()=>{var t=alo7Account.token;gmsdk.setClipboard(t),$.toast({icon:"success",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3})})}}});setTimeout(()=>{(new t).start()},1e3)});var t=/redmine.*\/issues\/(\d+)/,e={Bug:"fix",TechTask:"refactor",Task:"feat"},n={Bug:"bug",TechTask:"refactor",Task:"issue"},i={3:"Resolved",2:"Assigned"},a=GM_getResourceText("JQ_TOAST");GM_addStyle(a),gmsdk.addStyle('\n    #git_msg{\n      display: flex;\n      align-items: center;\n      justify-content:space-between;\n      background: #f9f9f9;\n      transition: all 0.3s;\n    }\n\n    #git_msg>.left{\n      flex: 1;\n    }\n\n    #git_msg>.right{\n      text-align: right;\n      color: #999;\n      font-size: 12px;\n    }\n\n    .git_action{\n      display: inline-block;\n      width: auto;\n      min-width: 1em;\n      margin-top: 3px;\n      padding: 1px 8px;\n      border-radius: 3px;\n      color: #fff;\n      font-size: .86em;\n      font-weight: bold;\n      text-align: center;\n      text-transform: uppercase;\n    }\n\n\n    .git_action[data-git-action="feat"]{\n      background-color: #584492;\n    }\n\n    .git_action[data-git-action="refactor"]{\n      background-color: #f71692;\n    }\n\n    .git_action[data-git-action="fix"]{\n      background-color: #e74c3c;\n    }\n'),$(document).ready((function(){if(t.exec(location.href)){var a=$("#content h2").eq(0).text(),[s,o]=a.split(" #"),r=$("#content h3").eq(0).text(),c=""+(e[s]||"feat"),d=`${r} - (REDMINE-${o})`,l=$(".fixed-version .value").text();$("#content h2").eq(0).after(`\n    <header id="git_msg" class="issue tracker-58 1-2 priority-4 priority-default details left">\n      <div class="left">\n        <span class="git_action" data-git-action="${c}">${c}</span>\n        :\n        <span class="git_msg">${d}</span>\n      </div>\n      <div class="right">\n        <button id="mark-as-resolved" class="gm-btn gm-btn-primary is-large">\n          <i class="icon icon-attachment"></i>\n          切换状态Resolved/Assigned\n        </button>\n        <button id="gitmsg" class="gm-btn gm-btn-positive is-large">\n          <i class="icon icon-comment"></i>\n          复制: git message\n        </button>\n        <button id="gitflow" class="gm-btn gm-btn-negative is-large">\n          <i class="icon icon-projects"></i>\n          复制: gitflow branch name\n        </button>\n      </div>\n    </header>\n  `),$("#mark-as-resolved").click(()=>{const t="Assigned"===$("#content .attributes .status .value").text()?3:2;$.toast({icon:"info",heading:"开始切换，请稍等...",position:"top-right",stack:!1,hideAfter:1e4}),fetch(`https://redmine.saybot.net/issues/${o}.json`,{method:"PUT",headers:{"x-redmine-api-key":"7d0d1e1e5b59da84cd4974395e764b0a36894318","content-type":"application/json"},body:JSON.stringify({issue:{status_id:t}})}).then(e=>{$.toast({icon:"success",heading:"已经标记为"+i[t],position:"top-right",stack:!1,hideAfter:1e3}),window.location.reload()})}),$("#gitmsg").click((function(){var t=`${c}: ${d}`,e=$(".fixed-version").text();if(e.includes(".")){var n=e.split(":")[1].toLowerCase();t=`${c}(${n}): ${d}`}gmsdk.setClipboard(t),$.toast({icon:"success",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3,text:t})})),$("#gitflow").click((function(){var t=nx.kebabCase(l.replace(/[._()-]/g,"")),e=`${t?t+"/":""}redmine-${n[s]||"issue"}-${o}`;gmsdk.setClipboard(e),$.toast({icon:"info",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3,text:e})}))}})),$(document).ready((function(){var t=location.host,e=$(".page-metadata .author").text();if("confluence.alo7.cn"!==t||!e.includes("Issa Li"))return;var n=$('h1:contains("功能描述")'),i=n.next(".table-wrap").find(".relative-table tbody tr"),a=[];i.each((t,e)=>{var n=$(e).find("td:eq(1)").text();n&&a.push(n)});const s=a.map((t,e)=>{const n="rdm-issue-"+e;return`\n      <tr>\n        <td><input name="redmine-issue" data-index=${e} id="${n}" type="checkbox" /></td>\n        <td><label style="padding:5px; display:block;" for="${n}">${e+1}. ${t}</label></td>\n      </tr>`});n.after(`\n    <form style="border:1px solid #ccc; margin: 10px auto;">\n      <table class="gm-table gm-table-striped">\n        <thead>\n          <tr>\n            <td align="center" width="20">\n              <div class="gm-row gm-row-center">\n                <input id="batch-checked" type="checkbox" />\n                <label id="batch-select" for="batch-checked">\n                  <strong>创建?</strong>\n                </label>\n              </div>\n            </td>\n            <td><strong>功能点</strong></td>\n          </tr>\n        </thead>\n        <tbody>\n          ${s.join("\n")}\n        </tbody>\n      </table>\n      <footer style="padding:10px;">\n        <button type="button" data-action="unselect-all" class="gm-btn gm-btn-primary">反选</button>\n        <button type="button" data-action="issues-create" class="gm-btn gm-btn-negative">一键复制JSON</button>\n        <button type="button" data-action="release-notes" class="gm-btn gm-btn-positive">复制ReleaseNotes</button>\n      </footer>\n    </form>\n  `),$("#batch-select").click(t=>{t.stopPropagation();const e=$("#batch-select").prev("input").prop("checked");$('[name="redmine-issue"]').prop("checked",!e)}),$('[data-action="unselect-all"]').click(t=>{$('[name="redmine-issue"]').each((function(t,e){const n=$(e).prop("checked");$(e).prop("checked",!n)}))}),$('[data-action="issues-create"]').click(t=>{const e=$('[name="redmine-issue"]:checked'),n=nx.slice(e).map(t=>{const e=$(t).data("index");return{index:e,text:a[e]}});if(!e.length)return $.toast({icon:"error",position:"top-right",heading:"请选中要创建的task"});gmsdk.setClipboard(JSON.stringify(n)),$.toast({icon:"success",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3})}),$('[data-action="release-notes"]').click((function(t){const e=$('[name="redmine-issue"]:checked'),n=nx.slice(e).map(t=>{const e=$(t).data("index");return`${e+1}. ${a[e]}`});gmsdk.setClipboard(n.join("\n")),$.toast({icon:"info",heading:"复制成功",position:"top-right",stack:!1,hideAfter:1e3})}))})),$(document).ready((function(){if("redmine.saybot.net"!==location.host)return;const t=$("#header h1"),e={"x-redmine-api-key":"7d0d1e1e5b59da84cd4974395e764b0a36894318","content-type":"application/json"},n={frontend:"【前端】",backend:"【后端】"},i=t=>{const i=nx.hashlize(),a=$("#bfend-selector").val(),s=$("#version-selector").val(),o=String(t.index+1).padStart(2,"0"),r=`${n[a]}${o}. ${t.text}`,c=nx.Date.format(null,"date"),d={issue:{project_id:155,tracker_id:5,subject:r,status_id:2,was_default_status:2,priority_id:4,assigned_to_id:i.assigned_to_id||858,fixed_version_id:s,start_date:c}};fetch("https://redmine.saybot.net/issues.json",{method:"POST",headers:e,body:JSON.stringify(d)})};t.append('\n    <div style="display: inline-flex;" class="row-center">\n      <select data-action="version-select" style="margin:0 10px;" class="gm-form-control" id="version-selector"></select>\n      <select data-action="bfend-select" style="margin-right:10px;" class="gm-form-control" id="bfend-selector">\n        <option value="frontend">前端</option>\n        <option value="backend">后端</option>\n      </select>\n      <button data-action="issue-create" type="button" class="gm-btn gm-btn-primary">一键创建Issues</button>\n    </div>\n  '),fetch("https://redmine.saybot.net/projects/155/versions.json",{method:"GET",headers:e}).then(t=>t.json()).then(t=>{const e=$("#version-selector"),n=t.versions.slice(-5),i=n.map(t=>`<option value="${t.id}">${t.name}</option>`);e.html(i),e.val(n[n.length-1].id)}),$('[data-action="issue-create"]').click((async function(t){const e=await navigator.clipboard.readText(),n=nx.parse(e);if(!Array.isArray(n))return $.toast({icon:"error",position:"top-right",heading:"无合适的task可以创建"});for(const t of n)i(t);$.toast({icon:"success",heading:"操作成功~",position:"top-right",stack:!1,hideAfter:1e3})}))})),$(document).ready(()=>{gmsdk.addStyle("\n    #resources .circle-index{\n      padding: 5px;\n      background: #547e03;\n      color: #fff;\n      border-radius: 50px;\n    }\n    #resources .resource .heading > h2{\n      font-size: 14px;\n    }\n    .operations li .heading .options li{\n      display: flex;\n      align-items: center;\n    }\n    .operations li .heading .options li a{\n      margin-left: 10px;\n      width: 120px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      display: block;\n    }\n  "),setTimeout(()=>{$("#resources .resource .heading > h2").each((t,e)=>{var n="0"+(t+1);$(e).prepend(`<i class="circle-index">${n.slice(-2)}</i>`),$(e).append('<button class="clipboard items">Copy</button>')}),$(".operations li .heading .options li").prepend('<button class="clipboard item">Copy</button>'),$(".clipboard.item").click(t=>{var e=$(t.target).parents(".heading").find(".path").text().trim(),n=$(t.target).parents(".heading").find(".http_method a").text().trim();gmsdk.setClipboard(`['${n.toLowerCase()}', '${e}']`)}),$(".clipboard.items").click(t=>{var e=$(t.target).parents(".heading").next(".endpoints").find(".operation > div.heading > h3 > span.path").text().split("\n").map(t=>t.trim()).filter(Boolean);gmsdk.setClipboard(JSON.stringify(e,null,2))})},1e3)})}));
