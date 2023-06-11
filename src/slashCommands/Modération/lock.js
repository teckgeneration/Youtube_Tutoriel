const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType, ChannelType } = require("discord.js");
const config = require("../../config")
const Discord = require("discord.js");

module.exports = {
    name: "lock",
    description: "Permet de vérouiller un salon",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("ManageChannels"))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.resolve("ManageChannels"))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {
            interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                "SendMessages": false,
                "AddReactions": false,
                "SendTTSMessages": false,
                "AttachFiles": false,
                "CreatePublicThreads": false,
                "CreatePrivateThreads": false,
                "SendMessagesInThreads": false,
            });

            return interaction.reply({content: `Je viens de vérouiller le salon `, ephemeral: true})
          
        } catch (error) {
            console.log('Une erreur est survenue sur la commande lock', error)
        }
    }
}