class HeapSorter extends Sorter {
	*sort() {
		for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; --i)
			yield * this.heapify(this.arr.length, i)

		for (let k = this.arr.length - 1; k >= 0; --k) {
			yield { selected: [0, k], sorted: [k+1, this.arr.length]}
			this.swap(0, k)
			yield { selected: [0, k], sorted: [k, this.arr.length]}
			yield * this.heapify(k, 0)
		}
	}

	*heapify(length, i) {
		let largest = i
		let left = i * 2 + 1
		let right = left + 1

		if (left < length && this.arr[left] > this.arr[largest])
			largest = left

		if (right < length && this.arr[right] > this.arr[largest])
			largest = right

		if (largest != i) {
			this.swap(i, largest)
			yield { selected: [i, largest], sorted: [length, this.arr.length]}
			yield * this.heapify(length, largest)
			yield { selected: [i, largest], sorted: [length, this.arr.length]}
		}
	}
}
