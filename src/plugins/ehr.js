(function () {
  var POINT1 = '18:30:00';
  var POINT2 = '19:30:00';
  var APIKEY_RE = /<a href="app\/app!(\w+?)" size="" refresh="0"> <i class="glyphicon glyphicon-calendar"><\/i> <span title="个人考勤查询">个人考勤查询/;

  var App = nx.declare({
    methods: {
      start(inKey) {
        if (!document.URL.includes('hr.saybot.net')) return false;

        var params = this.params();
        var range = nx.rangeDate.apply(null, params);
        var sum = 0;
        var result;
        this.stat = [];
        this.key = inKey;
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
        return new Promise((resolve) => {
          gmsdk.http
            .get({
              url: 'https://hr.saybot.net:8443/Alo7HR/portal/index',
              method: 'get',
              responseType: 'html'
            })
            .then((res) => {
              var matches = res.match(APIKEY_RE);
              resolve(matches[1]);
            });
        });
      },
      api(inDate) {
        var url = `https://hr.saybot.net:8443/Alo7HR/ajax/function/alist!${this.key}.SE0302`;
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
  app.apiKey().then((key) => {
    app.start(key);
  });
})();
