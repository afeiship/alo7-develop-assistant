(function () {
  var POINT1 = '18:30:00';
  var POINT2 = '19:30:00';
  var APIKEY_RE = /<a href="app\/app!(\w+?)" size="" refresh="0"> <i class="glyphicon glyphicon-calendar"><\/i> <span title="个人考勤查询">个人考勤查询/;

  var App = nx.declare({
    methods: {
      start() {
        var docUrl = document.URL;;
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
              start: start.CARDTIME,
              end: end.CARDTIME,
              sub: (subed / 1000 / 60).toFixed(2),
              duration: (duration / 1000 / 60 / 60).toFixed(2)
            });
            return duration + result;
          }, sum);

          result = (sum / 1000 / 60 / 60).toFixed(2);

          this.stat.push({
            start: `开始时间: ${params[0]}`,
            end: `结束时间: ${params[1]}`,
            sub: 0,
            duration: result
          });

          console.table(this.stat);
        });
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
        if (end > point1 && end < point2) return end - point1;
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
