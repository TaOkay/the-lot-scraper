var page = new WebPage();
var url = '';

// TODO - Calculate url based on current date
url = 'https://offthegrid.com/event/the-lot/2017-9-20-11am';

page.open(url, function(status) {
  if (status === 'success') {
    var vendors = page.evaluate(function() {
      return $("li.grid-item-card header").map(function() {
        // TODO  - Add in the category in parens
        return '* ' + this.innerText;
      }).toArray().join('\n');
    });

    console.log('Food trucks at The Lot today:');
    console.log(vendors);
  } else {
    console.log('Something bad happened: ' + status);
  }
  phantom.exit();
});

page.onConsoleMessage = function (msg, line, source) {
  console.log('console> ' + msg);
};