test("Find Media Queries", function() {
  same(mqb.getMediaQueries(), ['(min-width: 300px)', '(min-width: 500px)', '(min-width: 700px)', '(min-width: 900px)'],
  'Found correct mediaqueries.');
});

test("Test UI", function() {
  mqb.appendDisplay();
  
  equal($('.sb-pageSize').length, 1, 'Display is attached.');
});


test("Gathering MQ info", function() {
  mqb.createMQList();
  
  equal(mqb.mqList.length, 4, 'Mediaquery list created.');
  
  if (window.innerWidth > 300 && window.innerWidth < 500) {
    equal(true, mqb.mqList[0].matches);
    equal(false, mqb.mqList[1].matches);
    equal(false, mqb.mqList[2].matches);
    equal(false, mqb.mqList[3].matches);
  }
  if (window.innerWidth > 500 && window.innerWidth < 700) {
    equal(true, mqb.mqList[0].matches);
    equal(true, mqb.mqList[1].matches);
    equal(false, mqb.mqList[2].matches);
    equal(false, mqb.mqList[3].matches);
  }
  if (window.innerWidth > 700 && window.innerWidth < 900) {
    equal(true, mqb.mqList[0].matches);
    equal(true, mqb.mqList[1].matches);
    equal(true, mqb.mqList[2].matches);
    equal(false, mqb.mqList[3].matches);
  }
  if (window.innerWidth > 900) {
    equal(true, mqb.mqList[0].matches);
    equal(true, mqb.mqList[1].matches);
    equal(true, mqb.mqList[2].matches);
    equal(true, mqb.mqList[3].matches);
  }
});