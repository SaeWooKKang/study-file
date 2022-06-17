// 2022.06.17 
// 안풀려서 모든 경우의 수를 생각해봤다.
// 1. [1,4,7]에 해당하면 왼손으로
// 2. [3,6,9]에 해당하면 오른손으로
// 3. 그렇지 않으면 왼쪽, 오른쪽 최단거리 구해서 비교
function solution(numbers, hand) { 
  let left_position = '*';
  let right_position = '#';

  let left_btn = [1, 4, 7];
  let right_btn = [3, 6, 9];
  let res = '';         
  numbers.forEach((a, i) => {

      if (left_btn.includes(a)) {
        res += 'L';
        left_position = a;
      } else if (right_btn.includes(a)) {
        res += 'R';
        right_position = a;
      } else {
        // 왼쪽에서의 최단거리
        let left_min;
        let right_min;
        if (left_position == 1) {
          if (a == 2) {
            left_min = 1;
          } else if (a == 5) {
            left_min = 2;
          } else if (a == 8) {
            left_min = 3;
          } else if (a == 0) {
            left_min = 4;
          } 
        } else if (left_position == 4) {
          if (a == 2) {
            left_min = 2;
          } else if (a == 5) {
            left_min = 1;
          } else if (a == 8) {
            left_min = 2;
          } else if (a == 0) {
            left_min = 3;
          }
        } else if (left_position == 7) {
          if (a == 2) {
            left_min = 3;
          } else if (a == 5) {
            left_min = 2;
          } else if (a == 8) {
            left_min = 1;
          } else if (a == 0) {
            left_min = 2;
          }
        } else if (left_position == 2) {
          if (a == 2) {
            left_min = 0;
          } else if (a == 5) {
            left_min = 1;
          } else if (a == 8) {
            left_min = 2;
          } else if (a == 0) {
            left_min = 3;
          }
        } else if (left_position == 5) {
          if (a == 2) {
            left_min = 1;
          } else if (a == 5) {
            left_min = 0;
          } else if (a == 8) {
            left_min = 1;
          } else if (a == 0) {
            left_min = 2;
          }
        } else if (left_position == 8) {
          if (a == 2) {
            left_min = 2;
          } else if (a == 5) {
            left_min = 1;
          } else if (a == 8) {
            left_min = 0;
          } else if (a == 0) {
            left_min = 1;
          }
        } else if (left_position == 0) {
          if (a == 2) {
            left_min = 3;
          } else if (a == 5) {
            left_min = 2;
          } else if (a == 8) {
            left_min = 1;
          } else if (a == 0) {
                left_min = 0;
          } 
        } else if (left_position == '*') {
          if (a == 2) {
            left_min = 4;
          } else if (a == 5) {
            left_min = 3;
          } else if (a == 8) {
            left_min = 2;
          } else if (a == 0) {
            left_min = 1;
          } 
        }
        // 오른쪽 최단거리
        if (right_position == 3) {
          if (a == 2) {
            right_min = 1;
          } else if (a == 5) {
            right_min = 2;
          } else if (a == 8) {
            right_min = 3;
          } else if (a == 0) {
            right_min = 4;
          }
        } else if (right_position == 6) {
          if (a == 2) {
            right_min = 2;
          } else if (a == 5) {
            right_min = 1;
          } else if (a == 8) {
            right_min = 2;
          } else if (a == 0) {
            right_min = 3;
          }
        } else if (right_position == 9) {
          if (a == 2) {
            right_min = 3;
          } else if (a == 5) {
            right_min = 2;
          } else if (a == 8) {
            right_min = 1;
          } else if (a == 0) {
            right_min = 2;
          }
        } else if (right_position == 2) {
          if (a == 2) {
              right_min = 0;
          } else if (a == 5) {
            right_min = 1;
          } else if (a == 8) {
            right_min = 2;
          } else if (a == 0) {
            right_min = 3;
          }
        } else if (right_position == 5) {
          if (a == 2) {
            right_min = 1;
          } else if (a == 5) {
          right_min = 0;
          } else if (a == 8) {
            right_min = 1;
          } else if (a == 0) {
            right_min = 2;
          }
        } else if (right_position == 8) {
          if (a == 2) {
            right_min = 2;
          } else if (a == 5) {
            right_min = 1;
          } else if (a == 8) {
              right_min = 0;
          } else if (a == 0) {
            right_min = 2;
          }
        } else if (right_position == 0) {
          if (a == 2) {
            right_min = 3;
          } else if (a == 5) {
            right_min = 2;
          } else if (a == 8) {
            right_min = 1;
          } else if (a == 0) {
              right_min = 0;
          }
        } else if (right_position == '#') {
          if (a == 2) {
            right_min = 4;
          } else if (a == 5) {
            right_min = 3;
          } else if (a == 8) {
            right_min = 2;
          } else if (a == 0) {
            right_min = 1;
          }
        }
        // 왼쪽 오른쪽 거리 비교 
        if (left_min < right_min) {
          res += 'L';
          left_position = a;
        } else if (left_min > right_min) {
          res += 'R';
          right_position = a;
        } else {
          res += hand == 'left' ? 'L' : 'R';
          if (hand == 'left') {
            left_position = a;
          }
          else {
            right_position = a;
          }
        }
      }
    }
  )
  return res;
}