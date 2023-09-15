const fs = require('fs')
const asd = require('./cache.json')
const Discord = require('discord.js');

module.exports = (client, config, disbut) => {
  if(asd.didsend) return;
    let button = new disbut.MessageButton()
  .setStyle('blurple')
  .setLabel('Otwórz Ticket') 
  .setEmoji('🛠', false)
  .setID('create_ticket');
const exampleEmbed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setTitle('Otwórz Ticket')
	.setDescription('Kliknij przycisk, aby otworzyć ticket')
    client.channels.cache.get(config.ticket.id_kanalu).send(exampleEmbed, button)

    const customer = {
      didsend: true,
  }
  const jsonString = JSON.stringify(customer)
  fs.writeFile('./handler/ticket/cache.json', jsonString, err => {
    if (err) {
        console.log('Error making cache file', err)
    } else {
        console.log('[RP-BOT] Plik Ticket Cache Gotowy!')
    }
})
}