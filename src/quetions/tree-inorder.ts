import {TreeNode} from "./tree-min-depth";


export function inorderTraversal(root: TreeNode | null): number[] {
    // left middle right.
    // we should do  DFS, BC we going deep as far as we can get
    // DFS is using a stack, LIFO: LAST IN FIRST OUT
    const numbersRes: number[] = []
    if (root === null){
        return numbersRes
    }

    const stack: TreeNode[] = []
    let current: TreeNode | null | undefined = root

    while (current !== null || stack.length > 0) {

        while(current !== null){
            if (current instanceof TreeNode) {
                stack.push(current)
            }

            current = current?.left
        }
        // here current = null
        current = stack.pop()

       // this is the value of the must left leave
       //  const current = stack.pop()
        if (current){
            numbersRes.push(current?.val)
        }

        // We have visited the node and its left subtree.
        // Now, it's right subtree's turn
        current = current?.right;
    }

    return numbersRes
};