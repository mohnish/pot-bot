# Pot Bot

> Just a pot managing bot

*DISCLAIMER*: It has nothing to do with Weed

## Features

- [x] /active Fetch all active pots (includes locked)
- [x] /completed Fetch all completed pots
- [x] /join Join an active unlocked pot
- [x] /new Start a new pot
- [x] /info Query an active pot
- [x] /lock Lock a pot you created, preventing others from joining
- [x] /end End a pot you created

## Tech Stack

* NodeJS 16.8.0
* MongoDB 5.0

## Setup

From the app root:

* Run `npm install` to install all the dependencies
* Rename `.env.sample` to `.env` and update the values to your needs
* You'll need to create your own Telegram bot using [@BotFather](https://core.telegram.org/bots#6-botfather)
  * Use the bot token and assign it to `TELEGRAM_BOT_TOKEN` in `.env` file
* Install MongoDB. On macOS, run
  * `brew tap mongodb/brew`
  * `brew install mongodb-community@5.0`

## Development

### MongoDB

MongoDB is used as the primary data store and also to persist scheduled tasks

* Start server `brew services start mongodb-community@5.0`
  * Ensure connectivity by running `mongosh myFirstDatabase`

### App

* From the app root, run `npm run dev` to start the bot

*NOTE* Make sure you `/start` the bot before you try interacting with the bot.
Telegram doesn't allow bots to message a user without permission.

## Production Deploy

* Install dependencies `npm install`
* Start the script by running `npm start`
* Stop: `npm stop`
* Status: `npm run status`

If you wish to deploy it to Heroku, you can do so by clicking below (Make sure you have the ENV vars configured):

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## License

MIT License

Copyright (c) 2021 Mohnish Thallavajhula hi@iam.mt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
