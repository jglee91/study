const quizData = [
  {
    question: 'How old is Florin?',
    answer: {
      a: '10',
      b: '17',
      c: '26',
      d: '110',
    },
    correct: 'c',
  },
  {
    question: 'What is the most used programming language in 2019?',
    answer: {
      a: 'Java',
      b: 'C',
      c: 'Python',
      d: 'JavaScript',
    },
    correct: 'd',
  },
  {
    question: 'Who is the President of US?',
    answer: {
      a: 'Florin Pop',
      b: 'Donald Trump',
      c: 'Ivan Saldano',
      d: 'Mihai Andrei',
    },
    correct: 'b',
  },
  {
    question: 'What does HTML stand for?',
    answer: {
      a: 'Hypertext Markup Language',
      b: 'Cascading Style Sheet',
      c: 'Json Object Notation',
      d: 'Application Programming Interface',
    },
    correct: 'a',
  },
  {
    question: 'What year was JavaScript launched?',
    answer: {
      a: '1996',
      b: '1995',
      c: '1994',
      d: 'none of the above',
    },
    correct: 'b',
  },
];

const quizEl = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answerEls = document.querySelectorAll('.answer');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];
  questionEl.innerHTML = currentQuizData.question;

  const { a, b, c, d } = currentQuizData.answer;
  a_text.innerText = a;
  b_text.innerText = b;
  c_text.innerText = c;
  d_text.innerText = d;
}

function getSelected() {
  let answer = undefined;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

submitBtn.addEventListener('click', () => {
  // check to see the answer
  const answer = getSelected();
  const currentQuizData = quizData[currentQuiz];

  if (answer) {
    if (answer === currentQuizData.correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quizEl.innerHTML = `
        <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
        <button onClick="location.reload()">Realod</button>
      `;
    }
  }
});
