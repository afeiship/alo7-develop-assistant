/**
 * @description
 * 统计 ehr 有效工时
 *
 */

$(document).ready(() => {
  var POINT1 = '18:30:00';
  var POINT2 = '19:30:00';
  var docUrl = document.URL;
  var ignoreTimes = {
    am: ['12:00', '13:00'],
    pm: ['18:30', '19:30']
  };

  var TIPS = [
    '1. 需要登录自己的 EHR',
    '2. 使用F12打开开发者工具',
    '3. 切换到 Console 这个 Tab',
    '4. 刷新页面，等待统计结果'
  ].join('<br/>');

  if (!docUrl.includes('hr.saybot.net')) return false;
  var isWeekEnd = (inDate) => {
    var day = inDate.getDay();
    return day === 0 || day === 6;
  };

  var App = nx.declare({
    statics: {
      help() {
        $.toast({
          icon: 'info',
          heading: 'EHR小助手',
          position: 'top-right',
          stack: false,
          hideAfter: 50 * 1000,
          text: TIPS
        });
      }
    },
    methods: {
      start() {
        if (docUrl.includes('/Alo7HR/login')) return false;

        console.log('🍏 等待统计....');

        var params = this.params();
        var range = nx.rangeDate.apply(null, params);
        var weekends = ['工作 🤣', '周末 😎'];

        Promise.all(range.map((item) => this.api(item))).then((res) => {
          this.stat = res
            .map((current) => {
              if (current.length < 2) return null;
              var start = current[0];
              var end = current[current.length - 1];
              var subed = this.sub(end.CARDTIME);
              var startDate = new Date(start.CARDTIME);
              var duration = new Date(end.CARDTIME) - startDate - subed;
              var ot = this.ottime(startDate, duration);
              return {
                start: start.CARDTIME,
                end: end.CARDTIME,
                subed: subed,
                weekday: !isWeekEnd(startDate),
                duration,
                ot
              };
            })
            .filter(Boolean);

          var stats = this.stat.map((item) => {
            return {
              上班: item.start,
              下班: item.end,
              工作日: weekends[Number(!item.weekday)],
              扣除: this.humanize(item.subed),
              实际加班: this.humanize(item.ot),
              实际工作: this.humanize(item.duration)
            };
          });

          var ots = this.stat.map((item) => item.ot);
          var durs = this.stat.map((item) => item.duration);

          stats.push({
            上班: `开始时间: ${params[0]}`,
            下班: `结束时间: ${params[1]}`,
            工作日: 0,
            扣除: 0,
            实际加班: this.humanize(nx.sum(ots)),
            实际工作: this.humanize(nx.sum(durs))
          });

          console.table(stats);
        });
      },
      ottime(inStartDate, inDuration) {
        var worked = isWeekEnd(inStartDate) ? 0 : 8 * 3600 * 1000;
        return inDuration - worked;
      },
      humanize(inValue) {
        var { hour, minute } = nx.timeFormat(inValue);
        return `${hour}小时${parseInt(parseFloat(`0.${minute}`) * 60)}分钟`;
      },
      params() {
        var date = new Date();
        var year = date.getFullYear();
        var day = date.getDate();
        var month = date.getMonth();
        var step = day <= 15 ? 0 : 1;
        return [`${year}-${month + step}-16`, `${year}-${month + step + 1}-15`, true];
      },
      sub(inEndStr) {
        var [date, _] = inEndStr.split(' ');
        var point1 = new Date(`${date} ${POINT1}`);
        var point2 = new Date(`${date} ${POINT2}`);
        var unit = 1 * 60 * 60 * 1000;
        var end = new Date(inEndStr);
        if (end > point2) return 2 * unit;
        if (end > point1 && end < point2) return end - point1 + unit;
        if (end < point1) return 1 * unit;
      },
      apiKey() {
        var el = $('.essPolication2 .submenu li').eq(1);
        return el.attr('id');
      },
      api(inDate) {
        var key = this.apiKey();
        var url = `https://hr.saybot.net:8443/Alo7HR/ajax/function/alist!${key}.SE0302`;
        return gmsdk.http.post({
          url,
          data: {
            appParam: { TERM: inDate },
            appFnKey: 'SE0301',
            formData: {}
          }
        });
      }
    }
  });

  // 1. tips
  App.help();

  // 2. wait to display
  nx.waitToDisplay('#portal_ehr', 1000, (el) => {
    var app = new App();
    app.start();
  });
});
