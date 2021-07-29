$(document).ready(function () {
  var host = location.host;
  if (host !== 'redmine.saybot.net') return;
  const target = $('#header h1');
  const headers = {
    'x-redmine-api-key': '7d0d1e1e5b59da84cd4974395e764b0a36894318',
    'content-type': 'application/json'
  };
  const issueCreate = (inValue, inVersion) => {
    // 【前端】issue--测试一下
    const idx = String(inValue.index + 1).padStart(2, '0');
    const subject = `【前端】${idx}. ${inValue.text}`;
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
        fixed_version_id: inVersion,
        start_date: date
      }
    };

    fetch('https://redmine.saybot.net/issues.json', {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
  };

  const versionQuery = () => {
    fetch('https://redmine.saybot.net/projects/155/versions.json', {
      method: 'GET',
      headers
    })
      .then((r) => r.json())
      .then((res) => {
        const el = $('#version-selector');
        const versions = res.versions;
        const optstr = versions.map((ver) => `<option value="${ver.id}">${ver.name}</option>`);
        el.html(optstr);
        el.val(versions[versions.length - 1].id);
      });
  };

  target.append(`
    <div style="display: inline-flex;" class="row-center">
      <select data-action="version-select" style="margin:0 10px;" class="gm-form-control" id="version-selector"></select>
      <button data-action="issue-create" type="button" class="gm-btn gm-btn-primary">一键创建Issues</button>
    </div>
  `);

  versionQuery();

  $('[data-action="issue-create"]').click(async function (inEvent) {
    const ERR_MSG = '无合适的task可以创建';
    const text = await navigator.clipboard.readText();
    const $version = $('#version-selector');
    const issues = nx.parse(text);
    if (!Array.isArray(issues))
      return $.toast({ icon: 'error', position: 'top-right', heading: ERR_MSG });
    const ver = $version.val();
    for (const issue of issues) issueCreate(issue, ver);
    $.toast({
      icon: 'success',
      heading: '操作成功~',
      position: 'top-right',
      stack: false,
      hideAfter: 1000
    });
  });

});
