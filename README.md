# Candy [![Build Status](https://travis-ci.org/moriczgergo/candy.svg?branch=master)](https://travis-ci.org/moriczgergo/candy)
The Markdown-based reference platform.

## Setup

 1. Clone this repo.
 2. Run `npm install` (or `yarn`).
 3. (optional) Run `npm test` (or `yarn test`). (requires `npm install -D` or `yarn -D`).
 4. Run `npm start`, and start exploring!

## Files

In the root of this repo, there's a default `ref/` folder. That is the place where all your references are and will be!

Catalogs are folders inside the folder, and the `ref/` folder is the root catalog. The references are the Markdown files inside of catalogs.

In the internals of Candy, we don't use extensions for references, since all of them are Markdown files. So when you're trying to read a reference through Candy, remember that you only need to enter the filename without the extension.

## Control

Candy doesn't have any way to control it's references through itself by default. You need to get other packages, like [candy-cli](https://github.com/moriczgergo/candy-cli), or [candy-web](#) (coming soon).

All of Candy's "control packages" use WebSockets to communicate with your instance of Candy.

## WebSockets

When you start Candy with `npm start`, what you do, is start a WebSocket server. Candy has two websocket commands (for now): reference, and list.

To learn more about these commands, and building your own control packages, check out the [Candy wiki](https://github.com/moriczgergo/candy/wiki).