// MooTools
document.addEvent('domready', function(){

	var slides  = $$('#gallery div'),
		transition = {
			property: 'transform',
			duration: '750ms',
			'timing-function': 'ease'
		},
		current = slides[slides.length - 1].setTransition(transition);

	var next = function(){
		var last = current.setStyle('z-index', 1);
		current = current.getNext() || slides[0];
		// clear the transition so it will be placed below without a transition
		current.clearTransition().translate('y', 100).setStyle('z-index', 2);
		
		// if you clear a transition, then change a property (like transform here),
		// then set a transition again, it'll still transition, regardless of the
		// order of things because it's all in the same "step" of the thread. Therefore, 
		// an immediate setTimeout puts us into the next step and gives us what we 
		// want:  A transform without a transition (line 17), and then a transform 
		// with a transition (line 28);
		setTimeout(function(){
			// up they go!
			last.translate('y', -100);
			current.setTransition(transition).translate('y', 0);
		}, 0);

		// auto play
		next.delay(2000);
	};

	// give it a couple seconds before it performs the first transition
	next.delay(2000)

});