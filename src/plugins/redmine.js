/**
 * @description
 * 1. 添加 git message 的工具条
 * 2. 复制 issue id 功能
 */

var ISSUE_RE = /redmine.*\/issues\/(\d+)/;
var ISSUE_BUG_ID = /(\w+)\s+#(\d+)/;
var GIT_ACTION_MAP = {
  Bug: 'fix',
  Task: 'feat'
};

var JQ_TOAST = GM_getResourceText('JQ_TOAST');
GM_addStyle(JQ_TOAST);

gmsdk.addStyle(`
    #git_msg{
      display: flex;
      align-items: center;
      justify-content:space-between;
      cursor: pointer;
      background: #f9f9f9;
      transition: all 0.3s;
    }
    #git_msg:hover {
      border:1px solid #ccc;
      background: #f1f1f1;
    }
    #git_msg:active{
      background: #eee;
    }

    #git_msg>.left{
      flex: 1;
    }

    #git_msg>.right{
      text-align: right;
      color: #999;
      font-size: 12px;
    }

    .git_action{
      display: inline-block;
      width: auto;
      min-width: 1em;
      margin-top: 3px;
      padding: 1px 8px;
      border-radius: 3px;
      color: #fff;
      font-size: .86em;
      font-weight: bold;
      text-align: center;
      text-transform: uppercase;
    }


    .git_action[data-git-action="feat"]{
      background-color: #584492;
    }

    .git_action[data-git-action="fix"]{
      background-color: #e74c3c;
    }
`);

$(document).ready(function () {
  var issue_matches = ISSUE_RE.exec(location.href);
  if (!issue_matches) return;
  var issue_title = $('#content h2').text();
  var [issue_bug, id] = issue_title.split(' #');
  var message = $('#content h3').eq(0).text();
  var git_action = `${GIT_ACTION_MAP[issue_bug] || 'feat'}`;
  var git_msg = `${message} - (REDMINE-${id})`;

  $('#content h2').after(`
    <header id="git_msg" class="issue tracker-58 1-2 priority-4 priority-default details left">
      <div class="left">
        <span class="git_action" data-git-action="${git_action}">${git_action}</span>
        :
        <span class="git_msg">${git_msg}</span>
      </div>
      <div class="right">
        <span class="icon icon-copy">[ 点击/右键 ]</span> 可以复制内容到简体板
      </div>
    </header>
  `);

  $('#content #git_msg').contextmenu(function (e) {
    var text = git_msg;
    e.preventDefault();
    gmsdk.setClipboard(text);

    $.toast({
      icon: 'info',
      heading: '复制成功',
      position: 'top-right',
      stack: false,
      hideAfter: 1000,
      text
    });
  });

  $('#content #git_msg').click(function () {
    var text = `${git_action}: ${git_msg}`;
    var versionText = $('.fixed-version').text();
    if (versionText.includes('.')) {
      var version = versionText.split(':')[1].toLowerCase();
      text = `${git_action}(${version}): ${git_msg}`;
    }

    gmsdk.setClipboard(text);
    $.toast({
      icon: 'success',
      heading: '复制成功',
      position: 'top-right',
      stack: false,
      hideAfter: 1000,
      text
    });
  });

  /**
   * 添加复制 id 功能
   */
  $('#content .contextual').prepend(
    `<a id="copy-issue-id" class="icon icon-copy">复制Issue ID</a>`
  );
  $('#copy-issue-id').click(() => {
    const url = new URL(location.href);
    const { pathname } = url;
    const arr = pathname.split('/');
    const text = arr[arr.length - 1];
    $.toast({
      icon: 'success',
      heading: '复制成功',
      position: 'top-right',
      stack: false,
      hideAfter: 1000,
      text
    });
    gmsdk.setClipboard(text);
  });
});
