module.exports = {
  name: "beep",
  aliases: ["b"],
  description: "Beep!",
  execute(client, message, args) {
    message.channel.send("Boop.");
  },
};
