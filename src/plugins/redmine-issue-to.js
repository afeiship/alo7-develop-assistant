$(document).ready(function () {
  var host = location.host;
  if (host !== 'redmine.saybot.net') return;
  const target = $('#header h1');
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

  target.append(`
    <button data-action="issue-create" type="button" class="gm-btn gm-btn-primary">一键创建Issues</button>
  `);

  $('[data-action="issue-create"]').click(async function (inEvent) {
    const text = await navigator.clipboard.readText();
    const issues = nx.parse(text);
    if (!Array.isArray(issues)) return;
    console.log('create issues:', JSON.stringify(issues, null, 2));
    for (const issue of issues) issueCreate(issue);
    $.toast({
      icon: 'success',
      heading: '操作成功~',
      position: 'top-right',
      stack: false,
      hideAfter: 1000
    });
  });
});
