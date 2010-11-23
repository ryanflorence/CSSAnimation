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

var get = function(name, konstructor){
	var $this = $(this),
		instance = $this.data(name);
	if (!instance) {
		instance = new konstructor(this);
		$this.data(name, instance);
	}
	return instance;
};

$.each(['translate', 'rotate', 'scale', 'skew'], function(i, method){

	$.fn[method] = function(){
		var args = arguments;
		return $(this).each(function(){
			var instance = get.apply(this, ['transform', Transform]);
			instance[method].apply(instance, Array.prototype.slice.call(args, 0));
		});
	}

});

$.fn.clearTransform = function(){
	return $(this).each(function(){
		var instance = get.apply(this, ['transform', Transform]).clear();
	});
};

$.each(['set', 'clear'], function(i, method){
	$.fn[method + 'Transition'] = function(){
		var args = arguments;
		return $(this).each(function(){
			var instance = get.apply(this, ['transition', Transition]);
			instance[method].apply(instance, Array.prototype.slice.call(args, 0));
		});
	}
});

})(jQuery);
