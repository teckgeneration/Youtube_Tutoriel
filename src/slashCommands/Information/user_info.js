const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "user-info",
    description: "Permet de voir les informations d'un utilisateurs",
    owner: false,
    options: [
        {
            name: "user",
            description: "Quel est l'utilisateur ?",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("BanMembers"))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const membre = interaction.options.getMember('user');

            let checkbot = " "; if(membre.user.bot) checkbot = "✅"; else checkbot = "❌";

            const embed = new EmbedBuilder()
            .setTitle(`Userinfo De ${membre.user.tag}`)
            .setThumbnail(membre.user.displayAvatarURL({dynamic: true}))
            .setColor("Green")
            .setDescription(`
            __**User Informations**__
            
            > **Name :** ${membre.user.tag} | ${membre.user.toString()}
            > **Tag :** ${membre.user.tag}
            > **ID :** ${membre.user.id}
            > **Bot :** ${checkbot}

            __**Information Compte**__

            > **A rejoint le :** <t:${parseInt(membre.user.createdTimestamp / 1000)}:R>
            > **Créer le :** <t:${parseInt(membre.joinedAt / 1000)}:R>`)
        
           return interaction.reply({embeds: [embed]})
        } catch (error) {
            console.log('Une erreur est survenue sur la commande user-info', error)
        }
    }
}