import {TreeNode} from "./tree-min-depth";


export function isSymmetric(root: TreeNode | null): boolean {
    if (root?.left === null && root.right === null){
        return true
    }

    const q: TreeNode[] = []
    if (root){
        q.push(root)
    }


    function checkIsSymmetric(results: (number | null)[]) {
        for (let i = 0; i < results.length/2; i++) {
            const firstNum = results[i]
            const lastNum = results[results.length -1 -i]

            if (firstNum !== lastNum){
                return false
            } // else continue
        }

        return true
    }

    while (q.length){
        const currentLength = q.length
        const results: (number | null)[] = []
        for (let i = 0; i < currentLength; i++) {
            const currentNode = q.shift()
            results.push(typeof currentNode?.left?.val === 'number' ? currentNode?.left?.val : null)
            results.push(typeof currentNode?.right?.val === 'number' ? currentNode?.right?.val : null)
            if (currentNode?.left){
                q.push(currentNode?.left)
            }
            if (currentNode?.right){
                q.push(currentNode?.right)
            }
        }
        const isSemtric = checkIsSymmetric(results)
        if (!isSemtric){
            return false
        } // else counitine
    }
    return true
};