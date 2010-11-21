/*
---

name: Transform.js

license: MIT-style license.

author: Ryan Florence <http://ryanflorence.com>

provides: [Transform, Transition]

...
*/

;(function(global){

var getSupportedStyle = function(element, supported){
	for (var i = supported.length - 1; i >= 0; i--){
		if (element.style[supported[i]] !== undefined){
			return supported[i];
		}
	};
};

var Transform = global.Transform = function(element, supported){
	this.element = element;
	this.style = getSupportedStyle(element, supported || [ 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ]);
}; global.Transform.prototype = {

	// usage: translate('x', 20)
	translate: function(axis, value){
		if (typeof axis === 'string') return this.add('translate' + axis.toUpperCase(), value);
		for (i in axis) if (axis.hasOwnProperty(i)) this.translate(i, axis[i])
		return this;
	},

	// usage: rotate('z', 45)
	rotate: function(axis, value){
		if (typeof axis === 'string') return this.add('rotate' + axis.toUpperCase(), value);
		for (i in axis) if (axis.hasOwnProperty(i)) this.rotate(i, axis[i])
		return this;
	},

	// not "public", feel free to use, but the rest of these methods
	// are not guaranteed to have backward compatibility in future releases

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
		'rotate': /rotate\((-?[0-9]+deg)\)/,
		'translateX': /translateX\((-?[0-9]+%)\)/,
		'translateY': /translateY\((-?[0-9]+%)\)/,
		'translateZ': /translateZ\((-?[0-9]+px)\)/
	},

	add: function(rule, value){
		var transform = this.element.style[this.style],
			rule = rule === 'rotateZ' ? 'rotate' : rule,
			match = new RegExp(this.regexes[rule]).test(transform);
			unit = new RegExp(/rotate/).test(rule)
				? 'deg'
				: rule === 'translateZ' 
					? 'px' 
					: '%',
			shared = rule + '(' + value + unit + ')';
		if (transform === 'none') transform = '';
		return match
			? this.set(transform.replace(this.regexes[rule], shared))
			: this.set(transform + ' ' + shared);
	}

};

var Transition = global.Transition = function(element, supported){
	this.element = element;
	this.supported = supported || {
		prefixes:          ['WebkitTransition', 'MozTransition', 'OTransition', 'msTransition' ],
		transformPrefixes: ['-webkit-'        , '-moz-'        , '-o-'        , '-ms-']
	};
	this.style = getSupportedStyle(element, this.supported.prefixes);
	this.supported.index = this.supported.prefixes.indexOf(this.style);
}; global.Transition.prototype = {

	map: {
		'duration': 'Duration',
		'property': 'Property',
		'timing-function': 'TimingFunction'
	},

	set: function(property, value){
		if (typeof property === 'string') {
			if (value === 'transform') value = this.supported.transformPrefixes[this.supported.index] + 'transform';
			this.element.style[this.style + this.map[property]] = value;
			return this;
		}
		for (i in property) if (property.hasOwnProperty(i)) this.set(i, property[i]);
		return this;
	}

}

})(window); // change window to whatever global object you want to hand these constructors from
