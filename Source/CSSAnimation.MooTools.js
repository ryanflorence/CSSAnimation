/*
---

name: Transform.MooTools

license: MIT-style license.

author: Ryan Florence <http://ryanflorence.com>

requires:
  - Core/Element
  - CSSAnimation

provides: [MooTools]

...
*/

Element.Properties.transform = {

	set: function(supported){
		return this.store('transform', new Transform(this, supported));
	},

	get: function(){
		var instance = this.retrieve('transform');
		return instance || this.set('transform').get('transform');
	}

};

Element.Properties.transition = {

	set: function(supported){
		return this.store('transition', new Transition(this, supported));
	},

	get: function(){
		var instance = this.retrieve('transition');
		return instance || this.set('transition').get('transition');
	}

};

(function(){

	var obj = {};

	['translate', 'rotate', 'scale', 'skew'].each(function(method){
		obj[method] = function(){
			var instance = this.get('transform');
			instance[method].apply(instance, Array.slice(arguments, 0));
			return this;
		};
	});

	obj.clearTransform = function(){
		this.get('transform').clear();
		return this;
	};

	['set', 'clear'].each(function(method){
		obj[method + 'Transition'] = function(){
			var instance = this.get('transition');
			instance[method].apply(instance, Array.slice(arguments, 0));
			return this;
		}
	});

	Element.implement(obj);

}());
