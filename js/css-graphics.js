class HTMLGraphics {
	constructor(containerId, barNum) {
		this.container = $(containerId)

		this.container.css({
			"display": "flex",
			"flex-direction": "row",
			"justify-content": "space-evenly",
			"align-content": "flex-start",
			"align-items": "flex-start"
		})

		for (let i = 0; i < barNum; ++i)
			this.container.append('<div class="bar"></div>')

		$('.bar').css("width", 80 / barNum + "%")
	}

	render(coloredArray) {
		$('.bar').each(function(i) {
			$(this).css({
				"background-color": coloredArray[i].color,
				// "border": "solid " + coloredArray[i].color,
				"height": coloredArray[i].val + "%"
			})
		})
	}

	changeSize(size) {
		this.container.empty()

		for (let i = 0; i < size; ++i)
			this.container.append('<div class="bar"></div>')

		$('.bar').css("width", 80 / size + "%")
	}
}
