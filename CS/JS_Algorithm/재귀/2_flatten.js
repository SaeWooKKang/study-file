// my solution
const flatten = (arr) => {
  let isFlatten = true;
  const res = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] instanceof Array) {
      for (let j = 0; j < arr[i].length; j++) {
        res.push(arr[i][j]);
      }
      isFlatten = false;
    } 
    else {
      res.push(arr[i]);
    }
  }

  if (isFlatten) return res;
  return flatten(res);
}

// lecture solution
function flatten(oldArr){
  var newArr = []
  for(var i = 0; i < oldArr.length; i++){
    if(Array.isArray(oldArr[i])){
        newArr = newArr.concat(flatten(oldArr[i]))
    } else {
        newArr.push(oldArr[i])
    }
  } 
  return newArr;
}

