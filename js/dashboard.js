import { afficherHistorique } from "./historique.js";
import { calculerMeilleurScore, avgScorefunction, obtenirClassementTop3, diagrammePArtieParThem, calculerPartiesParTheme, afficherGraphiqueProgression, progressionScores, calculerMeilleurScoreParTheme,calculerMoyenneTemps } from "./statistiques.js";
import { exporterEnJSON, exporterEnCSV } from "./export.js";

document.addEventListener("DOMContentLoaded", () => {
    const results = JSON.parse(localStorage.getItem("results")) || [];

    afficherHistorique(results);
    const meilleurScore = calculerMeilleurScore(results);
    const classementTop3 = obtenirClassementTop3(results);
    const avgScore = avgScorefunction(results);
    const partiesParTheme = calculerPartiesParTheme(results);
    const progression = progressionScores(results);
    const meilleursParTheme = calculerMeilleurScoreParTheme(results);
    const moyenneTemps = calculerMoyenneTemps(results);

    diagrammePArtieParThem(partiesParTheme);
    afficherGraphiqueProgression(progression);
    document.getElementById("totalGames").textContent = results.length;
    document.getElementById("bestScore").textContent = `${meilleurScore} pts`;
    document.getElementById("avgScore").textContent = `${avgScore} pts`;

    afficherHistorique(results);
    afficherClassement(classementTop3);
    afficherStatsParTheme(results);
    afficherMoyenneTemps(results);
});

const modalOverlay = document.querySelector('.modal-overlay');
const exportBtn = document.getElementById('exportBtn');
exportBtn.addEventListener('click', () => {
    modalOverlay.style.display = "block";
})
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener('click', () => {
    modalOverlay.style.display = "none";
})

document.getElementById("exportJSON").addEventListener("click", () => {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    exporterEnJSON(results);
});

document.getElementById("exportCSV").addEventListener("click", () => {
    const results = JSON.parse(localStorage.getItem("results")) || [];
    exporterEnCSV(results);
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

export function afficherStatsParTheme(results) {
    const partiesParTheme = calculerPartiesParTheme(results);
    const meilleursParTheme = calculerMeilleurScoreParTheme(results);

    const tbody = document.getElementById("statsTableBody");
    tbody.innerHTML = "";

    for (let theme in partiesParTheme) {
        const tr = document.createElement("tr");

        const tdTheme = document.createElement("td");
        tdTheme.textContent = theme;

        const tdParties = document.createElement("td");
        tdParties.textContent = partiesParTheme[theme];

        const tdScoreMoyen = document.createElement("td");
        const scoresTheme = results.filter(r => r.theme === theme).map(r => r.score);
        const moyenne = (scoresTheme.reduce((a, b) => a + b, 0) / scoresTheme.length).toFixed(1);
        tdScoreMoyen.textContent = `${moyenne} pts`;

        const tdMeilleurScore = document.createElement("td");
        tdMeilleurScore.textContent = `${meilleursParTheme[theme]} pts`;

        tr.appendChild(tdTheme);
        tr.appendChild(tdParties);
        tr.appendChild(tdScoreMoyen);
        tr.appendChild(tdMeilleurScore);

        tbody.appendChild(tr);
    }
}

function afficherMoyenneTemps(results) {
    const moyenneTemps = calculerMoyenneTemps(results);
    const moyenneTempsElement = document.getElementById("totalTime");

    if (moyenneTempsElement) {
        const minutes = Math.floor(moyenneTemps / 60);
        const secondes = Math.floor(moyenneTemps % 60);
        moyenneTempsElement.textContent = `${minutes}m ${secondes}s`;
    }
}

