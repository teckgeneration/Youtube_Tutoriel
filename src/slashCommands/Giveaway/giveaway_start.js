const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config");
const ms = require("ms");

module.exports = {
    name: "giveaway-start",
    description: "Permet de créer un giveaway",
    owner: false,
    options: [
        {
            name: "channel",
            description: "Quel est le salon ?",
            required: true,
            type: ApplicationCommandOptionType.Channel,
        },
        {
            name: "duration",
            description: "Quel est la durée ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "gagnant",
            description: "Quel est le nombre de gagnant ?",
            required: true,
            type: ApplicationCommandOptionType.Integer,
        },
        {
            name: "prix",
            description: "Quel est le prix du Giveaway ?",
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

        const channel = interaction.options.getChannel("channel");
        const duration = interaction.options.getString("duration");
        const winner = interaction.options.getInteger("gagnant");
        const prize = interaction.options.getString("prix");

        client.giveawaysManager.start(channel, {
            duration: ms(duration),
            prize: prize,
            winnerCount: winner,
            hostedBy: interaction.user.username,
        })

        await interaction.reply({content: `Le Giveaway à commencer dans le salon ${channel}`, ephemeral: true})
    }
}