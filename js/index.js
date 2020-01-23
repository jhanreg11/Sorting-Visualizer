let visualizer

$(document).ready(function() {
	// limit max size for mobile
	if ($(document).width() <= 1000) {
		$('#size-input').attr("max", "25")
		$('#size-input').attr("value", "25")
	}

	visualizer = new SortVisualizer('#container', Number($('#size-input').val()), 'merge')
	visualizer.run()

	//// event listeners ////
	$('#algo-select').change(() => {
		visualizer.reset()
		visualizer.changeSorter($('#algo-select').val())
	})

	$('#speed-input').change(() => {
		visualizer.changeSpeed(Number($('#speed-input').val()))
	})

	$('#size-input').change(() => {
		console.log($('#size-input').val())
		visualizer.changeArraySize(Number($('#size-input').val()))
	})

	$('#restart').click(() => {
		visualizer.reset()
	})

	$('#pause').click(() => {
		if (visualizer.running)
			visualizer.pause()
	})

	$('#start').click(() => {
		if (!visualizer.timerId)
			visualizer.run()
		else if (!visualizer.running)
			visualizer.resume()
	})

	$('#fast-forward').click(() => {
		if (visualizer.running)
			visualizer.fastForward()
	})

	$('#finish').click(() => {
		if (visualizer.running)
			visualizer.fastForward(true)
	})

	//// Styling ////

	// override media control font size
	$('.material-icons').each(function() {
		$(this).css('font-size', '2em')
	})

	// polyfill range slider
	$('#size-input').rangeslider()
	$('#speed-input').rangeslider()

})

