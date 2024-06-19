import {TreeNode} from "./tree-min-depth";


export function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
    if (root === null){
        return false
    }

    const q = [{node: root, total: root.val}]

    while (q.length){
        const currentNode = q.shift()
        if (!(currentNode?.node?.right instanceof TreeNode) && !(currentNode?.node.left instanceof TreeNode)) {
            if (targetSum === currentNode?.total){
                return true
            }
        }
        if (currentNode?.node.left){
            q.push({node: currentNode?.node.left, total: currentNode?.total  + currentNode?.node.left.val})
        }
        if (currentNode?.node.right){
            q.push({node: currentNode?.node.right, total: currentNode?.total  + currentNode?.node.right.val})
        }
    }

    return false
};