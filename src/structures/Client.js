const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");

class TutorielYoutube extends Client {
  constructor() {
    super({
      shards: "auto",
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildScheduledEvents,
      ],
      partials: [
        Partials.Channel, 
        Partials.Message, 
        Partials.User, 
        Partials.GuildMember, 
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
      ]
    });
    
    this.commands = new Collection();
    this.slashCommands = new Collection();
    this.config = require("../config.js");
    this.owner = this.config.ownerID;
    this.prefix = this.config.prefix;
    this.aliases = new Collection();
    this.commands = new Collection();
    if (!this.token) this.token = this.config.token;

    ['slashCommand', 'events'].forEach((handler) => {
      require(`../handlers/${handler}`)(this);
    });
  }
  connect() {
    return super.login(this.token);
  };
};

module.exports = TutorielYoutube;