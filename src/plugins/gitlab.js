/**
 * @description
 * 1. 添加一个按钮到 `kellis-ng` 项目的代码界面: `https://git.saybot.net/ACE/kellis/kellis-ng-front`
 * 2. 点击可以到最新的线上运行代码的筛选界面,找到上次发布，可以点击 `deploy` 进行回滚操作
 * 3. 在 merge_request 界面添加如下功能：
 *   1. develop -> beta
 *   2. to-beta
 *   3. beta -> staging
 *   4. staging -> master
 */

$(document).ready(function () {
  var docUrl = document.URL;
  if (!docUrl.includes('git.saybot.net/ACE/kellis/kellis-ng-front')) return false;
  // 1. App
  const App = nx.declare({
    properties: {
      isMergeRequest: function () {
        return docUrl.endsWith('-/merge_requests/new');
      }
    },
    methods: {
      start: function () {
        this.inertToolbar();
        this.bindEvents();

        if (this.isMergeRequest) {
          this.bindMrEvents();
          this.insertMRToolbar();
        }
      },
      inertToolbar: function () {
        $('.home-panel-title-row').append(
          ` <button
            style="margin:6px 0 0 20px; height: 50px; "
            data-action="fill-elements"
            type="button"
            class="gm-btn gm-btn-primary">
            <svg class="s16" data-testid="rocket-icon"><use xlink:href="/assets/icons-81bca028cfa382a852fa2c8a6dfb4fb2b7467093d38f9fe9a07a519ca785299c.svg#rocket"></use></svg>
            版本回滚请点我
          </button> `
        );
      },
      insertMRToolbar: function () {
        $('#content-body .page-title').append(`
          <div class="gm-mr-toolbar mt-2">
            <button data-action="-beta" class="gm-btn gm-btn-default">any -> beta</button>
            <button data-action="develop-beta" class="gm-btn gm-btn-primary">develop -> beta</button>
            <button data-action="beta-staging" class="gm-btn gm-btn-positive">beta -> staging</button>
            <button data-action="staging-master" class="gm-btn gm-btn-negative">staging -> master</button>
          </div>
        `);
      },
      bindEvents: function () {
        $('body').on('click', '[data-action="fill-elements"]', function () {
          window.open(
            'https://git.saybot.net/ACE/kellis/kellis-ng-front/-/pipelines?page=1&scope=all&ref=master&username=aric.zheng&status=success',
            '_blank'
          );
        });
      },
      bindMrEvents: function () {
        var self = this;
        $('body').on('click', '.gm-mr-toolbar', function (inEvent) {
          const target = $(inEvent.target);
          const action = target.data('action');
          const brs = action.split('-');
          if (action) {
            brs.forEach((br, index) => {
              self.setValue(index, br);
            });
          }

          if (action && brs[0]) {
            $('#new_merge_request').submit();
          }
        });
      },
      setValue: function (inIndex, inValue) {
        const container = $('.card-new-merge-request')
          .eq(inIndex)
          .find('.merge-request-select')
          .eq(1);
        const display = container.find('.dropdown-menu-toggle .dropdown-toggle-text');
        const ipt = container.find('input[type="hidden"]');
        display.text(inValue || 'Select source branch');
        ipt.val(inValue);
      }
    }
  });

  // 2. wait to display
  nx.waitToDisplay(`.logo-text`, 1000, (el) => {
    var app = new App();
    app.start();
  });
});
