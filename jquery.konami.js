/*!
 * jQuery.Konami v1.0.2
 * # jquery.konami
 * A simple, lightweight jQuery plugin to easily add a konami code to a website
 * 
 * What is a konami code?
 * http://en.wikipedia.org/wiki/Konami_Code
 * 
 * Example Usage
 * 
 *    *  create a konami 'admin' that triggers console message
 *   $(document).konami({charCodes: [65,68,77,73,78], successHandler: function(){
 *     console.log('konami success');
 *   }});
 * 
 * 
 * Licensed under the GPL v3 License
 * Build by http://ApplyContext.com
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