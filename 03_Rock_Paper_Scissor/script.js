// create variables for all the html elements needed here

// button to start the game
const start_button = document.getElementById("start_button");
// game area
const game_area = document.querySelector(".game_area");
// html div output area
const output_area = document.querySelector(".output_area");
// start button wrapper div
const start_button_wrappper = document.querySelector(".start_button_wrappper");
// no of rounds left variable
const rounds_left_text = document.getElementById("rounds");
// text with computer marks
const computer_marks_text = document.getElementById("computer_marks");
// text with user marks
const user_makrs_text = document.getElementById("user_marks");
// game result displaying area
const game_result_area = document.querySelector(".result_section");
// game result displaying text
const result_text = document.getElementById("result");

// Game related variables
// game selections
const game_selections = ["rock", "paper", "scissor"];
// number of rounds variables
let number_of_rounds = 0;
// rounds left variable
let rounds_left = number_of_rounds;
// marks variables
let user_marks = 0;
let computer_marks = 0;

start_button.addEventListener("click", play_game);

async function play_game(){
    // refresh output area
    output_area.replaceChildren();
    // hide previous game result
    game_result_area.style.display = "none";
    start_button_wrappper.style.height = "20vh";
    
    // refresh previous game marks
    user_marks = 0;
    computer_marks = 0;
    number_of_rounds = 0;

    number_of_rounds = get_rounds();
    rounds_left = number_of_rounds;
    if (number_of_rounds === null)
    {
        const error_output = document.createElement("p");
        error_output.textContent = "YOU CANCELLED THE GAME !";
        output_area.appendChild(error_output);
        output_area.style.display = "flex";
        return;
    }
    
    // display the game area
    game_area.style.display = "flex";
    // display number of rounds left : game area
    rounds_left_text.textContent = rounds_left;
    // display initial scores : game area
    computer_marks_text.textContent = computer_marks;
    user_makrs_text.textContent = user_marks;

    // propmt user for selection.
    for (let i = 0; i < number_of_rounds; i++){
        await delay(300);
        play_round();
    }    

    // display final outcome (who won)
    display_result();
}

// get the number of rounds
function get_rounds(){
    let num = NaN;
    let input = null;
    do {
        input = prompt("How many Rounds? ");
        if (input === null)
        {
            return input;
        }
        num = parseInt(input);

        // if number of rounds is less than 1
        if (num < 1)
        {
            num = NaN;
        }
    } while (isNaN(num));
    
    return num;
} 

// play round
function play_round(){
    // -1 from rounds left
    rounds_left--;
    rounds_left_text.textContent = rounds_left;
    //  get user selection
    const user_selection = get_user_selection();
    const computer_selection = get_computer_selection();
    // compare the two selections 
    const user_result = get_user_result(user_selection, computer_selection); 
    // unhide the output_area
    // display the game area
    output_area.style.display = "flex";
    // display game selection in output_area
    const game_record = document.createElement("p");
    game_record.textContent = `User Selection : ${user_selection} ----------------- Computer Selection : ${computer_selection}`;
    output_area.appendChild(game_record);
    if (user_result == 1)
    {
        user_marks++;
        user_makrs_text.textContent = user_marks;
    }
    else if (user_result == -1)
    {
        computer_marks++;
        computer_marks_text.textContent = computer_marks;
    }
}

// ask for number of rounds
function get_user_selection()
{
    let user_selection = null;
    // propmt the user untill gives a valid input
    do {
        // prompt user for input
        user_selection = String(prompt("Enter \"rock\", \"paper\" or \"scissor\":")).trim();
    } while (!(check_user_selection(user_selection)));

    // convert the seelction to lowercase
    user_selection = user_selection.toLowerCase();
    return user_selection;
}

function check_user_selection(selection)
{
    selection = String(selection)
    selection = selection.toLowerCase();
    // returns true if user selection in the game_selections
    return game_selections.includes(selection);
}

function get_computer_selection(){
    // get random number (generate a random number 0 -2)
    const random_number = Math.floor(Math.random() * 3);
    // return the computer selection according to the random number
    return game_selections[random_number];
}

function get_user_result(user_selection, computer_selection){
    // declare possible match results 
    const results = new Map([
        ["rock:paper", -1],
        ["scissor:rock", -1],
        ["paper:scissor", -1],
        ["rock:rock", 0],
        ["paper:paper", 0],
        ["scissor:scissor", 0],
        ["rock:scissor", 1],
        ["scissor:paper", 1],
        ["paper:rock", 1]
    ]);

    return results.get(`${user_selection}:${computer_selection}`);
}

function display_result(){
    if (user_marks === computer_marks)
    {
        document.documentElement.style.setProperty("--theme-color", "var(--draw-background)");
        result_text.textContent = "Draw";
    }
    else if(user_marks > computer_marks)
    {
        document.documentElement.style.setProperty("--theme-color", "var(--winning-background)");
        result_text.textContent = "You Won!";
    }
    else if(computer_marks > user_marks)
    {
        document.documentElement.style.setProperty("--theme-color", "var(--loosing-background)");
        result_text.textContent = "You Lost!";
    }
    game_result_area.style.display = "block";
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}