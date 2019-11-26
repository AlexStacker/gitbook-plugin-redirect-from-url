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

  var query = locationSearchToObject();
  var href = query.from;
  gitbook.events.bind('page.change', function() {

    var $redirectBtn = $("<a class='redirect-url-button'>关闭</a>");
    $redirectBtn.css({
      background: '#fff',
      position: 'absolute',
      padding: '10px 26px',
      color: '#666',
      'border-radius': '5px',
      border: '1px solid rgb(204, 204, 204)',
      bottom: '3px',
      right: '26px',
      'text-align': 'center',
      'line-height': '28px',
      'box-shadow': '0px 0px 5px #aaa',
      'font-size': '16px'
    });

    if(window.cef && document.referrer) {
      href = document.referrer;
    }

    if (window.cef && href || href) {
      $redirectBtn.attr('href', decodeURIComponent(href));
      $('.book-body .body-inner').css({
        bottom: '70px'
      });
      $('.book-body').append($redirectBtn);
    }
  });
});
