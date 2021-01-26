const Discord = require("discord.js");
const packageJson = require("../package.json");
module.exports = {
  name: "info",
  aliases: ["i"],
  description: "info",
  execute(client, message, args) {
    let totalSeconds = client.uptime / 1000;
    let days = ("0" + Math.floor(totalSeconds / 86400)).slice(-2);
    let hours = ("0" + Math.floor(totalSeconds / 3600)).slice(-2);
    totalSeconds %= 3600;
    let minutes = ("0" + Math.floor(totalSeconds / 60)).slice(-2);
    let seconds = ("0" + Math.floor(totalSeconds % 60)).slice(-2);

    let botuptime = `${days}:${hours}:${minutes}:${seconds}`;
    let botchannel = client.channels.cache.size.toLocaleString();
    let botguild = client.guilds.cache.size.toLocaleString();
    let botver = packageJson.version;
    let botcreated = client.user.createdAt
      .toISOString()
      .replace(/T/, " ")
      .replace(/\..+/, "");

    let embed = new Discord.MessageEmbed()
      .setAuthor("Friend Finder", client.user.AvatarURL)
      .setColor("#7289DA")
      //  .addField("BFB Status: ", `${botstats}`)
      //  .addField(":cyclone: Users interact: ", botuser, true)
      .addField("Servers Joined: ", botguild, true)
      .addField("Channels Joined: ", botchannel, true)
      .addField("Uptime: ", `${botuptime}`, true)
      .addField("Ping: ", Math.round(client.ws.ping) + "ms", true)
      // .addField("API: ", botapi, true)
      .addField("Version: ", botver, true)
      .addField("Created at: ", botcreated, true)
      .addField("Friend Finder Bot Creator: ", "<@302457454846017546>", true)
      .setFooter(
        "Requested by " + message.author.tag,
        message.author.avatarURL({
          format: "png",
          dynamic: true,
          size: 2048,
        })
      )
      //.addField("Shards: ", botshard, true)
      .setTimestamp();
    message.channel.send(embed);
  },
};
