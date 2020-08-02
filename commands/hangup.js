const convo = require("../models/convo");
module.exports = {
  name: "hangup",
  aliases: ["end"],
  description: "Hangup the call!",
  async execute(client, message, args) {
    let curConvos = await convo.find({});
    for (i = 0; i <= curConvos.length; i++) {
      if (curConvos[i] !== undefined) {
        if (curConvos[i].u1 === message.author.id) {
          message.channel.send(
            `Successfully hung up with <@${curConvos[i].u2}> `
          );
          client.users.cache
            .get(curConvos[i].u2)
            .send(`The other person hung up on you.`);
          convo.findOneAndDelete({ u1: message.author.id }, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } else if (curConvos[i].u2 === message.author.id) {
          message.channel.send(
            `Successfully hung up with <@${curConvos[i].u1}> `
          );
          client.users.cache
            .get(curConvos[i].u1)
            .send(`The other person hung up on you.`);
          convo.findOneAndDelete({ u2: message.author.id }, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
      }
    }
  },
};
