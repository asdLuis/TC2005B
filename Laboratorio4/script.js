function askForNumber() {
    let number = prompt("Please enter a number", 1);
    number++;

    // Create table and table body elements
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    for (let i = 1; i < number; i++) {
        const row = document.createElement("tr");

        const cellNumber = document.createElement("td");
        const cellSquare = document.createElement("td");
        const cellCube = document.createElement("td");

        const cellNumberText = document.createTextNode(i);
        const cellSquareText = document.createTextNode(i*i);
        const cellCubeText = document.createTextNode(i*i*i);

        cellNumber.appendChild(cellNumberText);
        cellSquare.appendChild(cellSquareText);
        cellCube.appendChild(cellCubeText);

        row.appendChild(cellNumber);
        row.appendChild(cellSquare);
        row.appendChild(cellCube);

        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
    tbl.setAttribute("border", "2");
}

function calculateNum() {

    let date = Date.now();

    let num1 = Math.floor(Math.random(10)*100);
    let num2 = Math.floor(Math.random(10)*100);

    let result = num1 + num2;

    let userResult = prompt("What is " + num1 + " + " + num2 + "?");
    
    if (userResult == result) {
        alert("Correct! It took you " + ((Date.now() - date)/1000) + " seconds to answer.");
    } else {
        alert("Incorrect. The correct answer is " + result);
    }
}