export function creerQuestionContainer() {
    const quizDiv = document.querySelector(".quiz");

    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    const questionP = document.createElement("p");
    questionP.id = "question";
    questionDiv.appendChild(questionP);

    const questionCounter = document.createElement("div");
    questionCounter.id = "question-counter";
    questionCounter.classList.add("question-counter");
    questionDiv.appendChild(questionCounter);

    quizDiv.appendChild(questionDiv);
    const reponsesDiv = document.createElement("div");
    reponsesDiv.classList.add("reponses");
    quizDiv.appendChild(reponsesDiv);
}
// creerQuestionContainer();


export function creerControlButtons() {
    const controlButtons = document.querySelector('.controlButtons');
    const validerButton = document.createElement("button");
    validerButton.id = "valider";
    validerButton.textContent = "valider";
    const suivantBtn = document.createElement('button');
    suivantBtn.id = 'suivant';
    suivantBtn.textContent = 'suivant';
    controlButtons.appendChild(validerButton);
    controlButtons.appendChild(suivantBtn);
}