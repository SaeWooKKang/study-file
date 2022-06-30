// 2022-06-30
// 월간 코드 챌린지

const add = (a ,b) => a + b;

function solution(numbers) {
    const res = [];
    
    for (let i = 0; i < 10; i++) {
        if (!numbers.includes(i)) res.push(i);
    }
    return res.reduce(add);
}

