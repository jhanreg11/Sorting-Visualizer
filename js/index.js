let visualizer

$(document).ready(function() {
	visualizer = new SortVisualizer('#container', defaultLength, $('#algo-select').val())
	visualizer.run()
	$('#algo-select').change(() => {
		visualizer.reset()
		visualizer.changeSorter($('#algo-select').val())
	})

	$('#restart').click(() => {
		visualizer.reset()
	})

	$('#speed-input').change(() => {
		visualizer.changeSpeed(Number($('#speed-input').val()))
	})

	$('#start').click(() => {
		if (!visualizer.running)
			visualizer.run()
	})

	$('#size-input').change(() => {
		if (confirm('You are about to restart sorting, are you sure?')) {
			visualizer.changeArraySize(Number($('#size-input').val()))
		}
	})
})

