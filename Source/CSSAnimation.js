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
	
	skew: function(axis, value){
		if (typeof axis === 'string') return this.add('skew' + axis.toUpperCase(), value);
		for (i in axis) if (axis.hasOwnProperty(i)) this.skew(i, axis[i])
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

	add: function(rule, value){
		var transform = this.element.style[this.style],
			rule = rule === 'rotateZ' ? 'rotate' : rule,
			match = new RegExp(this.rules[rule].regex).test(transform);
			unit = this.rules[rule].unit,
			shared = rule + '(' + value + unit + ')';

		if (transform === 'none') transform = '';
		return match
			? this.set(transform.replace(this.rules[rule].regex, shared))
			: this.set(transform + ' ' + shared);
	},

	// this is admittadly verbose, but if an API changes,
	// this is easy to override and (sortof) future-proof the script
	rules: {
		'rotateX':{
			regex: /rotateX\((-?[0-9]+deg)\)/,
			unit: 'deg'
		},
		'rotateY': {
			regex: /rotateY\((-?[0-9]+deg)\)/,
			unit: 'deg'
		},
		'rotateZ': {
			regex:  /rotateZ\((-?[0-9]+deg)\)/,
			unit: 'deg'
		},
		'rotate': {
			regex: /rotate\((-?[0-9]+deg)\)/,
			unit: 'deg'
		},
		'translateX': {
			regex:  /translateX\((-?[0-9]+%)\)/,
			unit: '%'
		},
		'translateY': {
			regex: /translateY\((-?[0-9]+%)\)/,
			unit: '%'
		},
		'translateZ': {
			regex: /translateZ\((-?[0-9]+px)\)/,
			unit: 'px'
		},
		'scale': {
			regex: /scale\((-?[0-9]+)\)/,
			unit: ''
		},
		'scaleX': {
			regex: /scaleX\((-?[0-9]+)\)/,
			unit: ''
		},
		'scaleY': {
			regex: /scaleY\((-?[0-9]+)\)/,
			unit: ''
		},
		'skewX': {
			regex:  /skewX\((-?[0-9]+deg)\)/,
			unit: 'deg'
		},
		'skewX': {
			regex:  /skewY\((-?[0-9]+deg)\)/,
			unit: 'deg'
		}
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
