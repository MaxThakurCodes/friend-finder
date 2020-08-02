const convo = require("../models/convo");
const { prefix } = require("../config.json");
const fs = require("fs");
module.exports = {
  async newMessage(client, message) {
    let curConvos = convo.find({});
    if (!message.content.startsWith(prefix)) {
      (await curConvos).forEach(async (i) => {
        let user2 = client.users.cache.get(i.u2);
        let user1 = client.users.cache.get(i.u1);
        const filename = `DMu1${user1.id}u2${user2.id}.txt`;
        if (i.u1 === message.author.id) {
          let sUser = client.users.cache.get(i.u2);
          fs.appendFile(
            `./logs/${filename}`,
            `${message.author.tag}: ${message.content}\n`,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
          sUser.send(`${message.author.username}: ${message.content}`);
        } else if (i.u2 === message.author.id) {
          let sUser = client.users.cache.get(i.u1);
          fs.appendFile(
            `./logs/${filename}`,
            `${message.author.tag}: ${message.content}\n`,
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
          sUser.send(`${message.author.username}: ${message.content}`);
        }
      });
    }
  },
};
