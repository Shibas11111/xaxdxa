const { Webhook, MessageBuilder } = require('discord-webhook-node');

module.exports = async (client, config, message) => {
    if(config.propozycje.on) {
        if (message.channel.id == config.propozycje.kanal_id) {
            if(message.content.startsWith("%")) {

            } else {

                if(config.propozycje.embed) {
                    const hook = new Webhook(config.propozycje.webhook);
                    const prop = new MessageBuilder()
                        if(config.propozycje.embedbuilder.setColor.length > 0) {
                            prop.setColor(config.propozycje.embedbuilder.setColor)
                        }
                        if(config.propozycje.embedbuilder.setAuthor.length > 0) {
                            if(config.propozycje.embedbuilder.ProfilePic) {
                            prop.setAuthor(config.propozycje.embedbuilder.setAuthor, message.author.avatarURL())
                            } else {
                            prop.setAuthor(config.propozycje.embedbuilder.setAuthor)
                            }
                        }
                        if(config.propozycje.embedbuilder.setDescription.length > 0) {
                            var que = config.propozycje.embedbuilder.setDescription
                            var guildd = que.replace("{PROPOZYCJA}", message.content) 
                            prop.setDescription(guildd)
                        }
                        if(config.propozycje.embedbuilder.setFooter.length > 0) {
                            prop.setFooter(config.propozycje.embedbuilder.setFooter)
                        }
                        if(config.propozycje.embedbuilder.setTimestamp) {
                            prop.setTimestamp()
                        }
            
                        const IMAGE_URL = message.author.avatarURL();
                        hook.setUsername(message.author.username);
                        hook.setAvatar(IMAGE_URL);
            
                    hook.send(prop)
                    message.delete()

                    } else {

            await message.react(config.propozycje.react1)
            await message.react(config.propozycje.react2)
                    }
            }
        }
    }
    }