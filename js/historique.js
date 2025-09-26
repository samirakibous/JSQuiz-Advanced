export function afficherHistorique() {
    let results = JSON.parse(localStorage.getItem('results')) || [];
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";

    if (results.length === 0) {
        const p = document.createElement("p");
        p.textContent = "Aucune partie enregistrée.";
        historyList.appendChild(p);
        return;
    }

    results.forEach(partie => {
        const div = document.createElement("div");
        div.classList.add("history-item");

        const pseudo = document.createElement("strong");
        pseudo.classList.add("history-info");
        pseudo.textContent = partie.pseudo;

        const theme = document.createElement("span");

        theme.textContent = ` ${partie.theme}`;

        const score = document.createElement("span");
        score.classList.add("history-score");
        score.textContent = `${partie.score} pts`;

        const date = document.createElement("span");
        date.textContent = ` ${partie.date}`;

        div.appendChild(pseudo);
        div.appendChild(theme);
        div.appendChild(score);
        div.appendChild(date);

        historyList.appendChild(div);
    });
}
