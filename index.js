var PAGE = new WebPage();
var URL = '';
var WAIT_TIME_MS = 2000;

// TODO - Calculate URL based on current date
URL = 'https://offthegrid.com/event/the-lot/2017-9-20-11am';

PAGE.open(URL, function(status) {
  if (status === 'success') {
    // Wait a little bit to let the page load fully
    setTimeout(function(){}, WAIT_TIME_MS);

    var vendors = PAGE.evaluate(function() {
      return $("li.grid-item-card div.content-wrap").map(function() {
        var name = $("h3", this)[0].innerText;
        var cat = $("span", this)[0].innerText;
        return '* ' + name + " (" + cat + ")";
      }).toArray().join('\n');
    });

    console.log('Food trucks at The Lot today:');
    console.log(vendors);
  } else {
    console.log('Something bad happened: ' + status);
  };
  phantom.exit();
});

// PAGE.onConsoleMessage = function(msg, line, source) {
//   console.log('console> ' + msg);
// };