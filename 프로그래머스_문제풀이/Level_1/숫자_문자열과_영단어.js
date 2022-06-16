// 2022-06-15
// replaceAll 메서드 사용 불가 
function solution(s) {
  const 영단어 = ['zero','one','two','three','four','five','six','seven','eight','nine'];

    영단어.forEach((a, i) => {
        while(s.includes(a)){
            s = s.replace(a, `${i}`);
        }
    })

    return +s;
}