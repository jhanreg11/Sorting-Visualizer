function quickSort(arr, i, k) {
	if (i >= k)
		return

	let j = partition(arr, i, k)

	quickSort(arr, i, j)
	quickSort(arr, j+1, k)
}

function partition(arr, i, k) {
	let l = i
	let h = k
	let pivot = arr[Math.floor(i + (k - i) / 2)]
	let tmp
	let done = false

	while (!done) {
		console.log(l, h)
		while (arr[l] < pivot)
			++l
		while (pivot < arr[h])
			--h

		if (l >= h)
			done = true
		else {
			tmp = arr[l]
			arr[l] = arr[h]
			arr[h] = tmp
			++l
			--h
		}
	}

	return h
}

class QuickSorter extends Sorter {
	*sort() {
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
				yield {selected: [l, h]}
				++l
			}

			while (pivot < this.arr[h]) {
				yield {selected: [l, h]}
				--h
			}

			if (l >= h)
				done = true
			else {
				yield {selected: [l, h]}

				this.swap(l, h)
				++l
				--h
			}
		}

		yield {selected: [h]}
		this.j = h
	}
}