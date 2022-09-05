// 2022-09-05
const solution = (arr, value) => {
  const res = new Set();
  let bar = [];

  for (let i = 0; i < arr.length; i++) {
    // 입장은 push 이므로 인덱스 찾을 필요 없고
    if (arr[i] > 0) {
      bar.push(arr[i])// 확진자 리스트에 넣고
      // 입장이면서 확진자라면
      if (arr[i] == value) {
        if (bar[i - 1]) res.add(bar[i - 1]); // 앞에 녀석을 확진자로
      } 
      // 입장이면서 앞에 확진자라면
      else if (arr[i - 1] == value){ 
        res.add(arr[i]); // 입장 녀석을 확진자로
      }
    } else { 
      const 퇴장인덱스= bar.indexOf(Math.abs(arr[i]));
  
      // 퇴장이면서 확진자라면 -> 필요없고
      if (Math.abs(bar[i]) === value) {

      } 
      // 퇴장 앞이 확진자라면 
      else if (bar[퇴장인덱스 - 1] === value) {
        
        const back = arr[퇴장인덱스 + 1]; // 퇴장 뒤를 확진자로
        res.add(back);
      }

      // 퇴장 시키자~
      bar = bar.filter((_, j) => j !== 퇴장인덱스);
    }
  }
  // 오름차순 정렬
  return [...res].sort((a,b) => a - b);
}