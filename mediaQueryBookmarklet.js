// This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.

var mqb = {

  init: function() {
    mqb.version = '1.3.1';
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
    displayStyles = {
      color: '#000',
      background: '#fff',
      fontWeight: 'bold',
      opacity: '.9',
      padding: '15px',
      position: 'fixed',
      right: '0',
      top: '0',
      zIndex: 99999
    },
    dimensionStyles = {
      fontSize: '25px',
      textTransform: 'lowercase',
      borderBottom: '1px dashed #000',
      paddingBottom: '5px',
      marginBottom: '10px'
    },
    queryStyles = {
      fontSize: '16px',
      textTransform: 'lowercase'
    },
    linksContainerStyles = {
      fontSize: '10px',
      marginTop: '10px',
      textAlign: 'right'
    },
    versionStyles = {
      color: '#444',
      textTransform: 'lowercase',
    },
    closeButtonStyles = {
      color: '#444',
      display: 'block',
      marginTop: '5px',
      textDecoration: 'none'
    },
    positionButtonStyles = {
      color: '#444',
      cursor: 'pointer',
      fontSize: '13px'
    },
    emTestStyles = {
      height: 0,
      width: '1em'
    },

    dimensionContainer = document.createElement( 'div' ),
    queryContainer = document.createElement( 'div' ),
    linksContainer = document.createElement( 'div' ),
    versionLink = document.createElement( 'a' ),
    closeButton = document.createElement( 'a' ),
    positionButton = document.createElement( 'a' ),
    emTest = document.createElement( 'div' );
    
    mqb.display.className = 'sb-pageSize';
    mqb.display.id = "sb-mediaQueryBookmarklet";
    dimensionContainer.className = "sb-dimensions";
    dimensionContainer.id = "dimensions";

    queryContainer.className = "sb-mq";
    versionLink.href = 'https://github.com/sparkbox/mediaQueryBookmarklet';      
    versionLink.innerHTML = 'version ' + this.version;
    closeButton.href = '.';
    closeButton.innerHTML = '(close)';
    positionButton.innerHTML = '⇤';
    emTest.id = "emTest";

    closeButton.addEventListener( 'click', function( e ) {
      mqb.close( e );
      mqb = null;
    });

    // Quick and dirty. I'll clean it up later. I promise.
    positionButton.addEventListener( 'click', function( e ) {
      if ( mqb.display.style.left == 'auto' ) {
        mqb.display.style.right = 'auto';
        mqb.display.style.left = 0;
        positionButton.innerHTML = '⇥';
      } else {
        mqb.display.style.right = 0;
        mqb.display.style.left = 'auto';
        positionButton.innerHTML = '⇤';
      }
    });
    
    for (i in displayStyles) {
      mqb.display.style[i] = displayStyles[i];
    }
    for (i in dimensionStyles) {
      dimensionContainer.style[i] = dimensionStyles[i];
    }
    for (i in queryStyles) {
      queryContainer.style[i] = queryStyles[i];
    }
    for (i in linksContainerStyles) {
      linksContainer.style[i] = linksContainerStyles[i];
    }
    for (i in versionStyles) {
      versionLink.style[i] = versionStyles[i];
    }
    for (i in closeButtonStyles) {
      closeButton.style[i] = closeButtonStyles[i];
    }
    for (i in positionButtonStyles) {
      positionButton.style[i] = positionButtonStyles[i];
    }
    for (i in emTestStyles) {
      emTest.style[i] = emTestStyles[i];
    }
    mqb.display.appendChild( dimensionContainer );
    mqb.display.appendChild( queryContainer );
    linksContainer.appendChild( versionLink );
    linksContainer.appendChild( closeButton );
    linksContainer.appendChild( positionButton );
    mqb.display.appendChild( linksContainer );
    mqb.display.appendChild( emTest );


    document.body.appendChild(mqb.display);
  },

  close: function( e ) {
    e.preventDefault();

    document.body.removeChild( mqb.display );
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
      if ( links[ i ].media != '' ) {
        this.mqList.push( window.matchMedia( links[ i ].media ) );
      }
    }
  },
  
  findEmSize: function() {
    return document.getElementById('emTest').clientWidth;
  },

  showCurrentSize: function() {
    document.getElementById('dimensions').innerHTML = window.innerWidth + 'px x ' + window.innerHeight + 'px<br>' + ( window.innerWidth / this.findEmSize() ) + 'em ' + ( window.innerHeight / this.findEmSize() ) + 'em';
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

mqb.init();

if (mqb.matchMedia) {
  mqb.createMQList();
}
mqb.pageSize();
mqb.showCurrentSize();
if (mqb.matchMedia) {
  mqb.mqChange();
}
