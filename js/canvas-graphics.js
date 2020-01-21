// used to fix resolution
let dpi
let canvas
function fixDpi() {
	let style_height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
	let style_width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
	canvas.setAttribute('height', style_height * dpi);
	canvas.setAttribute('width', style_width * dpi);
}

/** Class for rendering sorting bars */
class CanvasGraphics {
	/**
	 * Create a graphic for sorting.
	 * @param {String} canvasId - id (including '#') for canvas element.
	 * @param {Number} barNum - number of bars in
	 * @param maxHeight
	 */
	constructor(canvasId, barNum, maxHeight) {
		this.canvas = document.getElementById(canvasId)
		this.ctx = this.canvas.getContext('2d')
		this.groundHeight = 50
		this.num = barNum
		this.barWidth = Math.max(1, this.canvas.width / this.num)

		if (this.barWidth == 1)
			this.fillWidth = this.barWidth
		else
			this.fillWidth = this.barWidth / 2
	}

	render(coloredArray) {
		this.clear()

		// draw ground
		this.ctx.fillStyle = 'rgb(0,0,0)'
		this.ctx.fillRect(0, 0, this.canvas.width, this.groundHeight)

		// resize height values to fit in canvas
		while (Math.max(coloredArray.map(item => item.val)) > this.canvas.height - this.groundHeight)
			coloredArray.forEach(function(item) { item.val /= 2 })

		for (let i = 0; i < coloredArray.length; ++i)
			this.renderBar(i, coloredArray[i].val, coloredArray[i].color)
	}

	randColor() {
		var letters = '0123456789ABCDEF'
		var color = '#'
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)]
		}
		return color
	}

	clear() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	renderBar(idx, val, col) {
		this.ctx.fillStyle = col
		this.ctx.fillRect(this.barWidth * idx, this.groundHeight, this.fillWidth, val)
	}

}
