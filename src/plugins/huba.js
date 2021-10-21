/**
 * @description
 * 1. 添加一个按钮，进行填表操作
 * 2. 填表内容在 fill_content 里配置的
 */

$(document).ready(function () {
  var docUrl = document.URL;
  if (!docUrl.includes('huba.saybot.net')) return false;

  const FILL_CONTENT = {
    '发布内容': 'https://confluence.alo7.cn/pages/viewpage.action?pageId=52550787',
    '数据库修改信息': '-',
    '影响范围': '<p>仅影响前端</p>',
    '回滚方案、步骤':
      '<p>1. 找到这个回滚到上次记录: <a href="https://git.saybot.net/ACE/kellis/kellis-ng-front/-/pipelines?page=1&amp;scope=all&amp;ref=master&amp;username=aric.zheng&amp;status=success" rel="noopener noreferrer" target="_blank">https://git.saybot.net/ACE/kellis/kellis-ng-front/-/pipelines?page=1&amp;scope=all&amp;ref=master&amp;username=aric.zheng&amp;status=success</a></p><p>2. 执行 deploy</p>',
    '发布步骤':
      '<p>1. 合并代码: staging -&gt; master</p><p>2. 等ci运行完成，确认后端发布状态ready</p><p>3. 手动点击deploy</p>'
  };

  // 1. App
  const App = nx.declare({
    methods: {
      start: function () {
        this.inertToolbar();
        this.bindEvents();
      },
      inertToolbar: function () {
        $('.el-dialog__header').css({ display: 'flex', alignItems: 'center' });
        $('.el-dialog__header').append(
          `<button
            style="margin-left: 10px;"
            data-action="fill-elements"
            type="button"
            class="gm-btn gm-btn-positive">
            一键填表
          </button>`
        );
      },
      bindEvents: function () {
        $('body').on('click', '[data-action="fill-elements"]', this.fillElements.bind(this));
      },
      fillElements: function () {
        nx.forIn(FILL_CONTENT, this.fillEditor, this);
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
