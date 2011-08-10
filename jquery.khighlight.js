/**
 * high light - jQuery plugin
 */
(function($){
    var settings = {
        backgroundColor: '#333',
        opacity: .7,
        zIndex: 1000
    };
    var methods = {
        init: function( options ) {
            if ( options ) {
                $.extend( settings, options );
            }
            return this.eq(0).each(function(){
                var coord = methods._coord( $(this) );
                console.log(coord);
                methods._overlay( coord.top, coord.bottom, coord.left, coord.right );
                var self = this;
                $(window).bind( 'resize', function(e){(methods._invoke())(e, self);} );
            });
        },
        _invoke: function() {
            return function( e, element ) {
                var coord = methods._coord( $(element) );
                $left = $('.khighlight-left');
                $right = $('.khighlight-right');
                $bottom = $('.khighlight-bottom');
                $left.width( coord.left );
                $right.width( $(document).width() - coord.right );
                $bottom.height( $(window).height() - coord.bottom );
            };
        },
        _overlay:  function( top, bottom, left, right ) {
            var $container = $('<div>').addClass('khighlight');
            var $right = $('<div>').addClass('khighlight-overlay').css({
                backgroundColor: settings.backgroundColor,
                opacity: settings.opacity,
                zIndex: settings.zIndex,
                position: 'absolute'
            });
            $top = $right.clone();
            $top.addClass('khighlight-top').css({
                width: '100%',
                height: top,
                top: 0,
                left: 0
            })
            .appendTo($container);
            $bottom = $right.clone();
            $bottom.addClass('khighlight-bottom').css({
                width: '100%',
                height: $(document).height() - bottom,
                top: bottom,
                left: 0
            })
            .appendTo($container);
            $left = $right.clone();
            $left.addClass('khighlight-left').css({
                width: left,
                height: bottom - top,
                top: top,
                left: 0
            })
            .appendTo($container);
            $right.addClass('khighlight-right').css({
                width: $(document).width() - right,
                height: bottom - top,
                top: top,
                right: 0
            })
            .appendTo($container);
            $('body').append($container);
        },
        _coord: function( $element ) {
            var offset = $element.offset();
            return {
                top: offset.top,
                bottom: offset.top + $element.height(),
                left: offset.left,
                right: offset.left + $element.width()
            };
        }
    };
    $.fn.khighlight = function( method ){
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' + method + 'does not exist on jQuery.khighlight' );
        }
    };
})(jQuery);
/* vim: set ts=2 sw=2 sts=2 et ff=unix ft=javascript : */
