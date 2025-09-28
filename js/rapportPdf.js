import {questionsFilter} from './quiz.js';
export function genererPdf(result) {
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