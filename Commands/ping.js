const Discord = require("discord.js");
const Quick = require("quick.db");
exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
  let ping1Embed = new Discord.RichEmbed()
  .setTitle("Pong!")
  .setColor(Bumper.Color)
  
 const time = await message.channel.send(ping1Embed)
  
  let pingEmbed = new Discord.RichEmbed()
  .setTitle("Pong!")
  .setColor(Bumper.Color)
  .setDescription(`**Latency:** ${time.createdTimestamp - message.createdTimestamp}ms\n**API Latency:** ${Math.round(Bumper.ping)}ms`)
  time.edit(pingEmbed)
};

exports.help = {
  name: "ping",
  description: "Ping the bot.",
  usage: "b!!Ping"
};

exports.conf = {
  Aliases: [] // No Aliases.
};