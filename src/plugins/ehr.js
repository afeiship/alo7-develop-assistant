/**
 * @description
 * 统计 ehr 有效工时
 */

$(document).ready(() => {
  var POINT1 = '18:30:00';
  var POINT2 = '19:30:00';
  var docUrl = document.URL;
  var TIPS = [
    '1. 需要登录自己的 EHR',
    '2. 使用F12打开开发者工具',
    '3. 切换到 Console 这个 Tab',
    '4. 刷新页面，等待统计结果'
  ].join('<br/>');

  if (!docUrl.includes('hr.saybot.net')) return false;

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
        var sum = 0;
        var result;
        this.stat = [];
        Promise.all(range.map((item) => this.api(item))).then((res) => {
          sum = res.reduce((result, current) => {
            if (!current.length) return result;
            var start = current[0];
            var end = current[current.length - 1];
            var subed = this.sub(end.CARDTIME);
            var duration = new Date(end.CARDTIME) - new Date(start.CARDTIME) - subed;
            this.stat.push({
              上班: start.CARDTIME,
              下班: end.CARDTIME,
              扣除: this.val(subed),
              实际工时: this.humanize(this.val(duration))
            });
            return duration + result;
          }, sum);

          result = this.val(sum);

          this.stat.push({
            上班: `开始时间: ${params[0]}`,
            下班: `结束时间: ${params[1]}`,
            扣除: 0,
            实际工时: this.humanize(result)
          });

          console.table(this.stat);
        });
      },
      val(inValue) {
        return parseFloat(inValue / 1000 / 60 / 60).toFixed(2);
      },
      humanize(inValue) {
        var [hour, minute] = inValue.split('.');
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
