// rendering elements
const drawingBoard = document.querySelector(".drawing-board");
const boardSize = document.querySelector("#drawing-board-size");

// input elements
// select buttons
const pressHoldBtn = document.querySelector("#press-hold-btn");
const eraseBtn = document.querySelector("#erase-btn");
const autoColorBtn = document.querySelector("#auto-color-btn");
// regular buttons
const clearBtn = document.querySelector("#clear-btn");
const resizeBtn = document.querySelector("#resize-btn");
const randomColorBtn = document.querySelector("#random-color-btn");
// color selector
const colorSample = document.querySelector("#color-sample");

// event listners
// triggering initial 16 x 16
document.addEventListener("DOMContentLoaded", () => {
    // render 16 x 16 board
    renderDrawingBoard(16);
    // choose a random color 
    colorSample.value = generateRandomColor();
});
// press and hold btn
pressHoldBtn.addEventListener("click", () => {
    const isPressed = pressHoldBtn.getAttribute("aria-pressed") === "true";
    pressHoldBtn.setAttribute("aria-pressed", !isPressed);
})

// erase button
eraseBtn.addEventListener("click", () => {
    const isPressed = eraseBtn.getAttribute("aria-pressed") === "true";
    eraseBtn.setAttribute("aria-pressed", !isPressed);
    autoColorBtn.setAttribute("aria-pressed", false);

    if (eraseBtn.getAttribute("aria-pressed") === "true") {colorSample.value = "#ffffff";}
    else {colorSample.value = generateRandomColor();}
})

// clear button
clearBtn.addEventListener("click", () => {
    // get the current rendered pixel node list
    const pixels = document.querySelectorAll(".pixel");

    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = "white";
    })
});

// resize
resizeBtn.addEventListener("click", () => {
    let boardSize;
    do {
        boardSize = prompt("Enter drawing board size you want : ", "Enter a number between 10 & 100");
        if(!boardSize){return;}

        boardSize = parseInt(boardSize);
        boardSize = ((10 > boardSize) || (boardSize > 100)) ? NaN : boardSize;
        
    } while (Number.isNaN(boardSize));

    renderDrawingBoard(boardSize);
});

// automated multi color
autoColorBtn.addEventListener("click", () => {
    const isPressed = autoColorBtn.getAttribute("aria-pressed") === "true";
    autoColorBtn.setAttribute("aria-pressed", !isPressed);
    eraseBtn.setAttribute("aria-pressed", false);
})

// generate random color
randomColorBtn.addEventListener("click", () => {
    colorSample.value = generateRandomColor();
    autoColorBtn.setAttribute("aria-pressed", false);
    eraseBtn.setAttribute("aria-pressed", false)
});

// detect color picker input
colorSample.addEventListener("input", () => {
    eraseBtn.setAttribute("aria-pressed", false);
    autoColorBtn.setAttribute("aria-pressed", false);
});

// draw on hover
drawingBoard.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("pixel")){
        if (pressHoldBtn.getAttribute("aria-pressed") === "true"){
            if (event.buttons === 1){
                draw(event.target);
            }
        }
        else{
            draw(event.target);
        }
    }
});

drawingBoard.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("pixel")){
        draw(event.target);
    }
});

// prevent accidental HTML drag detection
drawingBoard.addEventListener("dragstart", (event) => {
    event.preventDefault();
});


// functions
function renderDrawingBoard(number){
    drawingBoard.replaceChildren();

    const boardFragment = document.createDocumentFragment();

    for (let i = 0; i < (number * number); i++){
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");

        // temporarly storing pixel divs. IF appended to DOM on each iterations that would be ineffieient 
        boardFragment.appendChild(pixel);
    }
    drawingBoard.appendChild(boardFragment);
    document.documentElement.style.setProperty("--grid-size", number);
    boardSize.textContent = `${number} x ${number}`;
}

function draw(pixel){
    if (autoColorBtn.getAttribute("aria-pressed") === "true"){colorSample.value = generateRandomColor();}

    const pixelColor = colorSample.value;
    pixel.style.backgroundColor = pixelColor;
}

function generateRandomColor() {
    // Hue ranges from 0° to 360° (all color tones)
    const hue = Math.floor(Math.random() * 360);
    
    //  moderate saturation (70%)  + High lightness (85%) =  pastel colors
    return hslToHex(hue, 70, 85)
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
