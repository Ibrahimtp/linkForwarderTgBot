const { Telegraf } = require('telegraf');

const botToken = '6428621656:AAF5z5zScTDtoXkxmS3IqG5lp65Sf4Yl9IY'; // Replace with your bot token
const sourceGroupId = -1001915055388; // Replace with the source group ID
const targetGroupId = -954886471; // Replace with the target private group ID

const bot = new Telegraf(botToken);

bot.start((ctx) => {
  ctx.reply('Welcome! Use /getlink to request an invite link to the private group.');
});

bot.command('getlink', async (ctx) => {
  try {
    const sourceChatMember = await ctx.telegram.getChatMember(sourceGroupId, ctx.from.id);

    if (sourceChatMember.status === 'member' || sourceChatMember.status === 'administrator' || sourceChatMember.status === 'creator') {
      // const inviteLink = await ctx.telegram.exportChatInviteLink(targetGroupId);
      ctx.reply(`Here is the invite link to the private group: https://t.me/+t6rUHkeYl9k3YTdk`);
    } else {
      ctx.reply('Sorry, you need to be a member of the source group to get the invite link.');
    }
  } catch (error) {
    console.error('Error:', error);
    ctx.reply('An error occurred while processing your request. Please try again later.');
  }
});

bot.launch()
  .then(() => {
    console.log('Bot is running');
  })
  .catch((error) => {
    console.error('Error:', error.response ? error.response.description : error.message);
  // ctx.reply('An error occurred while processing your request. Please try again later.');
    // console.error('Error starting bot:', error);
  });


// const { Telegraf } = require('telegraf');

// const botToken = '6428621656:AAF5z5zScTDtoXkxmS3IqG5lp65Sf4Yl9IY'; // Replace with your bot token

// const bot = new Telegraf(botToken);

// bot.start((ctx) => {
//   ctx.reply('Welcome! Use /getgroupids to retrieve the IDs of the groups.');
// });

// bot.command('getgroupids', async (ctx) => {
//   try {
//     const sourceChat = await ctx.telegram.getChat(ctx.message.chat.id);
//     const targetChat = await ctx.telegram.getChat(ctx.message.chat.id);
    
//     const sourceGroupId = sourceChat.id;
//     const targetGroupId = targetChat.id;

//     ctx.reply(`Source Group ID: ${sourceGroupId}\nTarget Group ID: ${targetGroupId}`);
//   } catch (error) {
//     console.error('Error:', error);
//     ctx.reply('An error occurred while processing your request. Please try again later.');
//   }
// });

// bot.launch()
//   .then(() => {
//     console.log('Bot is running');
//   })
//   .catch((error) => {
//     console.error('Error starting bot:', error);
//   });



// } catch (error) {
  
// }
// const fs = require('fs');
// const { Telegraf } = require('telegraf');
// const axios = require('axios');
// const OpenAI_API_KEY = 'YOUR_OPENAI_API_KEY';

// const bot = new Telegraf('6428621656:AAF5z5zScTDtoXkxmS3IqG5lp65Sf4Yl9IY');

// // Function to save the list of groups to a local file
// const saveGroupsToFile = (groups) => {
//   fs.writeFileSync('bot_groups.json', JSON.stringify(groups, null, 2));
// };

// // Function to read the list of groups from the local file
// const readGroupsFromFile = () => {
//   try {
//     const data = fs.readFileSync('bot_groups.json');
//     return JSON.parse(data);
//   } catch (error) {
//     return [];
//   }
// };

// // Store user chat state for conversation memory
// const userChatState = new Map();

// // Command to start the bot
// bot.command('start', (ctx) => {
//   const chatId = ctx.chat.id;
//   if (ctx.chat.type === 'private') {
//     const options = {
//       reply_markup: {
//         keyboard: [['Chat with Bot']],
//         resize_keyboard: true,
//         one_time_keyboard: true,
//       },
//     };
//     options.reply_markup.keyboard.push(['Send Instructions to Group']);
//     ctx.reply('Hello! What would you like to do?', options);
//   } else {
//     ctx.reply("I'm sorry, you can only interact with the bot in private chats.");
//   }
// });

// // Command to chat with the bot as a chatbot
// bot.hears('Chat with Bot', (ctx) => {
//   const chatId = ctx.chat.id;
//   if (ctx.chat.type === 'private') {
//     userChatState.set(chatId, { mode: 'chat', conversation: [] });
//     ctx.reply('You are now chatting with the bot as a chatbot.');
//   } else {
//     ctx.reply("I'm sorry, you can only interact with the bot in private chats.");
//   }
// });

// // Command to send instructions to a Telegram group
// bot.hears('Send Instructions to Group', async (ctx) => {
//   const chatId = ctx.chat.id;
//   if (ctx.chat.type === 'private') {
//     try {
//       const myCommands = await ctx.telegram.getMyCommands();
//       const groups = myCommands.filter((command) => command.type === 'group');

//       if (groups.length === 0) {
//         ctx.reply('Bot is not a member of any group at the moment.');
//       } else {
//         userChatState.set(chatId, { mode: 'group', groups: groups });
//         saveGroupsToFile(groups); // Save the groups to a local file
//         const groupOptions = {
//           reply_markup: {
//             keyboard: groups.map((group) => [group.command]),
//             resize_keyboard: true,


//             one_time_keyboard: true,
//           },
//         };
//         ctx.reply('Please select a group to send instructions:', groupOptions);
//       }
//     } catch (error) {
//       ctx.reply('An error occurred while fetching the group list.');
//       console.error(error);
//     }
//   } else {
//     ctx.reply("I'm sorry, you can only interact with the bot in private chats.");
//   }
// });

// // Handling incoming messages
// bot.on('text', (ctx) => {
//   const chatId = ctx.chat.id;
//   const userState = userChatState.get(chatId);

//   if (!userState) {
//     ctx.reply('Please start the bot by using the /start command.');
//     return;
//   }

//   if (userState.mode === 'chat') {
//     // Process the chat with OpenAI API
//     const inputText = ctx.message.text;



//     userState.conversation.push({ user: inputText });

//     // Call OpenAI API to get a response
//     axios
//       .post(
//         'https://api.openai.com/v1/engines/davinci-codex/completions',
//         {
//           prompt: userState.conversation.map((msg) => msg.user).join('\n'),
//           max_tokens: 100,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${OpenAI_API_KEY}`,
//             'Content-Type': 'application/json',
//           },
//         }






//       )
//       .then((response) => {
//         const botReply = response.data.choices[0].text.trim();
//         userState.conversation.push({ bot: botReply });
//         ctx.reply(botReply);
//       })
//       .catch((error) => {
//         ctx.reply('An error occurred while processing your request.');
//         console.error(error);
//       });
//   } else if (userState.mode === 'group') {
//     if (!userState.groups) {
//       ctx.reply('Bot is not a member of any group at the moment.');
//       userChatState.delete(chatId);
//       return;
//     }

//     // Send message to selected group
//     const selectedGroupTitle = ctx.message.text;
//     const selectedGroup = userState.groups.find((group) => group.command === selectedGroupTitle);
//     if (selectedGroup) {
//       ctx.telegram.sendMessage(selectedGroup.id, 'Instruction from bot: ' + ctx.message.text);
//       ctx.reply('Message sent successfully to the group.');
//     } else {
//       ctx.reply('Invalid group selection.');
//     }
//     userChatState.delete(chatId);
//   }
// });

// // Load the groups from the local file on bot startup
// const groupsFromFile = readGroupsFromFile();
// if (groupsFromFile.length > 0) {
//   saveGroupsToFile(groupsFromFile);
// }

// // Start the bot
// bot.launch();









// // const { Telegraf } = require('telegraf');
// // const axios = require('axios');
// // const OpenAI_API_KEY = 'YOUR_OPENAI_API_KEY';

// // const bot = new Telegraf('6428621656:AAF5z5zScTDtoXkxmS3IqG5lp65Sf4Yl9IY');

// // // Store user chat state for conversation memory
// // const userChatState = new Map();

// // // Command to start the bot
// // bot.command('start', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   const options = {
// //     reply_markup: {
// //       keyboard: [['Chat with Bot', 'Send Instructions to Group']],
// //       resize_keyboard: true,
// //       one_time_keyboard: true,
// //     },
// //   };
// //   ctx.reply('Hello! What would you like to do?', options);
// // });

// // // Command to chat with the bot as a chatbot
// // bot.hears('Chat with Bot', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   userChatState.set(chatId, { mode: 'chat', conversation: [] });
// //   ctx.reply('You are now chatting with the bot as a chatbot.');
// // });

// // // Command to send instructions to a Telegram group
// // bot.hears('Send Instructions to Group', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   const userGroups = ctx.telegram.getChatAdministrators(chatId).map((admin) => ({
// //     id: admin.chat.id,
// //     title: admin.chat.title,
// //   }));
// //   if (userGroups.length === 0) {
// //     ctx.reply('You are not a member of any group.');
// //   } else {
// //     userChatState.set(chatId, { mode: 'group' });
// //     const groupOptions = {
// //       reply_markup: {
// //         keyboard: userGroups.map((group) => [group.title]),
// //         resize_keyboard: true,
// //         one_time_keyboard: true,
// //       },
// //     };
// //     ctx.reply('Please select a group to send instructions:', groupOptions);
// //   }
// // });

// // // Handling incoming messages
// // bot.on('text', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   const userState = userChatState.get(chatId);

// //   if (!userState) {
// //     ctx.reply('Please start the bot by using the /start command.');
// //     return;
// //   }

// //   if (userState.mode === 'chat') {
// //     // Process the chat with OpenAI API
// //     const inputText = ctx.message.text;
// //     userState.conversation.push({ user: inputText });

// //     // Call OpenAI API to get a response
// //     axios
// //       .post(
// //         'https://api.openai.com/v1/engines/davinci-codex/completions',
// //         {
// //           prompt: userState.conversation.map((msg) => msg.user).join('\n'),
// //           max_tokens: 100,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${OpenAI_API_KEY}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       )
// //       .then((response) => {
// //         const botReply = response.data.choices[0].text.trim();
// //         userState.conversation.push({ bot: botReply });
// //         ctx.reply(botReply);
// //       })
// //       .catch((error) => {
// //         ctx.reply('An error occurred while processing your request.');
// //         console.error(error);
// //       });
// //   } else if (userState.mode === 'group') {
// //     // Send message to selected group
// //     const selectedGroupTitle = ctx.message.text;
// //     const selectedGroupId = userGroups.find((group) => group.title === selectedGroupTitle)?.id;
// //     if (selectedGroupId) {
// //       ctx.telegram.sendMessage(selectedGroupId, 'Instruction from bot: ' + ctx.message.text);
// //       ctx.reply('Message sent successfully to the group.');
// //     } else {
// //       ctx.reply('Invalid group selection.');
// //     }
// //     userChatState.delete(chatId);
// //   }
// // });

// // // Start the bot
// // bot.launch();

// // const fs = require('fs');
// // const { Telegraf } = require('telegraf');
// // const axios = require('axios');
// // const OpenAI_API_KEY = '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';

// // const bot = new Telegraf('6428621656:AAF5z5zScTDtoXkxmS3IqG5lp65Sf4Yl9IY');

// // // Function to save the list of groups to a local file
// // const saveGroupsToFile = (groups) => {
// //   fs.writeFileSync('bot_groups.json', JSON.stringify(groups, null, 2));
// // };

// // // Function to read the list of groups from the local file
// // const readGroupsFromFile = () => {
// //   try {
// //     const data = fs.readFileSync('bot_groups.json');
// //     return JSON.parse(data);
// //   } catch (error) {
// //     return [];
// //   }
// // };

// // // Store user chat state for conversation memory
// // const userChatState = new Map();

// // // Command to start the bot
// // bot.command('start', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   if (ctx.chat.type === 'private') {
// //     const options = {
// //       reply_markup: {
// //         keyboard: [['Chat with Bot']],
// //         resize_keyboard: true,
// //         one_time_keyboard: true,
// //       },
// //     };
// //     options.reply_markup.keyboard.push(['Send Instructions to Group']);
// //     ctx.reply('Hello! What would you like to do?', options);
// //   } else {
// //     ctx.reply("I'm sorry, you can only interact with the bot in private chats.");
// //   }
// // });

// // // Command to chat with the bot as a chatbot
// // bot.hears('Chat with Bot', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   if (ctx.chat.type === 'private') {
// //     userChatState.set(chatId, { mode: 'chat', conversation: [] });
// //     ctx.reply('You are now chatting with the bot as a chatbot.');
// //   } else {
// //     ctx.reply("I'm sorry, you can only interact with the bot in private chats.");
// //   }
// // });

// // // Command to send instructions to a Telegram group
// // bot.hears('Send Instructions to Group', async (ctx) => {
// //   const chatId = ctx.chat.id;
// //   if (ctx.chat.type === 'private') {
// //     try {
// //       const myCommands = await ctx.telegram.getMyCommands();
// //       const groups = myCommands.filter((command) => command.type === 'group');

// //       if (groups.length === 0) {
// //         ctx.reply('Bot is not a member of any group at the moment.');
// //       } else {
// //         userChatState.set(chatId, { mode: 'group', groups: groups });
// //         saveGroupsToFile(groups); // Save the groups to a local file
// //         const groupOptions = {
// //           reply_markup: {
// //             keyboard: groups.map((group) => [group.command]),
// //             resize_keyboard: true,
// //             one_time_keyboard: true,
// //           },
// //         };
// //         ctx.reply('Please select a group to send instructions:', groupOptions);
// //       }
// //     } catch (error) {
// //       ctx.reply('An error occurred while fetching the group list.');
// //       console.error(error);
// //     }
// //   } else {
// //     ctx.reply("I'm sorry, you can only interact with the bot in private chats.");
// //   }
// // });

// // // Handling incoming messages
// // bot.on('text', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   const userState = userChatState.get(chatId);

// //   if (!userState) {
// //     ctx.reply('Please start the bot by using the /start command.');
// //     return;
// //   }

// //   if (userState.mode === 'chat') {
// //     // Process the chat with OpenAI API
// //     const inputText = ctx.message.text;
// //     userState.conversation.push({ user: inputText });

// //     // Call OpenAI API to get a response
// //     axios
// //       .post(
// //         'https://api.openai.com/v1/engines/davinci-codex/completions',
// //         {
// //           prompt: userState.conversation.map((msg) => msg.user).join('\n'),
// //           max_tokens: 100,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${OpenAI_API_KEY}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       )
// //       .then((response) => {
// //         const botReply = response.data.choices[0].text.trim();
// //         userState.conversation.push({ bot: botReply });
// //         ctx.reply(botReply);
// //       })
// //       .catch((error) => {
// //         ctx.reply('An error occurred while processing your request.');
// //         console.error(error);
// //       });
// //   } else if (userState.mode === 'group') {
// //     if (!userState.groups) {
// //       ctx.reply('Bot is not a member of any group at the moment.');
// //       userChatState.delete(chatId);
// //       return;
// //     }

// //     // Send message to selected group
// //     const selectedGroupTitle = ctx.message.text;
// //     const selectedGroup = userState.groups.find((group) => group.command === selectedGroupTitle);
// //     if (selectedGroup) {
// //       ctx.telegram.sendMessage(selectedGroup.id, 'Instruction from bot: ' + ctx.message.text);
// //       ctx.reply('Message sent successfully to the group.');
// //     } else {
// //       ctx.reply('Invalid group selection.');
// //     }
// //     userChatState.delete(chatId);
// //   }
// // });

// // // Load the groups from the local file on bot startup
// // const groupsFromFile = readGroupsFromFile();
// // if (groupsFromFile.length > 0) {
// //   saveGroupsToFile(groupsFromFile);
// // }

// // // Start the bot
// // bot.launch();
// // console.log('connected')











// // const { Telegraf } = require('telegraf');
// // const axios = require('axios');
// // const OpenAI_API_KEY = 'YOUR_OPENAI_API_KEY';

// // const bot = new Telegraf('6339905521:AAEYmIBJcGWXM8eBRCQf-gwiZeDCMfAPvkI');

// // // Store user chat state for conversation memory
// // const userChatState = new Map();

// // // Command to start the bot
// // bot.command('start', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   const options = {
// //     reply_markup: {
// //       keyboard: [['Chat with Bot']],
// //       resize_keyboard: true,
// //       one_time_keyboard: true,
// //     },
// //   };
// //   if (ctx.chat.type === 'private') {
// //     options.reply_markup.keyboard.push(['Send Instructions to Group']);
// //     ctx.reply('Hello! What would you like to do?', options);
// //   } else {
// //     ctx.reply("I'm sorry, you can only interact with the bot in private chats.");
// //   }
// // });

// // // Command to chat with the bot as a chatbot
// // bot.hears('Chat with Bot', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   if (ctx.chat.type === 'private') {
// //     userChatState.set(chatId, { mode: 'chat', conversation: [] });
// //     ctx.reply('You are now chatting with the bot as a chatbot.');
// //   } else {
// //     ctx.reply("I'm sorry, you can only interact with the bot in private chats.");
// //   }
// // });

// // // Command to send instructions to a Telegram group
// // bot.hears('Send Instructions to Group', async (ctx) => {
// //   const chatId = ctx.chat.id;
// //   if (ctx.chat.type === 'private') {
// //     const myCommands = await ctx.telegram.getMyCommands();
// //     const hasStartCommand = myCommands.some((command) => command.command === 'start');
// //     if (hasStartCommand) {
// //       const userGroups = myCommands
// //         .filter((command) => command.command !== 'start')
// //         .map((command) => ({ title: command.command }));
// //       if (userGroups.length === 0) {
// //         ctx.reply('Bot is not a member of any group at the moment.');
// //       } else {
// //         userChatState.set(chatId, { mode: 'group', groups: userGroups });
// //         const groupOptions = {
// //           reply_markup: {
// //             keyboard: userGroups.map((group) => [group.title]),
// //             resize_keyboard: true,
// //             one_time_keyboard: true,
// //           },
// //         };
// //         ctx.reply('Please select a group to send instructions:', groupOptions);
// //       }
// //     } else {
// //       ctx.reply('Bot is not a member of any group at the moment.');
// //     }
// //   } else {
// //     ctx.reply("I'm sorry, you can only interact with the bot in private chats.");
// //   }
// // });

// // // Handling incoming messages
// // bot.on('text', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   const userState = userChatState.get(chatId);

// //   if (!userState) {
// //     ctx.reply('Please start the bot by using the /start command.');
// //     return;
// //   }

// //   // The rest of the code remains the same...
// //   // (as provided in the previous responses)
// // });

// // // Start the bot
// // bot.launch();





// // const { Telegraf } = require('telegraf');
// // const axios = require('axios');
// // const OpenAI_API_KEY = 'YOUR_OPENAI_API_KEY';

// // const bot = new Telegraf('6339905521:AAEYmIBJcGWXM8eBRCQf-gwiZeDCMfAPvkI');

// // // Store user chat state for conversation memory
// // const userChatState = new Map();

// // // Command to start the bot
// // bot.command('start', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   const options = {
// //     reply_markup: {
// //       keyboard: [['Chat with Bot']],
// //       resize_keyboard: true,
// //       one_time_keyboard: true,
// //     },
// //   };
// //   if (ctx.chat.type === 'private') {
// //     ctx.reply("I'm sorry, you can only chat with the bot as a chatbot in private chats.");
// //   } else {
// //     options.reply_markup.keyboard.push(['Send Instructions to Group']);
// //     ctx.reply('Hello! What would you like to do?', options);
// //   }
// // });

// // // Command to chat with the bot as a chatbot
// // bot.hears('Chat with Bot', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   userChatState.set(chatId, { mode: 'chat', conversation: [] });
// //   ctx.reply('You are now chatting with the bot as a chatbot.');
// // });

// // // Command to send instructions to a Telegram group
// // bot.hears('Send Instructions to Group', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   if (ctx.chat.type === 'private') {
// //     ctx.reply("I'm sorry, you can only send instructions to a group in group chats.");
// //   } else {
// //     const userGroups = ctx.telegram.getChatAdministrators(chatId).map((admin) => ({
// //       id: admin.chat.id,
// //       title: admin.chat.title,
// //     }));
// //     if (userGroups.length === 0) {
// //       ctx.reply('You are not a member of any group.');
// //     } else {
// //       userChatState.set(chatId, { mode: 'group', groups: userGroups });
// //       const groupOptions = {
// //         reply_markup: {
// //           keyboard: userGroups.map((group) => [group.title]),
// //           resize_keyboard: true,
// //           one_time_keyboard: true,
// //         },
// //       };
// //       ctx.reply('Please select a group to send instructions:', groupOptions);
// //     }
// //   }
// // });

// // // Handling incoming messages
// // bot.on('text', (ctx) => {
// //   const chatId = ctx.chat.id;
// //   const userState = userChatState.get(chatId);

// //   if (!userState) {
// //     ctx.reply('Please start the bot by using the /start command.');
// //     return;
// //   }

// //   if (userState.mode === 'chat') {
// //     // Process the chat with OpenAI API
// //     const inputText = ctx.message.text;
// //     userState.conversation.push({ user: inputText });

// //     // Call OpenAI API to get a response
// //     axios
// //       .post(
// //         'https://api.openai.com/v1/engines/davinci-codex/completions',
// //         {
// //           prompt: userState.conversation.map((msg) => msg.user).join('\n'),
// //           max_tokens: 100,
// //         },
// //         {
// //           headers: {
// //             Authorization: `Bearer ${OpenAI_API_KEY}`,
// //             'Content-Type': 'application/json',
// //           },
// //         }
// //       )
// //       .then((response) => {
// //         const botReply = response.data.choices[0].text.trim();
// //         userState.conversation.push({ bot: botReply });
// //         ctx.reply(botReply);
// //       })
// //       .catch((error) => {
// //         ctx.reply('An error occurred while processing your request.');
// //         console.error(error);
// //       });
// //   } else if (userState.mode === 'group') {
// //     // Send message to selected group
// //     const selectedGroupTitle = ctx.message.text;
// //     const selectedGroup = userState.groups.find((group) => group.title === selectedGroupTitle);
// //     if (selectedGroup) {
// //       ctx.telegram.sendMessage(selectedGroup.id, 'Instruction from bot: ' + ctx.message.text);
// //       ctx.reply('Message sent successfully to the group.');
// //     } else {
// //       ctx.reply('Invalid group selection.');
// //     }
// //     userChatState.delete(chatId);
// //   }
// // });

// // // Start the bot
// // bot.launch();










// // // const { Telegraf } = require('telegraf');
// // // const axios = require('axios');
// // // const OpenAI_API_KEY = 'YOUR_OPENAI_API_KEY';

// // // const bot = new Telegraf('6339905521:AAEYmIBJcGWXM8eBRCQf-gwiZeDCMfAPvkI');

// // // // Store user chat state for conversation memory
// // // const userChatState = new Map();

// // // // Command to start the bot
// // // bot.command('start', (ctx) => {
// // //   const chatId = ctx.chat.id;
// // //   const options = {
// // //     reply_markup: {
// // //       keyboard: [['Chat with Bot', 'Send Instructions to Group']],
// // //       resize_keyboard: true,
// // //       one_time_keyboard: true,
// // //     },
// // //   };
// // //   ctx.reply('Hello! What would you like to do?', options);
// // // });

// // // // Command to chat with the bot as a chatbot
// // // bot.hears('Chat with Bot', (ctx) => {
// // //   const chatId = ctx.chat.id;
// // //   userChatState.set(chatId, { mode: 'chat', conversation: [] });
// // //   ctx.reply('You are now chatting with the bot as a chatbot.');
// // // });

// // // // Command to send instructions to a Telegram group
// // // bot.hears('Send Instructions to Group', (ctx) => {
// // //   const chatId = ctx.chat.id;
// // //   const userGroups = ctx.telegram.getChatAdministrators(chatId).map((admin) => ({
// // //     id: admin.chat.id,
// // //     title: admin.chat.title,
// // //   }));
// // //   if (userGroups.length === 0) {
// // //     ctx.reply('You are not a member of any group.');
// // //   } else {
// // //     userChatState.set(chatId, { mode: 'group' });
// // //     const groupOptions = {
// // //       reply_markup: {
// // //         keyboard: userGroups.map((group) => [group.title]),
// // //         resize_keyboard: true,
// // //         one_time_keyboard: true,
// // //       },
// // //     };
// // //     ctx.reply('Please select a group to send instructions:', groupOptions);
// // //   }
// // // });

// // // // Handling incoming messages
// // // bot.on('text', (ctx) => {
// // //   const chatId = ctx.chat.id;
// // //   const userState = userChatState.get(chatId);

// // //   if (!userState) {
// // //     ctx.reply('Please start the bot by using the /start command.');
// // //     return;
// // //   }

// // //   if (userState.mode === 'chat') {
// // //     // Process the chat with OpenAI API
// // //     const inputText = ctx.message.text;
// // //     userState.conversation.push({ user: inputText });

// // //     // Call OpenAI API to get a response
// // //     axios
// // //       .post(
// // //         'https://api.openai.com/v1/engines/davinci-codex/completions',
// // //         {
// // //           prompt: userState.conversation.map((msg) => msg.user).join('\n'),
// // //           max_tokens: 100,
// // //         },
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${OpenAI_API_KEY}`,
// // //             'Content-Type': 'application/json',
// // //           },
// // //         }
// // //       )
// // //       .then((response) => {
// // //         const botReply = response.data.choices[0].text.trim();
// // //         userState.conversation.push({ bot: botReply });
// // //         ctx.reply(botReply);
// // //       })
// // //       .catch((error) => {
// // //         ctx.reply('An error occurred while processing your request.');
// // //         console.error(error);
// // //       });
// // //   } else if (userState.mode === 'group') {
// // //     // Send message to selected group
// // //     const selectedGroupTitle = ctx.message.text;
// // //     const selectedGroupId = userGroups.find((group) => group.title === selectedGroupTitle)?.id;
// // //     if (selectedGroupId) {
// // //       ctx.telegram.sendMessage(selectedGroupId, 'Instruction from bot: ' + ctx.message.text);
// // //       ctx.reply('Message sent successfully to the group.');
// // //     } else {
// // //       ctx.reply('Invalid group selection.');
// // //     }
// // //     userChatState.delete(chatId);
// // //   }
// // // });

// // // // Start the bot
// // // bot.launch();
