/* Require all packages used for Bumper V2. */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const Discord = require('discord.js');
const enmap = require('enmap');
const enmapSQLite = require('enmap-sqlite');
const db = require('quick.db');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const memoryStore = require('memorystore')(session);
const strategy = require('passport-discord').Strategy;
const helmet = require('helmet');
const ms = require('parse-ms');

app.use(express.static('public'));

var listener = app.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port: ${listener.address().port}.`);
});

/* Creating Bumper, our main client used. */
const Bumper = new Discord.Client({
  fetchAllMembers: true
});

Bumper.selfRole = new enmap({ name: "role" });
Bumper.supporters = new enmap({ name: "supporter" });
Bumper.invites = new enmap({ name: "invite" });
Bumper.officalServers = new enmap({ name: "Offical" });

process.on('uncaughtException', function (err) {
const hook = new Discord.WebhookClient('578335634582798337', '5ibzBzUpNvMMdh2jmoYCzBlQdUHGqn-oNaWsdAz0MDMXro6CBI559V3kAMHH9fw8YKo7');
let ErrorEmbed = new Discord.RichEmbed()
.setTitle("Bumper-Premium Error")
.setColor("#ce5b78")
.setDescription(`**Error:** \n`+ err)
hook.send(ErrorEmbed);
})

/* Protocol check, if it's http redirect to https. */
function checkHttps(req, res, next){
  if (req.get('X-Forwarded-Proto').indexOf('https') != -1) {
    return next();
  } else {
    res.redirect('https://' + req.hostname + req.url);
  };
};
                   
let Developers = [ '338192747754160138' ];
app.all('*', checkHttps);

/* Login setup */

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((obj, done) => { done(null, obj); });

passport.use(new strategy({
	clientID: '---',
  clientSecret: '---',
  callbackURL: '---/api/callback',
  scope: [ 'identify', 'guilds' ]
}, (accessToken, refreshToken, profile, done) => {
	process.nextTick(() => {
		return done(null, profile);
  });
}));
                       
app.use(session({
    store: new memoryStore({ checkPeriod: 86400000 }),
    secret: 'FROPT',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
	app.use(helmet({
		//allow for discord bot listing sites
		frameguard: false
	}));

app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.get('/index.css', (req, res) => res.sendFile(process.cwd() + '/views/index.css'));
app.get('/server.css', (req, res) => res.sendFile(process.cwd() + '/views/server.css'));
app.get('/card.css', (req, res) => res.sendFile(process.cwd() + '/views/card.css'));
/*
 * Authorization check, if not authorized return them to the login page.
 */
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) { return next(); }else {
  req.session.backURL = req.url; 
    console.log(req.url)
  res.redirect('/login');
  }
};

app.get('/api/callback', passport.authenticate('discord', { failureRedirect: '/404' }), (req, res) => {  
  console.log(req.session.backURL)
  if (Developers.includes(req.user.id)) { 
    req.session.isAdmin = true; 
  } else { 
    req.session.isAdmin = false; 
  };
  
  res.redirect("/me");
});
   
app.get("/login", (req, res, next) => { res.redirect (`https://discordapp.com/api/oauth2/authorize?client_id=552965127012614154&redirect_uri=https%3A%2F%2Fbumper-premium.glitch.me%2Fapi%2Fcallback&response_type=code&scope=identify%20guilds`) })

app.get('/logout', function(req, res) {
  req.session.destroy(() => {
    req.logout();
    res.redirect('/');
  });
});

app.get("/server/:ID/icon",  async (req, res) => {
  const guild = Bumper.guilds.get(req.params.ID);
  if (!guild) return res.send("https://i.imgur.com/2otMem9.png");
  let icon = guild.iconURL
  if(icon) {
  res.send(icon)
  } else {
  res.send("https://i.imgur.com/2otMem9.png");
  };
});

app.get("/",  async (req, res) => {
  console.log(`Someone is looking at the website!`)
  let user = req.isAuthenticated() ? req.user : null
  res.render(process.cwd() + '/views/index.ejs', { bot:Bumper,user:req.isAuthenticated() ? req.user : null });
});

app.get("/servers",  async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null
  let Data = [];
  let servers = Bumper.guilds.map(g=>g.id)
  
  servers.map(Kiro => {
    let iccon
    let icon = Bumper.guilds.get(Kiro).iconURL
    if(!icon)iccon = "https://i.imgur.com/2otMem9.png";
    if(icon)iccon = icon;
    
    let invite = Bumper.invites.get(Kiro);
    
    if(invite) {
      invite = invite.invite
    } else {
      invite = "gg";
    };
    
    //console.log(Kiro)
    Data[Data.length] = {
      id: Kiro,
      name: `${Bumper.guilds.get(Kiro).name}`,
      members: `${Bumper.guilds.get(Kiro).memberCount}`,
      iconURL: `${iccon}`,
      online: `${Bumper.guilds.get(Kiro).members.filter(o => o.presence.status === "online").size}`,
      roles: `${Bumper.guilds.get(Kiro).roles.size}`,
      invite: `${invite}`
    };
  });
 // console.log(Data)
  
  res.render(process.cwd() + '/views/servers.ejs', { bot:Bumper,user:req.isAuthenticated() ? req.user : null, Data });
});

app.get("/server/:ID",  async (req, res) => {
  let user = req.isAuthenticated() ? req.user : null
  let Data = [];
  
  const guild = Bumper.guilds.get(req.params.ID);
  if (!guild) return res.redirect("/404");
  
  let invite = await db.fetch(`invite_${guild.id}`);
  if(!invite) invite = "no_inv";
  
  let hexCode = await db.fetch(`hex_${guild.id}`);
  if(!hexCode) hexCode = "#8f78a7";
  
  let bumps = await db.fetch(`bumps_${guild.id}`);
  if(!bumps) bumps = "0";
  
  let banner = await db.fetch(`banner_${guild.id}`);
  let description = await db.fetch(`description_${guild.id}`);
  let background = await db.fetch(`background_${guild.id}`);
  


  res.render(process.cwd() + '/views/server.ejs', { bot:Bumper,user:req.isAuthenticated() ? req.user : null, Data, guild, banner, description, invite, hexCode, background, bumps });
});

app.get("/me", checkAuth, async (req, res) => {  const perms = Discord.EvaluatedPermissions;
  let servers = Bumper.supporters.get("supporter")
  let Data = [];
  servers.map(Kiro => {
    Data.push(Kiro)
  });                                       
  Bumper.fetchUser(req.user.id).then(user => { let avatar = user.displayAvatarURL.split('?')[0]
  res.render(process.cwd() + '/views/me.ejs', { bot:Bumper,user:req.isAuthenticated() ? req.user : null, perms, avatar, Data });
   });
});

app.get("/me/configure/:ID", checkAuth, async (req, res) => {  
    const perms = Discord.EvaluatedPermissions;
    const guild = Bumper.guilds.get(req.params.ID);
    if (!guild) return res.redirect("/404");
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/404?error=NOT_MANAGER");
  
    let prefix = await db.fetch(`prefix_${guild.id}`);
    if(!prefix)prefix = "b!!";
  
    let hexCode = await db.fetch(`hex_${guild.id}`);
    if(!hexCode) hexCode = "#8f78a7";
  
    let banner = await db.fetch(`banner_${guild.id}`);
    let description = await db.fetch(`description_${guild.id}`);
  
  
 res.render(process.cwd() + '/views/manage.ejs', { bot:Bumper,user:req.isAuthenticated() ? req.user : null, perms, prefix, guild, banner, description, hexCode });                                   
});

app.post("/me/configure/:ID", checkAuth, async (req, res) => {  
    const perms = Discord.EvaluatedPermissions;
    const guild = Bumper.guilds.get(req.params.guildID);
    if (!guild) return res.redirect("/404");
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/404?error=NOT_MANAGER");
  
    db.set(`prefix_${guild.id}`, req.body.prefix)
    db.set(`hex_${guild.id}`, req.body.hex)
    db.set(`banner_${guild.id}`, req.body.banner)
    db.set(`description_${guild.id}`, req.body.description)
  
 res.redirect("/me/configure/" + guild.id);                                  
});

app.get("/me/configure/:ID/leave", checkAuth, async (req, res) => {  
    const perms = Discord.EvaluatedPermissions;
    const guild = Bumper.guilds.get(req.params.ID);
    if (!guild) return res.redirect("/404");
    const isManaged = guild && !!guild.member(req.user.id) ? guild.member(req.user.id).permissions.has("MANAGE_GUILD") : false;
    if (!isManaged && !req.session.isAdmin) res.redirect("/404?error=NOT_MANAGER");
  
    guild.leave()
    res.redirect("/me");                                 
});

 app.get("/admin", checkAuth,async (req, res) => {  if (!req.session.isAdmin) return res.redirect("/");
   let user = req.isAuthenticated() ? req.user : null
   
   let Data = [];
   let servers = Bumper.guilds.map(g=>g.id)
  
  servers.map(async Kiro => {
    //console.log(Kiro)
    let invite = Bumper.invites.get(Kiro);
    
    if(invite) {
      invite = invite.invite
    } else {
      invite = "gg";
    };
    
    Data[Data.length] = {
      id: Kiro,
      name: `${Bumper.guilds.get(Kiro).name}`,
      members: `${Bumper.guilds.get(Kiro).memberCount}`,
      iconURL: `${Bumper.guilds.get(Kiro).iconURL}`,
      online: `${Bumper.guilds.get(Kiro).members.filter(o => o.presence.status === "online").size}`,
      roles: `${Bumper.guilds.get(Kiro).roles.size}`,
      invite: `${invite}`
    };
  });
  console.log(Data)
   res.render(process.cwd() + '/views/admin.ejs', { bot:Bumper,user:req.isAuthenticated() ? req.user : null, Data });
   });

app.get("/admin/message/owners", checkAuth,async (req, res) => {
    if (!req.session.isAdmin) return res.redirect("/dashboard");
   
   res.render(process.cwd() + "/views/allowners.ejs",{bot: Bumper,user:req.isAuthenticated() ? req.user : null });
  });

app.post("/admin/message/owners", checkAuth, async (req, res) => {
  if (!req.session.isAdmin) return res.redirect("/dashboard");
  
  res.redirect("/admin");
  
  Bumper.guilds.forEach(g => {
if (!['Discord Bots', 'Plexi Development', 'Discord Bot World', 'botlist.space', 'Bots on Discord'].includes(g.name)) {
  
  let embed = new Discord.RichEmbed()
  .setAuthor("Update!",Bumper.user.avatarURL)
  .setColor(Bumper.Color)
  .setDescription(`${req.body.msg}\n**Helpful Links:** \nSupport Server: https://discord.gg/qewzpjz \nWebsite: https://${process.env.PROJECT_DOMAIN}.glitch.me/\nThank You! ❤`)
  .setFooter("You may recive this message more than once!")
  g.owner.send(embed)
  
    };
  });
});

/* This must be at the bottom of the code */
app.get("*", async(req, res) => { 
   res.status(404).render(process.cwd() + "/views/404.ejs",{bot:Bumper,user:req.isAuthenticated() ? req.user : null,})
});

/* Start bot */
const discord = require('./BumperBot.js')(Bumper);