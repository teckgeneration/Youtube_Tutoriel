const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "set-status",
    description: "Permet de configurer le status du bot",
    options: [
        {
            name: "status",
            description: "Quel est le status (online, dnd, idle, invisible) ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "bio",
            description: "Quel est la bio ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "avatar",
            description: "Quel est l'avatar ?",
            required: true,
            type: ApplicationCommandOptionType.String,
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

            const statues = interaction.options.getString("status");
            const biographie = interaction.options.getString("bio");
            const avatar = interaction.options.getString("avatar");

            client.user?.setStatus(`${statues}`);

            client.user?.setPresence({
                activities: [{
                    name: biographie
                }],
            });

            client.user?.setAvatar(`${avatar}`);

            await interaction.reply({content: `J'ai bien changer le status en ${statues} & la biographie en ${biographie}`});

        } catch (error) {
            return console.log('Une erreur est survenue sur la commande set-status', error)
        }
    }
}