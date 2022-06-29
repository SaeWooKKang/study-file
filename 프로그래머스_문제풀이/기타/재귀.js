function recursive(arr) {
  if (arr.length == 1) return arr;

  arr.reverse();

  const front = arr.slice(0, arr.length / 2);
  const back = arr.slice(arr.length / 2);

  return [...recursive(front), recursive(back)];
}
