$(document).ready(() => {
  // styles:
  gmsdk.addStyle(`
    #resources .circle-index{
      padding: 5px;
      background: #547e03;
      color: #fff;
      border-radius: 50px;
    }
    #resources .resource .heading > h2{
      font-size: 14px;
    }
    .operations li .heading .options li{
      display: flex;
      align-items: center;
    }
    .operations li .heading .options li a{
      margin-left: 10px;
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
  `);

  setTimeout(() => {
    $('#resources .resource .heading > h2').each((index, item) => {
      var idx = '0' + (index + 1);
      $(item).prepend(`<i class="circle-index">${idx.slice(-2)}</i>`);
      $(item).append(`<button class="clipboard items">Copy</button>`);
    });

    $('.operations li .heading .options li').prepend('<button class="clipboard item">Copy</button>')
    $(".clipboard.item").click((e) => {
      var path = $(e.target).parents('.heading').find('.path').text();
      gmsdk.setClipboard(path.trim());
    })

    $(".clipboard.items").click((e) => {
      var endpoints = $(e.target).parents('.heading').next('.endpoints');
      var paths = endpoints.find('.operation > div.heading > h3 > span.path').text();
      var dest = paths.split('\n').map(item => item.trim()).filter(Boolean);

      gmsdk.setClipboard(
        JSON.stringify(dest, null, 2)
      );
    })
  }, 1000);
});
