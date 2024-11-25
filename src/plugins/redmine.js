/**
 * @description
 * 1. 添加 git message 的工具条
 * 2. 复制 issue id 功能
 */

var ISSUE_RE = /redmine.*\/issues\/(\d+)/;
var ISSUE_BUG_ID = /(\w+)\s+#(\d+)/;
var GIT_ACTION_MAP = {
  Bug: 'fix',
  TechTask: 'refactor',
  Task: 'feat'
};

var GIT_BRANCH_MAP = {
  Bug: 'bug',
  TechTask: 'refactor',
  Task: 'issue'
};

var STATUS_MAP = {
  3: 'Resolved',
  2: 'Assigned'
};

var JQ_TOAST = GM_getResourceText('JQ_TOAST');
GM_addStyle(JQ_TOAST);

gmsdk.addStyle(`
    #git_msg{
      display: flex;
      align-items: center;
      justify-content:space-between;
      background: #f9f9f9;
      transition: all 0.3s;
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

    .git_action[data-git-action="refactor"]{
      background-color: #f71692;
    }

    .git_action[data-git-action="fix"]{
      background-color: #e74c3c;
    }
`);

$(document).ready(function () {
  var issue_matches = ISSUE_RE.exec(location.href);
  if (!issue_matches) return;
  var issue_title = $('#content h2').eq(0).text();
  var [issue_bug, id] = issue_title.split(' #');
  var message = $('#content h3').eq(0).text();
  var git_action = `${GIT_ACTION_MAP[issue_bug] || 'feat'}`;
  var git_msg = `${message} - (REDMINE-${id})`;
  var fixed_version = $('.fixed-version .value').text();

  $('#content h2').eq(0).after(`
    <header id="git_msg" class="issue tracker-58 1-2 priority-4 priority-default details left">
      <div class="left">
        <span class="git_action" data-git-action="${git_action}">${git_action}</span>
        :
        <span class="git_msg">${git_msg}</span>
      </div>
      <div class="right">
        <button id="mark-as-resolved" class="gm-btn gm-btn-primary is-large">
          <i class="icon icon-attachment"></i>
          切换状态Resolved/Assigned
        </button>
        <button id="gitmsg" class="gm-btn gm-btn-positive is-large">
          <i class="icon icon-comment"></i>
          复制: git message
        </button>
        <button id="gitflow" class="gm-btn gm-btn-negative is-large">
          <i class="icon icon-projects"></i>
          复制: gitflow branch name
        </button>
      </div>
    </header>
  `);

  $('#mark-as-resolved').click(() => {
    const currentStatus = $('#content .attributes .status .value').text();
    const status_id = currentStatus === 'Assigned' ? 3 : 2;
    const headers = {
      'x-redmine-api-key': '7d0d1e1e5b59da84cd4974395e764b0a36894318',
      'content-type': 'application/json'
    };
    $.toast({
      icon: 'info',
      heading: '开始切换，请稍等...',
      position: 'top-right',
      stack: false,
      hideAfter: 1e4
    });

    fetch(`https://redmine.saybot.net/issues/${id}.json`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        issue: { status_id }
      })
    }).then((res) => {
      $.toast({
        icon: 'success',
        heading: `已经标记为${STATUS_MAP[status_id]}`,
        position: 'top-right',
        stack: false,
        hideAfter: 1000
      });
      window.location.reload();
    });
  });

  $('#gitmsg').click(function () {
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

  $('#gitflow').click(function () {
    var re = /[._()-]/g;
    // var version = nx.kebabCase(fixed_version.replace(re, ''));
    var text = `redmine-${GIT_BRANCH_MAP[issue_bug] || 'issue'}-${id}`;
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
});
