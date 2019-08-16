const Discord = require("discord.js");
const Quick = require("quick.db");
exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  if(!args[0]) {
    return message.channel.send(`Please provide a URL. \n Ex: \`${message.guild.iconURL}\``);
  };

  var color = args[0]
    
  Quick.set(`image_${message.author.id}`, color)
      
  let embed = new Discord.RichEmbed()
  .setTitle("Bumper Rank Image")
  .setDescription("Image for your rank card successfuly changed! \nNow image - \`" + color + "\`")
  .setColor(Bumper.Color)
  .setFooter("*Use 934x282 images for best results*")
  message.channel.send(embed);
   
};
exports.help = {
  name: "rank-image",
  description: "Ping the bot.",
  usage: "b!!rank-image"
};

exports.conf = {
  Aliases: [] // No Aliases.
};