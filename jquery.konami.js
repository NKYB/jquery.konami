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
 * Licensed under the GPL v3 License
 * Build by http://ApplyContext.com
 */
;(function ( $, window, document, undefined ) {
    var pluginName = "konami";
    
    function Plugin( element, options, pluginName ) {
        this.keys = [];
        this.lastVal = '';
        this.JQUERY_KONAMI_TEXT_BOX_TO_TRIGGER_KEYBOARD = 'jquery_konami_text_box_to_trigger_keyboard';
        var defaults = {
            namespace: pluginName,
            charCodes: [],
            tapDownInterval: 2000,
            successHandler: function(){}
        };
        this.options = $.extend(defaults, options, {element: element, charCodesAsString: options.charCodes.toString()});
        
        $.proxy(this._init(),this);
    }
    
    Plugin.prototype = {
        _init: function(){
            this._initMobileTextBox();
            this._initMobileEvents();
            this._initKeyCapture();
        },
        _initMobileTextBox: function(){
            $(document).ready($.proxy(function(){
                var html = '<div  style="position:absolute;top:-30px;left:0px;width:0px;height:0px;"><input id="' + this.JQUERY_KONAMI_TEXT_BOX_TO_TRIGGER_KEYBOARD + '" type="text"></input></div>';
                $('body').prepend(html);
            },this));
        },
        _initMobileEvents: function(){
            var timerStart, timerEnd = 0;
            $(this.options.element).on({ 'touchstart' : function(){ 
                    timerStart = new Date().getTime();
            }});
            $(this.options.element).on({ 'touchend' : $.proxy(function(){ 
                    timerEnd = new Date().getTime();
                    if ((timerEnd - timerStart) > this.options.tapDownInterval){
                        $('#' + this.JQUERY_KONAMI_TEXT_BOX_TO_TRIGGER_KEYBOARD).click(function(){
                            $(this).focus();
                        })
                        $('#' + this.JQUERY_KONAMI_TEXT_BOX_TO_TRIGGER_KEYBOARD).trigger('click');
                    }
            },this)});
        },
        _initKeyCapture: function(){
            $(this.options.element).keypress($.proxy(function(e) {
                if (this._checkForSafeFocus()){
                    var textBoxVal = $('#' + this.JQUERY_KONAMI_TEXT_BOX_TO_TRIGGER_KEYBOARD).val();
                    $('#' + this.JQUERY_KONAMI_TEXT_BOX_TO_TRIGGER_KEYBOARD).val(textBoxVal + String.fromCharCode(e.charCode));
                    this._evalKeyPress();
                }
            },this));
            $('#' + this.JQUERY_KONAMI_TEXT_BOX_TO_TRIGGER_KEYBOARD).on('keyup',$.proxy(function(e) {
                this._evalKeyPress();
            },this));
        },
        _evalKeyPress: function(key){
            var textBoxVal = $('#' + this.JQUERY_KONAMI_TEXT_BOX_TO_TRIGGER_KEYBOARD).val().toUpperCase();
            if (textBoxVal.length > 0 && textBoxVal != this.lastVal){
                this._clearKeys();
                for ( var i = 0; i < textBoxVal.length; i ++ ){
                    this.keys.push( textBoxVal.charCodeAt(i) );
                }
                if ( this._compareKeysToKonamiCode() ){
                    this.options.successHandler();
                    $('#' + this.JQUERY_KONAMI_TEXT_BOX_TO_TRIGGER_KEYBOARD).val('');
                    this.lastVal = '';
                    this._clearKeys();
                } else {
                    this._truncateKeys();
                }
            }
            this.lastVal = textBoxVal;
        },
        _compareKeysToKonamiCode: function(keysAsString){
            var keysAsString = this.keys.toString();
            return (keysAsString.indexOf(this.options.charCodesAsString) >= 0)
        },
        _clearKeys: function(){
            this.keys = [];
        },
        _truncateKeys: function(){
            if (this.keys.length > this.options.charCodes.length)
                this.keys.shift();
        },
        _checkForSafeFocus: function(){
            return ((
                ($('input').is(':focus') == false) &&
                ($('textarea').is(':focus') == false)    
            ) || ($('#' + this.JQUERY_KONAMI_TEXT_BOX_TO_TRIGGER_KEYBOARD).is(':focus') == true));
            
        }
    };

    $.fn[pluginName] = function ( options ) {
        return new Plugin( this, options, pluginName );
    };

})( jQuery, window, document );