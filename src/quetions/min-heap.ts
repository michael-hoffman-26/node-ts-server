

export class MinHeap {
    private heap: number[]

    constructor() {
        this.heap = []
    }

    public addNumber (numberToAdd: number){
        this.heap.push(numberToAdd)
        this.fixHeap()
    }

    private fixHeap(){
        let lastNumberIndex = this.heap.length -1
        while (lastNumberIndex > 0 ) {
            const parentIndex = this.getParent(lastNumberIndex)
            if (parentIndex === 0 || (parentIndex && parentIndex > 0)) {
                if (this.heap[parentIndex] > this.heap[lastNumberIndex]) {
                    // do swap
                    const parentVal = this.heap[parentIndex]
                    this.heap[parentIndex] = this.heap[lastNumberIndex]
                    this.heap[lastNumberIndex] = parentVal

                    lastNumberIndex = parentIndex
                } else {
                    break
                }
            }
        }
    }

    private getParent(index: number){
        if (index === 0){
            return null
        }
        if (index === 1){
            return 0
        }
        if (index > this.heap.length -1){
            throw new Error("out of boundary")
        }

        return Math.floor((index-1)/2)
    }


    private getLeftChild(index: number){
        const leftChildIndex = 2 * index + 1
        if (leftChildIndex > this.heap.length -1){
            return null
        }

        return leftChildIndex
    }

    private getRightChild(index: number){
        const rightChildIndex = 2 * index + 2
        if (rightChildIndex > this.heap.length -1){
            return null
        }

        return rightChildIndex
    }

    public printHeap(){
        for (let i = 0; i < this.heap.length; i++) {
            console.log(`index: ${i} val: ${this.heap[i]}`)
        }
    }
}

class SeatManager {
    private heap: number[]
    constructor(n: number) {
        this.heap = []
        this.initHeap(n)
    }
    private initHeap(n: number){
        for (let i = 0; i < n; i++) {
            this.heap[i] = i + 1
        }
    }

    reserve(): number {
        let topIndex = 0
        const seat = this.heap[topIndex]
        this.heap[topIndex] = this.heap[this.heap.length -1]
        this.heap.pop()

        // now go up bottom until we get minimum
        // Heapify the tree starting from the element at the deleted index
        // eslint-disable-next-line no-constant-condition
        while (true) {
            const left_child = this.getLeftChild(topIndex)
            const right_child = this.getRightChild(topIndex)
            let smallest = topIndex;
            if (left_child && this.heap[left_child] < this.heap[smallest]) {
                smallest = left_child;
            }
            if (right_child && this.heap[right_child] < this.heap[smallest]) {
                smallest = right_child;
            }
            if (smallest != topIndex) {
                [this.heap[topIndex], this.heap[smallest]] = [this.heap[smallest], this.heap[topIndex]];
                topIndex = smallest;
            } else {
                break;
            }
        }

        return seat
    }

    unreserve(seatNumber: number): void {
        this.heap.push(seatNumber)
        this.fixHeap()
    }

    private getLeftChild(index: number){
        const leftChildIndex = 2 * index + 1
        if (leftChildIndex > this.heap.length -1){
            return null
        }

        return leftChildIndex
    }

    private getRightChild(index: number){
        const rightChildIndex = 2 * index + 2
        if (rightChildIndex > this.heap.length -1){
            return null
        }

        return rightChildIndex
    }

    private fixHeap(){
        let lastNumberIndex = this.heap.length -1
        while (lastNumberIndex > 0 ) {
            const parentIndex = this.getParent(lastNumberIndex)
            if (parentIndex === 0 || (parentIndex && parentIndex > 0)) {
                if (this.heap[parentIndex] > this.heap[lastNumberIndex]) {
                    // do swap
                    const parentVal = this.heap[parentIndex]
                    this.heap[parentIndex] = this.heap[lastNumberIndex]
                    this.heap[lastNumberIndex] = parentVal

                    lastNumberIndex = parentIndex
                } else {
                    break
                }
            }
        }
    }

    private getParent(index: number){
        if (index === 0){
            return null
        }
        if (index === 1){
            return 0
        }
        if (index > this.heap.length -1){
            throw new Error("out of boundary")
        }

        return Math.floor((index-1)/2)
    }
}