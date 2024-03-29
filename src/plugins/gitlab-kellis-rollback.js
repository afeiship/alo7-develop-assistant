/**
 * @description
 */

$(document).ready(function () {
  var docUrl = document.URL;
  if (!docUrl.includes('git.saybot.net/ACE/kellis/kellis-ng-front')) return false;
  if (!docUrl.includes('scope=all&ref=master&username=aric.zheng&status=success')) return false;
  const getAPM = (inDate) => {
    const apm = inDate.toLocaleString([], { hour12: true }).slice(-2);
    const ampm = apm === 'AM' ? '上午' : '下午';
    return { en: apm, cn: ampm };
  };

  const btnStyles = `
    display: flex;
    align-items: center;
    margin:10px 0 0 0;
  `;
  // 1. App
  const App = nx.declare({
    methods: {
      start: function () {
        this.renderList();
      },
      piplines: function () {
        return fetch(
          '/api/v4/projects/1719/pipelines?page=1&ref=master&username=aric.zheng&status=success&order_by=updated_at',
          {
            headers: { 'PRIVATE-TOKEN': 'PbCriht1U4PxQrYBnEed' }
          }
        ).then((r) => r.json());
      },
      renderList: function () {
        this.piplines().then((list) => {
          $('.commit.gl-responsive-table-row').each(function (index, item) {
            const el = $(item);
            const data = list[index];
            const date = nx.Date.create(nx.get(data, 'created_at'));
            const stdData = nx.Date.format(date);
            const stdWeekDay = nx.Weeks.day(date.getDay(), 'cn'); // '一'
            const APM = getAPM(date);
            const url = nx.get(data, 'web_url');
            el.before(
              `<a href="${url}" style="${btnStyles}" class="gm-btn gm-btn-default is-large">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 40 40"><g fill="#8F8F8F" fill-rule="evenodd"><path d="M29.513 10.134A15.922 15.922 0 0 0 23 7.28V6h2.993C26.55 6 27 5.552 27 5V2a1 1 0 0 0-1.007-1H14.007C13.45 1 13 1.448 13 2v3a1 1 0 0 0 1.007 1H17v1.28C9.597 8.686 4 15.19 4 23c0 8.837 7.163 16 16 16s16-7.163 16-16c0-3.461-1.099-6.665-2.967-9.283l1.327-1.58a2.498 2.498 0 0 0-.303-3.53 2.499 2.499 0 0 0-3.528.315l-1.016 1.212zM20 34c6.075 0 11-4.925 11-11s-4.925-11-11-11S9 16.925 9 23s4.925 11 11 11z"></path><path d="M19 21h-4.002c-.552 0-.998.452-.998 1.01v1.98c0 .567.447 1.01.998 1.01h7.004c.274 0 .521-.111.701-.291a.979.979 0 0 0 .297-.704v-8.01c0-.54-.452-.995-1.01-.995h-1.98a.997.997 0 0 0-1.01.995V21z"></path></g></svg>
              <em class="gm-tag gm-tag-positive">#${
                index + 1
              }.</em> 上次发版时间: 星期${stdWeekDay} ${APM.cn} ${stdData} </a>`
            );
          });
        });
      }
    }
  });

  // 2. wait to display
  nx.waitToDisplay(`.js-pipelines-tab-all`, 1000, (el) => {
    var app = new App();
    app.start();
  });
});
