// capitalizeFirst

// Write a recursive function called capitalizeFirst. 
// Given an array of strings, capitalize the first letter of
// each string in the array.
// capitalizeFirst(['car','taco','banana']); // ['Car','Taco','Banana']

const capitalizeFirst = (arr) => {
  const res = [];

  for (let i = 0; i < arr.length; i++) {
    let first = arr[i][0].toUpperCase();
    first += arr[i].slice(1);
    res.push(first);
  }

  return res;
}