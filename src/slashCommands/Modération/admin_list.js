const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType, ChannelType } = require("discord.js");

module.exports = {
    name: "admin-list",
    description: "Permet de voir les administrateurs du serveur (ne comprend pas les bots)",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const list = interaction.guild.members.cache.filter(m => !m.user.bot).filter(member => member.permissions.has([PermissionsBitField.Flags.Administrator]));

            const embed = new EmbedBuilder()
            .setTitle("Listing des administrateurs")
            .setDescription(`${list.map(m => `<@${m.user.id}>`).join("\n")}`)
            .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})

            return interaction.reply({embeds: [embed]})
          
        } catch (error) {
            console.log('Une erreur est survenue sur la commande admin-list', error)
        }
    }
}