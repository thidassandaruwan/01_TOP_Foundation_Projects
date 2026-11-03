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

console.log(get_user_result("rock", "scissor"));