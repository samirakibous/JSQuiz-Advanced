import {creerQuestionContainer} from './elements.js';
import { chargerQuestions } from './dataLoader.js';
import { creerControlButtons } from './elements.js';
creerQuestionContainer();
creerControlButtons();

const themesDiv = document.getElementById("themes");
const quiz = document.querySelector(".quiz");
const acceuil = document.querySelector(".bouton-acceuil")
const bouton = document.getElementById("commencer");
const quitter = document.getElementById("quitter");
const themebutons = document.querySelectorAll(".theme-btn");
const controlButtons = document.querySelector(".controlButtons");

const reponses = document.querySelector(".reponses");
const question = document.getElementById("question");
let index = 0;

const valider = document.getElementById("valider");
const suivant = document.getElementById("suivant");

const pseudobutton = document.getElementById("pseudobutton");
const pseudoname = document.getElementById("pseudoname");

let questionsFilter = [];
let indice = 0;

const timerDisplay = document.querySelector(".timer");
let tempsrestant;

// console.log(themebutons);
themebutons.forEach(btn => {
    btn.addEventListener("click", async() => {
        const themeChoisie = btn.dataset.theme;
        // console.log(themeChoisie);
        try {
            // charger les questions depuis le fichier JSON correspondant
            const questions = await chargerQuestions(themeChoisie);
            choisirQuestion(themeChoisie, questions);
        } catch (err) {
            console.error("Erreur lors du chargement des questions :", err);
            alert("Impossible de charger les questions pour ce thème !");
        }

    })

})
valider.addEventListener("click", () => {
  verifierReponse();
});

suivant.addEventListener("click", () => {
  nextQuestion();
});

function stopQuiz() {
    let resultat = document.querySelector(".resultat");
    clearInterval(timer);
    timerDisplay.style.display = "none";
    questionCounter.style.display = "none";
    resultat.style.display = "none";
    questionsFilter = [];
    index = 0;
    reponseValidee = false;
}
quitter.addEventListener("click", () => {
    // let resultat = document.querySelector(".resultat");
    const pseudo = document.querySelector(".pseudo");
    quiz.style.display = "none";
    themesDiv.style.display = "none";
    controlButtons.style.display = "none";
    quitterDiv.style.display = "none";
    pseudo.style.display = "none";
    timerDisplay.style.display = "none";
    // resultat.style.display = "none";
    acceuil.style.display = "flex";
    acceuil.style.flexDirection = "column";
    acceuil.style.justifyContent = "center";
    acceuil.style.alignItems = "center";
    stopQuiz();
    questionsFilter = [];
    index = 0;
})
bouton.addEventListener("click", () => {
    acceuil.style.display = "none";
    // quiz.style.display = "block";
})
pseudobutton.addEventListener("click",()=>{
    envoyerPseudo();
})
const username = document.getElementById("username");
let pseudonameValue = localStorage.getItem("pseudoname");
username.innerHTML = `bonjour ${pseudonameValue}`;
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
const questionCounter = document.querySelector(".question-counter");

function afficherQuestion(questionsFilter, index) {
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
}

function choisirQuestion(theme, questions) {
    if (!questions || questions.length === 0) {
        alert("Pas de quiz pour ce thème !");
        return;
    }
    questionsFilter = questions;
    index = 0; // réinitialise l’index global
    afficherQuestion(questionsFilter, index);

    themesDiv.style.display = "none";
    quiz.style.display = "block";
    controlButtons.style.display = "flex";
    suivant.style.display = "block";
    valider.style.display = "block";
}

let userAnswers = [];
let reponseValidee = false;
function verifierReponse() {
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

function arraysEqual(a, b) {
    if (!a || !b) return false;
    if (a.length !== b.length) return false;
    a = [...a].sort();
    b = [...b].sort();
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}
function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;

}

function genererPdf(result) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const username = document.getElementById("username").textContent;

    doc.setFontSize(18);
    doc.text("Résultats du Quiz", 70, 20);

    doc.setFontSize(12);
    doc.text(`Pseudo: ${result.pseudo}`, 20, 50);
    doc.text(`Thème: ${result.theme}`, 20, 60);
    doc.text(`Date: ${result.date}`, 20, 70);
    doc.text(`Score: ${result.score} / ${questionsFilter.length}`, 20, 80);

    let y = 100;
    result.Responses.forEach((reponse, i) => {
        const question = questionsFilter[i].question;
        const bonnesReponses = questionsFilter[i].correcte
            .map(idx => questionsFilter[i].reponses[idx])
            .join(", ");
        const vosReponses = (reponse && reponse.length > 0)
            ? reponse.map(idx => questionsFilter[i].reponses[idx]).join(", ")
            : "Aucune réponse";

        doc.setFontSize(10);
        doc.text(`Q${i + 1}: ${question}`, 20, y);
        y += 6;
        doc.text(`Votre réponse: ${vosReponses}`, 25, y);
        y += 6;
        doc.text(`Réponse correcte: ${bonnesReponses}`, 25, y);
        y += 10;

        if (y > 270) {
            doc.addPage();
            y = 20;
        }
    });

    doc.save(`resultat_${result.pseudo}.pdf`);
}

function nextQuestion() {
    if (!reponseValidee) {
        alert("Veuillez valider votre réponse avant de passer à la question suivante !");
        return;
    }
    index++;
    reponseValidee = false;
    if (index < questionsFilter.length) {
        afficherQuestion(questionsFilter,index);
    } else {
        quiz.style.display = "none";
        controlButtons.style.display = "none";
        timerDisplay.style.display = "none";
        let score = 0;
        for (let i = 0; i < questionsFilter.length; i++) {
            // if (questionsFilter[i].correcte.includes(userAnswers[i])) {
            if (arraysEqual(questionsFilter[i].correcte, userAnswers[i])) {
                score++;
            }
        }
        const result = {
            pseudo: localStorage.getItem("pseudoname"),
            theme: questionsFilter[0]?.theme || "unknown",
            score: score,
            Responses: userAnswers,
            date: new Date().toLocaleString()
        };

        let results = JSON.parse(localStorage.getItem("results")) || [];
        results.push(result);
        localStorage.setItem("results", JSON.stringify(results));
        // alert(`Bravo ${result.pseudo} ! Votre score est ${score} / ${questionsFilter.length}`);

        let resultat = document.querySelector(".resultat");
        resultat.innerHTML = "";
        resultat.style.display = "block";
        resultat.style.padding = "20px";
        resultat.style.backgroundColor = "#f7f7f7";
        resultat.style.borderRadius = "10px";
        resultat.style.maxWidth = "600px";
        resultat.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
        resultat.style.fontFamily = "Arial, sans-serif";

        for (let i = 0; i < questionsFilter.length; i++) {
            const yourAnswer = (userAnswers[i] && userAnswers[i].length > 0)
                ? userAnswers[i].map(idx => escapeHtml(questionsFilter[i].reponses[idx])).join(", ")
                : "Aucune réponse";
            // const correcteAnswer = questionsFilter[i].reponses[questionsFilter[i].correcte];
            const correcteAnswer = questionsFilter[i].correcte.map(index => escapeHtml(questionsFilter[i].reponses[index])).join(", ");
            const questionDiv = document.createElement("div");
            questionDiv.style.marginBottom = "15px";
            questionDiv.style.padding = "10px";
            // questionDiv.style.borderLeft = "4px solid #4CAF50";
            if (arraysEqual(questionsFilter[i].correcte, userAnswers[i])) {
                questionDiv.style.borderLeft = "4px solid green";
            } else {
                questionDiv.style.borderLeft = "4px solid red";
            }
            questionDiv.style.backgroundColor = "#fff";
            questionDiv.style.borderRadius = "5px";

            questionDiv.innerHTML = `
        <p style="color:black;"><strong style="color:black;">Q${i + 1}:</strong> ${questionsFilter[i].question}</p>
        <p style="color:black;">Votre réponse: <span style="color:${yourAnswer === correcteAnswer ? "green" : "red"}">${yourAnswer}</span></p>
        <p style="color:black;">Réponse correcte: ${correcteAnswer}</p>
    `;

            resultat.appendChild(questionDiv);
        }

        const scoreDiv = document.createElement("div");
        scoreDiv.style.textAlign = "center";
        scoreDiv.style.marginTop = "20px";
        scoreDiv.style.fontSize = "18px";
        scoreDiv.style.fontWeight = "bold";
        scoreDiv.textContent = `Score: ${score} / ${questionsFilter.length}`;
        resultat.appendChild(scoreDiv);

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
            resultat.style.display = "none";
            // acceuil.style.display = "block";
            quitterDiv.style.display = "none";
            timerDisplay.style.display = "none";
        });
        const exportpdf = document.createElement("button");
        exportpdf.textContent = "générer pdf";
        exportpdf.style.display = "block";

        exportpdf.addEventListener("click", () => {
            genererPdf(result);
        });

        resultat.appendChild(retourBtn);
        resultat.appendChild(exportpdf);
        // acceuil.style.display = "block";
    }
}
const quitterDiv = document.querySelector(".quitter");

function pseudo() {
    const pseudo = document.querySelector(".pseudo");
    acceuil.style.display = "none";
    quiz.style.display = "none";
    themesDiv.style.display = "none";


    pseudo.style.display = "block";
    quitterDiv.style.display = "block";
    suivant.style.display = "none";

    valider.style.display = "none";
    quitter.style.display = "block";
}
bouton.addEventListener("click", () => {
    pseudo();
});

function envoyerPseudo() {
    const pseudo = document.querySelector(".pseudo");
    let pseudonameValue = pseudoname.value.trim();
    if (pseudonameValue === "") {
        alert("Veuillez entrer un pseudo !");
        return;
    }
    localStorage.setItem("pseudoname", pseudonameValue);
    // afficherQuestion();
    // pseudobutton.style.display="none";
    // pseudoname.style.display="none";
    //   suivant.style.display="block";
    //   retour.style.display="block";
    //   valider.style.display="block"
    const username = document.getElementById("username");
    username.innerHTML = `bonjour ${pseudonameValue}`;
    pseudo.style.display = "none";
    themesDiv.style.display = "block";
}


