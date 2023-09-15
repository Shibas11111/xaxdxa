const antiLink = require("anti-link-discord")
const Discord = require('discord.js');

module.exports = (client, config, message) => {
        var que = config.antilink.wiadomość
        var guildd = que.replace("{USER}", message.author.id) 
        antiLink(client, message, {
            warnMSG: guildd,
        });

        if(config.antilink.logi) {
            if(antiLink.foundLink) {
            const exampleEmbed = new Discord.MessageEmbed()
            .setTitle('Logi Antilink')
            .setDescription(`<@${message.author.id}> napisał \`${message.content}\``)
            client.channels.cache.get(config.antilink.logi_id).send(exampleEmbed)
            }
        }
}