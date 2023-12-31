const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")
const ms = require('ms');

module.exports = {
    name: "mute",
    description: "Permet de rendre muet un utilisateur",
    owner: false,
    options: [
        {
            name: "user",
            description: "Quel est l'utilisateur ?",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: "time",
            description: "Quel est le temps ?",
            required: true,
            type: ApplicationCommandOptionType.String,
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
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve('MuteMembers'))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.resolve("MuteMembers"))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const user = interaction.options.getMember('user');
            const timed = interaction.options.getString("time");
            const reason = interaction.options.getString("reason");

            if(!user) return interaction.reply({content: `Veuillez mettre un utilisateur valide`, ephemeral: true});

            if(user === interaction.member) return interaction.reply({content: `Vous ne pouvez pas vous mute`, ephemeral: true});

            if(reason.length > 1000) return interaction.reply({content: `La raison fournir est trop longue`, ephemeral: true});

            if(user.user.bot) return interaction.reply({content: `Vous ne pouvez pas mute un bot`, ephemeral: true});

            const convertTimed = ms(timed);

            await user.timeout(convertTimed);
            return interaction.reply({content: `Je viens de mute l'utilisateur **${user}** pendant **${timed}** avec la raison : **${reason}**`});

        } catch (error) {
            console.log('Une erreur est survenue sur la commande mute', error)
        }
    }
}