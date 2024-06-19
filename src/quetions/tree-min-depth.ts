// console.log(`calling minDepth: ${minDepth(new TreeNode())}`)

// Definition for a binary tree node.
export class TreeNode {
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
    let depthCounter = 0
    // tempNode = FIFO.shift()

    while (tempNode !== null) {
        // 1. print
        // console.log(tempNode?.val)
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

function isLeaf(node)
{

    // If given node's left's right is pointing to given
    // node and its right's left is pointing to the node
    // itself then it's a leaf
    return (node.left != null && node.left.right == node
        && node.right != null
        && node.right.left == node);
}

/* Compute the height of a tree -- the number of
    Nodes along the longest path from the root node
    down to the farthest leaf node.*/
function minDepthRec(node)
{

    // if node is NULL, return 0
    if (node == null)
        return 0;

    // if node is a leaf node, return 1
    if (isLeaf(node))
        return 1;

    // compute the depth of each subtree and take
    // maximum
    return 1
        + Math.min(minDepthRec(node.left),
            minDepthRec(node.right));
}

function invertTree(root: TreeNode | null): TreeNode | null {
    if (root === null){
        return null
    }

    if (root){
        const leftVal = root.left
        root.left = invertTree(root.right)
        root.right = invertTree(leftVal)
    }

    return root
};