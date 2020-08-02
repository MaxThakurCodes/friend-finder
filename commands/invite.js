const Discord = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["i"],
  description: "invite",
  async execute(client, message, args) {
    let embed = new Discord.MessageEmbed()
      .setColor("#7289DA")
      .setTitle("Important Links")
      .setThumbnail(
        "https://media.discordapp.net/attachments/692939815750205440/739307988497596456/image0.png"
      )
      .addField(
        "invite me",
        "Invite me to your discord community [here](https://discord.com/oauth2/authorize?client_id=739091408790487063&permissions=8&redirect_uri=https%3A%2F%2Fdiscord.gg%2FhBfmxVt&response_type=code&scope=bot%20guilds.join)."
      )
      .addField(
        "join my support server",
        "You can join my support server [here](https://discord.gg/hBfmxVt)."
      );
    message.channel.send(embed);
  },
};
