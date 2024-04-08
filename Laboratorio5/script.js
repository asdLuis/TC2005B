function getResult() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const answer = urlParams.get('answer');

    const resultMessage = document.getElementById('resultMessage');

    if (answer === 'yes') {
        resultMessage.innerHTML = 'Congratulations! You have autism.';
    } else if (answer === 'no') {
        resultMessage.innerHTML = 'Congratulations! You don\'t have autism.';
    } else {
        resultMessage.innerHTML = 'Invalid answer.';
    }
}

window.onload = function() {
    getResult();
};
