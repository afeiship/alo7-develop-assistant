$(document).ready(function () {
  // 1. App
  const App = nx.declare({
    methods: {
      start: function () {
        this.inertToolbar();
        this.findElements();
        this.bindEvents();
      },
      inertToolbar: function () {
        $('.el-dialog__header').append(
          ` <button data-action="fill-elements" type="button" class="gm-btn gm-btn-positive is-large">一键填表</button> `
        );
      },
      bindEvents: function () {
        const self = this;
        $('body').on('click', '[data-action="fill-elements"]', function () {
          self.findElements();
        });
      },
      findElements: function () {
        this.fillEditor('发布内容', 'xxx-01');
        this.fillEditor('数据库修改信息', '-');
        this.fillEditor(
          '发布步骤',
          '<p>1. 合并代码: staging -&gt; master</p><p>2. 等ci运行完成，确认后端发布状态ready</p><p>3. 手动点击deploy</p>'
        );
        this.fillEditor(
          '回滚方案、步骤',
          '<p>1. 找到这个回滚到上次记录: <a href="https://git.saybot.net/ACE/kellis/kellis-ng-front/-/pipelines?page=1&amp;scope=all&amp;ref=master&amp;username=aric.zheng&amp;status=success" rel="noopener noreferrer" target="_blank">https://git.saybot.net/ACE/kellis/kellis-ng-front/-/pipelines?page=1&amp;scope=all&amp;ref=master&amp;username=aric.zheng&amp;status=success</a></p><p>2. 执行 deploy</p>'
        );
        this.fillEditor('影响范围', '<p>仅影响前端</p>');
      },
      fillEditor: function (inFind, inContent) {
        $(`.el-form-item__label:contains('${inFind}')`)
          .next('.el-form-item__content')
          .find('.quill-editor .ql-editor')
          .html(inContent);
      }
    }
  });

  // 2. wait to display
  nx.waitToDisplay(`.quill-editor`, 1000, (el) => {
    var app = new App();
    app.start();
  });
});
