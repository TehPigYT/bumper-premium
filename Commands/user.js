const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
 if (!Bumper.Developers.includes(message.author.id)) return message.channel.send(`Command not done.`);
    
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!!";
  
  let Color = Bumper.Color;
  let hexcode = await Quick.fetch(`hex_${message.guild.id}`);
  if(hexcode) { Color = hexcode; };
  
  
};


exports.help = {
  name: "user-settings",
  description: "Gives The users bump stats.",
  usage: "b!!Uer-Settings"
};

exports.conf = {
  Aliases: [ "user" ] // No Aliases.
};