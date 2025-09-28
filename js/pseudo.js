const themesDiv = document.getElementById("themes");
const quiz = document.querySelector(".quiz");
const acceuil = document.querySelector(".bouton-acceuil")
const bouton = document.getElementById("commencer");
const valider = document.getElementById("valider");
const pseudoname = document.getElementById("pseudoname");
// const quitterDiv = document.querySelector(".quitter");
export const quitterDiv = document.querySelector(".quitter");

export function pseudo() {
    const suivant = document.getElementById("suivant");
    const pseudo = document.querySelector(".pseudo");
    acceuil.style.display = "none";
    quiz.style.display = "none";
    themesDiv.style.display = "none";


    pseudo.style.display = "block";
    quitterDiv.style.display = "block";
    // suivant.style.display = "none";

    // valider.style.display = "none";
    quitter.style.display = "block";
    if (suivant) suivant.style.display = "none";
    if (valider) valider.style.display = "none";
}
// bouton.addEventListener("click", () => {
//     pseudo();
// });

export function envoyerPseudo() {
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