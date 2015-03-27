/*!
 * jQuery.Konami v1.0.2
 * tool to easily add a konami to your page
 * 
 * What is a konami?
 * http://en.wikipedia.org/wiki/Konami_Code
 *
 * Licensed under the GPL v3 License
 * Copyright 2015 ApplyContext.com
 * 
 * Example Usage
 * 
 *       // create a konami 'admin' that triggers console message
 *       $(document).konami({charCodes: [65,68,77,73,78], successHandler: function(){
 *               console.log('konami success');
 *       }});
 */
;(function ( $, window, document, undefined ) {
    var pluginName = "konami";
    
    function Plugin( element, options, pluginName ) {
        this.keys = [];
        var defaults = {
            namespace: pluginName,
            charCodes: [],
            successHandler: function(){}
        };
        this.options = $.extend(defaults, options);
        
        $.proxy(this._init(),this);
    }
    
    Plugin.prototype = {
        _init: function(){
            $(document).keydown($.proxy(function(e) {
                this.keys.push( e.keyCode );
                if ( this.keys.toString().indexOf( this.options.charCodes.toString() ) >= 0 ){
                    this.options.successHandler();
                    this.keys = [];
                }
                if (this.keys.length > this.options.charCodes.length)
                    this.keys.shift();
            },this));
        }
    };

    $.fn[pluginName] = function ( options ) {
        return new Plugin( this, options, pluginName );
    };

})( jQuery, window, document );
