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
  .setTitle("Bumper Stats")
  .setThumbnail("https://i.imgur.com/uF1I1sr.png")
  .setDescription(" ⬪ Bot statistics are listed below.")
  .addField("🢒 Server Count ", `**${Bumper.guilds.size}**`, true)
  .addField("🢒 User Count ", `**${Bumper.users.size}**`, true)
  .addField("🢒 Channel Count ", `**${Bumper.channels.size}**`, true)
  .addField("🢒 Statuses",`• Website: Operational \n • Bot: Operational`, true)
  
  message.channel.send(serverEmebd);
  
};


exports.help = {
  name: "stats",
  description: "Gives The users bump stats.",
  usage: "b!!Stats"
};

exports.conf = {
  Aliases: [ "stats" ] // No Aliases.
};