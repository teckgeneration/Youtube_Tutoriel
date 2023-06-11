const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "kick",
    description: "Permet d'expulser un utilisateur",
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
        if(!interaction.member.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const user = interaction.options.getMember('user');
            const reason = interaction.options.getString("reason");

            if(!user) return interaction.reply({content: `L'utilisateur n'est pas dans le serveur !`});
            if(user === interaction.member) return interaction.reply({content: `Vous ne pouvez pas vous expulser !`});
            if(!user.kickable) return interaction.reply({content: `Impossible d'expulser cet utilisateur !`});

            await user.kick(reason.length).then(async () => {
                await interaction.reply({content: `J'ai bien expulser ${user.user.username} avec comme raison : ${reason}`})
            }).catch((err) => {
                return console.log(`Impossible d'expulser cet utilisteur !`, err);
            });
            

        } catch (error) {
            console.log('Une erreur est survenue sur la commande kick', error);
        }
    }
}