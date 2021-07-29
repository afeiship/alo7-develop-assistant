// ==UserScript==
// @name         alo7-develop-assistant
// @namespace    https://github.com/afeiship/alo7-develop-assistant
// @version      1.0.64
// @description  Develop assistant for alo7.
// @author       aric.zheng
// @include    *://*.saybot.net:*/*
// @include    *://*.saybot.net/*
// @include    *://*.saybot.com/*
// @include    *://*.shuobaotang.com/*
// @include    *://*.alo7.com/*
// @include    *://*.alo7.cn/*
// @updateURL https://raw.githubusercontent.com/afeiship/alo7-develop-assistant/master/dist/install.js
// @supportURL https://github.com/afeiship/alo7-develop-assistant/issues/new?assignees=adlered&labels=help+wanted&template=ISSUE_TEMPLATE.md&title=
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @require  https://cdn.jsdelivr.net/npm/@jswork/gm-sdk@1.0.18
// @require  https://cdn.jsdelivr.net/npm/@jswork/alo7-develop-assistant@1.0.64
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.js
// @resource JQ_TOAST https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.css
// @resource GM_STYLES https://unpkg.com/@jswork/gm-styles@1.0.6/dist/index.css
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_addValueChangeListener
// @grant GM_removeValueChangeListener
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_log
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_registerMenuCommand
// @grant GM_unregisterMenuCommand
// @grant GM_openInTab
// @grant GM_xmlhttpRequest
// @grant GM_download
// @grant GM_getTab
// @grant GM_saveTab
// @grant GM_getTabs
// @grant GM_notification
// @grant GM_setClipboard
// @grant GM_info
// @grant  window.focus
// @icon64 https://tva1.sinaimg.cn/large/007S8ZIlgy1gexw87htqhj305k05k74o.jpg
// ==/UserScript==

const GM_STYLES = GM_getResourceText('GM_STYLES');
GM_addStyle(GM_STYLES);
