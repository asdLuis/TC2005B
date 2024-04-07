// Ejercicio 1

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
};

// Ejercicio 2

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
};

// Ejercicio 3

function contador(arr) {

    let pos = 0;
    let neg = 0;
    let zero = 0;

    arr.forEach(element => {
        if (element > 0) {
            pos++;
        }
        if (element < 0) {
            neg++;
        }
        if (element == 0) {
            zero++;
        }
    });

    return 'Positivos: ' + pos + ' Negativos: ' + neg + ' Ceros: ' + zero;
};

// Ejercicio 4

function matrixAvg(matrix) {

    let average = 0;
    let size = 0;

    matrix.forEach(row => {
        row.forEach(element => {
            average += element;
            size++;
        });
    });

    return average/size;

};

// Ejercicio 5

function reverseNum(n) {

    return [...(n).toString()].reverse().join(''); 
}

// Ejercicio 6

function recurFibo(n) {
        if (n <= 1) {
            return n;
        }
        return recurFibo(n - 1) + recurFibo(n - 2);
};