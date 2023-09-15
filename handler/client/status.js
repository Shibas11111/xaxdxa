module.exports = (client, config, axios) => {
        if(config.status.gracze) {
setInterval(function () {
      axios.get(`http://${config.bot.ip}/players.json`).then(data => {
        var users = data.data
        var que = config.status.status
        var guildd = que.replace("{ONLINE}", users.length)
        client.user.setActivity(guildd.replace("{SLOTY}", config.bot.maxsloty), {
            type: config.bot.typstatusu
          });
}).catch(err => {
    var que = config.status.status
    var guilddd = que.replace("/", "")
    var guildd = guilddd.replace("{ONLINE}", "OFFLINE")
    client.user.setActivity(guildd.replace("{SLOTY}", ""), {
        type: config.status.typstatusu
      });
});
}, config.status.aktualizacja)
        } else {
            client.user.setActivity(config.status.statusu, {
                type: config.status.typstatusu
              });
        }
}