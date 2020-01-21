class MergeSorter extends Sorter{
	constructor(arr) {
		super(arr)
		this.i = 0
		this.j = 0
		this.k = arr.length - 1
		this.stack = new Array() // "stack" to store i j k history for recursive calls
		this.sorted = {first: 0, last: 0}
	}

	*sort() {

		if (this.i < this.k) {
			this.j = Math.floor((this.i + this.k) / 2)
			yield {
				selected: {first: this.j, last: this.j + 1},
				sorted: this.sorted
			}

			this.pushState()

			this.k = this.j
			yield * this.sort()

			this.peekState()

			this.i = this.j + 1
			yield * this.sort()

			this.popState()
			this.merge()
		}

		this.sorted = {first: this.i, last: this.k}

		yield {
			sorted: this.sorted
		}

	}

	merge() {
		let mergeIdx = 0
		let leftIdx = this.i
		let rightIdx = this.j + 1
		let merged = new Array(this.k - this.i + 1)

		while (leftIdx <= this.j && rightIdx <= this.k) {
			if (this.arr[leftIdx] <= this.arr[rightIdx])
				merged[mergeIdx] = this.arr[leftIdx++]
			else
				merged[mergeIdx] = this.arr[rightIdx++]
			mergeIdx++
		}

		while (leftIdx <= this.j)
			merged[mergeIdx++] = this.arr[leftIdx++]

		while (rightIdx <= this.k)
			merged[mergeIdx++] = this.arr[rightIdx++]

		for (let mergeIdx = 0; mergeIdx < merged.length; ++mergeIdx)
			this.arr[this.i + mergeIdx] = merged[mergeIdx]

	}

	pushState() {
		this.stack.push(this.i)
		this.stack.push(this.j)
		this.stack.push(this.k)
	}

	popState() {
		this.k = this.stack.pop()
		this.j = this.stack.pop()
		this.i = this.stack.pop()
	}

	peekState() {
		this.k = this.stack[this.stack.length - 1]
		this.j = this.stack[this.stack.length - 2]
		this.i = this.stack[this.stack.length - 3]
	}
}