/*
You are given a non-empty list of integers (X).

For this task, you should return a list consisting of
only the non-unique elements in this list.

To do so you will need to remove all unique elements
(elements which are contained in a given list only once).

When solving this task, do not change the order of the list.

Example:

input (array of integers): [1, 2, 3, 1, 3]
output (iterable of integers): [1, 3, 1, 3]

1 and 3 are non-unique elements.

More examples:

nonUniqueElements([1, 2, 3, 1, 3]) == [1, 3, 1, 3]
nonUniqueElements([1, 2, 3, 4, 5]) == []
nonUniqueElements([5, 5, 5, 5, 5]) == [5, 5, 5, 5, 5]
nonUniqueElements([10, 9, 10, 10, 9, 8]) == [10, 9, 10, 10, 9]
 */

export default function nonUniqueElements(data) {
  let elements = new Map();

  for (let num of data) {
    if (elements.has(num)) {
      elements.set(num, elements.get(num) + 1);
    } else {
      elements.set(num, 1);
    }
  }

  let non_unique = [];
  for (let num of data) {
    if (elements.get(num) > 1) {
      non_unique.push(num);
    }
  }

  // return data
  return non_unique; //т.к. иначе исходные данные придётся портить
}
