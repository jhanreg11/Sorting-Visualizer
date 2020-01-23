class MergeSorter extends Sorter{
	*sort() {

		if (this.i < this.k) {
			this.j = Math.floor((this.i + this.k) / 2)

			this.pushState()

			this.k = this.j
			yield * this.sort()

			this.peekState()

			this.i = this.j + 1
			yield * this.sort()

			this.popState()
			yield * this.merge()
		}

	}

	*merge() {
		let mergeIdx = 0
		let leftIdx = this.i
		let rightIdx = this.j + 1
		let merged = new Array(this.k - this.i + 1)

		while (leftIdx <= this.j && rightIdx <= this.k) {
			yield { selected: [leftIdx, rightIdx] }

			if (this.arr[leftIdx] <= this.arr[rightIdx])
				merged[mergeIdx] = this.arr[leftIdx++]
			else
				merged[mergeIdx] = this.arr[rightIdx++]
			mergeIdx++
		}

		while (leftIdx <= this.j) {
			yield { selected: [leftIdx] }
			merged[mergeIdx++] = this.arr[leftIdx++]
		}

		while (rightIdx <= this.k) {
			yield { selected: [rightIdx] }
			merged[mergeIdx++] = this.arr[rightIdx++]
		}

		for (let mergeIdx = 0; mergeIdx < merged.length; ++mergeIdx) {
			this.arr[this.i + mergeIdx] = merged[mergeIdx]
			yield { selected: [this.i + mergeIdx]}
		}

	}


}