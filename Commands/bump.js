const Discord = require("discord.js");
const Quick = require("quick.db");
const ms = require('parse-ms');
let cooldown = 1.08e+7;


exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
 
    
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!!";
  
  if (!Bumper.Developers.includes(message.author.id)) {
  
   let lastDaily = await Quick.fetch(`lastDaily_${message.guild.id}`);
  
    try {
      let b = await Quick.fetch(`serverBumps_${message.guild.id}`)
      let am =  + 1
      if(message.guild.owner.id === message.author.id) { cooldown = 3.6e+6 };
      
  if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
      
    let timeObj = ms(cooldown - (Date.now() - lastDaily))
  
    let sEmbed = new Discord.RichEmbed()
   
     .setColor(Bumper.Error)
     .setTitle(`Bumper Upvote Error`)
     .setDescription(`Next bump point will be available in **${timeObj.hours}hrs ${timeObj.minutes}min**\nView Server: [Here](https://bumperbot.ml/server/${message.guild.id})`)
     message.channel.send(sEmbed);
    
} else {
  
  Quick.set(`lastDaily_${message.guild.id}`, Date.now());
  Quick.add(`bumps_${message.guild.id}`, 1);
  Quick.add(`userBumps_${message.author.id}_${message.guild.id}`, 1);
  
  let guild = message.guild
  const tools = require('../updateBumper.js')(Bumper, guild);
  
  let id = message.guild.id
  const discord = require("../sendPartner.js")(Bumper, id);
 
  
  let bumpEmbed = new Discord.RichEmbed()
  .setTitle("Bumped!")
  .setColor(Bumper.Color)
  .setDescription(`Server has been bumped!\nView Server: [Here](https://bumperbot.ml/server/${message.guild.id})`)
  .setFooter("Koala INC - Bumper Advertising")

  message.channel.send(bumpEmbed);

      };
    } catch(err) {
      return console.log(err);
  };
    
  } else {
    
  Quick.add(`bumps_${message.guild.id}`, 1);
  Quick.add(`userBumps_${message.author.id}_${message.guild.id}`, 1);
    
  let guild = message.guild
  const tools = require('../updateBumper.js')(Bumper, guild);
    
  let id = message.guild.id
  const discord = require("../sendPartner.js")(Bumper, id);
    
  let bumpEmbed = new Discord.RichEmbed()
  .setTitle("Developer Bump!")
  .setColor(Bumper.Color)
  .setDescription(`Server has been bumped!\nView Server: [Here](https://bumperbot.ml/server/${message.guild.id})`)

  message.channel.send(bumpEmbed);
    
  };
    
};


exports.help = {
  name: "bump",
  description: "Upvote your server.",
  usage: "b!!Bump"
};

exports.conf = {
  Aliases: [] // No Aliases.
};