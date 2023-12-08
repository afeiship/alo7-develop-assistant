/**
 * @description
 * 1. 添加一个按钮，进行填表操作
 * 2. 填表内容在 fill_content 里配置的
 */

$(document).ready(function () {
  var docUrl = document.URL;
  if (!docUrl.includes('download.sdclient.saybot.net')) return false;

  // 1. App
  const App = nx.declare({
    methods: {
      start: function () {
        this.fulltitle();
      },
      fulltitle() {
        const rows = $('#list tr').slice(0, 8);
        rows.each((index, row) => {
          const anchors = $(row).find('td a');
          // console.log('anchors: ', anchors);
          if (index > 1) {
            $(row).css('background-color', '#5bd46d');
            const target = anchors.get(0);
            const filename = $(target).attr('href');
            const isMd5File = filename.includes('.md5');
            $(target).text(filename);
            if (isMd5File) {
              const md5Code = filename.split('.').slice(-2, -1)[0];
              $(target).click((e) => {
                e.preventDefault();
                gmsdk.setClipboard(md5Code);
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
      }
    }
  });

  // 2. wait to display
  nx.waitToDisplay(`table#list`, 1000, (el) => {
    var app = new App();
    app.start();
  });
});
