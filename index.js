const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
const config = require("./config.json");
const disbut = require("discord-buttons");
disbut(client);
const axios = require("axios");
var mysql = require('mysql');
const webhook = require("webhook-discord")
const simplydjs = require('./module.js');
const http = require('https');
const fs = require('fs');
const Enmap = require('enmap');
const Version = 1.2

client.on("ready", async () => {
  if(config.statystyki_discord.on) { require("./handler/statystyki_discord/index")(client, config); }
  if(config.ticket.on) { require("./handler/ticket/index")(client, config, disbut); }
  if(config.weryfikacja.on) { require("./handler/weryfikacja/index")(client, config, disbut); }
  if(config.discordid.on) { require("./handler/discordid/index")(client, config, disbut); }
  if(config.statystyki.on) { require("./handler/statystyki/index")(client, config, axios); }
  if(config.zaćmienia.on) { require("./handler/zaćmienia/index")(client, config); }
  require("./handler/client/status")(client, config, axios);
})

//Tutaj Kodować Nie Nad
client.on("ready", () => {
  client.commands = new Enmap();

  fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      console.log(`[RP-BOT] Załadowano komende ${commandName}`);
      client.commands.set(commandName, props);
    });
  });

  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

        let prefix = config.bot.prefix;
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0].toLowerCase();
        let args = messageArray.slice(1);


        if (!message.content.toLowerCase().startsWith(prefix)) return;
        let commandfile = client.commands.get(cmd.slice(prefix.length));
        if (commandfile) commandfile.run(client, message, args);
      })
    })

client.on('clickButton', async (button) => {
  await button.clicker.fetch();
if(config.discordid.on) {
    if(button.id == "getdcid") {
        await button.reply.think(true)
    setTimeout(async function(){ 
        await button.reply.edit('Twoje Discord ID to: `'+button.discordID+'`')
    }, 3000);
    }
} 
if(config.ticket.on) {
  simplydjs.clickBtn(button)
} 

if(config.weryfikacja.on) {
  if(button.id == "verifyuser") {
    let role = button.guild.roles.cache.get(config.weryfikacja.id_rangi);
      await button.reply.think(true)
  setTimeout(async function(){ 
      await button.reply.edit('Pomyślnie zostałeś/aś zweryfikowany.')
      const member = button.clicker.member
      await member.roles.add(role)
  }, 3000);
  }
}
})

client.on('message', message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;

  if(config.antilink.on) { require("./handler/antilink/index")(client, config, message); }
  if(config.propozycje.on) { require("./handler/propozycje/index")(client, config, message); }

if(config.DarkWeb.on) {
  if(message.channel.id == config.DarkWeb.id_kanalu) {
    module.exports.connectss.query(`SELECT * FROM konta WHERE DiscordID = '${message.author.id}' AND Type = 'DarkWeb'`, async function (err, result) {
    if (err) throw err;
      if (result.length > 0) {
        if (err) throw err;
        let record = result[0]
        message.delete()
        const Hookkk = new webhook.Webhook(config.DarkWeb.webhook)
        const msg = new webhook.MessageBuilder()
        .setName(record.Username)
        .setAvatar('https://upload.wikimedia.org/wikipedia/commons/4/43/AnOnYmUs.jpg')
        .setText(message.content);
        Hookkk.send(msg);

        if(config.DarkWeb.logi.on) {
          client.channels.cache.get(config.DarkWeb.logi.id_kanalu).send(`[${message.author.tag}] ${record.Username} Napisał ${message.content}`)
        }

      } else {
        message.delete()
        message.reply('Nie masz konta! Napisz do mnie `DarkWeb [Nazwa Konta]`')
          .then(msg => {
              msg.delete({ timeout: 10000 })
          }).catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);
      }
    })
  }
}
});

client.on('guildMemberAdd', member => {
  if(config.welcome.on) { require("./handler/welcome/join")(client, config, member); }
});

client.on("guildMemberRemove", member => {
  if(config.welcome.on) { require("./handler/welcome/leave")(client, config, member); }
});

client.on('message', message => {
  if(message.author.bot) return;
  if(message.channel.type != 'dm') return;
	const args = message.content.trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'darkweb') {
    if(config.DarkWeb.on) {
module.exports.connectss.query(`SELECT * FROM konta WHERE DiscordID = '${message.author.id}' AND Type = 'DarkWeb'`, async function (err, result) {
  if (err) throw err;
  if (result.length > 0) {
    if (err) throw err;
    let record = result[0]
    message.channel.send('Już jesteś zarejestrowany na forum Darkweb');
  } else {
        if(!args[0]) return message.channel.send('Nie podałeś nazwy konta na forum darkweb')

        var sql = `INSERT INTO konta (Type, DiscordID, Username, ProfilePic) VALUES ('Darkweb', '${message.author.id}', '${args[0]}', 'Null')`;
        module.exports.connectss.query(sql, function (err, result) {
          if (err) throw err;
          message.channel.send('Konto Gotowe! Możesz teraz pisać na <#'+config.DarkWeb.id_kanalu+'>')
        });
      }
  })
}
}
})

client.login(config.bot.token);


module.exports = {
  connectss: mysql.createPool({
    host: config.bot.MySQL.ip,
    user: config.bot.MySQL.login,
    password: config.bot.MySQL.haslo,
    database: config.bot.MySQL.baza,
  }),
};