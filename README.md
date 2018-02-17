# candy
The Markdown-based reference platform.

## Setup

 1. Run `npm install` (or `yarn`).
 2. (optional) Run `npm test` (or `yarn test`). (requires `npm install -D` or `yarn -D`).
 3. Run `npm start`, and start exploring!

## Control

Candy doesn't have any way to control it's references through itself by default. You need to get other packages, like [candy-cli](https://github.com/moriczgergo/candy-cli), or [candy-web](#) (coming soon).

All of Candy's "control packages" use WebSockets to communicate with your instance of Candy.

## WebSockets

When you start Candy with `npm start`, what you do, is start a WebSocket server. Candy has two websocket commands (for now): reference, and list.

To learn more about these commands, and building your own control packages, check out the [Candy wiki](https://github.com/moriczgergo/candy/wiki).