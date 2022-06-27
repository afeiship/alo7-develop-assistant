/**
 * @description
 * kellis-ng 的一些辅助功能
 * 1. 复制 token
 * 2.
 */

$(document).ready(() => {
  var docUrl = document.URL;
  if (!docUrl.includes('bio-platform-frontend.beta')) return false;

  var App = nx.declare({
    methods: {
      start() {
        this.iniEvents();
        this.initElements();
        this.syncIframe();
      },
      iniEvents() {
        var self = this;
        $('body').on('submit', '[data-action="form"]', function (inEvent) {
          inEvent.preventDefault();
          self.inject();
        });

        $('body').on('input', '#dev-input', function (inEvent) {
          localStorage.setItem('__dev_url__', inEvent.target.value);
        });

        $('body').on('click', '[data-action="reset"]', function (inEvent) {
          console.log('click reset.', inEvent);
          localStorage.removeItem('__dev_url__');
          window.location.reload();
        });
      },
      initElements() {
        const devUrl = localStorage.getItem('__dev_url__');
        $('[class^="Header___StyledHeader"]').prepend(`
          <form class="gm-row gm-row-center" data-role="form">
            <input type="text" id="dev-input" value="${devUrl}" class="gm-form-control" placeholder="请输入你的开发URL地址">
            <button style="margin-left: 10px" class="ant-btn ant-btn-primary" data-action="inject">注入URL</button>
            <button type="button" style="margin-left: 10px" class="ant-btn ant-btn-default" data-action="reset">重置</button>
          </form>
        `);
      },
      syncIframe() {
        const devUrl = localStorage.getItem('__dev_url__');
        if (devUrl) document.querySelector('iframe').src = devUrl;
      },
      inject() {
        const el = document.getElementById('dev-input');
        localStorage.setItem('__dev_url__', el.value);
        this.syncIframe();
        window.location.reload();
      }
    }
  });

  nx.waitToDisplay('iframe', 1000, (el) => {
    var app = new App();
    app.start();
  });
});
