const Discord = require("discord.js");
const Quick = require("quick.db");
const moment = require("moment");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars 

    let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
    if(!prefix)prefix = "b!!";

    let Awaiter = await message.channel.send(`Fetching server info...`);
  
    let server = args[0];
    if(!server)return Awaiter.edit("Please give a server id.");
  
    let guild = Bumper.guilds.get(server);
    if(!guild)return Awaiter.edit("The server id you gave is invalid.");
    
    let invite = await Quick.fetch(`invite_${guild.id}`);
    if(!invite)return Awaiter.edit(`Please contact our support server for help. https://discord.gg/qewzpjz \n Give Tea Cup#9999 **Error Code:** \`2H4-gj\``);
    
    let description = await Quick.fetch(`description_${guild.id}`);
    if(!description)return Awaiter.edit(`The server given has no description set.`);
  
    let banner = await Quick.fetch(`banner_${guild.id}`); 
  
    let Color = Bumper.Color;
    let hexcode = await Quick.fetch(`hex_${guild.id}`);
    if(hexcode) { Color = hexcode; };
  
    let premium = Bumper.officalServers.get("Offical");
    let Data = [];
    premium.map(Kiro => { Data.push(Kiro); }); 

    
    let previewEmbed = new Discord.RichEmbed()
    .setColor(Color)
    if(Data.includes(guild.id)) {
    previewEmbed.setAuthor(`${guild.name}`, "https://cdn.discordapp.com/emojis/453784092576841758.png?v=1") 
    } else { 
    previewEmbed.setTitle(`**${guild.name}**`)
    };
    previewEmbed.setURL(`https://bumperbot.ml/server/${guild.id}`)
    .setDescription(`
      Owner **-** ${guild.owner}
      Members **-** ${guild.memberCount}
      Emojis **-** ${guild.emojis.size}
      Created: **-** ${moment(guild.createdTimestamp).format('MMMM Do YYYY (h:mm a)')}
      
 
      ${description}
       [Join Here](https://discord.gg/${invite})
    `)
    .setImage(banner)
    .setThumbnail(guild.iconURL)
    .setTimestamp()
    .setFooter("Bumper Auto Partner")
    message.channel.send(previewEmbed);
    Awaiter.delete();
};

exports.help = {
  name: 'info',
  description: 'Lets a developer add/remove a premium server and display all the premium servers.',
  usage: 'b!!Info'
}

exports.conf = {
  Aliases: []
}