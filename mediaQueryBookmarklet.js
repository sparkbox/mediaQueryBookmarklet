// This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
// javascript:(function()%20{var%20mqs,%20mq%20=%20[];function%20getScript(url,%20success)%20{var%20s%20=%20document.createElement(%27script%27),head%20=%20document.getElementsByTagName(%27head%27)[0],loaded%20=%20false;s.src%20=%20url;s.onload%20=%20s.onreadystatechange%20=%20function()%20{if%20(!loaded%20&&%20(!this.readyState%20||%20this.readyState%20===%20%27loaded%27%20||%20this.readyState%20===%20%27complete%27))%20{loaded%20=%20true;success();s.onload%20=%20s.onreadystatechange%20=%20null;}};head.appendChild(s);}function%20getMediaQueries()%20{var%20sheetList%20=%20document.styleSheets,ruleList,i,%20j,mediaQueries%20=%20[];for%20(i=sheetList.length-1;%20i%20>=%200;%20i--)%20{ruleList%20=%20sheetList[i].cssRules;if%20(ruleList)%20{for%20(j=0;%20j<ruleList.length;%20j++)%20{if%20(ruleList[j].type%20==%20CSSRule.MEDIA_RULE)%20{var%20query%20=%20ruleList[j].cssText.match(/@media(.*)%20{/);if%20(query%20&&%20query[1])%20{mediaQueries.push(query[1]);}}}}}return%20mediaQueries;}function%20pageSize()%20{jQuery(%27body%27).append(%27<div%20class=%22sb-pageSize%22><div%20class=%22sb-dimensions%22>W%20x%20H</div><div%20class=%22sb-mq%22></div></div>%27);var%20display%20=%20jQuery(%27.sb-pageSize%27);display.css({color:%20%27#000%27,background:%20%27#fff%27,fontSize:%20%2728px%27,fontWeight:%20%27bold%27,opacity:%20%27.7%27,padding:%20%2715px%27,position:%20%27fixed%27,right:%20%270%27,top:%20%270%27,zIndex:%209999});if%20(window.matchMedia)%20{mqs%20=%20getMediaQueries();for%20(i=mqs.length-1;%20i%20>=%200;%20i--)%20{mq[i]%20=%20window.matchMedia(mqs[i]);}}jQuery(window).bind(%27resize%27,%20function()%20{var%20cssProps%20=%20window.getComputedStyle(jQuery(%27body%27).get(0),%20null),width%20=%20window.innerWidth%20||%20cssProps.getPropertyValue(%27width%27),height%20=%20window.innerHeight%20||%20cssProps.getPropertyValue(%27height%27);jQuery(%27.sb-dimensions%27).html(width%20+%20%27%20x%20%27%20+%20height);for%20(var%20i%20in%20mq)%20{mqChange(mq[i]);}}).trigger(%27resize%27);function%20mqChange(mq)%20{if%20(mq.matches)%20{jQuery(%27.sb-mq%27).text(mq.media);}}}if%20(!sbPageSize)%20{if%20(!window.jQuery)%20{getScript(%27https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js%27,%20pageSize);}%20else%20{pageSize();}}})();var%20sbPageSize%20=%200.1;

(function() {

  var mqs, mq = [];

  function getScript(url, success) {
    var s = document.createElement('script'),
        head = document.getElementsByTagName('head')[0],
        loaded = false;
        
    s.src = url;
    s.onload = s.onreadystatechange = function() {
      if (!loaded && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
        loaded = true;
        success();
        s.onload = s.onreadystatechange = null;
      }
    };
    head.appendChild(s);
  }
  
  function getMediaQueries() {
    var sheetList = document.styleSheets,
        ruleList,
        i, j,
        mediaQueries = [];

    for (i=sheetList.length-1; i >= 0; i--) {
      ruleList = sheetList[i].cssRules;
      if (ruleList) {
        for (j=0; j<ruleList.length; j++) {
          if (ruleList[j].type == CSSRule.MEDIA_RULE) {
            var query = ruleList[j].cssText.match(/@media(.*) {/);
            if (query && query[1]) {
              mediaQueries.push(query[1]);
            }
          }
        }
      }
    }
    return mediaQueries;
  }
  
  function pageSize() {
    jQuery('body').append('<div class="sb-pageSize"><div class="sb-dimensions">W x H</div><div class="sb-mq"></div></div>');
    
    var display = jQuery('.sb-pageSize');
    
    display.css({
      color: '#000',
      background: '#fff',
      fontSize: '28px',
      fontWeight: 'bold',
      opacity: '.7',
      padding: '15px',
      position: 'fixed',
      right: '0',
      top: '0',
      zIndex: 99999
    });
        
    if (window.matchMedia) {
      mqs = getMediaQueries();
      for (i=mqs.length-1; i >= 0; i--) {
        mq[i] = window.matchMedia(mqs[i]);
      }
    }    
        
    jQuery(window).bind('resize', function() {
      var cssProps = window.getComputedStyle(jQuery('body').get(0), null),
          width = window.innerWidth || cssProps.getPropertyValue('width'),
          height = window.innerHeight || cssProps.getPropertyValue('height');

      jQuery('.sb-dimensions').html(width + ' x ' + height);
      
      for (var i in mq) {
        mqChange(mq[i]);
      }
      
    }).trigger('resize');
    
    function mqChange(mq) {
      if (mq.matches) {
        jQuery('.sb-mq').text(mq.media);
      }
    }
  }
  
  if (!sbPageSize) {
    if (!window.jQuery) {
      getScript('https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js', pageSize);
    } else {
      pageSize();
    }
  }
  
})();
var sbPageSize = 0.1;