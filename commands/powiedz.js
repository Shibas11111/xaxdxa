const Discord = require('discord.js');
const config = require('../config.json')

module.exports = {
    name: "powiedz",
    run: async (bot, message, args) => {
        message.delete()
        if(!message.member.hasPermission(`ADMINISTRATOR`)) return message.reply('Nie masz permisji').then(m => (m.delete({timeout: 10000})));
        message.channel.send(message.content)
    }
}