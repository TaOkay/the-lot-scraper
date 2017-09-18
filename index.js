var page = new WebPage();
var url = '';
var retryCount = 100;

// TODO - Calculate url based on current date
url = 'https://offthegrid.com/event/the-lot/2017-9-20-11am';

page.open(url, function(status) {
  if (status === 'success') {
    var vendors;
    var count = 0;
    while (!vendors) {
      vendors = page.evaluate(function() {
        return $("li.grid-item-card div.content-wrap").map(function() {
          // TODO  - Add in the category in parens
          return '* ' + this.innerText;
        }).toArray().join('\n');
      });
    
      count++;
      if (count > retryCount && !vendors) {
        vendors = "Couldn't load anything after " + retryCount + " tries.";
      }
    };

    console.log('Food trucks at The Lot today:');
    console.log(vendors);
  } else {
    console.log('Something bad happened: ' + status);
  };
  phantom.exit();
});

page.onConsoleMessage = function (msg, line, source) {
  console.log('console> ' + msg);
};