class MergeSorter extends Sorter{
	*sort() {

		if (this.i < this.k) {
			this.j = Math.floor((this.i + this.k) / 2)
			yield {
				selected: {first: this.j, last: this.j + 1},
			}

			this.pushState()

			this.k = this.j
			yield * this.sort()

			this.peekState()

			this.i = this.j + 1
			yield * this.sort()

			this.popState()
			yield * this.merge()
		}

		yield {
			selected: {first: 0, last: 0}
		}
	}

	*merge() {
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

			// yield {
			// 	selected: {first: leftIdx, last: leftIdx + 1},
			// 	selected2: {first: rightIdx, last: rightIdx + 1}
			// }
		}

		while (leftIdx <= this.j) {
			merged[mergeIdx++] = this.arr[leftIdx++]
			// yield { selected: {first: leftIdx, last: leftIdx + 1} }
		}

		while (rightIdx <= this.k) {
			merged[mergeIdx++] = this.arr[rightIdx++]
			// yield { selected: {first: rightIdx, last: rightIdx + 1} }
		}

		for (let mergeIdx = 0; mergeIdx < merged.length; ++mergeIdx) {
			this.arr[this.i + mergeIdx] = merged[mergeIdx]
			yield { selected: {first: this.i + mergeIdx, last: this.i + mergeIdx + 1} }
		}

	}


}