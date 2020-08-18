const Discord = require("discord.js"),
  convo = require("../models/convo"),
  config = require("../config.json");

module.exports = {
  name: "report",
  aliases: ["r"],
  description: "report a person who is breaking the rules.",
  async execute(client, message, args) {
    if(config.mainGuild === "MainGuildIDHere") return console.log("Yo check config.json");
    if(config.reportChannel === "ReportChannelIDHere") return console.log("Yo check config.json");
    if (!args[0]) {
      return sendexample(
        "(id)",
        "(The file name that was provided)",
        "(reason)"
      );
    }
    if (!args[1]) {
      return sendexample(
        args[0],
        "(The file name that was provided)",
        "(reason)"
      );
    }
    if (!args[2]) {
      return sendexample(args[0], args[1], "(reason)");
    }
    let uid = args[0];
    let fn = args[1];
    let reason = args.slice(2).join(" ");
    report(uid, fn, reason);
    message.reply("Reported sucessfully!");
    function sendexample(id, fn, reason) {
      return message.reply(
        `Trying doing it this way: \`=report ${id} ${fn} ${reason}\``
      );
    }
    async function report(id, fn, reason) {
      let reportChannel = client.guilds.cache
        .get(config.mainGuild)
        .channels.cache.get(config.reportChannel);
      let nid;
      let t;
      if(id.includes("<@!")){
        t = await id.replace("<@!", "")
        
      } else if(id.includes("<@")) {
        t = await id.replace("<@", "")
      }
      nid = await t.replace(">", "")
      let reportedUser = client.users.cache.get(nid);
      if (reportedUser === null) {
        return message.reply("I can't seem to find a user with that id.");
      }
      let rembed = new Discord.MessageEmbed()
        .setTitle("Report")
        .addField("Filename:", fn)
        .setColor("#E74C3C")
        .addField("User Reporting:", "‎")
        .addField("Id:", message.author.id, true)
        .addField("Tag:", `<@${message.author.id}>`, true)
        .addField("User Being Reported:", "‎")
        .addField("Id:", nid, true)
        .addField("Tag:", id, true)
        .addField("Reason:", reason)
        .setFooter(message.author.tag, message.author.avatarURL())
        .setTimestamp();
      reportChannel.send(rembed);
    }
  },
};
