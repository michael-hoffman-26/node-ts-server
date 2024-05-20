console.log(`calling minDepth: ${minDepth(new TreeNode())}`)

// Definition for a binary tree node.
class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

// console.log(`calling removeDuplicate:  ${minDepth(new TreeNode())}`)


function minDepth(root: TreeNode): number {

    const FIFO: TreeNode[] = []
    let tempNode : TreeNode | undefined = root

    while (tempNode !== null) {
        // 1. print
        console.log(tempNode?.val)
        // 2 add children to FIFO
        if (tempNode?.left) {
            FIFO.push(tempNode.left)
        }
        if (tempNode?.right) {
            FIFO.push(tempNode.right)
        }

        tempNode = FIFO.shift()
    }


    return 0
};