/* eslint-disable no-shadow */
/* eslint-disable no-process-env */
const ms = require('ms');
const Command = require('../../Structures/Command');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['purge'],
			description: 'Removes this bot\'s messages to clean up spam.',
			category: 'Utilities',
			guildsOnly: true,
			args: false
		});
	}

	async run(message) {
		if (message.channel.type === 'text') {
			// eslint-disable-next-line consistent-return
			message.channel.messages.fetch().then(messages => {
				const untold = '851924474948222987';
				const vibrations = '832005657502023711';
				// eslint-disable-next-line max-len
				const botMessages = messages.filter(message => (message.author.id === untold || message.author.id === vibrations || message.content.startsWith('=') || message.content.startsWith('#')) && !message.pinned && (message.createdTimestamp - Date.now()) < ms('14d'));
				if (message.createdTimestamp - Date.now() > ms('14d')) {
					return message.channel.send('Cannot bulk delete messages that were created more than 14 days ago.');
				}
				message.channel.bulkDelete(botMessages);
				const messagesDeleted = botMessages.array().length;

				message.channel.send(`Cleaned bot messages (Vibrations & Untold) & cmd messages: ${messagesDeleted}`).then(message => {
					message.delete({ timeout: 5000 });
				})
					.catch(console.error);
				console.log(`Messages deleted: ${messagesDeleted} (${message.channel.name} - ${message.guild.name})`);
			}).catch(err => {
				console.log('Error deleting bot messages');
				console.log(err);
			});
		}
	}

};
