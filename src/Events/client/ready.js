const Event = require('../../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}

	run() {
		console.log([
			`${this.client.user.tag} successfully logged in.`,
			`Loaded ${this.client.commands.size} commands.`,
			`Loaded ${this.client.events.size} events.`
		].join('\n'));
		this.client.user.setActivity('=say <words>', { type: 'LISTENING' });

		/* const activities = [
			`${this.client.guilds.cache.size} servers`,
			`${this.client.channels.cache.size} channels`,
			`${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} users`
		];

		let i = 0;
		setInterval(() => this.client.user.setActivity(`${this.client.prefix}help | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 60000); */
	}

};
