const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "role-member-list",
    description: "Permet de voir la liste des membres possédant le rôle",
    owner: false,
    options: [
        {
            name: "role",
            description: "Quel est le rôle ?",
            required: true,
            type: ApplicationCommandOptionType.Role,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const roled = interaction.options.getRole("role");

            const embed = new EmbedBuilder()
            .setTitle("Listing des membres possédant le rôle")
            .setDescription(`${roled.members.map(m => `<@${m.user.id}>`).join("\n") || "Aucun Utilisateur"}`)
            .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})
            
            return interaction.reply({embeds: [embed]})

        } catch (error) {
            console.log('Une erreur est survenue sur la commande role-member-list', error)
        }
    }
}