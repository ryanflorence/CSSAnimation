CSSAnimation.js
===============

CSS Animations with JavaScript.  This script includes two global constructors, `Transition` and `Transform`.

Usage
=====

	var element = document.getElementById('some-el'),
	    transition = new Transition(element),
	    transform = new Transform(element);

Transitions
-----------

### Transition method: set

**Signature:**

	transition.set(rule, value);
	transition.set({
	  rule: value,
	  rule2: value2
	});

**Arguments**

- rule (string) - can be any of the following:
	- `property` - the CSS property(s) to transition.  If `transform` is specified, the proper browser prefix will be added (i.e. -webkit-)
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


Transforms
----------

Supports rotate and translate.  Skew and scale coming shortly, will be in 1.0 release.

	transform.rotate('z', 45); // rotates 45 degrees clockwise
	transform.translate('x', 50); // moves across the X axis 50%

	// safari only 3D rotations
	transform.rotate({
		x: 30,
		y: 30
	})

