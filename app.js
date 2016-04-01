var tmi = require('tmi.js');

var options = {
	options:{
		debug:true
	},
	connection:{
		cluster:"aws",
		reconnect:true
	},
	identity:{
		username:"TriviaNoobBot",
		password: privatekey
	},
	channels:["creasta29"]
};

var scores = { };

//ADD more questions / make sure that the answer is in the exact index as the question.

var questions = ['Which singer joined Mel Gibson in the movie Mad Max: Beyond The Thunderdome?', 'On TV, who did the character Lurch work for?','In which film did Roger Moore first play James Bond?','If cats are feline, what are sheep?','Which is the financial centre and main city of Switzerland?'];
var answers = ['Tina Turner','Addams Family','Live or Let die','Ovine','Zurich'];

var question;
var answer;

function StartGame(){
	var max = questions.length -1;
	var min = 0;
	var random =  Math.floor(Math.random()*(max-min+1)+min);

	question = questions[random];
	answer = answers[random];
	client.action("creasta29", question);
}

function AddScore(user){
	console.log(user);
	//Add points to db
}
function ShowScore(){
	// Get score from db 
	// and show it
}
var client = new tmi.client(options);
client.connect();

client.on('chat',function(channel,user,message,self){ 
	if (message == '!start') {
		StartGame();
	}
	if (message == '!score') {
		ShowScore();
	}
	if (message == answer) {
		client.action("creasta29", "Felicitari "+ user['display-name']+" ! Ai castigat 10 puncte. Tasteaza !score sa vezi clasamentul!");
		AddScore(user['display-name']);
		var index = questions.indexOf(question);
		if (index > -1) {
			questions.splice(index, 1);
			answers.splice(index, 1);
		}
		setTimeout(function(){
			StartGame();
		},5000)
		
	}
});

client.on('connected',function(address,port){
	//console.log("Adress: " +address + " Port: " + port);
	client.action("creasta29","Hello! Eu sunt TriviaNoobBot! Tasteaza !start pentru a incepe trivia!");
});