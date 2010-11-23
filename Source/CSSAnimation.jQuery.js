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

var getTransform = function(){
	var $this = $(this),
		instance = $this.data('transform');
	if (!instance) {
		instance = new Transform(this);
		$this.data('transform', instance);
	}
	return instance;
},

getTransition = function(){
	var $this = $(this),
		instance = $this.data('transition');
	if (!instance) {
		instance = new Transition(this);
		$this.data('transition', instance);
	}
	return instance;
};

$.each(['translate', 'rotate', 'scale', 'skew'], function(i, method){

	$.fn[method] = function(){
		var args = arguments;
		return $(this).each(function(){
			var instance = getTransform.apply(this);
			instance[method].apply(instance, Array.prototype.slice.call(args, 0));
		});
	}

});

$.fn.clearTransform = function(){
	return $(this).each(function(){
		var instance = getTransform.apply(this).clear();
	});
};

$.fn.transition = function(){
	var args = arguments;
	return $(this).each(function(){
		var instance = getTransition.apply(this);
		instance.set.apply(instance, Array.prototype.slice.call(args, 0));
	});
};

})(jQuery);
