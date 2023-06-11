const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")
const { ChannelType } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "serveur-info",
    description: "Permet de voir les informations du serveur",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("SendMessages"))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.resolve("SendMessages"))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Invite Moi')
                .setStyle(ButtonStyle.Link)
                .setURL("https://discord.com/api/oauth2/authorize?client_id=1012643771575435324&permissions=8&scope=bot%20applications.commands"),

                new ButtonBuilder()
                .setLabel("Support Serveur")
                .setStyle(ButtonStyle.Link)
                .setURL("https://google.com")
            )

            const embed = new EmbedBuilder()
            .setTitle("Serveur Information")
            .setDescription(`
            **__Serveur Information:__**
            
            > Name : ${interaction.guild.name}
            > ID : ${interaction.guild.id}
            > Description : ${interaction.guild.description}
            > Créateur : <@${interaction.guild.ownerId}>
            > Boost : ${interaction.guild.premiumSubscriptionCount}
            > Créer le : ${interaction.guild.createdAt}
            > Vérification : ${interaction.guild.verificationLevel}
            
            **__Membre Information__**

            > Bot(s) : ${interaction.guild.members.cache.filter(b => b.user.bot).size}
            > Utilisateur(s) : ${interaction.guild.memberCount}
            
            **__Statistique Information__**

            > Catégorie : ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size}
            > Vocal : ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}
            > Textuel : ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}
            > Forum : ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size}
            > Rôles : ${interaction.guild.roles.cache.size}
            > Emojis : ${interaction.guild.emojis.cache.size}
            `)
            .setFooter({text: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})
            .setTimestamp()

            return interaction.reply({embeds: [embed], components: [row]})
          
        } catch (error) {
            console.log('Une erreur est survenue sur la commande serveur-info', error)
        }
    }
}