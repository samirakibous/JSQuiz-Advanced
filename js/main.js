import {creerQuestionContainer} from './elements.js';
import { chargerQuestions } from './dataLoader.js';
import { creerControlButtons } from './elements.js';
import { pseudo } from './pseudo.js';
import { envoyerPseudo } from './pseudo.js';
import { choisirQuestion } from './quiz.js';
import { afficherQuestion } from './quiz.js';
import { verifierReponse } from './quiz.js';
import { nextQuestion } from './quiz.js';

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
let index = 0;

const valider = document.getElementById("valider");
const suivant = document.getElementById("suivant");

const pseudobutton = document.getElementById("pseudobutton");
const pseudoname = document.getElementById("pseudoname");


// let questionsFilter = [];
// let indice = 0;


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



bouton.addEventListener("click", () => {
    acceuil.style.display = "none";
})
pseudobutton.addEventListener("click",()=>{
    envoyerPseudo();
})

bouton.addEventListener("click", () => {
    pseudo();
});

// suivant.addEventListener("click", () => {
//     nextQuestion();
// });

const username = document.getElementById("username");
let pseudonameValue = localStorage.getItem("pseudoname");
username.innerHTML = `bonjour ${pseudonameValue}`;





