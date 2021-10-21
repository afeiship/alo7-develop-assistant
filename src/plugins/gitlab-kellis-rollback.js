/**
 * @description
 */

$(document).ready(function () {
  var docUrl = document.URL;
  if (!docUrl.includes('git.saybot.net/ACE/kellis/kellis-ng-front')) return false;
  const btnStyles =
    'display: block; margin:10px 0 0 0; width: 140px; position:relative; z-index:10;" class="gm-btn gm-btn-default';
  // 1. App
  const App = nx.declare({
    methods: {
      start: function () {
        this.renderList();
      },
      piplines: function () {
        return fetch(
          '/api/v4/projects/1719/pipelines?page=1&ref=master&username=aric.zheng&status=success',
          {
            headers: { 'PRIVATE-TOKEN': 'PbCriht1U4PxQrYBnEed' }
          }
        ).then((r) => r.json());
      },
      renderList: function () {
        this.piplines().then((list) => {
          $('.gl-responsive-table-row').each(function (index, item) {
            const el = $(item);
            const data = list[index];
            const stdData = nx.Date.format(nx.get(data, 'created_at'));
            if (!stdData) return;

            el.find('.qa-status-badge').after(
              `<a href="${nx.get(data, 'web_url')}" style="${btnStyles}">${stdData}</a>`
            );
          });
        });
      }
    }
  });

  // 2. wait to display
  nx.waitToDisplay(`.js-pipelines-tab-all`, 1000, (el) => {
    var app = new App();
    app.start();
  });
});
