let dpi = window.devicePixelRatio;
let canvas = document.getElementById('stage');

function fix_dpi() {
	let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
	let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
	canvas.setAttribute('height', style_height * dpi);
	canvas.setAttribute('width', style_width * dpi);
}

$(document).ready(function() {
	let bars = new Bars('#stage', 100)
	let randHeights = Array.from({length: 100}, () => Math.floor(Math.random() * 100))
	bars.createBars(randHeights)
	console.log(bars.barWidth)
})