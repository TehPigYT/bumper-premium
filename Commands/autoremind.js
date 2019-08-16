const Discord = require("discord.js");
const Quick = require("quick.db");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!!";
  
  let Color = Bumper.Color;
  let hexcode = await Quick.fetch(`hex_${message.guild.id}`);
  if(hexcode) { Color = hexcode; };
  
  const Konah = Bumper.emojis.get("456305427236257804");
  const KoHelp = Bumper.emojis.get("456211147406835713");
  
   let reminder = await Quick.fetch(`reminderLog_${message.guild.id}`);
  if(!reminder) return message.channel.send(`Please set your reminder log. \`${prefix}settings remind <channelName>\``);
  
   let True = new Discord.RichEmbed()
    .setTitle("Bumper Premium")
    .setColor(Color)
    .setDescription("Is this the server you want to \`Auto-Reminder\`?")
    .setFooter(`Type: Yes or No`)
    
    const AMFilter = msg => msg.author.id === message.author.id && msg.channel.id === message.channel.id;
    const Awaiter = await message.channel.send(True);
   
    let bb = await Quick.fetch(`autoBump_${message.guild.id}`);
    console.log(`${message.guild.name} (${message.guild.id} AutoBump ${bb}`);
   
    const Answers = ["yes","no"];
    let y = "yes"
    
  message.channel.awaitMessages(AMFilter, {
    max: 1,
    time: 15000
  }).then(async Response => {
    
    if(!Answers.includes(Response.first().content.toLowerCase())){
      return message.channel.send("**Bumper** - Not a valid response, canceling Bumper's \`AutoReminder\` Setup.");
    };
    
    if (Response.first().content.toLowerCase() === "yes"){
      Awaiter.delete();
      let me = await message.channel.send("**Bumper Premium** - Setting up AutoReminder for this server!");
      Quick.set(`autoBumpp_${message.guild.id}`, "yes")
      me.edit(`${KoHelp} **| Auto-Reminder is now Enabled.**`)   
    };
    
    if (Response.first().content.toLowerCase() === "no"){
      Awaiter.delete();
      Quick.delete(`autoBumpp_${message.guild.id}`)
      return message.channel.send("**Bumper Premium** - Disabled AutoReminder.");
    };
    
     }).catch(() => {
    Awaiter.delete();
    return message.channel.send("**Bumper Premium** - Time ran out, canceling AutoReminder Setup.");
  });
  
};


exports.help = {
  name: "autoremind",
  description: "Gives The users bump stats.",
  usage: "b!!autoremind"
};

exports.conf = {
  Aliases: [ ] // No Aliases.
};