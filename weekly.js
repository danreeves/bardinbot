const fetch = require("node-fetch");

class Weekly {
	message(msg) {
		if (msg.content.startsWith("/weekly")) {
			msg.channel.send("Let me check...");
			fetch("https://weekly.verminti.de")
				.then((res) => res.text())
				.then((text) => {
					msg.channel.send(text);
				});
		}
	}
}

module.exports = Weekly;
