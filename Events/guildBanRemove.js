const Discord = require("discord.js");
const Quick = require("quick.db");

module.exports = (Bumper, guild, member) => {
  Quick.fetch(`auditLog_${guild.id}`).then(async (i) => {
    if (i === null) return undefined;
    
    let Channel =  guild.channels.find("name",`${i}`)
    if (!Channel) return undefined;

    const UnbanEmbed = new Discord.RichEmbed()
    .setTitle("Bumper - Log")
    .setColor(Bumper.Color)
    .setDescription(`Unbanned User: **${member}**\nID: **${member.id}**`)
    
    Channel.send(UnbanEmbed);  
  });
};