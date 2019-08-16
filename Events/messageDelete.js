const Discord = require("discord.js");
const Quick = require("quick.db");

module.exports = async(Bumper, message) => {
  Quick.fetch(`auditLog_${message.guild.id}`).then(async (i) => {
    if (i === null) return undefined;
    
    let Channel = message.guild.channels.find("name",`${i}`)
    if (!Channel) return undefined;
  
      let embed = new Discord.RichEmbed()
    .addField(`Message Deleted in #${message.channel.name}.`, `${message.author.username}: ${message.content}`)
    .setTitle("Bumper - Log")
    .setColor(Bumper.Color)
      Channel.send(embed)
  
})
}