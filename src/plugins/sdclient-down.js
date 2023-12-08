/**
 * @description
 * 1. 到这个地址 http://download.sdclient.saybot.net/sdclient-output
 * 2. 将最新的5个下载地址，标记为绿色
 * 3. 将 .md5 后缀的文件，copy 出 md5 值
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
        const rows = $('#list tr').slice(0, 7);
        if (rows.length < 7) return false;
        rows.each((index, row) => {
          const anchors = $(row).find('td a');
          // console.log('anchors: ', anchors);
          if (index > 1) {
            $(row).css('background-color', '#5bd46d');
            const target = anchors.get(0);
            const filename = $(target).attr('href');
            const isMd5File = filename.includes('.md5');
            const $target = $(target);
            $target.text(filename);
            if (isMd5File) {
              const md5Code = filename.split('.').slice(-2, -1)[0];
              $target.click((e) => {
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
            } else {
              // console.log('filename: ', $target[0].href);
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
