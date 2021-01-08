const fetch = require("node-fetch");

class Weekly {
	message(msg) {
		if (msg.content.startsWith("/weekly")) {
			msg.reply("Let me check...");
			fetch("https://weekly.verminti.de")
				.then((res) => res.text())
				.then((text) => {
					msg.reply(text);
				});
		}
	}
}

module.exports = Weekly;
