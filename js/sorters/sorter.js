/** Parent class for all sorters */
class Sorter {
	constructor(arr) {
		this.arr = arr
		this.stack = new Array() // "stack" to store i j k history for recursive calls
		this.i = 0
		this.j = 0
		this.k = arr.length - 1
	}

	*sort() {
		return
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
