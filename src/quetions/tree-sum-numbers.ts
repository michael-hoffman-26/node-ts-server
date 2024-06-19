import {TreeNode} from "./tree-min-depth";


export function sumNumbers(root: TreeNode | null): number {
    if (root?.left === null && root.right === null){
        return root.val
    }

    const stack: {node: TreeNode, path: number[]}[] = []
    let sum = 0
    if (root){
        stack.push({ node: root, path: [root.val]})
    }

    function calculateCurrentSum (paths: number[]){
        let currentTotal = 0
        for (let i = 0; i < paths.length; i++) {
            currentTotal = currentTotal * 10 + paths[i]
        }

        return currentTotal
    }

    while (stack.length){
        const currentNodeVal = stack.pop()
        const currentNode = currentNodeVal?.node

        // if its a lef
        if (currentNode?.left === null && currentNode.right === null){
            sum += calculateCurrentSum(currentNodeVal?.path || [])
        }

        if (currentNode?.right){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const paths = currentNodeVal.path.slice()
            paths?.push(currentNode.right.val)
            stack.push({node: currentNode.right, path: paths})
        }
        if (currentNode?.left){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const paths = currentNodeVal.path.slice()
            paths?.push(currentNode.left.val)
            stack.push({node: currentNode.left, path: paths})
        }
    }

    return sum
};