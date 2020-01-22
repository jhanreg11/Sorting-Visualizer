const maxVal = 100
const defaultLength = 100

const SortingClasses = {
	merge: MergeSorter,
	quick: QuickSorter,
	heap: HeapSorter,
	radix: RadixSorter,
	bubble: BubbleSorter,
	selection: SelectionSorter
}

const colors = {
	default: "#696D7D",
	sorted: "#78C091",
	selected: "#C49991",
}

function randArray(len) {
	return Array.from({length: len}).map(() => Math.floor(Math.random() * len))
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
		this.graphics = new HTMLGraphics(canvasId, arrLength, maxVal)

		this.graphics.render(this.generateColoredArray({}))
	}

	run() {
		let iterator = this.sorter.sort()
		this.timerId = setInterval(() => this._runLoop(iterator), 5)
	}

	_runLoop(iterator) {
		let next = iterator.next()
		if (next.done) {
			clearInterval(this.timerId)
			this.graphics.render(this.generateColoredArray({ 'sorted': [0, this.arr.length] }))
			return
		}
		this.graphics.render(this.generateColoredArray(next.value))
	}

	generateColoredArray(colored) {
		let coloredArray = this.arr.map(val => {
			return {val: val, color: colors['default']}
		})

		for (let type in colored) {
			if (type == 'sorted')
				for (let i = colored[type][0]; i < colored[type][1]; ++i)
					coloredArray[i].color = colors[type]
			else if (type == 'selected')
				colored[type].map(i => {
					try { coloredArray[i].color = colors[type] }
					catch (e) { console.log(i)}
				})
		}
		return coloredArray
	}
}


