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

        list.each((index, item) => {
          var $item = $(item);
          var uuid = $item.data('uuid');
          $item.find('.title').css({ display: 'flex' });
          $item.find('.title').addClass('gm-row gm-row-center gm-row-justify-between');
          $item.find('.title').append(
            `<button
                  data-uuid="${uuid}"
                  data-action="copy-course-uuid"
                  class="gm-btn is-small gm-btn-default">🐠</button>`
          );
        });

        $('[data-action="copy-course-uuid"]').click((evt) => {
          var text = $(evt.target).data('uuid');
          gmsdk.setClipboard(text);
          $.toast({
            icon: 'success',
            heading: `复制成功`,
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
