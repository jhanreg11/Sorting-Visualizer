class BubbleSorter extends Sorter {
	*sort() {
		let anySwapped = true

		while (anySwapped) {
			anySwapped = false
			for (let i = 0; i < this.arr.length - 1; ++i) {
				yield { selected: [i, i+1]}
				if (this.arr[i] > this.arr[i+1]) {
					anySwapped = true
					this.swap(i, i + 1)
					yield { selected: [i, i+1] }
				}
			}
		}

	}
}