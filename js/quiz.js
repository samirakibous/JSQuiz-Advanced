import { arraysEqual, escapeHtml } from './utils.js';

const themesDiv = document.getElementById("themes");
const quiz = document.querySelector(".quiz");
const acceuil = document.querySelector(".bouton-acceuil")
const controlButtons = document.querySelector(".controlButtons");
const questionCounter = document.querySelector(".question-counter");

const reponses = document.querySelector(".reponses");
const question = document.getElementById("question");
let questionsFilter = [];
let index = 0;
let tempsrestant;
// let tempspassé=0;
let tempsParQuestion = [];
let tempsDebutQuestion = 0;

let userAnswers = [];
let reponseValidee = false;

const timerDisplay = document.querySelector(".timer");

let timer
function startTimer() {
    tempsrestant = 10;
    const timerDisplay = document.getElementById("timer");
    timer = setInterval(() => {
        tempsrestant--;
        timerDisplay.textContent = tempsrestant;
        if (tempsrestant == 0) {
            clearInterval(timer);
            alert("Temps écoulé ! La réponse est considérée comme fausse.");
            userAnswers[index] = null;
            reponseValidee = true;
            nextQuestion();
        }
    }, 1000);

}


export function stopQuiz() {
    let resultat = document.querySelector(".resultat");
    clearInterval(timer);
    timerDisplay.style.display = "none";
    questionCounter.style.display = "none";
    resultat.style.display = "none";
    questionsFilter = [];
    index = 0;
    reponseValidee = false;
}
export function afficherQuestion(questionsFilter, index) {
    const questionCounter = document.querySelector(".question-counter");
    const question = document.getElementById("question");
    const reponses = document.querySelector(".reponses");

    if (!questionCounter || !question || !reponses) {
        console.error("Impossible de trouver les éléments HTML !");
        return;
    }

    questionCounter.style.display = "block";
    questionCounter.innerHTML = `Question ${index + 1} / ${questionsFilter.length}`;
    reponses.innerHTML = "";
    question.innerHTML = questionsFilter[index].question;

    questionsFilter[index].reponses.forEach((element, i) => {
        const labelContainer = document.createElement("div");
        labelContainer.classList.add("label-container");
        const label = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "checkbox";
        radio.name = "reponses";
        radio.value = i;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(element));
        labelContainer.appendChild(label);
        reponses.appendChild(document.createElement("br"));
        reponses.appendChild(labelContainer);
    });

    startTimer();
    tempsDebutQuestion = Date.now();
}


export function choisirQuestion(theme, questions) {
    const suivant = document.getElementById("suivant");
    const valider = document.getElementById("valider");

    if (!questions || questions.length === 0) {
        alert("Pas de quiz pour ce thème !");
        return;
    }
    questionsFilter = questions;
    index = 0;
    afficherQuestion(questionsFilter, index);

    themesDiv.style.display = "none";
    quiz.style.display = "block";
    controlButtons.style.display = "flex";
    suivant.style.display = "block";
    valider.style.display = "block";
}

export function verifierReponse() {
    // let valeur;
    const bonnesReponses = questionsFilter[index].correcte;
    let userChoice = [];
    const radios = document.getElementsByName("reponses");
    for (let i = 0; i < radios.length; i++) {
        const radio = radios[i];
        const labelContainer = radio.closest(".label-container");
        if (radio.checked) {
            userChoice.push(parseInt(radio.value));
            // userChoice = radio.nextSibling.textContent; 
        }
        if (bonnesReponses.includes(parseInt(radio.value))) {
            // valeur = true;
            labelContainer.style.border = "2px solid green";
        } else {
            // valeur = false;
            labelContainer.style.border = "2px solid red";
        }
    }
    timerDisplay.style.display = "block";
    userAnswers[index] = userChoice;
    console.log(userAnswers);
    reponseValidee = true;
    clearInterval(timer);
}

export function nextQuestion() {
    if (!reponseValidee) {
        alert("Veuillez valider votre réponse avant de passer à la question suivante !");
        return;
    }
    index++;
    reponseValidee = false;
    if (index < questionsFilter.length) {
        afficherQuestion(questionsFilter, index);
    } else {
        afficherResultats();
    }
}

function calculerResultats() {
    let score = 0;
    for (let i = 0; i < questionsFilter.length; i++) {
        if (arraysEqual(questionsFilter[i].correcte, userAnswers[i])) {
            score++;
        }
    }

    const tempsTotalSec = tempsParQuestion.reduce((acc, t) => acc + t, 0);
    const result = {
        pseudo: localStorage.getItem("pseudoname"),
        theme: questionsFilter[0]?.theme || "unknown",
        score: score,
        Responses: userAnswers,
        date: new Date().toLocaleString(),
        tempsTotal: tempsTotalSec
    };

    let results = JSON.parse(localStorage.getItem("results")) || [];
    results.push(result);
    localStorage.setItem("results", JSON.stringify(results));

    return result;
}

function afficherResultats() {
    quiz.style.display = "none";
    controlButtons.style.display = "none";
    timerDisplay.style.display = "none";

    const result = calculerResultats();

    let resultat = document.querySelector(".resultat");
    resultat.innerHTML = "";
    resultat.style.display = "block";
    resultat.style.padding = "20px";
    resultat.style.backgroundColor = "#f7f7f7";
    resultat.style.borderRadius = "10px";
    resultat.style.maxWidth = "600px";
    resultat.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
    resultat.style.fontFamily = "Arial, sans-serif";

    questionsFilter.forEach((q, i) => {
        const yourAnswer = (userAnswers[i] && userAnswers[i].length > 0)
            ? userAnswers[i].map(idx => escapeHtml(q.reponses[idx])).join(", ")
            : "Aucune réponse";

        const correcteAnswer = q.correcte.map(index => escapeHtml(q.reponses[index])).join(", ");

        const questionDiv = document.createElement("div");
        questionDiv.style.marginBottom = "15px";
        questionDiv.style.padding = "10px";
        questionDiv.style.borderLeft = arraysEqual(q.correcte, userAnswers[i]) ? "4px solid green" : "4px solid red";
        questionDiv.style.backgroundColor = "#fff";
        questionDiv.style.borderRadius = "5px";
        console.log(q.question);
        questionDiv.innerHTML = `
            <p style="color:black;"><strong>Q${i + 1}:</strong> ${q.question}</p>
            <p style="color:black;">Votre réponse: <span style="color:${yourAnswer === correcteAnswer ? "green" : "red"}">${yourAnswer}</span></p>
            <p style="color:black;">Réponse correcte: ${correcteAnswer}</p>
        `;

        resultat.appendChild(questionDiv);
    });

    const scoreDiv = document.createElement("div");
    scoreDiv.style.textAlign = "center";
    scoreDiv.style.marginTop = "20px";
    scoreDiv.style.fontSize = "18px";
    scoreDiv.style.fontWeight = "bold";
    scoreDiv.textContent = `Score: ${result.score} / ${questionsFilter.length}`;
    resultat.appendChild(scoreDiv);

    afficherTempsTotal(resultat, result.tempsTotal);
    ajouterBoutons(resultat, result);
}
function ajouterBoutons(container, result) {
    const retourBtn = document.createElement("button");
    retourBtn.textContent = "Retour à l'accueil";
    retourBtn.style.display = "block";
    retourBtn.style.margin = "20px auto";
    retourBtn.addEventListener("click", () => {
        questionCounter.style.display = "none";
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

function afficherTempsTotal(container,tempsTotalSec) {
    const minutes = Math.floor(tempsTotalSec / 60);
    const secondes = tempsTotalSec % 60;
    const tempsTotalFormate = `${minutes}m ${secondes}s`;

    const tempsDiv = document.createElement("div");
    tempsDiv.style.textAlign = "center";
    tempsDiv.style.marginTop = "10px";
    tempsDiv.style.fontSize = "16px";
    tempsDiv.style.fontWeight = "normal";
    tempsDiv.textContent = `Temps total du quiz : ${tempsTotalFormate}`;

    container.appendChild(tempsDiv);
    // return tempsTotalSec;
}

document.addEventListener("DOMContentLoaded", () => {
    const validerBtn = document.getElementById("valider");
    const suivantBtn = document.getElementById("suivant");

    if (validerBtn) {
        validerBtn.addEventListener("click", verifierReponse);
    }

    if (suivantBtn) {
        suivantBtn.addEventListener("click", nextQuestion);
    }
});

