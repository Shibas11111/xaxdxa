const config = require("../config.json")
module.exports = {
    name: "wl",
    run: async (bot, message, args) => {

        const user = message.mentions.users.first();
        if(message.channel.id == config.wl.id_kanalu_dla_komend) {
        let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0])
        if(!rMember) return message.channel.send('Zpingój osobe aby nadać role')
        let role = message.guild.roles.cache.find(r => r.id == config.wl.ranga)

        if(rMember.roles.cache.has(role.id)){
            message.channel.send('Ta osoba ma już range wl!')
        } else {
            await rMember.roles.add(role.id).catch(e => message.channel.send("If under this message you see that role got added and you see this message that mean there is error: "+e.message))
            message.channel.send(`${rMember} dostał role wl!`)
        }
    }
    }
}