(function () {
  var POINT1 = '18:30:00';
  var POINT2 = '19:30:00';

  var App = nx.declare({
    methods: {
      start() {
        var docUrl = document.URL;
        if (!docUrl.includes('hr.saybot.net')) return false;
        if (docUrl.includes('/Alo7HR/login')) return false;

        console.log('☘️ 等待统计....');

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
        var month = date.getMonth();
        return [`${year}-${month}-16`, `${year}-${month + 1}-15`, true];
      },
      sub(inEndStr) {
        var [date, _] = inEndStr.split(' ');
        var point1 = new Date(`${date} ${POINT1}`);
        var point2 = new Date(`${date} ${POINT2}`);
        var end = new Date(inEndStr);
        if (end > point2) return 2 * 60 * 60 * 1000;
        if (end > point1 && end < point2) return point2 - end;
        if (end < point1) return 1 * 60 * 60 * 1000;
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

  var app = new App();
  setTimeout(() => {
    app.start();
  }, 4000);
})();
