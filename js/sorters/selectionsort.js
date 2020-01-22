class SelectionSorter extends Sorter {
	*sort() {
		for (let i = 0; i < this.arr.length; ++i) {
			let minIdx = i
			for (let j = i+1; j < this.arr.length; ++j) {
				if (this.arr[minIdx] > this.arr[j]) minIdx = j
				yield { selected: [minIdx, j], sorted: [0, i]}
			}

			this.swap(i, minIdx)
			yield { selected: [minIdx, i], sorted: [0, i]}
		}
	}
}