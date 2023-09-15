const fs = require('fs')
const asdd = require('./cache.json')

module.exports = (client, config, disbut) => {
  if(asdd.didsendd) return;
    let button = new disbut.MessageButton()
  .setStyle('green')
  .setLabel('Zweryfikuj się!') 
  .setID('verifyuser');
    client.channels.cache.get(config.weryfikacja.id_kanalu).send(`Naciśnij przycisk aby się zweryfikować`, button)

    const verify = {
      didsendd: true,
  }
  const jsonStringg = JSON.stringify(verify)
  fs.writeFile('./handler/weryfikacja/cache.json', jsonStringg, err => {
    if (err) {
        console.log('Error making cache file', err)
    } else {
        console.log('[RP-BOT] Plik Cache Weryfikacji Jest Gotowy!')
    }
})
}