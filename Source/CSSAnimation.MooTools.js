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

(function(){
	var obj = {};
	['translate', 'rotate', 'scale', 'skew'].each(function(method){
		obj[method] = function(axis, value){
			this.get('transform')[method](axis, value);
			return this;
		};
	});
	obj.clearTransform = function(){
		this.get('transform').clear();
		return this;
	}
	Element.implement(obj);
}());
