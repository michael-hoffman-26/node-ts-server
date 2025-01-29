/**
 * The original task is to implement a PromiseQueue that executes promises sequentially (one after another). The following code has a bug, the promises are not running sequentially as expected.
 */

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export class PromiseQueue<T> {

    constructor() {
        this.processQueue()
    }

    private promisesToExecuteQueue: {
        pointerToFunc: () => Promise<T>
        pointerToResolve: any,
        pointerToReject: any
    }[] = [];

    private currentTask: (() => Promise<T>) | null = null

    public add(promiseToAdd: () => Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            this.promisesToExecuteQueue.push({
                pointerToFunc: promiseToAdd,
                pointerToReject: reject,
                pointerToResolve: resolve
            })
        });
    }

    private async processQueue() {

        while (this.promisesToExecuteQueue.length || this.currentTask === null) {
            await sleep(100)
            if (this.currentTask === null && this.promisesToExecuteQueue.length) {

                const { pointerToFunc, pointerToReject, pointerToResolve } = this.promisesToExecuteQueue.shift()!

                this.currentTask = pointerToFunc

                await this.currentTask().then(resolve => {
                    console.log("resolved in queue", resolve)
                    return pointerToResolve(resolve)
                }).catch(err => {

                    return pointerToReject(err)
                }).finally(() => {
                    this.currentTask = null
                })
            }
        }
    }
}



/** 
 * 
 * From now on this is a test code, DO NOT edit it 
 * 
 * */
export async function testQueue(queue: PromiseQueue<number>) {
    function sleep(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async function sleepAndReturn(n: number): Promise<number> {
        await sleep(n * 100);
        console.log("resolved in promise", n)
        return n;
    }
    const promises: Promise<number>[] = [];
    const resolvedByExecutionOrder: number[] = [];
    const input = [8, 4, 10, 1, 12, 2, 4];
    promises.push(
        ...input.map((n) =>
            queue
                .add(() => sleepAndReturn(n))
                .then((n) => resolvedByExecutionOrder.push(n))
        )
    );
    await Promise.all(promises);

    console.log("Result:", { input, resolvedByExecutionOrder });
    console.log(
        "Test passed: ",
        JSON.stringify(input) === JSON.stringify(resolvedByExecutionOrder)
    );
}

