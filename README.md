# Pot Bot

> A bot to manage your pots ;-)

## Features

* /active
* /upcoming
* /past
* /join
* /info
* /new

## Tech Stack

* NodeJS 16.8.0
* MongoDB

## Setup

From the app root:

* Run `npm install` to install all the dependencies
* Rename `.env.sample` to `.env` and update the values to your needs
* You'll need to create your own Telegram bot using [@BotFather](https://core.telegram.org/bots#6-botfather)
  * Use the bot token and assign it to `TELEGRAM_BOT_TOKEN` in `.env` file

## Development

* From the app root, run `npm run dev` to start the bot

*NOTE* Make sure you `/start` the bot before you try interacting with the bot.
Telegram doesn't allow bots to message a user without permission.

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
