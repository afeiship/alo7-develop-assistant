/**
 *  name: @feizheng/alo7-develop-assistant
 *  description: Develop assistant for alo7.
 *  homepage: https://github.com/afeiship
 *  version: 1.0.0
 *  date: 2020-07-09T11:15:22.172Z
 *  license: MIT
 */

!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){$(document).ready(()=>{gmsdk.addStyle("\n    #resources .resource .heading > h2{\n      font-size: 14px;\n    }\n    .operations li .heading .options li{\n      display: flex;\n      align-items: center;\n    }\n    .operations li .heading .options li a{\n      margin-left: 10px;\n      width: 120px;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      display: block;\n    }\n  "),setTimeout(()=>{$("#resources .resource .heading > h2").each((e,n)=>{var i="0"+(e+1);$(n).prepend(`<i>${i.slice(-2)}</i>`)}),$(".operations li .heading .options li").prepend('<button class="clipboard">Copy</button>'),$(".clipboard").click(e=>{var n=$(e.target).parents(".heading").find(".path").text();gmsdk.setClipboard(n.trim())})},1e3)})}));
