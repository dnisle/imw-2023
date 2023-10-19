// source: with the help of chat-gpt

// adapt color
const circles = document.querySelectorAll('.colors');
const container = document.getElementById('interactionContainer');
circles.forEach(circle => {
    circle.addEventListener('click', () => {
        const circleColor = window.getComputedStyle(circle).getPropertyValue('background-color');
        container.style.backgroundColor = circleColor;
    });
});


// loop text
const loopContainer = document.getElementById('loopContainer');
const loopText = 'Denise Le ';
const loopCount = 40;
let repeatedText = '';
for (let i = 0; i < loopCount; i++) {
    repeatedText += loopText;
}
const textNode = document.createTextNode(repeatedText);
loopContainer.appendChild(textNode);


// square changing color
const square = document.getElementById('square');
const colors = ['red', 'orange'];
let index = 0;
function squareChangingColor() {
    square.style.backgroundColor = colors[index];
    index = (index + 1) % colors.length;
}
setInterval(squareChangingColor, 500);


// increase text
const increaseText = document.getElementById('increaseText');
let fontSize = 16;
function increaseTextSize() {
    if (fontSize<50){
            fontSize += 1;
            increaseText.style.fontSize = `${fontSize}px`;
    }
}
setInterval(increaseTextSize, 500);


// input
const form = document.getElementById('form');
const inputText = document.getElementById('inputText');
const textLength = document.getElementById('text-length');
form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    const inputNumber = inputText.value;
    const count = inputNumber.length;
    textLength.textContent = count;
});


// message
const consoleContainer = document.getElementById('consoleContainer');
const message = document.createElement('p');
message.textContent = 'js is so hard';
consoleContainer.appendChild(message);
