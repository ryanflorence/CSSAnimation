CSSAnimation
============

CSS Transforms and Transitions with JavaScript.

- CSSAnimation.js - Base, vanilla JavaScript implementation, no library required.
- CSSAnimation.MooTools.js - MooTools API to the base constructors, requires CSSAnimation.js.
- CSSAnimation.jQuery.js - jQuery API to the base constructors, requires CSSAnimation.js.

Quick Examples
--------------

	// Vanilla JavaScript
	var element = document.getElementById('some-el'),
	    transition = new Transition(element),
	    transform = new Transform(element),
	
	transition.set({
	  property: 'transform',
	  'timing-function': 'ease-in',
	  duration: '2s'
	});
	
	transform.rotate(720).scale(2);
	
	// MooTools
	$('some-el').setTransition({
	  property: 'transform',
	  'timing-function': 'ease-in',
	  duration: '2s'
	}).rotate(720).scale(2);
	
	// jQuery
	$('#some-el').setTransition({
	  property: 'transform',
	  'timing-function': 'ease-in',
	  duration: '2s'
	}).rotate(720).scale(2);

Browser Support
---------------

- Safari
- Chrome
- Mozilla
- Opera
- IE 9 (theoretically, haven't tested yet)

Insofar as the version supports transform and transition.

About this Repository
---------------------

- Tracking branch is `develop`
- Master branch contains only tagged releases
- MooTools' Packager ready
- Contributors welcome!

License
-------

MIT Style license.

---

API Reference
=============

The following documentation first shows the base API, then MooTools, then jQuery.  All APIs take the same arguments.  Assume the following objects for the rest of the documentation:

	var element = document.getElementById('some-el'),
	    transition = new Transition(element),
	    transform = new Transform(element),
	
	    mooElement = document.id('some-el'),
	    jQueryCollection = jQuery('#some-el');

Transition
==========

Define a CSS Transition for an element.

Transition method: constructor
------------------------------

Creates a new `Transition` object.  Constructed and cached automatically for MooTools and jQuery

**Signature**

	new Transition(element);
	// constructed and cached automatically for MooTools and jQuery

**Arguments**

- element - A DOM element reference

**Example**

	var element = document.getElementById('some-el'),
	    transition = new Transition(element);

Transitions method: set
-----------------------

**Signature**

	transition.set(rule, value);
	transition.set({
	  rule: value,
	  rule2: value2
	});
	
	mooElement.setTransition
	jQueryCollection.setTransition

**Arguments**

- rule (string) - can be any of the following:
	- `property` - the CSS property(s) to transition.  If `transform` is specified, the proper browser prefix will be added (i.e. -webkit-). Separate multiple by commas.
	- `duration` - i.e. `500ms`, `1s`.
	- `timing-function` - i.e. `ease`, `ease-out`, `ease-in-out`, `cubic-bezier(x1, y1, x2, y2)`

**Examples**

Typically you set all rules at once:

	transition.set({
	  property: 'transform',
	  'timing-function': 'ease-out',
	  duration: '500ms'
	});

But you can do them one-by-one as well:

	transition.set('property', 'opacity');
	transition.set('duration', '0.5s');

	// supports multiple properties
	transition.set('property', 'background-color, color');

	// and all properties
	transition.set('property', 'all');

Now, change the styles of the element and they will transition.

	element.className = 'some-class-with-new-styles';
	element.style.marginTop = '50px';

Or use it in conjunction with `Transform`:

	transform.translate('x', 100);

Transition method: clear
------------------------

Clears all, or one transition rule.

**Signature**

	transition.clear([rule]);

	mooElement.clearTransition;
	jQueryCollection.clearTransition;

**Arguments**

- rule (string) - Accepts the same values as `rule` in set.  If null, clears all rules.

**Examples**

	transition.clear('timing-function');
	transition.clear(); // clears all rules
	
	mooElement.clearTransition('property');
	jQueryCollection.clearTransition('duration');

Transform
=========

Defines and manages the state of the `transform` property of an element.

Supports:

- `translateX`, `translateY`, `translateZ`
- `rotateX`, `rotateY`, `rotateZ`, `rotate`
- `scale`, `scaleX`, `scaleY`
- `skewX`, `skewY`

The `matrix` and `skew(x [, y])` coming soon.

Transform method: constructor
------------------------------

Creates a new `Transform` object. Constructed and cached automatically for MooTools and jQuery 

**Signature**

	new Transform(element);
	// constructed and cached automatically for MooTools and jQuery

**Arguments**

- element - A DOM element reference

**Example**

	var element = document.getElementById('some-el'),
	    transform = new Transform(element);

Transform method: translate
---------------------------

**Signature**

	transform.translate(axis, value);
	transform.translate({
		axis: value,
		axis2: value2
	});
	
	mooElement.translate
	jQueryCollection.translate

**Arguments**

- axis (string) - The axis to move along.  Accepts `x`, `y`, and Safari only `z`.
- value (number) - The amount to translate in `%`, except for `z` which is defined in pixels.  `Transform` defines the units dynamically.

**Examples**

	transform.translate('x', 100); // moves right 100%
	transform.translate({
		x: 50,
		y: 50
	});
	
	mooElement.translate('x', 100);
	jQueryCollection.translate('x', 100);

Transform method: rotate
------------------------

Rotate an element around an axis.

**Signature**

	transform.rotate(value);
	transform.rotate(axis, value);
	transform.rotate({
		axis: value,
		axis2: value2
	});
	
	mooElement.rotate;
	jQueryCollection.rotate;

**Arguments**

- axis (string) - The axis to rotate around.  Accepts 'z', and safari only `x` and `y`.
- value (number) - The degrees to rotate.

**Examples**

	transform.rotate(-45); // rotates element counter-clockwise around the z axis
	transform.rotate('z', -45); // identical to above
	// Safari only, rotates 3D
	transform.rotate({
		x: 30,
		y: 30
	});
	
	mooElement.rotate(-45);
	jQueryCollection.rotate(-45);

Transform method: scale
-----------------------

Scale an element.

**Signature**

	transform.scale(value);
	transform.scale(axis, value);
	transform.scale({
		axis: value,
		axis2: value2
	});
	
	mooElement.scale;
	jQueryCollection.scale;

**Arguments**

- axis (string) - The axis to scale.  Accepts `x` and `y`.
- value (number) - The multiplier to scale by.

**Examples**

	transform.scale(2); // doubles in size
	transform.scale('x', 1.5); // scretches horizontally
	transform.scale({
		x: 0.5,
		y: 1.5
	});
	
	mooElement.scale(2);
	jQueryCollection.scale(2);

Transform method: skew
----------------------

Skew an element's angles.

**Signature**

	transform.skew(axis, value);
	transform.skew({
		axis: value,
		axis2: value2
	});
	
	mooElement.skew;
	jQueryCollection.skew;

**Arguments**

- axis (string) - The axis to skew.  Accepts `x` and `y`.
- value (number) - The amount in degrees to skew.

**Examples**

	transform.skew('x', 30);
	transform.scale({
		x: 30,
		y: -10
	});
	
	mooElement.skew('x', 30);
	jQueryCollection.skew('x', 30);

**Notes**

CSS transforms accept `skew(x, y)` and `skew(x)`, but this script does not.  It will support this syntax eventually.

