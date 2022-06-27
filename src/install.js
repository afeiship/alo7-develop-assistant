// ==UserScript==
// @name         alo7-develop-assistant
// @namespace    https://github.com/afeiship/alo7-develop-assistant
// @version      __VERSION__
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
// @require  https://unpkg.com/@jswork/gm-sdk@1.0.21
// @require  https://cdn.jsdelivr.net/npm/@jswork/alo7-develop-assistant@__VERSION__
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js
// @resource JQ_TOAST https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.css
// @resource GM_STYLES https://unpkg.com/@jswork/gm-styles@1.0.6/dist/index.css
// @resource JQ_MODAL https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css
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

// load gm-styles/jq-toast/jq-modal
// https://jquerymodal.com/
const GM_STYLES = GM_getResourceText('GM_STYLES');
const JQ_TOAST = GM_getResourceText('JQ_TOAST');
const JQ_MODAL = GM_getResourceText('JQ_MODAL');
GM_addStyle(GM_STYLES);
GM_addStyle(JQ_TOAST);
GM_addStyle(JQ_MODAL);
