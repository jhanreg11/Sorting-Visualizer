/* //// Heapsort O(nlogn) //// */
function heapSort(arr) {
	let len = arr.length
	let i = Math.floor(len / 2 - 1)
	let k = len - 1

	while (i >= 0) {
		heapify(arr, len, i)
		i--
	}

	while (k >= 0) {
		[arr[0], arr[k]] = [arr[k], arr[0]]
		heapify(arr, k, 0)
		k--
	}
}

function heapify(arr, length, i) {
	let largest = i
	let left = i * 2 + 1
	let right = left + 1

	if (left < length && arr[left] > arr[largest])
		largest = left

	if (right < length && arr[right] > arr[largest])
		largest = right

	if (largest != i) {
		[arr[i], arr[largest]] = [arr[largest], arr[i]]
		heapify(arr, length, largest)
	}
	return arr
}
