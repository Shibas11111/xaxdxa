const Discord = require('discord.js');
const config = require('../config.json')

module.exports = {
    name: "clear",
    run: async (bot, message, args) => {
        message.delete()
        if(!message.member.hasPermission(`KICK_MEMBERS`)) return message.reply('Nie masz permisji').then(m => (m.delete({timeout: 10000})));
        let clearamount = args[0];
        if(isNaN(clearamount)) return message.reply('Podaj ile wiadomości mam usunąć?').then(m => (m.delete({timeout: 10000})));
        if(clearamount >= 100) clearamount = 99;
        if(clearamount <= 0) return;
        message.channel.send(`Czyszczenie Wiadomośći`).then(msg => msg.delete({timeout: 2000}));
        setTimeout(async () => {
            await message.channel.bulkDelete(clearamount);
        }, 1000)
    }
}