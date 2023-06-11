const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "unmute",
    description: "Permet d'unmute un utilisateur",
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
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve('MuteMembers'))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.resolve("MuteMembers"))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {
            const user = interaction.options.getMember('user');

            if(!user) return interaction.reply({content: `Veuillez entrer un utilisateur valide`, ephemeral: true});
            if(user === interaction.member) return interaction.reply({content: `Vous ne pouvez pas vous unmute`, ephemeral: true});
            if(user.user.bot) return interaction.reply({content: `Vous ne pouvez pas unmute un bot`, ephemeral: true});
            if(!user.isCommunicationDisabled()) return interaction.reply({content: `L'utilisateur ${user} n'es pas mute !`, ephemeral: true});

            await user.timeout(null);

            return interaction.reply({content: `Je viens d'unmute l'utilisateur ${user}`});

        } catch (error) {
            console.log('Une erreur est survenue sur la commande unmute', error)
        }
    }
}