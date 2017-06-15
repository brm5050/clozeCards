var fs = require("fs");
//call inquirer npm
var inquirer = require("inquirer");

//create constructor for the fronts and the backs of the cards
function CreateBasicCard(front, back) {
	//front
    this.front = front;
    //back
    this.back = back;

    //log it into console to see front and back of crds
    this.displayCardInfo = function() {

        console.log("Front: " + this.front + " " + "Back: " + this.back);
    }
    //create loggin function so that the information will add to a text file in the same folder
    this.logCard = function() {
    	//create object in which the information will be stored
        var writeCard = "Front: " + this.front + " Back: " + this.back + "\n";
       	//append the users information to the txt file so that it stores
        fs.appendFile("cardsBasic.txt", writeCard); 
    }
};

function createCard() {
	//type in the information that node will spit out to the user
	//need to have the user enter a front and a back of the flashcads
	//make an array for the prompts utilizing inquirer npm
    inquirer.prompt([
        { name: "front",
            message: "What do you want on the front of your flashcard? " },
           { name: "back",
            message: "How about the back..."},
            {type: "confirm",
            message: "Do you want to add more flashcards?",
            name: "continue",
            default: true}
        
    ]).then(function(answers) {
        var card = new CreateBasicCard(answers.front, answers.back);
        card.logCard();
        //if user is finished makign cards then log it if not then allow them to create another
        if(answers.continue === true)
            createCard();
        else
            console.log("cardsBasic.txt")
    });
}
//call the function so that it initiates
createCard();