/**
 * @description
 * 一键复制 release-notes
 * /pages/viewpage.action?pageId=52532308
 */

$(document).ready(() => {
  var author = $('.page-metadata .author').text();
  if (!author.includes('Tinny Tao')) return;

  const issueCreate = (inValue) => {
    // 【前端】issue--测试一下
    const idx = String(inValue.index + 1).padStart(2, '0');
    const subject = `【前端】issue-${idx}.${inValue.text}`;
    const date = nx.Date.format(null, 'date');
    const data = {
      issue: {
        project_id: 155,
        tracker_id: 5,
        subject: subject,
        status_id: 2,
        was_default_status: 2,
        priority_id: 4,
        assigned_to_id: 858,
        fixed_version_id: 3277,
        start_date: date
      }
    };

    fetch('https://redmine.saybot.net/issues.json', {
      method: 'POST',
      headers: {
        'x-redmine-api-key': '7d0d1e1e5b59da84cd4974395e764b0a36894318',
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };

  // console.log('rnotes ready!');
  var target = $('h1:contains("功能描述")');
  target.css({ display: 'flex', 'align-items': 'center', 'justify-content': 'space-between' });
  target.append(
    '<button id="rnotes-copy" class="aui-button aui-button-primary">Release Notes</button>'
  );

  var tw = target.next('.table-wrap');
  var records = tw.find('.relative-table tbody tr');
  var texts = [];
  var data = [];

  records.each((idx, record) => {
    var text = $(record).find('td:eq(1)').text();
    text && texts.push(`${idx + 1}. ${text}`);
    text && data.push(text);
  });

  const tableRows = texts.map((text, idx) => {
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

  $('#rnotes-copy').click(() => {
    gmsdk.setClipboard(texts.join('\n'));
    $.toast({
      icon: 'success',
      heading: '复制成功',
      position: 'top-right',
      stack: false,
      hideAfter: 1000
    });
  });

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
