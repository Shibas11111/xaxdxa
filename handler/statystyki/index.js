module.exports = (client, config, axios) => {
    setInterval(function () {
    const guild = client.guilds.cache.get(config.bot.id_serwera);
      axios.get(`http://${config.bot.ip}/players.json`).then(data => {
        var users = data.data
        var que = config.statystyki.wiadomość
        var guildd = que.replace("{ONLINE}", users.length)
        guild.channels.cache.get(config.statystyki.id_kanału).setName(guildd.replace("{SLOTY}", config.bot.maxsloty)).then(console.log(`[${client.user.username}] Zaktualizowano statystyki`)).catch(console.error);
    }).catch(err => {
        var que = config.statystyki.wiadomość
        var guildd = que.replace("{ONLINE}", "OFFLINE")
        var guilddd = guildd.replace("/", "")
        guild.channels.cache.get(config.statystyki.id_kanału).setName(guilddd.replace("{SLOTY}", "")).then(console.log(`[${client.user.username}] Serwer Jest Offline`)).catch(console.error)
    });
    }, config.statystyki.aktualizacja)
}