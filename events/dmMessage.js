const convo = require("../models/convo");
const { prefix } = require("../config.json");
module.exports = {
  async newMessage(client, message) {
    let curConvos = convo.find({});
    if (!message.content.startsWith(prefix)) {
      (await curConvos).forEach((i) => {
        if (i.u1 === message.author.id) {
          let sUser = client.users.cache.get(i.u2);
          sUser.send(`${message.author.username}: ${message.content}`);
        } else if (i.u2 === message.author.id) {
          let sUser = client.users.cache.get(i.u1);
          sUser.send(`${message.author.username}: ${message.content}`);
        }
      });
    }
  },
};
