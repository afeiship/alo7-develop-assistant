/**
 * @description
 * 针对 bio-iframe 的子级项目，方便在本地调试项目
 * 1. 从 __dev_url__ 中取得缓存的 URL 地址
 * 2. 将 iframe 的 src 设置为第1步的 URL 结果
 */

$(document).ready(() => {
  var docUrl = document.URL;
  if (!docUrl.includes('cloud.beta.aigene.org.cn')) return false;

  const DEV_URL = 'gm.dev_url';

  var App = nx.declare({
    properties: {
      devUrl: {
        set: function (val) {
          localStorage.setItem(DEV_URL, val);
        },
        get: function () {
          return localStorage.getItem(DEV_URL) || '';
        }
      },
      ifm: function () {
        return document.querySelector('iframe.bio-iframe');
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
        $('body').on('submit', '[data-action="submit"]', function (inEvent) {
          inEvent.preventDefault();
          self.inject();
        });

        $('body').on('dblclick', '[data-action="input"]', function (e) {
          this.select();
        });

        $('body').on('click', '[data-action="get-iframe"]', function (e) {
          gmsdk.setClipboard(self.ifm.src);
          $.toast({
            icon: 'success',
            heading: '已为你复制到剪贴板',
            position: 'top-right',
            stack: false,
            hideAfter: 1000
          });
        });

        $('body').on('click', '[data-action="token"]', function (e) {
          gmsdk.setClipboard(localStorage.getItem('COMMON_SSO_TOKEN'));
          $.toast({
            icon: 'success',
            heading: '已为你复制到剪贴板',
            position: 'top-right',
            stack: false,
            hideAfter: 1000
          });
        });

        $('body').on('input', '[data-action="input"]', function (inEvent) {
          self.devUrl = inEvent.target.value;
        });

        $('body').on('click', '[data-action="reset"]', function (inEvent) {
          localStorage.removeItem(DEV_URL);
          window.location.reload();
        });
      },
      initElements() {
        $('[class^="MainFrame___Styled"]').eq(1).prepend(`
          <form class="gm-row gm-row-center m-10 ml-10_ ml_" data-action="submit" style="width: auto;">
            <span class="gm-tag gm-tag-positive">v __VERSION__</span>
            <input type="search" data-action="input" value="${this.devUrl}" class="gm-form-control" placeholder="请输入你的开发URL地址">
            <button class="gm-btn gm-btn-primary is-large" data-action="inject">注入URL</button>
            <button type="button" class="gm-btn gm-btn-default is-large" data-action="reset">重置</button>
            <button type="button" class="gm-btn gm-btn-default is-large" data-action="get-iframe">获取iframe地址</button>
            <button type="button" class="gm-btn gm-btn-warning is-large" data-action="token">获取TOKEN</button>
          </form>
        `);
      },
      syncIframe() {
        if (this.devUrl) this.ifm.src = this.devUrl;
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
