const Command = require('../../Structures/Command');
const { exec } = require('child_process');
const fs = require('fs');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['temp'],
			description: 'Checks the CPU & GPU temps of a raspberry pi, if the bot is being hosted on one.',
			category: 'Owner',
			usage: '<query>',
			ownerOnly: true,
			args: false

		});
	}

	async run(message) {
		fs.readFile('/sys/class/thermal/thermal_zone0/temp', 'utf8', (error, data) => {
			const temp = parseFloat(data / 1000).toFixed(1);
			if (error) throw error;
			message.channel.send(`CPU-temp=${temp}'C`, { split: true, code: true });
		});
		exec('vcgencmd measure_temp', (error, stdout) => {
			const response = stdout || error;
			message.channel.send(`GPU-${response}`, { split: true, code: true });
		});
	}

};
