var page = new WebPage();

page.open("https://offthegrid.com/event/the-lot/2017-9-15-11am", function(){
  var vendors = page.evaluate(function(){
    return $('.vendors-grid vendors-grid-compact grid-cards-get-mini').map(function(e){
      return '* ' + this.innerText
    }).toArray().join('\n');
  });

  console.log('Food trucks at The Lot today:');
  console.log(vendors);

  phantom.exit();
});