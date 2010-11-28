Number.prototype.round = function(precision){
	precision = Math.pow(10, precision || 0).toFixed(precision < 0 ? -precision : 0);
	return Math.round(this * precision) / precision;
};

function hand(element, positions, firstPosition){
	var element = document.getElementById(element),
		transform = new Transform(element),
		transition = new Transition(element),
		counter = firstPosition,
		degrees = 360 / positions,
		next = function(){
			transform.rotate((++counter * degrees).round(0))
		};

	transform.rotate((counter * degrees).round(0));

	setTimeout(function(){
		transition.set({
			property: 'transform',
			duration: '0.15s',
			'timing-function': 'ease-in'
		});
	}, 0);

	return { next: next };
}

function genesis(){
	secondHand.next();
	minuteHand.next();
	hourHand.next();
	setTimeout(genesis, 1000);
}


var labels     = document.querySelectorAll('#labels b'),
	date       = new Date(),
	seconds    = date.getSeconds(),
	minutes    = seconds + (date.getMinutes() * 60),
	hours      = minutes + (date.getHours() * 60 * 60),
	secondHand = hand('seconds',    60, seconds),
	minuteHand = hand('minutes',  3600, minutes),
	hourHand   = hand('hours',   43200, hours);

// rotate all the roman numerals to outline the clock
for (i = 0, l = labels.length; i < l; i++) new Transform(labels[i]).rotate(i * 30);
// start time
genesis();
