const Discord = require('discord.js')
const disbut = require("discord-buttons");
const config = require("./config.json");

module.exports = {
    clickBtn: async function (button, options = []) {
        if (button.id === 'create_ticket') {

            button.reply.defer();

            button.guild.channels.create(`ticket_${button.clicker.user.tag}`, {
                type: "text",
            }).then((ch) => {

                ch.setParent(config.ticket.category);
                let emb = new Discord.MessageEmbed()
                    .setTitle('Utworzono Ticket')
                    .setDescription(options.embedDesc || `Ticket został stworzony przez ${button.clicker.user}.`)
                    .setThumbnail(button.message.guild.iconURL())
                    .setTimestamp()
                    .setColor(options.embedColor || '#075FFF')
                    .setFooter(options.embedFoot || button.message.guild.name, button.message.guild.iconURL())


                let close_btn = new disbut.MessageButton()
                    .setStyle(options.closeColor || 'blurple')
                    .setEmoji(options.closeEmoji || '🔒')
                    .setLabel('Zamknij')
                    .setID('close_ticket')

                ch.send(button.clicker.user, { embed: emb, component: close_btn })

	    ch.overwritePermissions([
                {
                    id: button.message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
                },
                {
                    id: button.clicker.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'],
                },
            ]);


                setTimeout(() => {
                    ch.send('Przekroczono limit czasu. Osiągnięto 10 minut. Ten ticket jest teraz usuwany.')

                    setTimeout(() => {
                        ch.delete()
                    }, 5000)

                }, 600000)

            })

        }
        if (button.id === 'close_ticket') {

            button.reply.defer();

            button.channel.overwritePermissions([
                {
                    id: button.message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
                },
                {
                    id: button.clicker.user.id,
                    allow: ['VIEW_CHANNEL'],
                    deny: ['SEND_MESSAGES'],
                },
            ]);

            let X_btn = new disbut.MessageButton()
                .setStyle(options.delColor || 'grey')
                .setEmoji(options.delEmoji || '❌')
                .setLabel('Usuń')
                .setID('delete_ticket')

            let open_btn = new disbut.MessageButton()
                .setStyle(options.openColor || 'green')
                .setEmoji(options.openEmoji || '🔓')
                .setLabel('Otworzyć ponownie')
                .setID('open_ticket')

            let row = new disbut.MessageActionRow()
                .addComponent(open_btn)
                .addComponent(X_btn)

            let emb = new Discord.MessageEmbed()
                .setTitle('Utworzono Ticket')
                .setDescription(options.embedDesc || `Ticket został stworzony przez ${button.clicker.user}.`)
                .setThumbnail(button.message.guild.iconURL())
                .setTimestamp()
                .setColor(options.embedColor || '#075FFF')
                .setFooter(options.embedFoot || button.message.guild.name, button.message.guild.iconURL())

            button.message.edit(button.clicker.user, { embed: emb, component: row })
        }

        if (button.id === 'open_ticket') {


            button.channel.overwritePermissions([
                {
                    id: button.message.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY'] //Deny permissions
                },
                {
                    id: button.clicker.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
            ]);


            let emb = new Discord.MessageEmbed()
                .setTitle('Utworzono Ticket')
                .setDescription(options.embedDesc || `Ticket został stworzony przez ${button.clicker.user}.`)
                .setThumbnail(button.message.guild.iconURL())
                .setTimestamp()
                .setColor(options.embedColor || '#075FFF')
                .setFooter(options.embedFoot || button.message.guild.name, button.message.guild.iconURL())


            let close_btn = new disbut.MessageButton()
                .setStyle(options.closeColor || 'blurple')
                .setEmoji(options.closeEmoji || '🔒')
                .setLabel('Zamknij')
                .setID('close_ticket')

            button.message.edit(button.clicker.user, { embed: emb, component: close_btn })
            button.reply.send('Ponownie otworzony ticket ;)').then((m) => {
                setTimeout(() => {
                    m.delete()
                }, 3000)

            })
        }

        if (button.id === 'delete_ticket') {

            let surebtn = new disbut.MessageButton()
                .setStyle('red')
                .setLabel('Usuń')
                .setID('s_ticket')

            let nobtn = new disbut.MessageButton()
                .setStyle('green')
                .setLabel('Anuluj')
                .setID('no_ticket')

            let row1 = new disbut.MessageActionRow()
                .addComponent(surebtn)
                .addComponent(nobtn)

            let emb = new Discord.MessageEmbed()
                .setTitle('Jesteś pewny?')
                .setDescription(`Spowoduje to usunięcie kanału i ticketa. Nie możesz cofnąć tej akcji`)
                .setThumbnail(button.message.guild.iconURL())
                .setTimestamp()
                .setColor('#c90000')
                .setFooter(button.message.guild.name, button.message.guild.iconURL())

            button.reply.send({ embed: emb, component: row1 })


        }

        if (button.id === 's_ticket') {

            button.reply.send('Usuwam ticket i kanał. Proszę czekać.')
            setTimeout(() => {
                let delch = button.message.guild.channels.cache.get(button.message.channel.id)
                delch.delete().catch((err) => {
                    button.message.channel.send('An Error Occured. ' + err)
                })
            }, 2000)
        }

        if (button.id === 'no_ticket') {
            button.message.delete();
            button.reply.send('Kasowanie ticketa zostało anulowane')
        }
    },


}