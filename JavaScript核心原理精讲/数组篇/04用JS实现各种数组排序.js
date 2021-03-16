/*
 * @Description: 用 JS 实现各种数组排序
 * @Autor: lijinpeng
 * @Date: 2021-03-06 18:30:54
 * @LastEditors: lijinpeng
 */
// 数据结构排队
// 数据结构中稳定的排序算法有哪些？不稳定的排序算法有哪些？
// 时间复杂度和空间复杂度分别代表了什么？

// 时间复杂度&空间复杂度
// 时间复杂度，我们说的更多的是通过 O(nlogn) 以及 O(n) 等来衡量
// O(1) O(logn) O(n) O(nlogn) O(n^2) O(2^n) O(n!)
// 以看到有这几种分类：Excellent、Good、Fair、Bad、Horrible，通过这张图可以一目了然。
// 因此你在面试或者日常工作中编写代码的时候，要努力将代码的时间复杂度维持在 O(nlogn) 以下，
// 要知道凡是超过 n 平方的时间复杂度都是难以接受的。

// 空间复杂度比较容易理解，就是对一个算法在运行过程中临时占用存储空间大小的度量。
// 有的算法需要占用的临时工作单元数与解决问题的规模有关，如果规模越大，则占的存储单元越多。
// 比如，归并排序和快速排序的空间复杂度就是不太一样的。

// 各种排序的 JS 实现
// 数据结构算法中排序有很多种，常见的、不常见的，至少包含十种以上。
// 根据它们的特性，可以大致分为两种类型：比较类排序和非比较类排序。
// 比较类排序：通过比较来决定元素间的相对次序，其时间复杂度不能突破 O(nlogn)，因此也称为非线性时间比较类排序。
// 比较类排序 又分为 交换排序（冒泡排序、快速排序）、插入排序、选择排序（普通选择排序、堆排序）、归并排序
// 非比较类排序：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此也称为线性时间非比较类排序。
// 非比较类排序 又分为计数排序、桶排序、基数排序
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]

// 冒泡排序 O(nlogn)
// 冒泡排序是一次比较两个元素，如果顺序是错误的就把它们交换过来。
//                                                      cv走访数列的工作会重复地进行，直到不需要再交换，也就是说该数列已经排序完成。
function bubbleSort(array) {
  if (array.length < 2) return array
  const len = array.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if(array[j] > array[i]) {
        const temp = array[j]
        array[j] = array[i]
        array[i] = temp
      }
    }
  }
  return array
}
bubbleSort(a)

// 快速排序 O(nlogn)
// 快速排序的基本思想是通过一趟排序，将待排记录分隔成独立的两部分，
// 其中一部分记录的关键字均比另一部分的关键字小，则可以分别对这两部分记录继续进行排序，以达到整个序列有序。
// 最主要的思路是从数列中挑出一个元素，称为 “基准”（pivot）；然后重新排序数列，
// 所有元素比基准值小的摆放在基准前面、比基准值大的摆在基准的后面；在这个区分搞定之后，该基准就处于数列的中间位置；
// 然后把小于基准值元素的子数列（left）和大于基准值元素的子数列（right）递归地调用 quick 方法排序完成
function quickSort(array) {
  var quick = function(arr) {
    if(arr.length < 2) return arr
    const len = arr.length
    const index = Math.floor(len >> 1)
    const pivot = arr.splice(index, 1)[0]
    const left = []
    const right = []
    for (let i = 0; i < len; i++) {
      if (arr[i] > pivot) {
        right.push(a[i])
      } else {
        left[a[i]]
      }
    }
    return quick(left).concat([pivot], quick(right))
  }
  return quick(array)
}
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
quickSort(a)

// 插入排序 O(n^2)
// 插入排序算法描述的是一种简单直观的排序算法。
// 它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入，从而达到排序的效果。
function insertSort(array) {
  if (array.length < 2) return array
  const len = array.length
  // let newArray = array.slice(0, 1)
  let current
  let prev
  for (let i = 1; i < len; i++) {
    current = array[i]
    prev = i - 1
    while(prev >= 0 && array[prev] > current) {
      array[prev + 1] = array[prev]
      prev--
    }
    array[prev + 1] = current
  }
  return array
}
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
insertSort(a)

// 选择排序 O(n^2)
// 它的工作原理是，首先将最小的元素存放在序列的起始位置，再从剩余未排序元素中继续寻找最小元素，
// 然后放到已排序的序列后面……以此类推，直到所有元素均排序完毕。
function selectSort(array) {
  if (array.length < 2) return array
  const len = array.length
  let temp
  let minIndex
  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (array[j] <= array[minIndex]){
        minIndex = j
      }
    }
    temp = array[i]
    array[i] = array[minIndex]
    array[minIndex] = temp
  }
  return array
}
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
selectSort(a)

// 堆排序
// 堆排序是指利用堆这种数据结构所设计的一种排序算法
// 堆积是一个近似完全二叉树的结构，并同时满足堆积的性质，即子结点的键值或索引总是小于（或者大于）它的父节点。
// 堆的底层实际上就是一棵完全二叉树，可以用数组实现。
// 根节点最大的堆叫作大根堆，根节点最小的堆叫作小根堆
function heap_sort(array) {
  let len = array.length
  let k = 0
  function swap(i, j) {
    let temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  function max_heapify(start, end) {
    let dad = start
    let son = dad * 2 + 1
    if (son >= end) return
    if (son + 1 < end && array[son] < array[son+1]) {
      son++
    }
    if (array[dad] <= array[son]) {
      swap(dad, son)
      max_heapify(son, end)
    }
  }

  for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
    max_heapify(i, len)
  }

  for (let j = len - 1; j > k; j--) {
    swap(0, j)
    max_heapify(0, j)
  }
}
var a = [1, 3, 6, 3, 23, 76, 1, 34, 222, 6, 456, 221]
heap_sort(a)

// 归并排序
// 归并排序是建立在归并操作上的一种有效的排序算法，该算法是采用分治法的一个非常典型的应用。
// 将已有序的子序列合并，得到完全有序的序列；先使每个子序列有序，再使子序列段间有序。
// 若将两个有序表合并成一个有序表，称为二路归并。
function mergeSort(array) {
  const merge = (right, left) => {
    const result = []
    let il = 0
    let ir = 0
    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++])
      } else {
        result.push(right[ir++])
      }
    }
    while (il < left.length) {
      result.push(left[il++])
    }
    while (ir < right.length) {
      result.push(right[ir++])
    }
    return result
  }
  const mergeSort = array => {
    if (array.length === 1) return array
    const mid = Math.floor(array.length / 2)
    const left = array.slice(0, mid)
    const right = array.slice(mid, array.length)
    return merge(mergeSort(left), mergeSort(right))
  }
  return mergeSort(array)
}
mergeSort(a)