/**
 * @description
 * 1. 我是一个模板
 * 2. 你可以用我为所欲为
 */

$(document).ready(function () {
  var docUrl = document.URL;
  if (!docUrl.includes('https://js.work')) return false;

  // 1. App
  const App = nx.declare({
    methods: {
      start: function () {
        this.inertToolbar();
        this.bindEvents();
      }
    }
  });

  // 2. wait to display
  nx.waitToDisplay(`.key-element`, 1000, (el) => {
    var app = new App();
    app.start();
  });
});
