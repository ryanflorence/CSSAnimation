CSSAnimation
============

CSS Animations with JavaScript.  This script includes two global constructors, `Transition` and `Transform`.  They automatically detect and work with the correct vendor property, ie `-webkit`, `-moz` etc.

About this Repository
---------------------

- Tracking branch is `develop`
- The master branch only contains tagged releases
- I welcome contributors!

Browser Support
---------------

- Safari
- Chrome
- Mozilla
- Opera
- IE 9 (theoretically, haven't tested yet)

Insofar as the version supports transform and transition.

General Usage
-------------

	var element = document.getElementById('some-el'),
	    transition = new Transition(element),
	    transform = new Transform(element);

Transitions
===========

Define a CSS Transition for an element.  Contains only two public methods

Transitions method: set
-----------------------

**Signature**

	transition.set(rule, value);
	transition.set({
	  rule: value,
	  rule2: value2
	});

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

**Arguments**

- rule (string) - Accepts the same values as `rule` in set.  If null, clears all rules.

**Examples**

	transition.clear('timing-function');
	transition.clear(); // clears all rules

Transform
=========

Defines and manages the state of the `transform` property of an element.

Supports:

- `translateX`, `translateY`, `translateZ`
- `rotateX`, `rotateY`, `rotateZ`, `rotate`
- `scale`, `scaleX`, `scaleY`
- `skewX`, `skewY`

The `matrix` and `skew(x [, y])` coming soon.

Transform method: translate
---------------------------

**Signature**

	transform.translate(axis, value);
	transform.translate({
		axis: value,
		axis2: value2
	});

**Arguments**

- axis (string) - The axis to move along.  Accepts `x`, `y`, and Safari only `z`.
- value (number) - The amount to translate in `%`, except for `z` which is defined in pixels.  `Transform` defines the units dynamically.

**Examples**

	transform.translate('x', 100); // moves right 100%
	transform.translate({
		x: 50,
		y: 50
	});

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

Transform method: skew
----------------------

Skew an element's angles.

**Signature**

	transform.skew(axis, value);
	transform.skew({
		axis: value,
		axis2: value2
	});

**Arguments**

- axis (string) - The axis to skew.  Accepts `x` and `y`.
- value (number) - The amount in degrees to skew.

**Examples**

	transform.skew('x', 30);
	transform.scale({
		x: 30,
		y: -10
	});

**Notes**

CSS transforms accept `skew(x, y)` and `skew(x)`, but this script does not.  It will support this syntax eventually.

License
=======

MIT Style license.