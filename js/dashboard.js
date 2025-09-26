import { afficherHistorique } from "./historique.js";
import {calculerMeilleurScore,avgScorefunction,obtenirClassementTop3} from "./statistiques.js";

document.addEventListener("DOMContentLoaded", () => {
    const results = JSON.parse(localStorage.getItem("results")) || [];

    afficherHistorique(results);
    const meilleurScore = calculerMeilleurScore(results);
    const classementTop3 = obtenirClassementTop3(results);
    const avgScore= avgScorefunction(results);

    document.getElementById("totalGames").textContent = results.length;
    document.getElementById("bestScore").textContent = `${meilleurScore} pts`;
    document.getElementById("avgScore").textContent =`${avgScore} pts`;

    afficherHistorique(results);
    afficherClassement(classementTop3);
});


function afficherClassement(classement) {
    const podium = document.getElementById("podium");
    podium.innerHTML = ""; 

    const places = ["first", "second", "third"]; 
    classement.slice(0, 3).forEach((joueur, i) => {
        const div = document.createElement("div");
        div.classList.add("podium-place", places[i]);

        const medal = document.createElement("div");
        medal.classList.add("podium-medal");

        const name = document.createElement("div");
        name.classList.add("podium-name");
        name.textContent = joueur.pseudo;

        const score = document.createElement("div");
        score.classList.add("podium-score");
        score.textContent = `${joueur.score} pts`;
        div.appendChild(medal);
        div.appendChild(name);
        div.appendChild(score);

        podium.appendChild(div);
    });
}
