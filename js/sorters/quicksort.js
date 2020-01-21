class QuickSorter extends Sorter {
	*sort() {
		console.log('hi')
		if (this.i >= this.k)
			return

		yield * this.partition()

		this.pushState()
		this.k = this.j
		yield * this.sort()

		this.popState()
		this.i = this.j + 1
		yield * this.sort()
	}

	*partition() {
		let l = this.i
		let h = this.k
		let pivot = this.arr[Math.floor(this.i + (this.k - this.i) / 2)]
		let done = false
		let tmp

		while (!done) {
			while (this.arr[l] < pivot) {
				yield {selected: [l]}
				++l
			}

			while (pivot < this.arr[h]) {
				yield {selected: [h]}
			}

			if (l >= h)
				done = true
			else {
				yield {selected: [l, h]}

				tmp = this.arr[l]
				this.arr[l] = this.arr[h]
				this.arr[h] = tmp
				++l
				--h
			}
		}

		yield {selected: [h]}
		this.j = h
	}
}