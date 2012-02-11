// This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
// javascript:var%20mqb%20=%20{sbPageSize:%201.0,mqList:%20[],appendDisplay:%20function()%20{var%20styles%20={color:%20%27#000%27,background:%20%27#fff%27,fontSize:%20%2728px%27,fontWeight:%20%27bold%27,opacity:%20%27.7%27,padding:%20%2715px%27,position:%20%27fixed%27,right:%20%270%27,top:%20%270%27,zIndex:%2099999},display%20=%20document.createElement(%27div%27);display.className%20=%20%27sb-pageSize%27;display.innerHTML%20=%20%27<div%20class=%22sb-dimensions%22></div><div%20class=%22sb-mq%22></div>%27;for%20(var%20i%20in%20styles)%20{display.style[i]%20=%20styles[i];}document.body.appendChild(display);},getMediaQueries:%20function()%20{var%20sheetList%20=%20document.styleSheets,ruleList,i,%20j,mediaQueries%20=%20[];for%20(i=sheetList.length-1;%20i%20>=%200;%20i--)%20{ruleList%20=%20sheetList[i].cssRules;if%20(ruleList)%20{for%20(j=0;%20j<ruleList.length;%20j++)%20{if%20(ruleList[j].type%20==%20CSSRule.MEDIA_RULE)%20{mediaQueries.push(ruleList[j].media.mediaText);}}}}return%20mediaQueries;},createMQList:%20function()%20{var%20mqs%20=%20this.getMediaQueries();for%20(i%20=%20mqs.length-1;%20i%20>=%200;%20i--)%20{this.mqList[i]%20=%20window.matchMedia(mqs[i]);}},showCurrentSize:%20function()%20{document.querySelectorAll(%27.sb-dimensions%27)[0].innerHTML%20=%20window.innerWidth%20+%20%27%20x%20%27%20+%20window.innerHeight;},mqChange:%20function()%20{var%20html%20=%20%27%27;for%20(var%20i%20in%20mqb.mqList)%20{if%20(mqb.mqList[i].matches)%20{html%20+=%20mqb.mqList[i].media%20+%20%22<br>%22;}}document.querySelectorAll(%27.sb-mq%27)[0].innerHTML%20=%20html;},pageSize:%20function()%20{this.appendDisplay();window.addEventListener(%27resize%27,%20function()%20{mqb.showCurrentSize();if%20(window.matchMedia%20!=%20undefined)%20{mqb.mqChange();}},%20false);}};if%20(typeof%20mqb.sbPageSize%20!=%20%27undefined%27)%20{if%20(window.matchMedia%20!=%20undefined)%20{mqb.createMQList();}mqb.pageSize();mqb.showCurrentSize();if%20(window.matchMedia%20!=%20undefined)%20{mqb.mqChange();}}
var mqb = {
  sbPageSize: 1.0,
  mqList: [],
  matchMedia: window.matchMedia !== undefined,
  
  appendDisplay: function() {
    var styles ={
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
    },    
    display = document.createElement('div');
    
    
    display.className = 'sb-pageSize';
    display.innerHTML = '<div class="sb-dimensions"></div><div class="sb-mq"></div>';
    
    for (var i in styles) {
      display.style[i] = styles[i];
    }
    document.body.appendChild(display);
  },
  
  getMediaQueries: function() {
    var sheetList = document.styleSheets,
        ruleList,
        i, j,
        mediaQueries = [];

    for (i=sheetList.length-1; i >= 0; i--) {
      ruleList = sheetList[i].cssRules;
      if (ruleList) {
        for (j=0; j<ruleList.length; j++) {
          if (ruleList[j].type == CSSRule.MEDIA_RULE) {
            mediaQueries.push(ruleList[j].media.mediaText);
          }
        }
      }
    }
    return mediaQueries;
  },
  
  createMQList: function() {
    var mqs = this.getMediaQueries();
    for (i = mqs.length-1; i >= 0; i--) {
      this.mqList[i] = window.matchMedia(mqs[i]);
    }
  },
  
  showCurrentSize: function() {    
    document.querySelectorAll('.sb-dimensions')[0].innerHTML = window.innerWidth + ' x ' + window.innerHeight;
  },
  
  mqChange: function() {
    var html = '';
    
    for (var i in mqb.mqList) {
      if (mqb.mqList[i].matches) {
        html += mqb.mqList[i].media + "<br>";
      }
    }
    document.querySelectorAll('.sb-mq')[0].innerHTML = html;
  },  
  
  pageSize: function() {
    this.appendDisplay();
    
    window.addEventListener('resize', function() {
      mqb.showCurrentSize();
      if (mqb.matchMedia) {
        mqb.mqChange();
      }
    }, false);
  }
};

if (typeof mqb.sbPageSize != 'undefined') {  
  if (mqb.matchMedia) {
    mqb.createMQList();
  }
  mqb.pageSize();
  mqb.showCurrentSize();
  if (mqb.matchMedia) {
    mqb.mqChange();
  }
}
