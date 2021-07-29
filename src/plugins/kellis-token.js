/**
 * @description
 * kellis-ng 的一些辅助功能
 * 1. 复制 token
 * 2.
 */

$(document).ready(() => {

  var docUrl = document.URL;
  if (!docUrl.includes('kellis-ng.')) return false;

  var attachElement = '<button id="copy-token" class="ant-btn ant-btn-primary">复制Token</button>';
  var App = nx.declare({
    methods: {
      start() {
        var target = $('[class^="Dashboard__HeaderOption"]');
        target.after(attachElement);
        this.attachEvents();
      },
      attachEvents() {
        $('#copy-token').click(() => {
          var text = alo7Account.token;
          gmsdk.setClipboard(text);
          $.toast({
            icon: 'success',
            heading: '复制成功',
            position: 'top-right',
            stack: false,
            hideAfter: 1000
          });
        });
      }
    }
  });

  setTimeout(() => {
    var app = new App();
    app.start();
  }, 1000);
});
