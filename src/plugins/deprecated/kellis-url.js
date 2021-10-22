/**
 * @description
 * 方便跳转到 url
 */

$(document).ready(() => {
  const ctx = $('body');
  const urls = {
    beta: 'https://kellis-ng.beta.saybot.net/',
    prod: 'https://kellis-ng.alo7.com/'
  };
  const styles = `
    .kellis-url-toolkit{
      z-index: 1001;
      position:fixed;
      right: 10px;
      top: 330px;
      width: 120px;
      text-align: center;
    }
  `;

  const html = `
    <section class="kellis-url-toolkit">
      <div class="gm-btn-group">
        <button data-gm-action="beta" class="gm-btn gm-btn-default">🍏</button>
        <button data-gm-action="prod" class="gm-btn gm-btn-default">🚗</button>
        <button data-gm-action="close" class="gm-btn gm-btn-default">❌</button>
      </div>
    </section>
  `;

  gmsdk.addStyle(styles);

  ctx.prepend(html);
  ctx.find('[data-gm-action]').click((evt) => {
    let action = $(evt.target).data('gm-action');
    if (action === 'close') {
      $('.kellis-url-toolkit').remove();
    } else {
      window.open(urls[action]);
    }
  });
});
