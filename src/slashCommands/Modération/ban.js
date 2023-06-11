const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "ban",
    description: "Permet de bannir un utilisateur",
    owner: false,
    options: [
        {
            name: "user",
            description: "Quel est l'utilisateur ?",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "reason",
            description: "Quel est la raison ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("BanMembers"))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const user = interaction.options.getMember('user');
            const reason = interaction.options.getString("reason");

            if(!user) return interaction.reply({content: `L'utilisateur n'est pas dans le serveur !`});
            if(user === interaction.member) return interaction.reply({content: `Vous ne pouvez pas vous bannir !`});
            if(!user.bannable) return interaction.reply({content: `Impossible de bannir cet utilisateur !`});

            interaction.guild.bans.create(user.id, {reason: reason.length !== 0 ? reason : `Aucune Raison`}).then(async () => {
                await interaction.reply({content: `J'ai bien bannit l'utilisateur ${user.user.username} pour la raison : ${reason}`})
            }).catch((err) => {
                console.log(err)
            });
            

        } catch (error) {
            console.log('Une erreur est survenue sur la commande ban', error)
        }
    }
}