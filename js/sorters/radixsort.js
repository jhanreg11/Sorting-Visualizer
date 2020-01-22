class RadixSorter extends Sorter {
	*sort() {
		let buckets = Array.from({length: 10}).map(() => new Array())
		let maxDigits = this.getMaxDigits()
		console.log(maxDigits)

		let pow = 1
		for (let digitIndex = 0; digitIndex < maxDigits; ++digitIndex) {

			for (let i = 0; i < this.arr.length; ++i) {
				let bucketIndex = Math.floor(this.arr[i] / pow) % 10
				buckets[bucketIndex].push(this.arr[i])
			}

			let arrayIndex = 0
			for (let i = 0; i < 10; ++i) {
				for (let j = 0; j < buckets[i].length; ++j) {
					yield {selected: [arrayIndex]}
					this.arr[arrayIndex++] = buckets[i][j]
					yield {selected: [arrayIndex]}
				}
			}

			pow *= 10
			buckets = Array.from({length: 10}).map(() => new Array())
		}
	}

	getMaxDigits() {
		let max = 0
		this.arr.map(i => {
			if (String(i).length > max)
				max = String(i).length
		})

		return max
	}
}