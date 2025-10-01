import {genererPdf} from './rapportPdf.js';
import { questionCounter,timerDisplay } from './quiz.js';
import {quitterDiv} from './pseudo.js';
const acceuil = document.querySelector(".bouton-acceuil")

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

//fonction pour création des boutons dans le resultat final
export function ajouterBoutons(container, result) {
    const retourBtn = document.createElement("button");
    retourBtn.textContent = "Retour à l'accueil";
    retourBtn.style.display = "block";
    retourBtn.style.margin = "20px auto";
    retourBtn.addEventListener("click", () => {
        // questionCounter.style.display = "none";
        if (questionCounter) questionCounter.style.display = "none";
        acceuil.style.display = "flex";
        acceuil.style.flexDirection = "column";
        acceuil.style.justifyContent = "center";
        acceuil.style.alignItems = "center";
        container.style.display = "none";
        quitterDiv.style.display = "none";
        timerDisplay.style.display = "none";
    });

    const exportpdf = document.createElement("button");
    exportpdf.textContent = "Générer PDF";
    exportpdf.style.display = "block";
    exportpdf.addEventListener("click", () => genererPdf(result));

    container.appendChild(retourBtn);
    container.appendChild(exportpdf);
}
