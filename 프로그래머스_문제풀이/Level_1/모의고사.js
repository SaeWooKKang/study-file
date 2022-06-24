function solution(answers) {
  const 수포자1 = { index: 1, answers: [1,2,3,4,5], correct: 0 };
  const 수포자2 = { index: 2, answers: [2,1,2,3,2,4,2,5], correct: 0 };
  const 수포자3 = { index: 3, answers: [3,3,1,1,2,2,4,4,5,5], correct: 0 };

  answers.forEach((a, i) => {
     if (a == 수포자1.answers[i % 수포자1.answers.length]) 수포자1.correct++;
     if (a == 수포자2.answers[i % 수포자2.answers.length]) 수포자2.correct++;
     if (a == 수포자3.answers[i % 수포자3.answers.length]) 수포자3.correct++;
  });
  
  const max = Math.max(...[수포자1, 수포자2, 수포자3].map(a => a.correct));

  return [수포자1, 수포자2, 수포자3]
      .filter(a => a.correct == max)
      .map(a => a.index);
}