const Discord = require("discord.js");
const Quick = require("quick.db");
const jimp = require('jimp');
const Canvas = require("canvas");
const { get } = require('snekfetch');

exports.run = async(Bumper, message, args) => { // eslint-disable-line no-unused-vars
  let user = message.author;
  let prefix = await Quick.fetch(`prefix_${message.guild.id}`);
  if(!prefix)prefix = "b!!";
  
   let lvling = await Quick.fetch(`leveling_${message.guild.id}`);
   if(!lvling)return message.channel.send("The Rank command is not enabled for this server.")
  
  let member = message.mentions.members.first();
  if (!member) member = message.member;
  
  if (member.user.bot) return message.channel.send({ embed: {
    "description": "I can't show bot's rank card because it's bot after all!",
    "color": 0xff2222
  } });
  
  let loading = await message.channel.send(`<a:kLoading:471774317815005195> Loading your rank card!`);
  
  /* Database Fetching */

  var pos = 0;
  var l;
  var p;

  function map(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
    var levels = new Quick.table("LEVELS")
  levels.fetch(`${message.guild.id}_${member.id}`).then(i => {
    l = i;
  });

  var widthXP;
  var points2 = new Quick.table("POINTS");
  points2.fetch(`${message.guild.id}_${member.id}`).then(i => {
    widthXP = map(i, 0, l * 300, 0, 615);
    p = i;
  });

  var pos = 0;
  var points = new Quick.table("TOTAL_POINTS");
  points.startsWith(`${message.guild.id}_`, {
    sort: '.data'
  }).then(resp => {
    var i = 0;
    for (i in resp) {
        if (Bumper.users.get(resp[i].ID.split('_')[1]).id == member.user.id) {
        pos = parseInt(i, 10) + 1;
      }
    }
  });
  
  /* Picture making */
  var colorStatus = "#44b37f";
  var color = "#ffffff";
  var colorRank = "#aaaaaa";
  
  let ccolor = await Quick.fetch(`hexcode_${member.user.id}`)
  if(ccolor) { color = ccolor, colorRank = ccolor };
  
  if (member.presence.status === 'idle') colorStatus = "#faa61a";
  if (member.presence.status === 'offline') colorStatus = "#747f8d";
  if (member.presence.status === 'dnd') colorStatus = "#f04747";

  let Image = Canvas.Image
  let canvas = new Canvas.createCanvas(934, 282)
  let ctx = canvas.getContext('2d');

      var opacity = 1;
      let urlBG;
      let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(9, -70) + ".gif" : member.user.displayAvatarURL;
  
      let ur = await Quick.fetch(`image_${member.user.id}`)
      if(ur) { urlBG = ur, console.log(ur) };
      if(!ur) { urlBG = "https://static.tildacdn.com/tild3166-3465-4533-b163-323762393762/-/empty/database1.png" } 
  
    jimp.read(url, (err, ava) => {
    if (err) return console.log(err);
    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
      if (err) return console.log(err);
      
      jimp.read(urlBG, (err, imageBG) => {
        if (err) return console.log(err);
        imageBG.getBuffer(jimp.MIME_PNG, (err, bufBG) => {
          if (err) return console.log(err);

          let Avatar = Canvas.Image;
          let ava = new Avatar;
          ava.src = buf;

          let Background = Canvas.Image;
          let bg = new Background;
          bg.src = bufBG;

          var centerX = canvas.width / 2;
          var centerY = canvas.height / 2;

          ctx.fillStyle = colorRank;
          ctx.fillRect(0, 0, 61, 282);

          if (!ur) {
            opacity = 1;
          } else {
            ctx.drawImage(bg, 0, 0); 
            opacity = 0.75;
          } 

          ctx.fillStyle = colorRank;
          ctx.fillRect(0, 0, 61, 282);

          ctx.globalAlpha = opacity;
          ctx.fillStyle = "#2f3136";
          ctx.fillRect(61, 0, 873, 282);
          ctx.fillStyle = "#36393f";
          ctx.fillRect(61, 36, 873, 210);
          ctx.globalAlpha = 1;

          ctx.font = "36px Arial";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "start";
          ctx.fillText(`${member.user.username}`, 264, 164);
          ctx.font = "italic 36px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.textAlign = "center";
          ctx.fillText(`#${member.user.discriminator}`, ctx.measureText(`${member.user.username}`).width + 10 + 316, 164);
          /*LEVEL*/
          ctx.font = "bold 36px Arial";
          ctx.fillStyle = colorRank;
          ctx.textAlign = "end";
          ctx.fillText(l, 934 - 64, 82);
          ctx.fillText("LEVEL", 934 - 64 - ctx.measureText(l).width - 16, 82);
          /*RANK*/
          ctx.font = "bold 36px Arial";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "end";
          ctx.fillText(pos, 934 - 64 - ctx.measureText(l).width - 16 - ctx.measureText(`LEVEL`).width - 16, 82);
          ctx.fillText("RANK", 934 - 64 - ctx.measureText(l).width - 16 - ctx.measureText(`LEVEL`).width - 16 - ctx.measureText(pos).width - 16, 82);
          /*XPS*/
          ctx.font = "bold 36px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.textAlign = "start";
          ctx.fillText("/ " + l * 300, 624 + ctx.measureText(p).width + 10, 164);
          ctx.fillStyle = colorRank;
          ctx.fillText(p, 624, 164);

          if (widthXP > 615 - 18.5) widthXP = 615 - 18.5;

          ctx.beginPath();
          ctx.fillStyle = "#424751";
          ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
          ctx.fill();
          ctx.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
          ctx.arc(257 + 615, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
          ctx.fill();
          ctx.fillRect(257 + 18.5, 147.5 + 36.25, widthXP, 37.5);
          ctx.arc(257 + 18.5 + widthXP, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
          ctx.fill();

          ctx.beginPath();
          ctx.lineWidth = 8;
          ctx.arc(85 + 75, 66 + 75, 75, 0, 2 * Math.PI, false);
          ctx.strokeStyle = colorStatus;
          ctx.stroke();
          ctx.clip();
          ctx.drawImage(ava, 85, 66, 150, 150);

          message.channel.send({
            files: [
              canvas.toBuffer()
            ]
          });
          loading.delete()
        });
      });
    });
  });
};

exports.help = {
  name: "rank",
  description: "Gives The users bump stats.",
  usage: "b!!rank"
};

exports.conf = {
  Aliases: [ ] // No Aliases.
};