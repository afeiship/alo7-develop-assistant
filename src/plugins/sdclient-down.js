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
        this.maxRows = parseInt(localStorage.getItem('gm_max_rows')) || 5;
        this.indexedTable();
        this.styledTable();
        this.fulltitle();
        this.checkStore();
      },
      indexedTable() {
        $('#list tr').each((_, row) => {
          $(row).prepend(`<td>-</td>`);
        });
      },
      styledTable() {
        $('#list').css({ 'font-size': '14px' });
        $('col').eq(0).attr('width', '2%');
        $('col').eq(1).attr('width', '78%');
        $('col').eq(2).attr('width', '10%');
        $('col').eq(3).attr('width', '10%');
      },
      fulltitle() {
        const maxRows = this.maxRows + 2;
        const rows = $('#list tr').slice(0, maxRows);
        if (rows.length < maxRows) return false;
        rows.each((index, row) => {
          const anchors = $(row).find('td a');
          const orderedIndex = (index - 2) % 5;
          const firstCol = $(row).find('td').eq(0);
          firstCol.text(orderedIndex + 1);
          if (index > 1) {
            const color = orderedIndex === 0 ? '#6eb4f7' : '#5bd46d';
            $(row).css('background-color', color);
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
            }
          }
        });
      },
      checkStore() {
        const oldMaxRows = localStorage.getItem('gm_max_rows');
        if (!oldMaxRows) {
          localStorage.setItem('gm_max_rows', this.maxRows);
        }
      }
    }
  });

  // 2. wait to display
  nx.waitToDisplay(`table#list`, 1000, (el) => {
    var app = new App();
    app.start();
  });
});
