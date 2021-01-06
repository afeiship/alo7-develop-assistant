/**
 * @description
 * kellis-ng 的一些辅助功能
 * 1. 复制 course-uuid
 */

$(document).ready(() => {
  var docUrl = document.URL;
  if (!docUrl.includes('kellis-ng.')) return false;

  var App = nx.declare({
    methods: {
      start() {
        var list = $('#contentContainer')
          .find('[class^="Course__ContentLeftList"]')
          .find('[data-component="react-card"]');
        var $item = list.eq(0);
        var uuid = $item.data('uuid');
        $item
          .find('.title')
          .css({ display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' });
        $item
          .find('.title')
          .append(
            `<button data-uuid="${uuid}" data-action="copy-course-uuid" class="gm-btn is-small gm-btn-default">🤡</button>`
          );

        $('[data-action="copy-course-uuid"]').click((evt) => {
          gmsdk.setClipboard(uuid);
          $.toast({
            icon: 'success',
            heading: '复制成功',
            position: 'top-right',
            stack: false,
            hideAfter: 1000
          });
          evt.stopPropagation();
        });
      }
    }
  });

  nx.waitToDisplay('#contentContainer .alo7-pagination', 1000, (el) => {
    var app = new App();
    app.start();
  });
});
