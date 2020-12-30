/*
    Scripts for custom JavaScript in articles on my website
*/


/* aurebesh_translator */
function calculateAurebesh() {
    var text = document.getElementById('english_text').value;
    var display=document.getElementById('outputP');
    display.innerHTML=text;
}

/* an_analysis_of_human_decision_making */
function calculateNH() {
    var IL = parseFloat(document.getElementById('IL').value);
    var p  = parseFloat(document.getElementById('p').value);
    var ER = parseFloat(document.getElementById('ER').value);
    var NH = IL + p * ER;

    var display=document.getElementById('outputDiv');

    if (NH > 0) {
        display.innerHTML="NH Value: " + NH;
        display.append("... \nDo this. It will increase your net happiness.");
    } else
    if (NH == 0) {
        display.innerHTML="NH Value: " + NH;
        display.append("... \nIt does not matter what you do in this situation.");
    }
    else {
        display.innerHTML="NH Value: " + NH;
        display.append("... \nDo not do this. It will decrease your net happiness.");
    }
}

