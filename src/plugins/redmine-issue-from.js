$(document).ready(function () {
  console.log('ready');
  var host = location.host;
  var ALO7_HOST = 'confluence.alo7.cn';
  var author = $('.page-metadata .author').text();
  if (ALO7_HOST !== host || !author.includes('Tinny Tao')) return;

  var target = $('h1:contains("功能描述")');
  var tw = target.next('.table-wrap');
  var records = tw.find('.relative-table tbody tr');
  var data = [];

  records.each((idx, record) => {
    var text = $(record).find('td:eq(1)').text();
    text && data.push(text);
  });

  const tableRows = data.map((text, idx) => {
    const id = `rdm-issue-${idx}`;
    const labelStyle = 'padding:5px; display:block;';
    return `
      <tr>
        <td><input name="redmine-issue" data-index=${idx} id="${id}" type="checkbox" /></td>
        <td><label style="${labelStyle}" for="${id}">${text}</label></td>
      </tr>`;
  });

  target.after(`
    <form style="border:1px solid #ccc; margin: 10px auto;">
      <table class="gm-table gm-table-striped">
        <thead>
          <tr>
            <td align="center" width="20">
              <div class="gm-row gm-row-center">
                <input id="batch-checked" type="checkbox" />
                <label id="batch-select" for="batch-checked">
                  <strong>创建?</strong>
                </label>
              </div>
            </td>
            <td><strong>功能点</strong></td>
          </tr>
        </thead>
        <tbody>
          ${tableRows.join('\n')}
        </tbody>
      </table>
      <footer style="padding:10px;">
        <button type="button" data-action="unselect-all" class="gm-btn gm-btn-primary">反选</button>
        <button type="button" data-action="issues-create" class="gm-btn gm-btn-negative">一键复制JSON</button>
      </footer>
    </form>
  `);

  // 全选
  $('#batch-select').click((e) => {
    e.stopPropagation();
    const checked = $('#batch-select').prev('input').prop('checked');
    $('[name="redmine-issue"]').prop('checked', !checked);
  });

  // 反选
  $('[data-action="unselect-all"]').click((e) => {
    $('[name="redmine-issue"]').each(function (_, el) {
      const itemChecked = $(el).prop('checked');
      $(el).prop('checked', !itemChecked);
    });
  });

  // 创建
  $('[data-action="issues-create"]').click((e) => {
    const items = $('[name="redmine-issue"]:checked');
    const values = nx.slice(items).map((item) => {
      const idx = $(item).data('index');
      return { index: idx, text: data[idx] };
    });
    gmsdk.setClipboard(JSON.stringify(values));
    $.toast({
      icon: 'success',
      heading: '复制成功',
      position: 'top-right',
      stack: false,
      hideAfter: 1000
    });
  });
});
