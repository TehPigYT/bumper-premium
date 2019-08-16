const db = require('quick.db');
const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');

/*
 * Main instance of Bible, will boot up all Commands & Events.
 */
module.exports = function(Bumper) {
   
    Bumper.Developers = [ "338192747754160138", "488659939170975744" ]
    Bumper.Color = "#8f78a7";
    Bumper.Error = 0xF64465;
    Bumper.PIC = "https://cdn.discordapp.com/avatars/453601455698608139/878faa09c16a0a3ee67d77459bb80c82.png?size=2048";
    
  Bumper.login(process.env.TOKEN).catch(err => {
    console.log(`[Bumper] Found an error while connecting to Discord.\n${err.stack}`);
  }); 
  
  Bumper.Commands = new Discord.Collection();
  Bumper.Aliases = new Discord.Collection();
  
  fs.readdir('./Events/', (err, files) => {
    if (err) {
     return console.log(`[Bumper] Found an error while loading Bumpers's Events.\n${err.stack}`);
    };
      
    files.forEach(file => {
      if (!file.endsWith('.js')) {
        return;
      };
      
      const event = require(`./Events/${file}`);
      let eventName = file.split('.')[0];

      Bumper.on(eventName, event.bind(null, Bumper));
      delete require.cache[require.resolve(`./Events/${file}`)];
    });
  });
  
  fs.readdir('./Commands/', (err, files) => {
	  if (err) {
     return console.log(`[Bumper] Found an error while loading Bible's Commands.\n${err.stack}`);
    };
    
	  let jsfiles = files.filter(f => f.split('.').pop() == 'js');
  
	  if (jsfiles.length <= 0) {
      return console.log('[Bumper] No Commands to load.');
    };
  
	  jsfiles.forEach(f => {
		  let props = require(`./Commands/${f}`);
		  props.fileName = f;
		  Bumper.Commands.set(props.help.name, props);
		  props.conf.Aliases.forEach(alias => {
			  Bumper.Aliases.set(alias, props.help.name);
		  });
	  });
  });
  
  /* Levling Database */
  
const points = new db.table('POINTS');
const levels = new db.table('LEVELS');
const xpl = new db.table("TOTAL_POINTS");
const cooldown = require("./cooldown.js");
  
   Bumper.on("message", async message => {
   if (message.author.bot) return undefined;
   if (message.channel.type != "text") return undefined;
     
   let lvling = await db.fetch(`leveling_${message.guild.id}`);
   if(!lvling)return //console.log(`Leveling is disabled! ${message.guild.name}(${message.guild.id})`);
     
  let user = message.author.id;

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  
   levels.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if (i == null || i === 0) levels.set(`${message.guild.id}_${message.author.id}`, 1);
  });
  
  points.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if (i == null) points.set(`${message.guild.id}_${message.author.id}`, 0);
  });
  
  xpl.fetch(`${message.guild.id}_${message.author.id}`).then(i => {
    if (i == null) xpl.set(`${message.guild.id}_${message.author.id}`, 0);
  });
  
  if (!cooldown.is(user.id)) {
  if(message.author.id !== "338192747754160138"){
  cooldown.add(user.id);
  }
  points.add(`${message.guild.id}_${message.author.id}`, xpAdd);
  xpl.add(`${message.guild.id}_${message.author.id}`, xpAdd);
    setTimeout(() => {
      cooldown.remove(user.id);
    }, 1000 * 60);
  }
  points.fetch(`${message.guild.id}_${message.author.id}`).then(p => {
    levels.fetch(`${message.guild.id}_${message.author.id}`).then(async l => {
      var xpReq = l * 300;
      if(p >= xpReq ) {
        levels.add(`${message.guild.id}_${message.author.id}`, 1);
        points.set(`${message.guild.id}_${message.author.id}`, 0);
        levels.fetch(`${message.guild.id}_${message.author.id}`, {"target": ".data"}).then(async lvl => {
          let up = new Discord.RichEmbed()
          .setTitle("Level Up!")
          .setDescription("You have just leveled to level **" + lvl + "**")
          .setColor(Bumper.Color)
          
          if(message.guild.id === "521651468131106817"){
            message.author.send(up);
          } else {
             let lvlChannel = await db.fetch(`levelingChannel_${message.guild.id}`);
             if(lvlChannel) {
             let chan = message.guild.channels.find("name", lvlChannel)
             if(!chan)return;
               let lvlup = new Discord.RichEmbed()
               .setTitle("Level Up!")
               .setDescription(`${message.author.tag} Just Leveled up to level **${lvl}**`)
               .setColro(Bumper.Color)
              chan.send(lvlup).then(message => {
                let time = "10s";
                
                setTimeout(() => {
                 message.delete();
                }, ms(time));
                
              });
             } else {
            message.channel.send(up).then(message => {
                let time = "10s";
                
                setTimeout(() => {
                 message.delete();
                }, ms(time));
            });
            };
          };
        });
      }
    });
  }); 
});
  
  
    Bumper.on("ready", async () => {
          
    setInterval(async() => {
            let pic = Bumper.users.get("453601455698608139")
            let servers = Bumper.guilds.map(g=>g.id);
            const id = servers[Math.floor(Math.random() * Bumper.guilds.size)];
          
          let lastDaily = await db.fetch(`lastPartner_${id}`);
          let cooldown = "900000";
         
          try {
             if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
              console.log(`ID: ${id} Name: ${Bumper.guilds.get(id).name} Cooldown in place!`);
          } else {

            const discord = require("./sendPartner.js")(Bumper, id);
             
            }; 
           } catch(err) {
          return console.log(err);
       };
        }, 60000); 
  }); 
  
      Bumper.on("message", async () => {
          


        
            let pic = Bumper.users.get("453601455698608139")
            let servers = Bumper.guilds.map(g=>g.id);
            const id = servers[Math.floor(Math.random() * Bumper.guilds.size)];
            
            let lastReminder = await db.fetch(`lastRemind_${id}`);
            let cooldown = "1800000";
         
          try {
             if (lastReminder !== null && cooldown - (Date.now() - lastReminder) > 0) {
               //console.log(`ID: ${id} Name: ${Bumper.guilds.get(id).name} Cooldown in place for AutoBump`);
          } else {
        
            let reminder = await db.fetch(`reminderLog_${id}`);
            if(!reminder)return; //no reminder channel
            
            let guild = Bumper.guilds.get(id);
            let channel = guild.channels.get("name", reminder);
            if(!channel)return;
          
            let Color = Bumper.Color;
            let hexcode = await db.fetch(`hex_${id}`);
            if(hexcode) { Color = hexcode; };
           
           let embed = new Discord.RichEmbed()
           .setColor(Color)
           .setTitle("Bumper Reminder!")
           .setDescription(`Your server can now be upvoted again!`)
           channel.send(embed);
            db.set(`lastRemind_${id}`, Date.now());
  
          }; 
        } catch(err) {
      return console.log(err);
   };
});
  
      Bumper.on("ready", async () => {
       
    setInterval(async() => {
            let pic = Bumper.users.get("453601455698608139")
            let servers = Bumper.guilds.map(g=>g.id);
            const id = servers[Math.floor(Math.random() * Bumper.guilds.size)];
            let auto = await db.fetch(`autoBump_${id}`);
        
            if(auto === "yes") {
         
            let lastDaily = await db.fetch(`lastBump_${id}`);
            let cooldown = "900000";
         
          try {
             if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
               //console.log(`ID: ${id} Name: ${Bumper.guilds.get(id).name} Cooldown in place for AutoBump`);
          } else {

            db.set(`lastBump_${id}`, Date.now());
            db.add(`bumps_${id}`, 1);
            db.add(`userBumps_552965127012614154_${id}`, 1) 
            const tools = require('./updateBumper.js')(Bumper, id);
             
            }; 
           } catch(err) {
          return console.log(err);
        };
     }; //else { await Bumper.channels.get("563143854828814371").send("AutoBump Not Enabled! " + id) };
      }, 60000);
  });
  
    Bumper.on('message', async message => {
  if (message.content === '!jointest') {
      Bumper.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  }
});
  /* Custom Settings */
  
  Bumper.on("guildMemberAdd", async member => {
    if(member.guild.id === "546330395080392719") {
    Bumper.channels.get("561903050487496704").send(`Welcome <@${member.user.id}> to the staff server representing Global Advertiser!
If you have any questions ask them in <#547437652388085790>
https://media1.giphy.com/media/wAVA7WdV2jita/giphy.gif`);
      
      let role = member.guild.roles.find("name", "Get Verified")
      member.addRole(role.id);
      
    };
  });
  
  require("./KoalaPartnering.js")(Bumper);
  
};