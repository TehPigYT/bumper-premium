const db = require('quick.db');
const Discord = require('discord.js');
const fs = require('fs');
/*
 * Main instance of Bible, will boot up all Commands & Events.
 */
module.exports = function(Bumper) {
  
  Bumper.on("ready", async() => {
    
    /* Mythical Bot list */
    
    let MBL = Bumper.guilds.get("521461252317249537");
    let MBLDesc = await db.fetch(`description_${MBL.id}`);
    let MBLBann = await db.fetch(`banner_${MBL.id}`);
    let MBLInv = await db.fetch(`invite_${MBL.id}`);
    if(!MBLDesc)return console.log(`${MBL.name} - No desc`);
   // if(!MBLBann)return console.log(`${MBL.name} - No banner`);
    if(!MBLInv)return console.log(`${MBL.name} - No inv`);
    let color = Bumper.Color;
    let hexcode = await db.fetch(`hex_${MBL.id}`);
    if(hexcode) { color = hexcode; };
    
    let MBLEmbed = new Discord.RichEmbed()
    .setColor(color)
    .setTitle(`${MBL.name}`)
    .setDescription(`${MBLDesc}`)
    .setThumbnail(MBL.iconURL)
    .addField('Type', 'Bot Listing Site')
    .addField('Representatives', `${MBL.owner}\nhttps://mythicalbots.xyz/ \n https://discord.gg/${MBLInv}\nMembers: ${MBL.members.filter(m => m.presence.status === 'online').size}/${MBL.members.size}`)
    if(MBLBann) { MBLEmbed.setImage(MBLBann) };
    MBLEmbed.setTimestamp()
    .setFooter('Official Partners | Last Update', Bumper.user.avatarURL);
    
    Bumper.channels.get('503365682331648010').fetchMessage('586010044504604683')
    .then(message => message.edit(MBLEmbed))
    .then(console.log("Edited Message - Mythical Bot List"))
    .catch(console.error)
    
    /* Dragons Lair */
    
    let Drag = Bumper.guilds.get("440250369780744202");
    let DragDesc = await db.fetch(`description_${Drag.id}`);
    let DragBann = await db.fetch(`banner_${Drag.id}`);
    let DragInv = await db.fetch(`invite_${Drag.id}`);
    if(!DragDesc)return console.log(`${Drag.name} - No desc`);
    //if(!DragBann)return console.log(`${Drag.name} - No banner`);
    if(!DragInv)return console.log(`${Drag.name} - No inv`);
    let Dcolor = Bumper.Color;
    let Dhexcode = await db.fetch(`hex_${Drag.id}`);
    if(Dhexcode) { Dcolor = Dhexcode; };
    
    let DragEmbed = new Discord.RichEmbed()
    .setColor(Dcolor)
    .setTitle(`${Drag.name}`)
    .setDescription(`${DragDesc}`)
    .setThumbnail(Drag.iconURL)
    .addField('Type', 'Youtuber Getaway')
    .addField('Representatives', `${Drag.owner}\nhttps://discord.gg/${DragInv}\n[Youtube](https://www.youtube.com/channel/UCPT1td59Q4Sn5yOl_r6KGdg)\nMembers: ${Drag.members.filter(m => m.presence.status === 'online').size}/${Drag.members.size}`)
    if(DragBann) { DragEmbed.setImage(DragBann) };
    DragEmbed.setTimestamp()
    .setFooter('Official Partners | Last Update', Bumper.user.avatarURL);
    
    Bumper.channels.get('503365682331648010').fetchMessage('586011465207775263')
    .then(message => message.edit(DragEmbed))
    .then(console.log("Edited Message - Dragons Lair"))
    .catch(console.error)
    
      /* Discord Listing Network */
    
    let DL = Bumper.guilds.get("603997098597154817");
    let DLDesc = await db.fetch(`description_${DL.id}`);
    let DLBann = await db.fetch(`banner_${DL.id}`);
    let DLInv = await db.fetch(`invite_${DL.id}`);
    if(!DLDesc)return console.log(`${DL.name} - No desc`);
    //if(!DragBann)return console.log(`${Drag.name} - No banner`);
    if(!DLInv)return console.log(`${DL.name} - No inv`);
    let DLcolor = Bumper.Color;
    let DLhexcode = await db.fetch(`hex_${DL.id}`);
    if(DLhexcode) { DLcolor = DLhexcode; };
    
    let DLEmbed = new Discord.RichEmbed()
    .setColor(DLcolor)
    .setTitle(`${DL.name}`)
    .setDescription(`**Welcome to Discord Listings Network**
Discord Listings Network is a community where you can:
⚫ Advertise your own server in one of our channels.
🔵 Get help and tips on how to improve your own server.
🔴 Get the latest Discord Information and News.
⚪ Chance to get your server posted in it's very own channel for **a whole week**, through our **server of the week** competition.`)
    .setThumbnail(DL.iconURL)
    .addField('Type', 'Community')
    .addField('Representatives', `${DL.owner}\nhttps://discord.gg/${DLInv}\nMembers: ${DL.members.filter(m => m.presence.status === 'online').size}/${DL.members.size}`)
    if(DLBann) { DLEmbed.setImage(DLBann) };
    DLEmbed.setTimestamp()
    .setFooter('Official Partners | Last Update', Bumper.user.avatarURL);
    
    Bumper.channels.get('503365682331648010').fetchMessage('605467719378403330')
    .then(message => message.edit(DLEmbed))
    .then(console.log("Edited Message - Discord Listing Network"))
    .catch(console.error)
    
  });
  
};