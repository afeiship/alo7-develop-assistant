$(document).ready(() => {
  // styles:
  gmsdk.addStyle(`
    body{
      border:10px solid green;
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
      $(item).prepend(`<i>${idx.slice(-2)}</i>`);
    });

    $('.operations li .heading .options li').prepend('<button class="clipboard">Copy</button>')
    $(".clipboard").click((e) => {
      var path = $(e.target).parents('.heading').find('.path').text();
      gmsdk.setClipboard(path.trim());
    })
  }, 1000);
});
