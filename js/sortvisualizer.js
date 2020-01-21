const maxVal = 100
const defaultLength = 100
const SortingClasses = {
	merge: MergeSorter
}
const colors = {
	default: "#696D7D",
	sorted: "#78C091",
	selected: "#C49991"
}

function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

/** Main class for sorting visualizer */
class SortVisualizer {
	constructor(canvasId, arrLength, sortingType) {
		if (typeof arrLength != 'number')
			arrLength = defaultLength
		if (typeof sortingType != 'string')
			sortingType = 'merge'

		this.arr = Array.from({length: arrLength}, () => 1 + Math.floor(Math.random() * maxVal))

		this.sorter = new SortingClasses[sortingType](this.arr)
		console.log(this.sorter)
		this.graphics = new HTMLGraphics(canvasId, arrLength, maxVal)

		this.graphics.render(this.generateColoredArray({}))
	}

	run() {
		var iterator = this.sorter.sort()
		this.timerId = setInterval(() => this._runLoop(iterator), 50)
	}

	_runLoop(iterator) {
		let next = iterator.next()
		if (next.done) {
			clearInterval(this.timerId)
		}
		this.graphics.render(this.generateColoredArray(next.val))
	}

	generateColoredArray(colored) {
		let coloredArray = this.arr.map(val => {
			return {val: val, color: colors['default']}
		})

		for (let type in colored)
			for (let i = colored[type].start; i < colored[type].last; ++i)
				coloredArray[i].color = colors[type]

		return coloredArray
	}
}


