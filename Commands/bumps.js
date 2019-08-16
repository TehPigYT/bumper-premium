const Discord = require("discord.js");
const Quick = require("quick.db");
exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
 
    
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!!";
  
  let bumps = await Quick.fetch(`bumps_${message.guild.id}`);
  if(!bumps)bumps = "0";
  
  let premium = await Quick.fetch(`premiumBumps_${message.author.id}`);
  if(!premium)premium = "0";
  
  let urBumps = await Quick.fetch(`userBumps_${message.author.id}_${message.guild.id}`);
  if(!urBumps)urBumps = "0";
  
  let Color = Bumper.Color;
  let hexcode = await Quick.fetch(`hex_${message.guild.id}`);
  if(hexcode) { Color = hexcode; };
  
  let bumpEmbed = new Discord.RichEmbed()
  .setTitle("Bump Statistics")
  .setColor(Color)
  .setThumbnail(message.author.avatarURL)
  .setDescription(`\`Server Bumps:\` **${bumps}**
  \`Your Bumps:\` **${urBumps}**
  \`Premium Bumps Left:\` **${premium}**
  `)
  message.channel.send(bumpEmbed);
};


exports.help = {
  name: "bumps",
  description: "Gives The users bump stats.",
  usage: "b!!Bumps"
};

exports.conf = {
  Aliases: [] // No Aliases.
};