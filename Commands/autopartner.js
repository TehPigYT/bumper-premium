const Discord = require("discord.js");
const Quick = require("quick.db");
const moment = require("moment");

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  
  const Konah = Bumper.emojis.get("456305427236257804");
  const KoHelp = Bumper.emojis.get("456211147406835713");
  
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!!";
  
  let premium = Bumper.officalServers.get("Offical");
  let Data = [];
  premium.map(Kiro => { Data.push(Kiro); });    
  //console.log(premium);

  
  let pChann = ``;
  let channel = await Quick.fetch(`pChannel_${message.guild.id}`);
  if(!channel) pChann = `\`${prefix}AutoPartner channel <channelName>\` **-** Setup your partner log. `;
  if(channel) { 
    
  let channe = message.guild.channels.find("name", channel)
   
   if(!channe) {
     Quick.delete(`pChannel_${message.guild.id}`);
     pChann = `\`${prefix}AutoPartner channel <channelName>\` **-** Setup your partner log. `;
   };
    
     pChann = `Auto-Partner: <#${channe.id}> To disable \`${prefix}AutoPartner disable\`` 
  };
  
  let banne = ``;
  let banner = await Quick.fetch(`banner_${message.guild.id}`); 
  if(banner) { banne = `Banner URL: [Here](${banner}) To remove \`${prefix}AutoPartner banner delete\` ` }; 
  if(!banner) { banne = `\`${prefix}AutoPartner banner <URL>\` **-** **Optional**` };
  
  let desc = ``;
  let description = await Quick.fetch(`description_${message.guild.id}`);
  if(description) { desc = `Description: ${description} To remove \`${prefix}AutoPartner description delete\` ` };
  if(!description) { desc = `\`${prefix}AutoPartner description <words>\` **-** Give your server info!` };
  
  let hex = ``;
  let color = Bumper.Color;
  let hexcode = await Quick.fetch(`hex_${message.guild.id}`);
  if(hexcode) { hex = `Hex Code: \`${hexcode}\` To reset \`${prefix}AutoPartner hexcode reset\``, color = hexcode; };
  if(!hexcode) { hex = `\`${prefix}AutoPartner hexcode <hexcode>\` **-** Set your servers Hex Code Color.` };

  if(!args[0]) {
    
    let noargsEmbed = new Discord.RichEmbed()
    .setTitle("Auto Partner Settings")
    .setColor(Bumper.Color)
    .addField("Auto Partner Channel", `${pChann}`)
    .addField("Server Description", `${desc}`)
    .addField("Server Hex Code", `${hex}`)
    .addField("Server Banner", `${banne}`)
    .addField("Auto Partner Preview", `Do \`${prefix}AutoPartner preview\``)
    if(banner) { 
     noargsEmbed.setImage(banner)
    };
    noargsEmbed.setFooter("The bot makes a invite for you!");
    
    message.channel.send(noargsEmbed)
    
  };
  
    if(args[0] === "preview") {
    
    let Awaiter = await message.channel.send(`Fetching server info...`);
    
    let channel = await Quick.fetch(`pChannel_${message.guild.id}`);
    if(!channel)return Awaiter.edit(`Your servers Auto Partner Channel is not setup! \n \`${prefix}AutoPartner channel\``);
    
    let invite = await Quick.fetch(`invite_${message.guild.id}`);
    if(!invite)return Awaiter.edit(`Your server had an error making an invite please do \n \`${prefix}AutoPartner channel\` Again`);
    
    let description = await Quick.fetch(`description_${message.guild.id}`);
    if(!description)return Awaiter.edit(`Please give your server a description! \n \`${prefix}AutoPartenr description <msg>\``);
    
   /* console.log(`
    Banner: ${banner}
    Description: ${description}
    Invite: ${invite}
    
    `); */
    
    let previewEmbed = new Discord.RichEmbed()
    .setColor(color)
    if(Data.includes(message.guild.id)) {
    previewEmbed.setAuthor(`${message.guild.name}`, "https://cdn.discordapp.com/emojis/453784092576841758.png?v=1") 
    } else { 
    previewEmbed.setTitle(`**${message.guild.name}**`)
    };
    previewEmbed.setURL(`https://bumperbot.ml/server/${message.guild.id}`)
    .setDescription(`
      Owner **-** ${message.guild.owner}
      Members **-** ${message.guild.memberCount}
      Emojis **-** ${message.guild.emojis.size}
      Created: **-** ${moment(message.guild.createdTimestamp).format('MMMM Do YYYY (h:mm a)')}
      
 
      ${description}
       [Join Here](https://discord.gg/${invite})
    `)
    .setImage(banner)
    .setThumbnail(message.guild.iconURL)
    .setTimestamp()
    .setFooter("Bumper Auto Partner")
    message.channel.send(previewEmbed);
    Awaiter.delete();
  };
  
  if(args[0]) {
  if(args[0] === "preview")return;
  
  if (Bumper.Developers.includes(message.author.id)) { } else {
    
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:konah:456305427236257804> **| You don't have `ADMINISTRATOR` perms.**");
    };
  };
  
  if(args[0] === "channel") {
  
    
    let channelName = args[1];
    if(!channelName)return message.channel.send(`Please give a Channel Name.\nEx: \`partners\``);
    
    if(channelName === "disable") {
      Quick.delete(`pChannel_${message.guild.id}`);
      return message.channel.send(`Auto Partner has been Disabled. `);
    };
    
    let channel = message.guild.channels.find("name", channelName);
    if(!channel)return message.channel.send(`Channel Name: \`${channelName}\` Was not found in this server.\nEx: \`partners\` **DO NOT DO*:** \`#channel\``);
    
    
    message.channel.send(`Setting welcome-log to \`${channel.name}\`. \n **Note: Please make sure I am allowed to send messages in this channel.**`);
    
    let testEmbed = new Discord.RichEmbed()
    .setTitle("Auto-Partner Test")
    .setColor("#00CC99")
    .setDescription(`This channel has been set as your AutoParner channel.`)
    channel.send(testEmbed);
    
    const Invite = await channel.createInvite({ maxAge: 0 }).catch(err => {
      return message.channel.send(`$Error found while generating a invite. \n\`\`\`js\n${err}\n\`\`\``);
    });
    
    Bumper.invites.set(message.guild.id, `https://discord.gg/${Invite.code}`, "invite")
    Quick.set(`pChannel_${message.guild.id}`, channel.name);
    Quick.set(`invite_${message.guild.id}`, Invite.code)
  };
  
  if(args[0] === "description") {

    
    let msg = args.slice(1).join(' ');
    if(!msg)return message.channel.send(`Please give a Description.`);
    
    if(msg === "delete") {
      Quick.delete(`description_${message.guild.id}`);
      return message.channel.send(`Server description has been reset.`);
    };
    
    Quick.set(`description_${message.guild.id}`, msg);
    message.channel.send(`Setting description to \`${msg}\`.`)
    
  };
  
  if(args[0] === "banner") {

    
    let url = args.slice(1).join(' ');
    if(!url)return message.channel.send(`Please give a Banner (URL_).`);
    
    if(url === "delete") {
      Quick.delete(`banner_${message.guild.id}`);
      return message.channel.send(`Server banner has been reset.`);
    };
    
    Quick.set(`banner_${message.guild.id}`, url);
    message.channel.send(`Setting banner to \`${url}\`.`)
    
  };

  
  if(args[0] === "hexcode") {
  
    let msg = args.slice(1).join(' ');
    if(!msg)return message.channel.send(`Please give a Hex Code. \n Ex: \`#ffff\``);
    
    if(msg === "delete") {
      Quick.delete(`hex_${message.guild.id}`);
      return message.channel.send(`Server hex code has been reset.`);
    };
    
    Quick.set(`hex_${message.guild.id}`, msg);
    message.channel.send(`Setting hex code to \`${msg}\`.`)
    
  };
  
};

exports.help = {
  name: "autopartner",
  description: "Automatically send partner msgs.",
  usage: "b!!AutoPatner"
};

exports.conf = {
  Aliases: [ "ap" ] // No Aliases.
};

/* For LAter */

//https://${process.env.PROJECT_DOMAIN}.glitch.me/