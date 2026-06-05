export class PriorityQueue<T> {
  private data: T[];
  private compare: (a: T, b: T) => number;

  constructor(compareFunction: (a: T, b: T) => number) {
    this.data = [];
    this.compare = compareFunction;
  }

  public enqueue(item: T): void {
    this.data.push(item);
    this.heapifyUp();
  }

  public dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const top = this.data[0];
    const bottom = this.data.pop();
    if (this.data.length > 0 && bottom !== undefined) {
      this.data[0] = bottom;
      this.heapifyDown(0);
    }
    return top;
  }

  public get size(): number {
    return this.data.length;
  }

  public isEmpty(): boolean {
    return this.data.length === 0;
  }

  private heapifyUp(): void {
    let currentIndex = this.data.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.compare(this.data[currentIndex], this.data[parentIndex]) >= 0) break;
      
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  private heapifyDown(index: number): void {
    let smallest = index;
    const leftChild = 2 * index + 1;
    const rightChild = 2 * index + 2;
    const len = this.data.length;

    if (leftChild < len && this.compare(this.data[leftChild], this.data[smallest]) < 0) {
      smallest = leftChild;
    }
    if (rightChild < len && this.compare(this.data[rightChild], this.data[smallest]) < 0) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }
}
