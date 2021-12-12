import * as schedule from 'node-schedule';
import { DEFAULT_TIMEZONE } from 'core/common/constant';
import { failResponse, successResponse } from 'package/handler/bot-response';

class CronJobServiceImpl {
    client;

    message;

    channel;

    data;

    async replyMessage(luckyUsers) {
        this.message.reply(successResponse('Giveaway event start'));
        this.channel.send(successResponse('Rolling', 'Guess who will be the luckiest?'));
        if (luckyUsers.length === 0) {
            this.message.reply(failResponse('Error', 'There is actually 0 person reacted to your message!'));
            return;
        }
        let currentIndex = 0;
        let timeCounter = 0;
        const timer = setInterval(() => {
            if (timeCounter % 2 === 1) {
                this.channel.send('⌛');
            } else {
                this.channel.send('⌛');
            }
            timeCounter += 1;
            if (timeCounter === 3) {
                this.message.reply(`Congrats: <@${luckyUsers[currentIndex]}> winning the prize 🤩 🤩 🤩 !!!`);
                currentIndex += 1;
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
        const reactions = await this.message.reactions.cache;
        const senderId = this.message.author.id;
        const usersReactionManager = [];
        reactions.forEach(reactionBasedOnIcon => {
            usersReactionManager.push(reactionBasedOnIcon.users.fetch());
        });
        const userFromReaction = await Promise.all(usersReactionManager);
        let userReacted = [];
        userFromReaction.forEach(element => {
            element.forEach(user => {
                userReacted.push(user.id);
            });
        });
        userReacted = userReacted.filter(x => x !== senderId);
        return [...new Set(userReacted)];
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
            tz: DEFAULT_TIMEZONE,
        };

        const getResult = async () => {
            const users = await this.getListUserReacted(messageId, channelId);
            const luckyUsers = this.roll(users, this.data.quantity);
            await this.replyMessage(luckyUsers);
        };

        const runJob = async () => {
            await getResult();
        };

        schedule.scheduleJob(timeToExecute, () => {
            runJob();
        });
    }

    roll(users, quantity) {
        if (users.length <= quantity) {
            return users;
        }
        const indexes = [...Array(users.length).keys()]
            .sort(() => 0.5 - Math.random())
            .slice(-1 * quantity);

        return indexes.map(index => users[index]);
    }
}

export const ScheduleService = new CronJobServiceImpl();
