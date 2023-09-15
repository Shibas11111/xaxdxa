const Discord = require('discord.js');
const config = require('../config.json')
const prompter = require('discordjs-prompter');

module.exports = {
    name: "embed",
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(`KICK_MEMBERS`)) return message.reply('Nie masz permisji').then(m => (m.delete({timeout: 10000})));
        var que = message.content
        var guildd = que.replace(config.bot.prefix+"embed", "") 
        if(!guildd) return message.channel.send(`Nie podałeś co ma pisać w embedzie?`);
        prompter.message(message.channel, {
          question: 'Jaki tytuł chcesz?',
          userId: message.author.id,
          max: 1,
          timeout: 10000,
        })
        .then(responses => {
          if (!responses.size) {
            return message.channel.send(`[ERROR] Nic nie napisałeś dla tytułu.`);
          }
          const response = responses.first();
          const exampleEmbed = new Discord.MessageEmbed()
            .setThumbnail(config.embed.imagre)
            .setColor('#4d79ff')
	          .setTitle(response)
	          .setDescription(guildd)
          message.channel.send(exampleEmbed);
        });

    }
}