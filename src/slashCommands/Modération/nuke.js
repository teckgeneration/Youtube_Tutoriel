const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")
const { default: axios } = require("axios");

module.exports = {
    name: "nuke",
    description: "Permet de recréer un salon",
    options: [
        {
            name: "channel",
            description: "Quel est le salon ?",
            required: true,
            type: ApplicationCommandOptionType.Channel,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("ManageChannels"))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.resolve("ManageChannels"))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const channel = interaction.options.getChannel('channel');

            //const channel = interaction.channel;

            channel.clone({ position: channel.rawPosition }).then(async ch => {
                ch.send({content: `Le salon a bien été recréer par ${interaction.user.username}`})
                await interaction.reply({content: `J'ai bien recréer le salon ${ch}`})
            })
            await channel.delete()

        } catch (error) {
            console.log('Une erreur est survenue sur la commande nuke', error)
        }
    }
}