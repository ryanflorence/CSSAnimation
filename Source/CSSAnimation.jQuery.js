/*
---

name: Transform.jQuery

license: MIT-style license.

author: Ryan Florence <http://ryanflorence.com>

requires:
  - jQuery/jQuery
  - CSSAnimation

provides: [jQuery]

...
*/

;(function($){

var get = function(){
	return $(this).data('transform') || new Transform(this);
};

$.each(['translate', 'rotate', 'scale', 'skew'], function(i, method){

	$.fn[method] = function(axis, value){
		return $(this).each(function(){
			var instance = get.apply(this);
			instance[method](axis, value);
		});
	}

});

$.fn.clearTransform = function(){
	return $(this).each(function(){
		var instance = get.apply(this);
		instance.clear();
	});
};
	
})(jQuery);
