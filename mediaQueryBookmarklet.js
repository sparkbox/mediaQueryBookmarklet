// This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.

window.mqb = {

  init: function() {
    /* If the bookmarklet already exists on the page, remove it */
    var bookmarklet = document.getElementById( 'sb-mediaQueryBookmarklet' );
    if ( bookmarklet ) {
      document.body.removeChild( bookmarklet );
    }

    mqb.version = '1.4.1';
    mqb.tmpl =
      "<p id=\"mqb-dimensions\"></p>" +
      "<p id=\"mqb-mousePosition\"></p>" +
      "<ol id=\"mqb-queries\"></ol>" +
      "<div id=\"mqb-linksContainer\">" +
      "  <a id=\"mqb-version\" href=\"https://github.com/sparkbox/mediaQueryBookmarklet\">version {{version}}</a>" +
      "  <button id=\"mqb-closeButton\">close</button>" +
      "  <button id=\"mqb-positionButton\"></button>" +
      "</div>";
    mqb.rulersTmpl = 
      "<div id=\"mqb-horz-ruler\">" +
      "  <div id=\"mqb-mouseXPosition\">" +
      "</div>" +
      "<div id=\"mqb-vert-ruler\">" +
      "  <div id=\"mqb-mouseYPosition\">" +
      "</div>";

    mqb.emTest = document.createElement( "div" );
    mqb.emTest.id = "mqb-emTest";
    document.body.appendChild( mqb.emTest );
    
    mqb.loadCSS();
    mqb.createTemplate();

    mqb.mqList = [];
    
    mqb.createMQList();

    window.addEventListener('resize', function() {
      mqb.showCurrentSize();
      if ( window.matchMedia ) {
        mqb.mqChange();
      }
    }, false);
    mqb.mqChange();

    mqb.initEmSize();
  },

  appendDisplay: function() {
    mqb.container = document.createElement( "div" );
    mqb.container.id = "sb-mediaQueryBookmarklet";
    mqb.container.className = "onRight";
    mqb.container.innerHTML = mqb.tmpl;
    document.body.appendChild( mqb.container );

    mqb.appendRulers();
    mqb.attachEvents();
  },

  appendRulers: function() {
    mqb.rulers = document.createElement( "div" );
    mqb.rulers.id = "sb-rulers";
    mqb.rulers.innerHTML = mqb.rulersTmpl;
    document.body.appendChild( mqb.rulers );  

    mqb.mouseXPosition = document.getElementById( "mqb-mouseXPosition" );
    mqb.mouseYPosition = document.getElementById( "mqb-mouseYPosition" );
    mqb.showMousePosition = document.getElementById( "mqb-mousePosition" );
  },

  attachEvents: function() {
    /* Close Button */
    document.getElementById( "mqb-closeButton" ).addEventListener( "click", function( e ) {
      mqb.close( e );
      mqb = null;
    });

    /* Position Button */
    document.getElementById( "mqb-positionButton" ).addEventListener( 'click', function( e ) {
      if ( mqb.container.className == "onLeft" ) {
        mqb.container.className = "onRight";
      } else {
        mqb.container.className = "onLeft";
      }
    });

    document.addEventListener( 'mousemove', mqb.showCurrentMousePos );
  },

  close: function( e ) {
    e.preventDefault();

    document.body.removeChild( mqb.container );
    document.body.removeChild( mqb.emTest );
    document.body.removeChild( mqb.rulers );
    document.head.removeChild( mqb.css );

    document.removeEventListener( 'mousemove', mqb.showCurrentMousePos );
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

  createTemplate: function() {
    mqb.appendDisplay();
    mqb.viewDimensions = document.getElementById( "mqb-dimensions" );
    mqb.viewQueries = document.getElementById( "mqb-queries" );
    mqb.tmplReplace( "mqb-version", "version " + mqb.version );
    mqb.updateDisplay();
  },

  findEmSize: function() {
    return mqb.emTest.clientWidth;
  },

  getMediaQueries: function() {
    var sheetList = document.styleSheets,
        ruleList,
        i, j,
        mediaQueries = [];

    for ( i=sheetList.length-1; i >= 0; i-- ) {
      try {
        ruleList = sheetList[ i ].cssRules;
        if ( ruleList ) {
          for ( j=0; j<ruleList.length; j++ ) {
            if ( ruleList[j].type == CSSRule.MEDIA_RULE ) {
              mediaQueries.push( ruleList[ j ].media.mediaText );
            }
          }
        }
      } catch(e) {}
    }
    return mediaQueries;
  },

  initEmSize: function() {
    mqb.cssTimer = setTimeout( function() {
      if ( mqb.emTest.clientWidth === 0 ) {
        mqb.initEmSize();
      } else {
        mqb.showCurrentSize();
      }
    }, 250);
  },

  inList: function( media ) {
    for ( var i = this.mqList.length - 1; i >= 0; i-- ) {
      if ( this.mqList[ i ].media === media ) {
        return true;
      }
    }
    return false;
  },

  loadCSS: function() {
    mqb.css = document.createElement( 'link' );
    mqb.css.type = "text/css";
    mqb.css.rel = "stylesheet";
    mqb.css.href = "http://sparkbox.github.com/mediaQueryBookmarklet/stylesheets/mediaQuery.css";
    document.head.appendChild( mqb.css );
  },

  mqChange: function() {
    var html = '';
    
    for ( var i in mqb.mqList ) {
      if ( mqb.mqList[ i ].matches ) {
        html += mqb.mqList[ i ].media + "<br>";
      }
    }
    mqb.viewQueries.innerHTML = html;
  },  

  showCurrentSize: function() {
    var width = document.width || window.outerWidth;
    var height = document.height || window.outerHeight;
    mqb.viewDimensions.innerHTML = width + 'px x ' + height + 'px<br/>' + ( width / mqb.findEmSize() ).toPrecision( 4 ) + 'em x ' + ( height / mqb.findEmSize() ).toPrecision( 4 ) + 'em';
  },

  tmplReplace: function( dstID, src ) {
    document.getElementById( dstID ).innerHTML = src;
  },

  updateDisplay: function() {
    mqb.showCurrentSize();
  },

  showCurrentMousePos: function( e ) {
    mqb.mouseXPosition.style.left = e.clientX + "px";
    mqb.mouseYPosition.style.top = e.clientY + "px";

    mqb.showMousePosition.innerHTML = "x:" + e.clientX + "px&nbsp;&nbsp;&nbsp;y:" + e.clientY + "px";
  }

};

mqb.init();
