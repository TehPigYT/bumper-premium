const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!!";
  
  let Color = Bumper.Color;
  let hexcode = await Quick.fetch(`hex_${message.guild.id}`);
  if(hexcode) { Color = hexcode; };
  
  let serverEmebd = new Discord.RichEmbed()
  .setColor(Color)
  .setTitle("Bumper Servers")
  .setDescription(`Go here to see all servers! \n https://bumper-premium.glitch.me/servers`)
  
  message.channel.send(serverEmebd);
  
};


exports.help = {
  name: "servers",
  description: "Gives The users bump stats.",
  usage: "b!!Servers"
};

exports.conf = {
  Aliases: [ ] // No Aliases.
};