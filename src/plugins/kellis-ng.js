/**
 * @description
 * kellis-ng 的一些辅助功能
 * 1. 复制 token
 * 2.
 */

$(document).ready(() => {
  var attachElement =
    '<button id="copy-token" class="alo7-btn alo7-btn-primary">CopyToken</button>';
  var App = nx.declare({
    methods: {
      start() {
        var target = $('.alo7-layout-header .alo7-dropdown-trigger');
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
