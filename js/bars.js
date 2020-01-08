/** Class for rendering sorting bars */
class Bars {

	groundHeight = 50
	scale = 2

	constructor(canvasId, barNum, maxHeight) {
		this.canvas = $(canvasId)
		this.ctx = this.canvas[0].getContext('2d')

		this.num = barNum
		this.barWidth = Math.min(5, Math.max(1, this.canvas.width() / this.num))
		if (this.barWidth == 1)
			this.fillWidth = this.barWidth
		else
			this.fillWidth = this.barWidth / 2

		this.ctx.fillStyle = 'rgb(0,0,0)'
		this.ctx.fillRect(0, 0, this.canvas.width(), this.groundHeight)

		if (typeof barHeights != 'undefined')
			this.createBars(barHeights)
	}

	createBars(heights) {
		this.heights = heights

		// resize height values to fit in canvas
		while (Math.max(this.heights) > this.canvas.height() - this.groundHeight)
			this.heights = this.heights.map(y => y / 2)

		let getColor = () => '#FF0000'
		if (this.fillWidth == this.barWidth)
			getColor = this.randColor

		for (let i = 0; i < this.num; ++i) {
			this.ctx.fillStyle = getColor()
			this.ctx.fillRect(this.barWidth * i, this.groundHeight, this.fillWidth, heights[i])
		}
	}

	randColor() {
		var letters = '0123456789ABCDEF'
		var color = '#'
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)]
		}
		return color
	}

}
