const fs = require('fs')
const asd = require('./cache.json')

module.exports = (client, config, disbut) => {
  if(asd.didsend) return;
    let button = new disbut.MessageButton()
  .setStyle('red')
  .setLabel('Sprawdź swoje discord ID') 
  .setID('getdcid');
    client.channels.cache.get(config.discordid.id_kanalu).send(`Naciśnij przycisk aby otrzymać swoje ID discorda`, button)

    const customer = {
      didsend: true,
  }
  const jsonString = JSON.stringify(customer)
  fs.writeFile('./handler/discordid/cache.json', jsonString, err => {
    if (err) {
        console.log('Error making cache file', err)
    } else {
        console.log('[RP-BOT] DiscordID Plik Cache Gotowy!')
    }
})
}