/**
 * @description
 * kellis-ng 的一些辅助功能
 * 1. 复制 token
 * 2.
 */

$(document).ready(() => {
  var docUrl = document.URL;
  if (!docUrl.includes('bio-platform-frontend.beta')) return false;

  const DEV_URL = '__dev_url__';

  var App = nx.declare({
    properties: {
      devUrl: {
        set: function (val) {
          localStorage.setItem(DEV_URL, val);
        },
        get: function () {
          return localStorage.getItem(DEV_URL);
        }
      }
    },
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

        $('body').on('input', '[data-action="input"]', function (inEvent) {
          self.devUrl = inEvent.target.value;
        });

        $('body').on('click', '[data-action="reset"]', function (inEvent) {
          console.log('click reset.', inEvent);
          localStorage.removeItem(DEV_URL);
          window.location.reload();
        });
      },
      initElements() {
        $('[class^="Header___StyledHeader"]').prepend(`
          <form class="gm-row gm-row-center" data-role="form">
            <input type="text" data-action="input" value="${this.devUrl}" class="gm-form-control" placeholder="请输入你的开发URL地址">
            <button style="margin-left: 10px" class="gm-btn gm-btn-primary is-large" data-action="inject">注入URL</button>
            <button type="button" style="margin-left: 10px" class="gm-btn gm-btn-default is-large" data-action="reset">重置</button>
          </form>
        `);
      },
      syncIframe() {
        if (this.devUrl) document.querySelector('iframe').src = this.devUrl;
      },
      inject() {
        const el = document.querySelector('[data-action="input"]');
        this.devUrl = el.value;
        this.syncIframe();
        window.location.reload();
      }
    }
  });

  nx.waitToDisplay('iframe', 1000, () => {
    var app = new App();
    app.start();
  });
});
