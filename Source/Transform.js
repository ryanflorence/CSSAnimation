/*
---

name: Transform.js

license: MIT-style license.

authors: Ryan Florence <http://ryanflorence.com>

provides: [Transform]

...
*/

var Transform = function(element, style){
	this.element = element;
	this.style = style;
}; Transform.prototype = {
	
	set: function(def){
		this.element.style[this.style] = def;
		return this;
	},
	
	clear: function(){
		return this.set('');
	},
	
	regexes: {
		'rotateX': /rotateX\((-?[0-9]+deg)\)/,
		'rotateY': /rotateY\((-?[0-9]+deg)\)/,
		'rotateZ': /rotateZ\((-?[0-9]+deg)\)/,
		'translateX': /translateX\((-?[0-9]+%)\)/,
		'translateY': /translateY\((-?[0-9]+%)\)/,
		'translateZ': /translateZ\((-?[0-9]+px)\)/
	},
	
	add: function(rule, value){
		var transform = this.element.style[this.style],
			match = new RegExp(this.regexes[rule]).test(transform);
			unit = new RegExp(/rotate/).test(rule)
				? 'deg'
				: new RegExp(/translateZ/).test(rule)
					? 'px'
					: '%',
			shared = rule + '(' + value + unit +')';

		if (transform == 'none') transform = '';
		return match
			? this.set(transform.replace(this.regexes[rule], shared))
			: this.set(transform + ' ' + shared);
	},
	
	translate: function(axis, value){
		if (typeof axis === 'string') return this.add('translate' + axis.toUpperCase(), value);
		for (i in axis) if (axis.hasOwnProperty(i)) this.translate(i, axis[i])
		return this;
	},

	rotate: function(axis, value){
		if (typeof axis === 'string') return this.add('rotate' + axis.toUpperCase(), value);
		for (i in axis) if (axis.hasOwnProperty(i)) this.rotate(i, axis[i])
		return this;
	}
	
};