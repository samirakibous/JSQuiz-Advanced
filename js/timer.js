// const timerDisplay = document.querySelector(".timer");

let timer;
let tempsrestant;

export function startTimer() {
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