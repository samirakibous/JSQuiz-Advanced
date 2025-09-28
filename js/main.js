import { creerQuestionContainer } from './elements.js';
import { chargerQuestions } from './dataLoader.js';
import { creerControlButtons } from './elements.js';
import { pseudo } from './pseudo.js';
import { envoyerPseudo } from './pseudo.js';
import { choisirQuestion, afficherQuestion, startTimer } from './quiz.js';
import { questionsFilter, index, userAnswers, tempsrestant, tempsParQuestion, tempsDebutQuestion, setQuizState ,stopQuiz} from "./quiz.js";
import { setIndex,timerDisplay } from "./quiz.js";
import { quitterDiv } from './pseudo.js';


creerQuestionContainer();

creerControlButtons();
const themesDiv = document.getElementById("themes");
const quiz = document.querySelector(".quiz");
const acceuil = document.querySelector(".bouton-acceuil")
const bouton = document.getElementById("commencer");
const themebutons = document.querySelectorAll(".theme-btn");
const controlButtons = document.querySelector(".controlButtons");

const reponses = document.querySelector(".reponses");
const question = document.getElementById("question");
// let index = 0;

const valider = document.getElementById("valider");
const suivant = document.getElementById("suivant");

const pseudobutton = document.getElementById("pseudobutton");
const pseudoname = document.getElementById("pseudoname");


// let questionsFilter = [];
// let indice = 0;


// console.log(themebutons);
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
})
pseudobutton.addEventListener("click", async () => {
    const pseudoValue = pseudoname.value.trim();
    envoyerPseudo();

    if (!pseudoValue) return alert("Veuillez entrer un pseudo");

    username.innerHTML = `Bonjour ${pseudoValue}`;
    themesDiv.style.display = "block";

    const dernierePartie = getDernierePartie(pseudoValue);

    // On supprime un ancien bouton de révision s’il existe
    const ancienBtn = document.getElementById("revisionBtn");
    if (ancienBtn) ancienBtn.remove();

    if (dernierePartie) {
        const questionsEchouees = await getQuestionsEchouees(dernierePartie);

        if (questionsEchouees.length > 0) {
            let revisionBtn = document.createElement("button");
            revisionBtn.id = "revisionBtn";
            revisionBtn.classList.add("revision-btn");
            revisionBtn.textContent = "Mode Révision";
            revisionBtn.style.display = "block"; // afficher directement
            themesDiv.appendChild(revisionBtn);

            revisionBtn.addEventListener("click", () => {
                questionsFilter.splice(0, questionsFilter.length, ...questionsEchouees);

                acceuil.style.display = "none";
                themesDiv.style.display = "none";
                quiz.style.display = "block";
                controlButtons.style.display = "flex";
                document.getElementById("suivant").style.display = "inline-block";

setIndex(0);                afficherQuestion(questionsFilter, index);
                startTimer();
            });
        }
    }
});




bouton.addEventListener("click", () => {
    pseudo();
});

// suivant.addEventListener("click", () => {
//     nextQuestion();
// });

const username = document.getElementById("username");
let pseudonameValue = localStorage.getItem("pseudoname");
username.innerHTML = `bonjour ${pseudonameValue}`;




document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalRepriseQuiz");
    const ouiBtn = document.getElementById("ouiReprendre");
    const nonBtn = document.getElementById("nonReprendre");

    if (!modal || !ouiBtn || !nonBtn) {
        console.error("La modale ou ses boutons n'existent pas dans le DOM !");
        return;
    }

    const etatQuiz = JSON.parse(localStorage.getItem("etatQuiz"));

    if (etatQuiz && etatQuiz.questionsFilter && etatQuiz.questionsFilter.length > 0) {
        // Afficher la modale
        modal.style.display = "flex";

        ouiBtn.addEventListener("click", () => {
            setQuizState(etatQuiz);

            document.querySelector(".bouton-acceuil").style.display = "none";
            document.getElementById("themes").style.display = "none";
            document.querySelector(".quiz").style.display = "block";
            document.querySelector(".controlButtons").style.display = "flex";

            afficherQuestion(questionsFilter, index);
            startTimer();

            modal.style.display = "none";
        });

        nonBtn.addEventListener("click", () => {
            localStorage.removeItem("etatQuiz");
            modal.style.display = "none";
        });
    }
});

quitter.addEventListener("click", () => {
    // let resultat = document.querySelector(".resultat");
    const pseudo = document.querySelector(".pseudo");
    // acceuil.style.display = "block";
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
    // questionsFilter = [];
    questionsFilter.splice(0, questionsFilter.length);
    // index = 0;
    setIndex(0); 
    localStorage.removeItem("etatQuiz");
})

