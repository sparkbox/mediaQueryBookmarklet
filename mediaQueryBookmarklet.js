// This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.

var mqb = {

  init: function() {
    mqb.version = '1.3.5';
    mqb.mqList = [];
    mqb.matchMedia = window.matchMedia !== undefined;

    var bookmarklet = document.getElementById( 'sb-mediaQueryBookmarklet' );
    if ( bookmarklet ) {
      document.body.removeChild( bookmarklet );
    }
  },

  appendDisplay: function() {
    mqb.display = document.createElement( 'div' );

    var i,

    /* Create all of the elements needed */
    dimensionContainer = document.createElement( 'div' ),
    queryContainer = document.createElement( 'div' ),
    linksContainer = document.createElement( 'div' ),
    versionLink = document.createElement( 'a' ),
    closeButton = document.createElement( 'a' ),
    positionButton = document.createElement( 'a' );
    
    mqb.mouseXPosition = document.createElement( 'div' );
    mqb.mouseYPosition = document.createElement( 'div' );
    mqb.styles = document.createElement( 'link' );
    mqb.emTest = document.createElement( 'div' );

    /* Assign Class names */
    mqb.display.className = "mqb-display";
    dimensionContainer.className = "mqb-container";
    queryContainer.className = "mqb-queryContainer";
    linksContainer.className = "mqb-linksContainer";
    versionLink.className = "mqb-version";
    closeButton.className = "mqb-closeButton";
    positionButton.className = "mqb-positionButton";
    
    mqb.mouseXPosition = "mqb-mouseXPos";
    mqb.mouseYPosition = "mqb-mouseYPos";
    mqb.emTest = "mqb-emTest";

    /* Set properties */
    mqb.styles.type = "text/css";
    mqb.styles.rel = "stylesheet";
    mqb.styles.href = "http://localhost/mediaQueryBookmarklet/css/mediaQuery.css";

    mqb.display.className = 'sb-pageSize';
    mqb.display.id = "sb-mediaQueryBookmarklet";
    dimensionContainer.className = "sb-dimensions";
    dimensionContainer.id = "dimensions";

    queryContainer.className = "sb-mq";
    versionLink.href = 'https://github.com/sparkbox/mediaQueryBookmarklet';      
    versionLink.innerHTML = 'version ' + this.version;
    closeButton.href = '.';
    closeButton.innerHTML = '(close)';
    mqb.emTest.id = "emTest";

    closeButton.addEventListener( 'click', function( e ) {
      mqb.close( e );
      mqb = null;
    });

    // Quick and dirty. I'll clean it up later. I promise.
    positionButton.addEventListener( 'click', function( e ) {
      if ( mqb.display.style.left == 'auto' ) {
        mqb.display.style.right = 'auto';
        mqb.display.style.left = 0;
        positionButton.style.backgroundImage = 'url(http://sparkbox.github.com/mediaQueryBookmarklet/images/right.png)';
      } else {
        mqb.display.style.right = 0;
        mqb.display.style.left = 'auto';
        positionButton.style.backgroundImage = 'url(http://sparkbox.github.com/mediaQueryBookmarklet/images/left.png)';
      }
    });
    
    mqb.display.appendChild( dimensionContainer );
    mqb.display.appendChild( queryContainer );
    linksContainer.appendChild( versionLink );
    linksContainer.appendChild( closeButton );
    linksContainer.appendChild( positionButton );
    mqb.display.appendChild( linksContainer );
    mqb.display.appendChild( linksContainer );

    document.head.appendChild( mqb.emTest );
    document.head.appendChild( mqb.styles );
    document.body.appendChild(mqb.display);
    document.body.appendChild( mqb.mouseXPosition );
    document.body.appendChild( mqb.mouseYPosition );
  },

  close: function( e ) {
    e.preventDefault();

    document.body.removeChild( mqb.display );
    document.body.removeChild( mqb.mouseXPosition );
    document.head.parentNode.removeChild( mqb.emTest );
    document.head.parentNode.removeChild( mqb.styles );
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
  
  inList: function( media ) {
    for ( var i = this.mqList.length - 1; i >= 0; i-- ) {
      if ( this.mqList[ i ].media === media ) {
        return true;
      }
    }
    return false;
  },

  createMQList: function() {
    var mqs = this.getMediaQueries(),
        links = document.getElementsByTagName('link'),
        i;
        
    for ( i = mqs.length-1; i >= 0; i-- ) {
      if ( !this.inList( mqs[i] ) ) {
        this.mqList.push( window.matchMedia( mqs[ i ] ) );
      }
    }
    
    for ( i = links.length-1; i >= 0; i-- ) {
      if ( links[ i ].media !== '' ) {
        this.mqList.push( window.matchMedia( links[ i ].media ) );
      }
    }
  },
  
  findEmSize: function() {
    return document.getElementById('emTest').clientWidth;
  },

  showCurrentSize: function() {
    var width = document.width || window.outerWidth;
    var height = document.height || window.outerHeight;
    document.getElementById('dimensions').innerHTML = width + 'px x ' + height + 'px<br>' + ( width / this.findEmSize() ).toPrecision(4) + 'em x ' + ( height / this.findEmSize() ).toPrecision(4) + 'em';
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
    this.setUpMouseControls();
    window.addEventListener('resize', function() {
      mqb.showCurrentSize();
      if (mqb.matchMedia) {
        mqb.mqChange();
      }
    }, false);
  },

  setUpMouseControls: function() {
    document.addEventListener( 'mousemove', mqb.showCurrentMousePos );
  },

  showCurrentMousePos: function( e ) {
    mqb.mouseXPosition.style.left = e.clientX + "px";
  }

};

mqb.init();

if (mqb.matchMedia) {
  mqb.createMQList();
}
mqb.pageSize();
mqb.showCurrentSize();
if (mqb.matchMedia) {
  mqb.mqChange();
}
