const Discord = require("discord.js");
const snekfetch = require('snekfetch');

module.exports = async(Bumper) => {
  let client = Bumper
    var clientonmessage = `
------------------------------------------------------
> Logging in...
------------------------------------------------------
Logged in as ${client.user.tag}
Working on ${client.guilds.size} servers!
${client.channels.size} channels and ${client.users.size} users cached!
I am logged in and ready to roll!
LET'S GO!
------------------------------------------------------
----------Bot created by Tea Cup#3433-----------
------------------------------------------------------
-----------------Bot's commands logs------------------`
    console.log(clientonmessage);
  
client.user.setPresence({ game: { name: `b!!help  🌴 Watching..`,  type: 2 } });
client.user.setStatus("dnd")
 // b!help  ❤  ${client.guilds.size} Servers 
  
    function MythicalActivity() {
   
    let Gameinfo = [ "b!!help  🌴 Hello!", "Spill the 🍵 sis.", `b!!help  🌴 ${Bumper.guilds.size} Servers`, "Sippin' 🍵", "Sipping on Straight Chlorine" ];
            
    var Info = Gameinfo[Math.floor(Math.random() * Gameinfo.length)];
            
    Bumper.user.setPresence({ game: { name: Info, type: 1 } });
            
  };
    
  setInterval(MythicalActivity, 60000 * 2); 
};