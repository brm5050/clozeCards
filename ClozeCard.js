
//call npm packages
var fs = require("fs");
var inquirer = require("inquirer");

//create constructor function
function FlashCloze(text, cloze) {
    this.cardCloze = cloze;
    this.cardText = text;
    this.whole = "{{c::" + this.cardCloze + "}}" + " " + this.cardText;
    
    this.clozeLogger = function() {
        console.log("Cloze " + this.cardCloze + " " + "Text: " + this.cardText);
    }

    this.cardWriter = function() {
        var writeCard = this.whole + "\r\n";

        fs.appendFile("cardsCloze.txt", writeCard); 
    }

    this.displayClozeDeleted = function() {
    	var cloze = this.whole.replace(this.cardCloze,"...");
    	return cloze;
    }
};

function createCard() {
    inquirer.prompt([
        {name: "cloze",
        message: "Enter text for cloze side: "}, 
        {name: "text",
        message: "Enter text for whole flashcard "}, 
        {type: "confirm",
        message: "Display cloze deleted flashcard?",
        name: "display",
        default: true}, 
        {type: "confirm",
        message: "Do you want to add another card?",
        name: "continue",
        default: true
        }
    ]).then(function(answers) {
        //create 'new' clozeflashcards instatiate
        var card = new FlashCloze(answers.text, answers.cloze);
        card.cardWriter();
        //if user is finished makign cards then log it if not then allow them to create another

        if(answers.display === true)
        	console.log(card.displayClozeDeleted());

        if(answers.continue === true)
            createCard();
        else
            console.log("cardsCloze.txt")
    });
}
//call the original constructor function
createCard();