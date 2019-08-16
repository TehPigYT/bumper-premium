const Discord = require("discord.js");
const Quick = require("quick.db");
module.exports = async(Bumper, message) => {


  if (message.author.bot) return undefined;
  if (message.channel.type != "text") return undefined;
  
    let Prefix = await Quick.fetch(`prefix_${message.guild.id}`);
    if(!Prefix)Prefix = "b!!";
    if (message.content.indexOf(Prefix) !== 0) return undefined;
    console.log(`${message.guild.name}[${message.guild.id}] - ${message.author.tag} - ${message.content}`);
  
  let args = message.content.slice(Prefix.length).trim().split(/ +/g);
  let Command = args.shift().toLowerCase();
  
  let MemoryCommand;
	if (Bumper.Commands.has(Command)) { 
    MemoryCommand = Bumper.Commands.get(Command);	
  } else if (Bumper.Aliases.has(Command)) { 
    MemoryCommand = Bumper.Commands.get(Bumper.Aliases.get(Command));	
  } else {
    return //message.channel.send(`Error | Unknown Command.`)
  };
  
	MemoryCommand.run(Bumper, message, args);

};