/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// console.log(`calling removeDuplicate:  ${minDepth(new TreeNode())}`)

import {TreeNode} from "./tree-min-depth";

// function maxDepthRec(root: TreeNode | null): number {
//     if (root === null){
//         return 0
//     }
//
//     return 1 + Math.max(maxDepthRec(root.left), maxDepthRec(root.right))
// };

export function maxDepthDFS(root: TreeNode | null): number {
    if (root === null){
        return 0
    }
    const q: TreeNode[] = [root]
    let level = 0
    while (q.length){
        const getQLentgh = q.length
        for (let i = 0; i < getQLentgh; i++) {
            const node = q.shift()
            if (node?.left){
                q.push(node.left)
            }
            if (node?.right){
                q.push(node.right)
            }
        }
        level++
    }

    return level
};

export function maxDepthBFS(root: TreeNode | null): number {
    if (root === null){
        return 0
    }
    const stack: {node: TreeNode | null| undefined, depth: number}[] = [{ node: root, depth: 1 }];
    let maxDepth = 0;
    // const stack: Record<TreeNode, number> = {}
    // let level = 0
    while (stack.length){
        const currentNode = stack.pop()
        if (currentNode?.node){
            maxDepth = Math.max(maxDepth, currentNode.depth)

            stack.push({node: currentNode.node?.left, depth: currentNode.depth + 1})
            stack.push({node: currentNode.node?.right, depth: currentNode.depth + 1})
        }
    }

    return maxDepth
};

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)

console.log(`calling maxDepthBFS: ${maxDepthDFS(root)}`)