const Command = require('../../Structures/Command');
const tts = require('google-tts-api');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['speak', 'tts'],
			description: 'Annoy people with spoken tts that they can\'t disable! (Well, unless they just... mute the bot.',
			category: 'Fun',
			NSFW: false,
			args: true,
			guildOnly: true
		});
	}

	// eslint-disable-next-line consistent-return
	run(message) {
		const tts1 = message.content.split(' ').slice(1).join(' ');

		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.channel.send('You must be in a voice channel to use this command.');
		voiceChannel
			.join()
			.then((connnection) => {
				const url = tts.getAudioUrl(tts1);
				connnection.play(url);
			})
			.catch((err) => {
				console.log(`Error - Something went wrong.\n${err}`);
				voiceChannel.leave();
			});
	}

};
