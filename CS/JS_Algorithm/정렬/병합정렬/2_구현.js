const merge = (arr1, arr2) => {
  let res = [];
  let i = 0, j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[i]) {
      res.push(arr[i]);
      i++;
    } else {
      res.push(arr2[j]);
      j++;
    }
  }
  while(i < arr1.length) {
    res.push(arr1[i]);
    i++
  }
  while(i < arr2.length) {
    res.push(arr2[i]);
    j++;
  }
  return res;
}