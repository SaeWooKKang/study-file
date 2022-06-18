// 2022-06-18
// 2019_카카오_인턴쉽

const solution = (board, moves) => {
  let res = 0;
  const stack = [];
  
  // 뽑기 정렬
  let sorted;
  let i = board.length;
  let j = 0;
  while (i) {
    if (i == board.length) {
      sorted = board[i - 1].map(a => a == 0 ? [] : [a] );
    } else {
      for (let k = 0; k < board.length; k++) {
          if (board[i - 1][k] != 0) {
            sorted[k].push(board[i - 1][k])       
          }
      }
    } 
    i--;
    j++;
  }
    
  // 뽑기
  moves.forEach((a,i) => {
    const poped = sorted[a - 1].pop();
      
    if (poped == undefined) return stack.push(poped);
      
    if (stack[stack.length - 1] == poped) {
      stack.pop();
      res +=2;
    } else {
      stack.push(poped);
    }
  })
  return res;
}