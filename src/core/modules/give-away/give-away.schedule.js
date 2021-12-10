import * as schedule from 'node-schedule';

class CronJobServiceImpl {

    client;

    message;

    channel;

    data;

    constructor() { }

    async replyMessage(luckyUsers) {
        this.message.reply(`Giveaway start`);
        this.channel.send(`Guess who will be the luckiests?`);
        if (luckyUsers.length == 0) {
            this.message.reply(`There is actually 0 person reacted to your message!`);
            return;
        }
        let currentIndex = 0;
        let timeCounter = 0;
        const timer = setInterval(() => {
            if (timeCounter % 2 == 1) {
                this.channel.send("⌛");
            } else {
                this.channel.send("⌛");
            }
            timeCounter += 1;
            if (timeCounter == 3) {
                this.message.reply(`Congrats: <@${luckyUsers[currentIndex++]}> winning the prize 🤩 🤩 🤩 !!!`);
                timeCounter = 0;
            }
            if (currentIndex >= luckyUsers.length) {
                clearInterval(timer);
            }
        }, 1500);
    }

    async getListUserReacted(messageId, channelId) {
        this.channel = await this.client.channels.fetch(channelId);
        this.message = await this.channel.messages.fetch(messageId);
        const reaction = await this.message.reactions.cache;
        const senderId = this.message.author.id;
        let arr = [];
        for (let [key, value] of reaction) {
            const u = await value.users.fetch().then(listUsers => {
                return listUsers.map((user) => user.id);
            });
            arr.push(...u);
        }
        arr = arr.filter(x => x != senderId);
        return [...new Set(arr)];
    }

    scheduleJob(channelId, messageId, data, client) {
        this.client = client;
        this.data = data;
        const time = this.data.date;

        const timeToExecute = {
            second: 0,
            minute: time.minute(),
            hour: time.hour(),
            date: time.date(),
            month: time.month(),
        };

        const job = schedule.scheduleJob(timeToExecute, function () {
            runJob();
        });

        const getResult = async () => {
            const users = await this.getListUserReacted(messageId, channelId);
            const luckyUsers = this.roll(users, this.data.quantity);
            await this.replyMessage(luckyUsers);
        }

        const runJob = async () => {
            await getResult();
            job.cancel();
        }
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    roll(users, quantity) {
        if (users.length <= quantity) {
            return users;
        }
        const luckyUsers = [];
        while (quantity > 0) {
            let luckyIndex = this.getRandomIntInclusive(0, users.length - 1);
            if (luckyUsers.indexOf(luckyIndex) >= 0) continue;
            luckyUsers.push(luckyIndex);
            quantity = quantity - 1;
        }
        return luckyUsers.map(idx => users[idx]);
    }
}

export const ScheudleService = new CronJobServiceImpl();