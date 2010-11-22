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

	translate: function(axis, value){
		return this.setter(axis, value, 'translate');
	},

	rotate: function(axis, value){
		if (typeof axis === 'number') return this.add('rotate', axis);
		return this.setter(axis, value, 'rotate');
	},
	
	skew: function(axis, value){
		return this.setter(axis, value, 'skew');
	},

	scale: function(axis, value){
		if (typeof axis === 'number') return this.add('scale', axis);
		this.setter(axis, value, 'scale');
		return this;
	},

	clear: function(){
		return this.set('');
	},

	set: function(def){
		this.element.style[this.style] = def;
		return this;
	},

	// not "public", feel free to use, but the rest of these methods
	// are not guaranteed to have backward compatibility in future releases

	setter: function(a, b, method){
		if (typeof a === 'string') return this.add(method + a.toUpperCase(), b);
		for (i in a) if (a.hasOwnProperty(i)) this[method](i, a[i])
		return this;
	},

	add: function(rule, value){
		var transform = this.element.style[this.style],
			rule = rule === 'rotateZ' ? 'rotate' : rule,
			match = new RegExp(this.rules[rule].regex).test(transform),
			unit = this.rules[rule].unit,
			shared = rule + '(' + value + unit + ')';

		if (transform === 'none') transform = '';
		return match
			? this.set(transform.replace(this.rules[rule].regex, shared))
			: this.set(transform + ' ' + shared);
	},

	remove: function(rule){
		return this.set(this.element.style[this.style].replace(this.rules[rule].regex, ''));
	},

	// this is admittadly verbose, but if an API changes,
	// this is easy to override and (sortof) future-proof the script
	// I'm still not sold it's the right way :\ ... but I'm more interested in
	// creating something useful first, then clean it up :D
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
		'skewY': {
			regex:  /skewY\((-?[0-9]+deg)\)/,
			unit: 'deg'
		},
		'scale': {
			regex: /scale\((-?[0-9]+\.?[0-9]+?)\)/,
			unit: ''
		},
		'scaleX': {
			regex: /scaleX\((-?[0-9]+\.?[0-9]+?)\)/,
			unit: ''
		},
		'scaleY': {
			regex: /scaleY\((-?[0-9]+\.?[0-9]+?)\)/,
			unit: ''
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
	},

	clear: function(rule){
		if (!rule) {
			return this.set({
				duration: '',
				property: '',
				'timing-functin': ''
			});
		}
		return this.set(rule, '');
	}

}

})(window); // change window to whatever global object you want to hand these constructors from
