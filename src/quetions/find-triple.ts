function calculateMiddleIndex(arr: number[], middle: number, yResults: YNumberInterface[], v1): void {
  const leftSideArray: number [] = arr.slice(0, middle)
  const rightSideArray: number [] = arr.slice(middle  + 1, arr.length)

  if (v1) {
    yResults[arr[middle]] = {
      x1: {},
      z1: {},
      isEdge: false,
      xTotal: 0,
      zTotal: 0
    }
    for (let i = 0; i < leftSideArray.length; i++) {
      yResults[arr[middle]].x1[leftSideArray[i]] = 1
    }
    for (let i = 0; i < rightSideArray.length; i++) {
      yResults[arr[middle]].z1[rightSideArray[i]] = 1
    }
  } else {
    for (let i = 0; i < leftSideArray.length; i++) {
      if (yResults[arr[middle]].x1[leftSideArray[i]] === 1){
        yResults[arr[middle]].xTotal++
      }
    }

    for (let i = 0; i < rightSideArray.length; i++) {
      if (yResults[arr[middle]].z1[rightSideArray[i]] === 1){
        yResults[arr[middle]].zTotal++
      }
    }
  }
  if (leftSideArray.length === 0 || rightSideArray.length === 0){
    yResults[arr[middle]].isEdge = true
  }
}

const quickCheckSortV2 = (arr: number[], left: number, right: number,  yResults: YNumberInterface[], v1 = true) => {
  if (left > right) {
    return
  }
  const middleIndex = Math.floor((right-left)/2 + left)
  calculateMiddleIndex(arr, middleIndex, yResults, v1)


  quickCheckSortV2(arr, left, middleIndex - 1, yResults, v1);
  quickCheckSortV2(arr, middleIndex + 1, right, yResults, v1);
};

interface YNumberInterface {
  isEdge: boolean
  x1: { x?: number }
  x2?: { x?: number }
  xTotal: number
  z1: { x?: number }
  z2?: { x?: number }
  zTotal: number
}

const num1 = [2,0,1,3]
const num2 = [0,1,2,3]

function goodTriplets(nums1: number[], nums2: number[]): number {
  const yResults: YNumberInterface[] = []
  const left  = 0
  const right = nums1.length - 1
  quickCheckSortV2(nums1, left, right, yResults)
  quickCheckSortV2(nums2, left, right, yResults, false)

  const allValidY = yResults.filter(y => y.isEdge === false)
  return allValidY.reduce((previousSum, currentYResult) => {
    return previousSum + currentYResult.xTotal * currentYResult.zTotal
  }, 0)
};