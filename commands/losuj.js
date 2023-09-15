const config = require("../config.json")
module.exports = {
    name: "losuj",
    run: async (bot, message, args) => {
        if(message.channel.id == config.losuj.id_kanalu_dla_komend) {
        const channel = message.guild.channels.cache.get(config.losuj.id_poczekalni);
        if(channel.members.random() != null) {
            message.reply('Z losowania wylosowałeś: <@' + channel.members.random() + '>. Miłego sprawdzania!'); 
        } else {
            message.reply('Nikt nie czeka :/'); 
        }
        }
    }
}