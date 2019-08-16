const Discord = require("discord.js");
const Quick = require("quick.db");
exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
 
    
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!!";
  
  let level
  
};

exports.help = {
  name: "level",
  description: "Ping the bot.",
  usage: "b!!Level"
};

exports.conf = {
  Aliases: [ "lvl" ] // No Aliases.
};