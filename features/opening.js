/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { BotkitConversation } = require('botkit');

module.exports = function (controller) {
  // Displays a message when a user connects
  controller.on('welcome_back', async (bot, message) => {
    await bot.reply(message, {
      text:
        "Hi, I'm Phil Gresham's digital rep and hypeman. I'm a software developer who is <strong>currently open to new opportunities</strong>! How would you like to know me better?",
      quick_replies: [
        {
          title: 'Projects',
          payload: 'Projects',
        },
        {
          title: 'Work',
          payload: 'Work',
        },
        {
          title: 'Website',
          payload: 'Website',
        },
        {
          title: 'Education',
          payload: 'Education',
        },
        {
          title: 'Tech Stack',
          payload: 'Tech Stack',
        },
        {
          title: 'Contact Info',
          payload: 'Contact',
        },
      ],
    });
  });
};
