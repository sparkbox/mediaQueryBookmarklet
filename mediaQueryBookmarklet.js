// This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
// javascript:var%20mqb%20=%20{version:%20%271.0%27,mqList:%20[],matchMedia:%20window.matchMedia%20!==%20undefined,appendDisplay:%20function()%20{var%20displayStyles%20={color:%20%27#000%27,background:%20%27#fff%27,fontSize:%20%2728px%27,fontWeight:%20%27bold%27,opacity:%20%27.7%27,padding:%20%2715px%27,position:%20%27fixed%27,right:%20%270%27,top:%20%270%27,zIndex:%2099999},versionStyles%20={color:%20%27#444%27,float:%20%27right%27,fontSize:%20%2710px%27,textTransform:%20%27lowercase%27},display%20=%20document.createElement(%27div%27),versionContainer%20=%20document.createElement(%27a%27);display.className%20=%20%27sb-pageSize%27;display.innerHTML%20=%20%27<div%20class=%22sb-dimensions%22></div><div%20class=%22sb-mq%22></div>%27;versionContainer.href%20=%20%27https://github.com/sparkbox/mediaQueryBookmarklet%27;versionContainer.innerHTML%20=%20%27version%20%27%20+%20this.version;for%20(var%20i%20in%20displayStyles)%20{display.style[i]%20=%20displayStyles[i];}for%20(var%20i%20in%20versionStyles)%20{versionContainer.style[i]%20=%20versionStyles[i];}display.appendChild(versionContainer);document.body.appendChild(display);},getMediaQueries:%20function()%20{var%20sheetList%20=%20document.styleSheets,ruleList,i,%20j,mediaQueries%20=%20[];for%20(i=sheetList.length-1;%20i%20>=%200;%20i--)%20{ruleList%20=%20sheetList[i].cssRules;if%20(ruleList)%20{for%20(j=0;%20j<ruleList.length;%20j++)%20{if%20(ruleList[j].type%20==%20CSSRule.MEDIA_RULE)%20{mediaQueries.push(ruleList[j].media.mediaText);}}}}return%20mediaQueries;},createMQList:%20function()%20{var%20mqs%20=%20this.getMediaQueries(),links%20=%20document.getElementsByTagName(%27link%27),i;for%20(var%20i%20=%20mqs.length-1;%20i%20>=%200;%20i--)%20{this.mqList.push(window.matchMedia(mqs[i]));}for%20(i%20=%20links.length-1;%20i%20>=%200;%20i--)%20{if%20(links[i].media%20!=%20%27%27)%20{this.mqList.push(window.matchMedia(links[i].media));}}},showCurrentSize:%20function()%20{document.querySelectorAll(%27.sb-dimensions%27)[0].innerHTML%20=%20window.innerWidth%20+%20%27px%20x%20%27%20+%20window.innerHeight%20+%20%27px%27;},mqChange:%20function()%20{var%20html%20=%20%27%27;for%20(var%20i%20in%20mqb.mqList)%20{if%20(mqb.mqList[i].matches)%20{html%20+=%20mqb.mqList[i].media%20+%20%22<br>%22;}}document.querySelectorAll(%27.sb-mq%27)[0].innerHTML%20=%20html;},pageSize:%20function()%20{this.appendDisplay();window.addEventListener(%27resize%27,%20function()%20{mqb.showCurrentSize();if%20(mqb.matchMedia)%20{mqb.mqChange();}},%20false);}};if%20(typeof%20mqb.version%20!=%20%27undefined%27)%20{if%20(mqb.matchMedia)%20{mqb.createMQList();}mqb.pageSize();mqb.showCurrentSize();if%20(mqb.matchMedia)%20{mqb.mqChange();}}
var mqb = {
  version: '1.0',
  mqList: [],
  matchMedia: window.matchMedia !== undefined,
  
  appendDisplay: function() {
    var displayStyles ={
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
    versionStyles ={
      color: '#444',
      float: 'right',
      fontSize: '10px',
      textTransform: 'lowercase'
    },   
    display = document.createElement('div'),
    versionContainer = document.createElement('a');


    display.className = 'sb-pageSize';
    display.innerHTML = '<div class="sb-dimensions"></div><div class="sb-mq"></div>';
    versionContainer.href = 'https://github.com/sparkbox/mediaQueryBookmarklet';      
    versionContainer.innerHTML = 'version ' + this.version;
    
    for (var i in displayStyles) {
      display.style[i] = displayStyles[i];
    }
    for (var i in versionStyles) {
      versionContainer.style[i] = versionStyles[i];
    }
    display.appendChild(versionContainer);
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
    var mqs = this.getMediaQueries(),
        links = document.getElementsByTagName('link'),
        i;
        
    for (var i = mqs.length-1; i >= 0; i--) {
      this.mqList.push(window.matchMedia(mqs[i]));
    }
    
    for (i = links.length-1; i >= 0; i--) {
      if (links[i].media != '') {
        this.mqList.push(window.matchMedia(links[i].media));
      }
    }
  },
  
  showCurrentSize: function() {    
    document.querySelectorAll('.sb-dimensions')[0].innerHTML = window.innerWidth + 'px x ' + window.innerHeight + 'px';
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

if (typeof mqb.version != 'undefined') {  
  if (mqb.matchMedia) {
    mqb.createMQList();
  }
  mqb.pageSize();
  mqb.showCurrentSize();
  if (mqb.matchMedia) {
    mqb.mqChange();
  }
}
