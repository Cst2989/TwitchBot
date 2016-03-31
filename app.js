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
		username:"creasta29",
		password: appkey
	},
	channels:["devcoffee_"]
};

var client = new tmi.client(options);
client.connect();

client.on('chat',function(channel,user,message,self){
	client.action("devcoffee_", user['display-name'] + " you are a total noob");

});

client.on('connected',function(address,port){
	//console.log("Adress: " +address + " Port: " + port);
	client.action("devcoffee_","Hello I'm a noob bot and you are a total noob");
});