const Discord = require('discord.js');

module.exports = async(Bumper, guild) => {
  

    console.log(`[Bumper Removed] leaving!\n Name:${guild.name} (${guild.id}).`);
     Bumper.channels.get("554023020973522946").send(`I left ${guild.name} (${guild.id})`);
    // Bumper.supporters.remove('supporter', guild.id);
      
  
};