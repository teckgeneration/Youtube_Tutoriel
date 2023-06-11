const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config");
const ms = require("ms");

module.exports = {
    name: "giveaway-resume",
    description: "Permet de remettre le giveaway en marche",
    owner: false,
    options: [
        {
            name: "message_id",
            description: "Quel est l'identifiant du message ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})

        const messageID = interaction.options.getString("message_id");

        client.giveawaysManager.unpause(messageID).then(async () => {
            await interaction.reply({content: `✅ Le giveaway à bien remis en marche !!`, ephemeral: true})
        }).catch((err) => {
            return interaction.reply({content: `Une erreur est survenue : `, err});
        })

    }
}