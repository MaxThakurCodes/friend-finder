const convo = require("../models/convo");
const fs = require("fs");
module.exports = {
  name: "hangup",
  aliases: ["end"],
  description: "Hangup the call!",
  async execute(client, message, args) {
    let curConvos = await convo.find({});
    for (i = 0; i <= curConvos.length; i++) {
      if (curConvos[i] !== undefined) {
        if (curConvos[i].u1 === message.author.id) {
          message.channel.send(`Successfully hung up on the other user.`);
          client.users.cache
            .get(curConvos[i].u2)
            .send(`The other person hung up on you.`);
          convo.findOneAndDelete({ u1: message.author.id }, (err) => {
            if (err) {
              console.log(err);
            }
          });
        } else if (curConvos[i].u2 === message.author.id) {
          message.channel.send(`Successfully hung up on the other user.`);
          client.users.cache
            .get(curConvos[i].u1)
            .send(`The other person hung up on you.`);
          convo.findOneAndDelete({ u2: message.author.id }, (err) => {
            if (err) {
              console.log(err);
            }
          });
        }
        let today = new Date();
        let date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        let time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        let dateTime = date + " " + time;
        const user1 = curConvos[i].u1;
        const user2 = curConvos[i].u2;
        const data = `----------------------------------------------------------------------------------------------------------------\nEnd of conversation: ${dateTime}`;
        fs.appendFile(`./logs/DMu1${user1}u2${user2}.txt`, data, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    }
  },
};
