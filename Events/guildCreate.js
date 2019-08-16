const Discord = require('discord.js');

module.exports = async(Bumper, guild) => {
 /* 
  let servers = Bumper.supporters.get("supporter")
  let Data = [];
  
  servers.map(Kiro => {
    Data.push(Kiro)
  });
  //console.log(Data)
    if(Data.includes(guild.id)) {
    console.log(`Premium Server Activated! \n Joined: ${guild.name} (${guild.id}).`);
    Bumper.channels.get("554023020973522946").send(`Joined ${guild.name} (${guild.id}).`);
        
    } else {
    console.log(`Not a premium server, leaving!\n Name:${guild.name} (${guild.id}).`);
    Bumper.channels.get("554023020973522946").send(`Tried to Join ${guild.name} (${guild.id}), but no premium active.`);
    guild.leave();
      
      
  }; 
  */
  
    console.log(`Premium Server Activated! \n Joined: ${guild.name} (${guild.id}).`);
    Bumper.channels.get("554023020973522946").send(`Joined ${guild.name} (${guild.id}).`);
    Bumper.supporters.push('supporter', guild.id)
  
};