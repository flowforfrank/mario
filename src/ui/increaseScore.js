export default score => {
    const scoreElement = document.getElementsByClassName('score-amount')[0];
    const currentScore = Number(scoreElement.innerText);

    scoreElement.innerText = currentScore + score;
};