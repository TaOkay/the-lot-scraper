var PAGE = new WebPage();
var URL = '';
var WAIT_TIME_MS = 2000;

var date = new Date();
URL = 'https://offthegrid.com/event/the-lot/'
+ date.getFullYear() + '-'
+ (date.getMonth() +1) + '-'
+ date.getDate()  + 'am';

console.log('Scraping: ' + URL);

PAGE.open(URL, function(status) {
  if (status === 'success') {
    setTimeout(function() { 
      scrape();
      phantom.exit();
    }, WAIT_TIME_MS);
  } else {
    console.log('Something bad happened: ' + status);
    phantom.exit();
  };
});

function scrape() {
  var vendors = PAGE.evaluate(function() {
    return $("li.grid-item-card div.content-wrap").map(function() {
      var name = $("h3", this)[0].innerText;
      var cat = $("span", this)[0].innerText;
      return '* ' + name + " (" + cat + ")";
    }).toArray().join('\n');
  });

  console.log('Food trucks at The Lot today:');
  console.log(vendors);
};

// PAGE.onConsoleMessage = function(msg, line, source) {
//   console.log('console> ' + msg);
// };