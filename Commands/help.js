const Discord = require("discord.js");
const Quick = require("quick.db");
exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
 
  let comm
  let comm1
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!!";
  
  let commandsInfo = await Quick.fetch(`commands_123`);
  if(commandsInfo === null) { comm = "**Commands have been disabled.** \n \`Reason:\` **Bot is being worked on!**" };
  if(commandsInfo) { 
    comm = `
   \`${prefix}bump\` **-** Bumps your server. 
   \`${prefix}bumps\` **-** Shows your bump statistics.
   \`${prefix}self-role\` **-** Give your self a role.
   \`${prefix}settings\` **-** Set your servers settings.
   \`${prefix}AutoPartner\` **-** Set up your autopartner.`
    comm1 = `
   \`${prefix}Rank\` **-** Get your rank card.
   \`${prefix}Rank-Color\` **-** Set your rank color.
   \`${prefix}Rank-Image\` **-** Set you rank image.
   `
  };
  
  let embed = new Discord.RichEmbed()
  .setColor(Bumper.Color)
  .setDescription(`**Hi ${message.author.tag}**, I'm Bumper & I'm here to help your server grow!\n\nI was created by **Tea Cup#9999**\n\nSupport Server: https://discord.gg/fp4PMrT`)
  .addField("Commands", `${comm}`)
  if (commandsInfo) { 
    embed.addField("Fun", `${comm1}`)
  };
  if (Bumper.Developers.includes(message.author.id)) {
    embed.addField("Dev Commands", `\`${prefix}commands\` **-** Disable **/** Enable commands. \n \`${prefix}premium\` **-** Give a server premium perks. \n \`${prefix}eval\` **-** Evaluate Code. \n \`${prefix}servers\` **-** Shows the bots servers.`)
  };
  embed.setFooter("Koala Inc", Bumper.PIC)
  message.channel.send(embed); 
 
};

exports.help = {
  name: "help",
  description: "Gives The bots help menu.",
  usage: "b!!Help"
};

exports.conf = {
  Aliases: [] // No Aliases.
};