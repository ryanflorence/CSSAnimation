var crawl = document.getElementById('crawl');

var transform = new Transform(crawl).rotate('x', 65).translate('y', 90);

setTimeout(function(){
	new Transition(crawl).set({
		property: 'transform',
		duration: '120s',
		'timing-function': 'linear'
	});
	
	transform.translate('y', -200);
}, 0)