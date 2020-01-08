
// used to fix resolution
let dpi
let canvas
function fix_dpi() {
	let style_height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
	let style_width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
	canvas.setAttribute('height', style_height * dpi);
	canvas.setAttribute('width', style_width * dpi);
}



$(document).ready(function() {

	// fixing resolution
	dpi = window.devicePixelRatio
	canvas = document.getElementById('stage')
	fix_dpi()

	let size = 100
	let maxVal = 100
	let bars = new Bars('#stage', size)
	let randHeights = Array.from({length: size}, () => Math.floor(Math.random() * size))
	bars.createBars(randHeights)

	$('#size-input').on('change', () => {
		bars.clear()
		size = Number($('#size-input').val())
		if (size > maxVal)
			maxVal = size
		bars = new Bars('#stage', size)
		randHeights = Array.from({length: size}, () => Math.floor(Math.random() * maxVal))
		bars.createBars(randHeights)
	})

	setInterval(() => {
		bars.switchBars(Math.floor(Math.random() * size), Math.floor(Math.random() * size))
	})

})