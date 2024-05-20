console.log("Hello World!!")

// JavaScript program for Merge Sort

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(arr: number[], leftIndex: number, mediumIndex: number, rightIndex: number) {
    const n1 = mediumIndex - leftIndex + 1
    const n2 = rightIndex - mediumIndex

    // Create temp arrays
    const L = new Array(n1)
    const R = new Array(n2)

    // Copy data to temp arrays L[] and R[]
    for (let i = 0 ; i < n1 ; i++)
        L[i] = arr[leftIndex + i]
    for (let j = 0 ; j < n2 ; j++)
        R[j] = arr[mediumIndex + 1 + j]

    // Merge the temp arrays back into arr[l..r]

    // Initial index of first subarray
    let i = 0

    // Initial index of second subarray
    let j = 0

    // Initial index of merged subarray
    let k = leftIndex

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i]
            i++
        }
        else {
            arr[k] = R[j]
            j++
        }
        k++
    }

    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i]
        i++
        k++
    }

    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j]
        j++
        k++
    }
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted
function mergeSort(arr,l, r){
    if(l>=r){
        return
    }
    const m =l+ Math.floor((r-l)/2)
    mergeSort(arr,l,m)
    mergeSort(arr,m+1,r)
    merge(arr, l, m, r)
}

// Function to print an array
function printArray(array)
{
    for (let i = 0;  i < array.length ; i++)
        console.log(  array[i] + " ")
}


const arr = [ 2, 3, -4, 9, -10, 0 ]
const arr_size = arr.length

console.log(  "Given array is ")
printArray(arr)

mergeSort(arr, 0, arr_size - 1)

console.log( "Sorted array is ")
printArray(arr)

// This code is contributed by SoumikMondal
