gsap.registerPlugin(ScrollToPlugin);

// Scored questions: 1-8 and 10. Questions 9 and 11 are personal responses.
const questions = [
  { section: "ABOUT ABHINAV", question: "Which sport is Abhinav's favourite?", options: ["Football", "Basketball", "Badminton", "Cricket"], answer: 3, note: "Cricket is the answer Abhinav has given." },
  { section: "ABOUT ABHINAV", question: "Who is Abhinav's favourite Indian male playback singer?", options: ["Atif Aslam", "Vishal Mishra", "Arijit Singh", "Aditya Rikhari"], answer: 2, note: "Arijit Singh is Abhinav's favourite." },
  { section: "ABOUT ABHINAV", question: "Which movie is Abhinav's favourite?", options: ["Hi Nanna", "M.S. Dhoni: The Untold Story", "Avengers: Endgame", "Chennai Express"], answer: 0, note: "Hi Nanna is Abhinav's favourite movie." },
  { section: "ABOUT ABHINAV", question: "Which type of ball caused Abhinav's injury?", options: ["Tennis ball", "Basketball", "Volleyball", "Football"], answer: 0, note: "It was a tennis ball." },
  { section: "ABOUT ABHINAV", question: "Which set contains Abhinav's three favourite cricketers?", options: ["Rohit, Virat and Dhoni", "Gill, Jadeja and Bumrah", "Rahul, Pant and Surya", "Hardik, Shami and Ashwin"], answer: 0, note: "His favourites are Rohit Sharma, Virat Kohli and MS Dhoni." },
  { section: "ABOUT ABHINAV", question: "Who is Abhinav's favourite badminton partner?", options: ["Palak Didi", "Zeba", "Zoya Didi", "An unknown player"], answer: 1, note: "Zeba is the answer Abhinav selected." },
  { section: "OUR MEMORIES", question: "Which sport have Abhinav and Zebaa played together?", options: ["Basketball", "Tennis", "Badminton", "Volleyball"], answer: 2, note: "They have played badminton together." },
  { section: "OUR MEMORIES", question: "Which Indian cricketer is a favourite of both Abhinav and Zebaa?", options: ["Rohit Sharma", "Virat Kohli", "Abhishek Sharma", "Shubman Gill"], answer: 1, note: "Virat Kohli is the shared favourite according to Abhinav." },
  { section: "OUR MEMORIES", question: "What do you think Abhinav is best at?", options: ["Teaching Maths", "Being a good friend", "Being a good listener", "Being your badminton partner"], personal: true },
  { section: "A LITTLE TECH FUN", question: "Which singing duo is Abhinav's favourite?", options: ["Shreya Ghoshal and Arijit Singh", "Sunidhi Chauhan and Atif Aslam", "Shilpa Rao and The Rish", "Shreya Ghoshal and Aditya Rikhari"], answer: 0, note: "Shreya Ghoshal and Arijit Singh is the intended answer." },
  { section: "A LITTLE TECH FUN", question: "Which of these moments do you enjoy the most with Abhinav?", options: ["Playing badminton with Abhinav", "Learning Maths with Abhinav", "Talking about yourself while walking with Abhinav", "Talking over the phone or simply chatting"], personal: true }
];

// Paste the deployed Google Apps Script Web App URL here to enable email delivery.
const RESULTS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwbpzqC5blbIDjCMp9yxykYmEjyLQCxdjBw0gjJEJItyy9E0nBewnUjUJuoPOp982Y/exec";

let current = 0;
let selected = Array(questions.length).fill(null);
const questionCount = document.getElementById("questionCount");
const progressPercent = document.getElementById("progressPercent");
const progressFill = document.getElementById("progressFill");
const questionCategory = document.getElementById("questionCategory");
const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const quizPanel = document.getElementById("quizPanel");
const resultPanel = document.getElementById("resultPanel");

function renderQuestion() {
  const q = questions[current];
  const progress = Math.round(((current + 1) / questions.length) * 100);
  questionCount.textContent = `QUESTION ${String(current + 1).padStart(2, "0")} / ${questions.length}`;
  progressPercent.textContent = `${progress}%`;
  progressFill.style.width = `${progress}%`;
  questionCategory.textContent = q.section;
  questionText.textContent = q.question;
  answerList.innerHTML = "";
  q.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `answer-option${selected[current] === index ? " selected" : ""}`;
    button.setAttribute("aria-pressed", selected[current] === index ? "true" : "false");
    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);
    const label = document.createElement("span");
    label.textContent = option;
    button.append(letter, label);
    button.addEventListener("click", () => { selected[current] = index; renderQuestion(); });
    answerList.appendChild(button);
  });
  backButton.disabled = current === 0;
  nextButton.disabled = selected[current] === null;
  nextButton.textContent = current === questions.length - 1 ? "Submit my answers →" : "Next question →";
}

function buildSubmission(score) {
  return {
    recipientLabel: "Birthday Quiz submission",
    score,
    scoreOutOf: questions.filter(q => !q.personal).length,
    submittedAt: new Date().toISOString(),
    answers: questions.map((q, i) => ({
      number: i + 1,
      section: q.section,
      question: q.question,
      selectedAnswer: selected[i] === null ? "Not answered" : q.options[selected[i]],
      correctAnswer: q.personal ? null : q.options[q.answer],
      isCorrect: q.personal ? null : selected[i] === q.answer,
      personalResponse: Boolean(q.personal)
    }))
  };
}

async function sendResults(payload) {
  const status = document.getElementById("emailStatus");
  if (!RESULTS_ENDPOINT.startsWith("https://script.google.com/macros/s/")) {
    status.textContent = "Your answers are shown here, but email delivery is not connected yet. The website owner must add the deployed Apps Script URL.";
    status.className = "email-status pending";
    return;
  }
  status.textContent = "Sending your answers to Abhinav…";
  status.className = "email-status pending";
  try {
    await fetch(RESULTS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    status.textContent = "Your submission has been sent. Abhinav will receive your answers and score! ♡";
    status.className = "email-status sent";
  } catch (error) {
    status.textContent = "Your result is displayed, but the email request could not be sent. Please let Abhinav know.";
    status.className = "email-status error";
  }
}

function showResults() {
  const score = questions.reduce((sum, q, i) => sum + (!q.personal && selected[i] === q.answer ? 1 : 0), 0);
  const scoreOutOf = questions.filter(q => !q.personal).length;
  document.getElementById("resultScore").textContent = `${score} / ${scoreOutOf} correct`;
  let title = "A lovely attempt!";
  let copy = "Thanks for answering every question. The two personal questions are just for Abhinav to hear your choices.";
  if (score >= 8) { title = "Memory superstar!"; copy = "You remembered so many little details. That's an impressive score!"; }
  else if (score >= 6) { title = "You know quite a lot!"; copy = "A pretty good memory! You got many of the details right."; }
  else if (score <= 3) { title = "A quiz to remember!"; copy = "Thanks for taking the time to answer. The personal answers matter too."; }
  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultCopy").textContent = copy;
  const review = document.getElementById("answerReview");
  review.innerHTML = "";
  questions.forEach((q, i) => {
    const isPersonal = Boolean(q.personal);
    const correct = !isPersonal && selected[i] === q.answer;
    const item = document.createElement("article");
    item.className = `review-item ${isPersonal ? "personal" : correct ? "correct" : "wrong"}`;
    const heading = document.createElement("p");
    heading.className = "review-question";
    heading.textContent = `${i + 1}. ${q.question}`;
    const yours = document.createElement("p");
    yours.className = "review-yours";
    yours.textContent = `Your answer: ${selected[i] === null ? "Not answered" : q.options[selected[i]]}`;
    item.append(heading, yours);
    if (isPersonal) {
      const note = document.createElement("p");
      note.className = "review-answer";
      note.textContent = "Your personal answer — there is no right or wrong choice.";
      item.appendChild(note);
    } else {
      const answer = document.createElement("p");
      answer.className = "review-answer";
      answer.textContent = `Correct answer: ${q.options[q.answer]} — ${q.note}`;
      item.appendChild(answer);
    }
    review.appendChild(item);
  });
  quizPanel.hidden = true;
  resultPanel.hidden = false;
  gsap.fromTo(resultPanel, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .65, ease: "power2.out" });
  window.scrollTo({ top: 0, behavior: "smooth" });
  sendResults(buildSubmission(score));
}

backButton.addEventListener("click", () => { if (current > 0) { current--; renderQuestion(); } });
nextButton.addEventListener("click", () => {
  if (selected[current] === null) return;
  if (current < questions.length - 1) { current++; renderQuestion(); }
  else showResults();
});
document.getElementById("restartButton").addEventListener("click", () => {
  current = 0; selected = Array(questions.length).fill(null);
  resultPanel.hidden = true; quizPanel.hidden = false; document.getElementById("emailStatus").textContent = ""; renderQuestion();
});
document.getElementById("continueButton").addEventListener("click", () => goTo("starry-wishes.html"));

function createQuizPetals() {
  const field = document.querySelector(".quiz-petals");
  for (let i = 0; i < 18; i++) {
    const petal = document.createElement("span");
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${13 + Math.random() * 12}s`;
    petal.style.animationDelay = `${Math.random() * -20}s`;
    field.appendChild(petal);
  }
}
createQuizPetals();
renderQuestion();
