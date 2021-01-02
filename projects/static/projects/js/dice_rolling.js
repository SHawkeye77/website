/*
    Resets all "select" to zero
*/
function resetAllSelects() {
    // Reset the results space
    document.getElementById("rollResult").innerHTML = "";  
    // Resetting all dice settings
    document.getElementById("n_proficiency").selectedIndex = 0;
    document.getElementById("n_ability").selectedIndex = 0;
    document.getElementById("n_boost").selectedIndex = 0;
    document.getElementById("n_challenge").selectedIndex = 0;
    document.getElementById("n_difficulty").selectedIndex = 0;
    document.getElementById("n_setback").selectedIndex = 0;
    document.getElementById("n_force").selectedIndex = 0;
}


/* 
    Uses RANDOM.org API calls to generate random dice calls 
*/

// Given random_number (multiple of n_sides) returns values from 1 to n_sides, inclusive
function getRandomSide(nSides, randomNumber) {
    return ((randomNumber % nSides) + 1);
}


// Make an API call to get "nDie" random numbers in range 1->24 (inclusive)
const getRandomNumbers = async(nDie) => {
    // Setting up the API call (see "https://www.random.org/integers/" for details)
    var url = "https://www.random.org/integers/";
    var endpoint = url;
    endpoint = endpoint + "?num=" + nDie.toString()
    endpoint = endpoint + "&min=1" + "&max=24" + "&col=1" + "&base=10" + "&format=plain" + "&rnd=new";


    // Perform API call
    try {
        const response = await fetch(endpoint);
        if (response.ok) {
            return response.text();
        }
        document.getElementById("rollResult").append("Trouble getting API request. Could be due spam of the \"Roll Dice\" button");
        throw new Error("Request Failed!");
    } catch (error) {
        console.log(error);
        return "Error - Sadge";
    }
}


const onRollDice = async() => {
    // Gathering how many of each die we have
    var nEachDie = new Object();
    nEachDie["proficiency"] = parseInt(document.getElementById('n_proficiency').value);
    nEachDie["ability"]     = parseInt(document.getElementById('n_ability').value);
    nEachDie["boost"]       = parseInt(document.getElementById('n_boost').value);
    nEachDie["challenge"]   = parseInt(document.getElementById('n_challenge').value);
    nEachDie["difficulty"]  = parseInt(document.getElementById('n_difficulty').value);
    nEachDie["setback"]     = parseInt(document.getElementById('n_setback').value);
    nEachDie["force"]       = parseInt(document.getElementById('n_force').value);

    // Setting up dictionary for the number of each outcome
    var nEachOutcome = new Object();
    nEachOutcome["triumph"]    = 0;
    nEachOutcome["success"]    = 0;
    nEachOutcome["advantage"]  = 0;
    nEachOutcome["despair"]    = 0;
    nEachOutcome["failure"]    = 0;
    nEachOutcome["threat"]     = 0;
    nEachOutcome["light_side"] = 0;
    nEachOutcome["dark_side"]  = 0;
    
    // Counting total number of dice
    var nDie = nEachDie["proficiency"] + nEachDie["ability"] + nEachDie["boost"] + nEachDie["challenge"] + nEachDie["difficulty"] + nEachDie["setback"] + nEachDie["force"];

    // Making API call, collecting response, parsing response to array
    if (nDie != 0) {
        var APIResponse = await getRandomNumbers(nDie);
        var randomNumbers = APIResponse.split("\n", nDie);
        // Calculating each value of nEachOutcome according to the generated random numbers and associated dice
        // Works because, in Javascript, objects and arrays follows pass by reference.
        var retval = await getOutcomes(randomNumbers, nEachDie, nEachOutcome);
        if (retval != 0) {
            throw new Error("Error calculating outcomes! Exiting");
        }
    }

    // Printing all symbols to the screen
    updateScreen(nEachOutcome);

}

// Update the html with out results (stored in nEachOutcome)
function updateScreen(nEachOutcome) {
    // Emptying the output space each dice roll
    document.getElementById("rollResult").innerHTML = "";  

    // Adding each outcome (without cancelling)
    var none = true;
    for (var i=0; i<nEachOutcome["triumph"]; i++) {
        $("#rollResult").append("<img src=/static/projects/images/dice/triumph.png/>");
        none = false;
    }
    for (var i=0; i<nEachOutcome["success"]; i++) {
        $("#rollResult").append("<img src=/static/projects/images/dice/success.png/>");
        none = false;
    }
    for (var i=0; i<nEachOutcome["advantage"]; i++) {
        $("#rollResult").append("<img src=/static/projects/images/dice/advantage.png/>");
        none = false;
    }
    for (var i=0; i<nEachOutcome["failure"]; i++) {
        $("#rollResult").append("<img src=/static/projects/images/dice/failure.png/>");
        none = false;
    }
    for (var i=0; i<nEachOutcome["threat"]; i++) {
        $("#rollResult").append("<img src=/static/projects/images/dice/threat.png/>");
        none = false;
    }
    for (var i=0; i<nEachOutcome["light_side"]; i++) {
        $("#rollResult").append("<img src=/static/projects/images/dice/light_side.png/>");
        none = false;
    }
    for (var i=0; i<nEachOutcome["dark_side"]; i++) {
        $("#rollResult").append("<img src=/static/projects/images/dice/dark_side.png/>");
        none = false;
    }

    // If nothing was printed, print on screen that it's a wash
    if (none) {
        document.getElementById("rollResult").innerHTML = "It's a wash!";
    }

}


// Update nEachOutcome based on random numbers and number of each die 
const getOutcomes = async(randomNumbers, nEachDie, nEachOutcome) => {
    // Index in the random numbers array
    var currIdx = 0; 

    // Dealing with any proficiency die
    for (var i=0; i<nEachDie["proficiency"]; i++) {
        var nSides = 12
        var side = getRandomSide(nSides, randomNumbers[currIdx]);
        if (side == 1) {
            nEachOutcome["triumph"]++;
        } else
        if (side == 2) {
            nEachOutcome["success"]++;
        } else
        if (side == 3) {
            nEachOutcome["success"]++;
            nEachOutcome["success"]++;
        } else
        if (side == 4) {
            nEachOutcome["advantage"]++;
        } else
        if (side == 5) {
            nEachOutcome["success"]++;
            nEachOutcome["advantage"]++;
        } else
        if (side == 6) {
            nEachOutcome["advantage"]++;
            nEachOutcome["advantage"]++;
        } else
        if (side == 7) {
            // NOTHING ON THIS SIDE
        } else
        if (side == 8) {
            nEachOutcome["success"]++;
        } else
        if (side == 9) {
            nEachOutcome["success"]++;
            nEachOutcome["success"]++;
        } else
        if (side == 10) {
            nEachOutcome["success"]++;
            nEachOutcome["advantage"]++;
        } else
        if (side == 11) {
            nEachOutcome["success"]++;
            nEachOutcome["advantage"]++;
        } else
        if (side == 12) {
            nEachOutcome["advantage"]++;
            nEachOutcome["advantage"]++;
        } 
        
        currIdx++;
    }

    // Dealing with any ability die
    for (var i=0; i<nEachDie["ability"]; i++) {
        var nSides = 8
        var side = getRandomSide(nSides, randomNumbers[currIdx]);
        if (side == 1) {
            // NOTHING ON THIS SIDE
        } else
        if (side == 2) {
            nEachOutcome["advantage"]++;
            nEachOutcome["advantage"]++;
        } else
        if (side == 3) {
            nEachOutcome["advantage"]++;
        } else
        if (side == 4) {
            nEachOutcome["success"]++;
        } else
        if (side == 5) {
            nEachOutcome["success"]++;
            nEachOutcome["success"]++;
        } else
        if (side == 6) {
            nEachOutcome["advantage"]++;
        } else
        if (side == 7) {
            nEachOutcome["success"]++;
        } else
        if (side == 8) {
            nEachOutcome["success"]++;
            nEachOutcome["advantage"]++;
        } 
        
        currIdx++;
    }

    // Dealing with any boost die
    for (var i=0; i<nEachDie["boost"]; i++) {
        var nSides = 6
        var side = getRandomSide(nSides, randomNumbers[currIdx]);
        if (side == 1) {
            // NOTHING ON THIS SIDE
        } else
        if (side == 2) {
            nEachOutcome["success"]++;
        } else
        if (side == 3) {
            nEachOutcome["advantage"]++;
            nEachOutcome["advantage"]++;
        } else
        if (side == 4) {
            nEachOutcome["advantage"]++;
        } else
        if (side == 5) {
            nEachOutcome["advantage"]++;
            nEachOutcome["success"]++;
        } else
        if (side == 6) {
            // NOTHING ON THIS SIDE
        } 
        
        currIdx++;
    }

    // Dealing with any challenge die
    for (var i=0; i<nEachDie["challenge"]; i++) {
        var nSides = 12
        var side = getRandomSide(nSides, randomNumbers[currIdx]);
        if (side == 1) {
            nEachOutcome["despair"]++;
        } else
        if (side == 2) {
            nEachOutcome["failure"]++;
        } else
        if (side == 3) {
            nEachOutcome["threat"]++;
        } else
        if (side == 4) {
            nEachOutcome["failure"]++;
            nEachOutcome["failure"]++;
        } else
        if (side == 5) {
            nEachOutcome["failure"]++;
            nEachOutcome["threat"]++;
        } else
        if (side == 6) {
            nEachOutcome["threat"]++;
            nEachOutcome["threat"]++;
        } else
        if (side == 7) {
            // NOTHING ON THIS SIDE
        } else
        if (side == 8) {
            nEachOutcome["failure"]++;
        } else
        if (side == 9) {
            nEachOutcome["threat"]++;
            nEachOutcome["threat"]++;
        } else
        if (side == 10) {
            nEachOutcome["threat"]++;
            nEachOutcome["failure"]++;
        } else
        if (side == 11) {
            nEachOutcome["failure"]++;
            nEachOutcome["failure"]++;
        } else
        if (side == 12) {
            nEachOutcome["threat"]++;
        } 
        
        currIdx++;
    }

    // Dealing with any difficulty die
    for (var i=0; i<nEachDie["difficulty"]; i++) {
        var nSides = 8
        var side = getRandomSide(nSides, randomNumbers[currIdx]);
        if (side == 1) {
            // NOTHING ON THIS SIDE
        } else
        if (side == 2) {
            nEachOutcome["threat"]++;
            nEachOutcome["failure"]++;
        } else
        if (side == 3) {
            nEachOutcome["threat"]++;
        } else
        if (side == 4) {
            nEachOutcome["failure"]++;
            nEachOutcome["failure"]++;
        } else
        if (side == 5) {
            nEachOutcome["failure"]++;
        } else
        if (side == 6) {
            nEachOutcome["threat"]++;
        } else
        if (side == 7) {
            nEachOutcome["threat"]++;
            nEachOutcome["threat"]++;
        } else
        if (side == 8) {
            nEachOutcome["threat"]++;
        }
        
        currIdx++;
    }

    // Dealing with any setback die
    for (var i=0; i<nEachDie["setback"]; i++) {
        var nSides = 6
        var side = getRandomSide(nSides, randomNumbers[currIdx]);
        if (side == 1) {
            // NOTHING ON THIS SIDE
        } else
        if (side == 2) {
            nEachOutcome["failure"]++;
        } else
        if (side == 3) {
            nEachOutcome["threat"]++;
        } else
        if (side == 4) {
            nEachOutcome["failure"]++;
        } else
        if (side == 5) {
            nEachOutcome["threat"]++;
        } else
        if (side == 6) {
            // NOTHING ON THIS SIDE
        }
        
        currIdx++;
    }

    // Dealing with any force die
    for (var i=0; i<nEachDie["force"]; i++) {
        var nSides = 12
        var side = getRandomSide(nSides, randomNumbers[currIdx]);
        if (side == 1) {
            nEachOutcome["light_side"]++;
        } else
        if (side == 2) {
            nEachOutcome["light_side"]++;
            nEachOutcome["light_side"]++;
        } else
        if (side == 3) {
            nEachOutcome["dark_side"]++;
        } else
        if (side == 4) {
            nEachOutcome["dark_side"]++;
            nEachOutcome["dark_side"]++;
        } else
        if (side == 5) {
            nEachOutcome["dark_side"]++;
        } else
        if (side == 6) {
            nEachOutcome["dark_side"]++;
        } else
        if (side == 7) {
            nEachOutcome["light_side"]++;
        } else
        if (side == 8) {
            nEachOutcome["light_side"]++;
            nEachOutcome["light_side"]++;
        } else
        if (side == 9) {
            nEachOutcome["dark_side"]++;
        } else
        if (side == 10) {
            nEachOutcome["light_side"]++;
            nEachOutcome["light_side"]++;
        } else
        if (side == 11) {
            nEachOutcome["dark_side"]++;
        } else
        if (side == 12) {
            nEachOutcome["dark_side"]++;
        } 
        
        currIdx++;
    }

    // Error check 
    if (currIdx != randomNumbers.length) {
        return -1;
    }
    return 0;
}

/*
Sides for each die (The LCM is 24):
    - Proficiency: 12   
    - Ability: 8    
    - Boost: 6
    - Challenge: 12
    - Difficulty: 8
    - Setback: 6
    - Force: 12
*/


