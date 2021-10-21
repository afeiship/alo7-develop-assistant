$(document).ready(function () {
  var docUrl = document.URL;
  if (!docUrl.includes('git.saybot.net')) return false;
  // 1. App
  const App = nx.declare({
    methods: {
      start: function () {
        this.inertToolbar();
        this.bindEvents();
      },
      inertToolbar: function () {
        $('.home-panel-title-row').append(
          ` <button
            style="margin:6px 0 0 20px; height: 50px; "
            data-action="fill-elements"
            type="button"
            class="gm-btn gm-btn-primary">
            <svg class="s16" data-testid="rocket-icon"><use xlink:href="/assets/icons-81bca028cfa382a852fa2c8a6dfb4fb2b7467093d38f9fe9a07a519ca785299c.svg#rocket"></use></svg>
            回滚请点我
          </button> `
        );
      },
      bindEvents: function () {
        $('body').on('click', '[data-action="fill-elements"]', function () {
          window.open(
            'https://git.saybot.net/ACE/kellis/kellis-ng-front/-/pipelines?page=1&scope=all&ref=master&username=aric.zheng&status=success',
            '_blank'
          );
        });
      }
    }
  });

  // 2. wait to display
  nx.waitToDisplay(`.read-more-container`, 1000, (el) => {
    var app = new App();
    app.start();
  });
});
