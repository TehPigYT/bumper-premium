const Discord = require('discord.js');
const Quick = require('quick.db');

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  
  if (!prefix) {
    prefix = 'b!!';
  }
  
  if(!args[0]) {
    const errEmbed = new Discord.RichEmbed()
    .setTitle('Premium Management')
    .setColor('BLURPLE')
    .setThumbnail(message.guild.iconURL)
    .addField('Add a Server', `\`${prefix}Premium Add <ServerID>\``)
    .addField('Remove a Server', `\`${prefix}Premium Remove <ServerID>\``)
    .addField('Give a list', `\`${prefix}Premium List\``)
    
    return message.channel.send(errEmbed);
  }
  
  if (args[0].toLowerCase() === 'add') {
    if (!Bumper.Developers.includes(message.author.id)) {
      return message.channel.send(`This command can only be exectued by my developers.`);
    }
    
    const serverID = args[1];
    
    if (!serverID) {
      return message.channel.send('Please provide a server ID.');
    }
        
    if(Bumper.supporters.get('supporter').includes(serverID)) {
      return message.channel.send('This ID is already in my database.');
    }
    
    Bumper.supporters.push('supporter', serverID)
      
    const addEmbed = new Discord.RichEmbed()
    .setTitle('Server added to Bumper Premium.')
    .setColor(Bumper.Color)
    .setDescription(`**Server was added to premium list!**\n**Server ID:** \`${serverID}\``)
    
    return message.channel.send(addEmbed); 
  };
  
  if (args[0].toLowerCase() === 'remove') { 
    if (!Bumper.Developers.includes(message.author.id)) {
      return message.channel.send(`This command can only be exectued by my developers.`);
    }
    
    const serverID = args[1];
    
    if (!serverID) {
      return message.channel.send('Please provide a server ID.');
    }
        
    if (Bumper.supporters.get('supporter').includes(serverID)) {
      Bumper.supporters.remove('supporter', serverID);
            
      const bumperServer = Bumper.guilds.get(serverID);
      
      if (!bumperServer) {
        return message.channel.send('The ID you provided is not valid server ID.');
      }
      
      bumperServer.leave();
      
      const removeEmbed = new Discord.RichEmbed()
      .setTitle('Server removed from Bumper Premium.')
      .setColor(Bumper.Color)
      .setDescription(`Bumper Premium left **${bumperServer.name}**.`)
      
      return message.channel.send(removeEmbed);
    } else {
      return message.channel.send('This ID is not in my database.');
    }
  }
    
  if (args[0].toLowerCase() === 'list') {
    const Data = [];
    const premiumServers = Bumper.supporters.get('supporter');
    
    premiumServers.map(Kiro => { 
      const premiumServer = Bumper.guilds.get(Kiro);
      if(!premiumServer)return console.log(`Error: ${Kiro}`), message.channel.send(`I had a Issue Loading this server ID: \`${Kiro}\` .`);
      
     Data.push(`\`Name:\` **${premiumServer.name}** **|** \`ID:\` **${premiumServer.id}**`);
    });
    
    return message.channel.send(Data.join('\n')); 
  }
}


exports.help = {
  name: 'premium',
  description: 'Lets a developer add/remove a premium server and display all the premium servers.',
  usage: 'b!!Premium'
}

exports.conf = {
  Aliases: []
}