// MooTools
document.addEvent('domready', function(){
	var toggles = $$('#mootools h2'),
		panels = $$('#mootools h2 + div'),
		current = 0;

	panels.each(function(panel, index){
		panel.setStyle('height', index === 0 ? panel.scrollHeight : 0);
		// here it is!
		panel.setTransition({
			property: 'height',
			duration: '500ms',
			'timing-function': 'ease'
		});
	});

	toggles.each(function(toggle, index){
		toggle.addEvent('click', function(){
			if (current === index) return;
			panels[current].setStyle('height', 0);
			current = index;
			panels[index].setStyle('height', panels[index].scrollHeight);
		});
	});
});

// jQuery
$(function(){
	var toggles = $('#jquery h2'),
		panels = $('#jquery h2 + div'),
		current = 0;

	panels.each(function(index, panel){
		var $panel = $(panel);
		$panel.css('height', index === 0 ? panel.scrollHeight : 0);
		// here it is!
		$panel.setTransition({
			property: 'height',
			duration: '500ms',
			'timing-function': 'ease'
		});
	});
	

	toggles.each(function(index, toggle){
		var $toggle = $(toggle);
		$toggle.bind('click', function(){
			if (current === index) return;
			$(panels[current]).css('height', 0);
			current = index;
			$(panels[index]).css('height', panels[index].scrollHeight);
		});
	});
});

// Native
document.addEventListener('DOMContentLoaded', function(){
	var toggles = document.querySelectorAll('#native h2'),
		panels = document.querySelectorAll('#native h2 + div'),
		current = 0;

	Array.prototype.slice.call(panels, 0).forEach(function(panel, index){
		panel.style.height = index === 0 ? panel.scrollHeight + 'px' : 0;
		// here it is!
		new Transition(panel).set({
			property: 'height',
			duration: '500ms',
			'timing-function': 'ease'
		});
	});

	Array.prototype.slice.call(toggles, 0).forEach(function(toggle, index){
		toggle.addEventListener('click', function(){
			if (current === index) return;
			panels[current].style.height = 0;
			current = index;
			panels[index].style.height = panels[index].scrollHeight + 'px';
		});
	});
}, false);
