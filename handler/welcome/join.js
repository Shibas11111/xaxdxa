const Discord = require('discord.js');

module.exports = (client, config, member) => {
    if(config.welcome.on) {
    const welcome = new Discord.MessageEmbed()
    .setColor(config.welcome.embed.colour)
    if(config.welcome.img == 1) {
        welcome.setAuthor(member.user.tag, "https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".png?size=128")
    } else if(config.welcome.img == 2) {
        welcome.setThumbnail("https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".png?size=128")
    } else if(config.welcome.img == 3) {
        welcome.setThumbnail("https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".png?size=128")
        welcome.setAuthor(member.user.tag, "https://cdn.discordapp.com/avatars/"+member.user.id+"/"+member.user.avatar+".png?size=128")
    } else if(config.welcome.img == 4) {

    }
    var que = config.welcome.embed.desc
    var guildd = que.replace("{U}", member.guild.members.cache.size)
	welcome.setDescription(guildd)
	welcome.setTimestamp()
	welcome.setFooter(config.welcome.embed.footer);
    member.guild.channels.cache.get(config.welcome.kanal_id).send(welcome)
    }
}