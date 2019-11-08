require(['gitbook'], function(gitbook) {
  function locationSearchToObject() {
    var pairs = window.location.search.substring(1).split('&'),
      obj = {},
      pair,
      i;

    for (i in pairs) {
      if (pairs[i] === '') continue;
      pair = pairs[i].split('=');
      obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return obj;
  }

  gitbook.events.bind('page.change', function() {
    var query = locationSearchToObject();
    var href = query.from;

    var $redirectBtn = $("<a class='redirect-url-button'>关闭</a>");
    $redirectBtn.css({
      background: '#fff',
      position: 'absolute',
      padding: '3px',
      color: '#666',
      'border-radius': '5px',
      border: '1px solid rgb(204, 204, 204)',
      bottom: '3px',
      left: '26px',
      right: '26px',
      'text-align': 'center',
      'line-height': '60px',
      'box-shadow': '0px 0px 5px #aaa',
      'font-size': '24px'
    });

    if (window.cef) {
      $redirectBtn.click(function() {
        window.cef.message &&
          window.cef.message.sendMessage('mirco.call_cplus', [
            '',
            'closewindow'
          ]);
      });
      $('.book-body').append($redirectBtn);
    } else if (query.from) {
      $redirectBtn.attr('href', decodeURIComponent(href));
      $('.book-body .body-inner').css({
        bottom: '70px'
      });
      $('.book-body').append($redirectBtn);
    }
  });
});
