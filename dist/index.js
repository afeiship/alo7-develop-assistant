/**
 *  name: @feizheng/alo7-develop-assistant
 *  description: Develop assistant for alo7.
 *  homepage: https://github.com/afeiship
 *  version: 1.0.7
 *  date: 2020-07-10T07:38:10.557Z
 *  license: MIT
 */

!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){$(document).ready(()=>{gmsdk.addStyle("\n    #resources .circle-index{\n      padding: 5px;\n      background: #547e03;\n      color: #fff;\n      border-radius: 50px;\n    }\n    #resources .resource .heading > h2{\n      font-size: 14px;\n    }\n    .operations li .heading .options li{\n      display: flex;\n      align-items: center;\n    }\n    .operations li .heading .options li a{\n      margin-left: 10px;\n      width: 120px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      display: block;\n    }\n  "),setTimeout(()=>{$("#resources .resource .heading > h2").each((e,n)=>{var i="0"+(e+1);$(n).prepend(`<i class="circle-index">${i.slice(-2)}</i>`),$(n).append('<button class="clipboard items">Copy</button>')}),$(".operations li .heading .options li").prepend('<button class="clipboard item">Copy</button>'),$(".clipboard.item").click(e=>{var n=$(e.target).parents(".heading").find(".path").text();gmsdk.setClipboard(n.trim())}),$(".clipboard.items").click(e=>{var n=$(e.target).parents(".heading").next(".endpoints").find(".operation > div.heading > h3 > span.path").text().split("\n").map(e=>e.trim()).filter(Boolean);gmsdk.setClipboard(JSON.stringify(n,null,2))})},1e3)})}));
