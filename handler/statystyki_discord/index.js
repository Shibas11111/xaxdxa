module.exports = (client, config) => {
    setInterval(function () {
        const guild = client.guilds.cache.get(config.bot.id_serwera);
        var que = config.statystyki_discord.wiadomość
        var guilddd = que.replace("{MEMBERS}", guild.members.cache.filter(member => !member.user.bot).size)
        guild.channels.cache.get(config.statystyki_discord.id_kanału).setName(guilddd).then(console.log(`[${client.user.username}] Statystyki Discord Zaktualizowane`)).catch(console.error)
    }, config.statystyki_discord.aktualizacja)
}