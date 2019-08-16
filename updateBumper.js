const db = require('quick.db');
const Discord = require('discord.js');
const snekfetch = require("snekfetch");

module.exports = async function(Bumper, guild) {
  
 await snekfetch.get(`https://bumper.glitch.me/api/BV2/${guild.id}?key=12225706Bcswan12`);
 console.log("[Bumper] Sent upvote to main Bumper.")
    
  
  
};