#!/usr/bin/env node
var chalk = require('chalk'); // console colors
const WebSocket = require('ws'); // websocket

var { getReference, getItems } = require("./lib/reffs");

var wss = new WebSocket.Server({
	port: process.env.CANDY_PORT || 4540
});

wss.on('connection', function connection(ws) {
	ws.on('error', () => console.log(chalk.yellow("Something happened. Continuing...")));
	ws.on('message', function incoming(message) {
		var messageObj = JSON.parse(message);
		switch (messageObj.type) {
			case "reference":
				console.log(chalk.cyan(`Request to read "${messageObj.path}".`))
				var ref = getReference(messageObj.path);
				if (typeof ref != "undefined") {
					ws.send(JSON.stringify({
						type: messageObj.type,
						reference: ref
					}));
				} else {
					ws.send(JSON.stringify({
						type: messageObj.type,
						error: 404
					}));
				}
				break;
			case "list":
				var items = getItems(messageObj.path);
				if (typeof items != "undefined") {
					ws.send(JSON.stringify({
						type: messageObj.type,
						items: items
					}));
				} else {
					ws.send(JSON.stringify({
						type: messageObj.type,
						error: 404
					}));
				}
				break;
			default:
				ws.send("{}");
				break;
		}
	});
});

wss.on('error', () => console.log(chalk.yellow("Something happened. Continuing...")));

console.log(chalk.cyan("Testing getItems:"));
console.log(JSON.stringify(getItems("/")));
console.log(chalk.cyan("Testing getReference:"));
console.log(JSON.stringify(getReference("/helloWorld")));
