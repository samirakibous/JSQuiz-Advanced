import { creerQuestionContainer,creerControlButtons } from './elements.js';
import { chargerQuestions } from './dataLoader.js';
import { pseudo ,quitterDiv,envoyerPseudo} from './pseudo.js';
import { choisirQuestion, afficherQuestion, startTimer, questionsFilter, index, setQuizState, stopQuiz ,setIndex, timerDisplay } from './quiz.js';


creerQuestionContainer();

creerControlButtons();
const themesDiv = document.getElementById("themes");
const quiz = document.querySelector(".quiz");
const acceuil = document.querySelector(".bouton-acceuil")
const bouton = document.getElementById("commencer");
const themebutons = document.querySelectorAll(".theme-btn");
const controlButtons = document.querySelector(".controlButtons");

const pseudobutton = document.getElementById("pseudobutton");

themebutons.forEach(btn => {
    btn.addEventListener("click", async () => {
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
bouton.addEventListener("click", () => {
    acceuil.style.display = "none";
    pseudo();
});

pseudobutton.addEventListener("click", async () => {
    envoyerPseudo();
});


const username = document.getElementById("username");
let pseudonameValue = localStorage.getItem("pseudoname");
username.innerHTML = `bonjour ${pseudonameValue}`;

function quitterQuiz() {
    const pseudo = document.querySelector(".pseudo");
    quiz.style.display = "none";
    themesDiv.style.display = "none";
    controlButtons.style.display = "none";
    quitterDiv.style.display = "none";
    pseudo.style.display = "none";
    timerDisplay.style.display = "none";
    acceuil.style.display = "flex";
    acceuil.style.flexDirection = "column";
    acceuil.style.justifyContent = "center";
    acceuil.style.alignItems = "center";
    stopQuiz();
    questionsFilter.splice(0, questionsFilter.length);
    setIndex(0);
    localStorage.removeItem("etatQuiz");
}

quitter.addEventListener("click", () => {
    if (questionsFilter.length > 0 && quiz.style.display === "block") {
        const modal = document.getElementById("modalRepriseQuiz");
        const ouiBtn = document.getElementById("ouiReprendre");
        const nonBtn = document.getElementById("nonReprendre");
        stopQuiz();
        modal.style.display = "flex";

        ouiBtn.onclick = () => {
            const etatQuiz = JSON.parse(localStorage.getItem("etatQuiz"));
            setQuizState(etatQuiz);

            document.querySelector(".bouton-acceuil").style.display = "none";
            document.getElementById("themes").style.display = "none";
            document.querySelector(".quiz").style.display = "block";
            document.querySelector(".controlButtons").style.display = "flex";

            afficherQuestion(questionsFilter, index);
            startTimer();
            modal.style.display = "none";
        };

        nonBtn.onclick = () => {
            modal.style.display = "none";
            quitterQuiz();
        };
    } else {
        quitterQuiz();
    }
});
