/**
 * @description
 * 一键复制 release-notes
 * https://confluence.alo7.cn/pages/viewpage.action?pageId=61292623
 */

$(document).ready(() => {
  var author = $('.page-metadata .author').text();
  if (!author.includes('Tinny Tao')) return;

  // console.log('rnotes ready!');
  var target = $('h1:contains("功能描述")');
  target.css({ display: 'flex', 'align-items': 'center', 'justify-content': 'space-between' });
  target.append(
    '<button id="rnotes-copy" class="aui-button aui-button-primary">Release Notes</button>'
  );

  var tw = target.next('.table-wrap');
  var records = tw.find('.relative-table tbody tr');
  var texts = [];

  records.each((idx, record) => {
    var text = $(record).find('td:eq(1)').text();
    text && texts.push(`${idx}. ${text}`);
  });

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
});
