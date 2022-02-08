/* eslint-disable no-continue */
import * as schedule from 'node-schedule';
import { DEFAULT_TIMEZONE } from 'core/common/constant';

class CronJobServiceImpl {
    client;

    message;

    channel;

    data;

    async replyMessage(luckyUsers) {
        this.message.reply('Giveaway start');
        this.channel.send('Guess who will be the luckiest?');
        if (luckyUsers.length === 0) {
            this.message.reply('There is actually 0 person reacted to your message!');
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
                this.message.reply(`Congrats: <@${luckyUsers[currentIndex].id}>: ${luckyUsers[currentIndex].giftName} 🥲 !`);
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
        const usersReactionManager = [];
        reactions.forEach(reactionBasedOnIcon => {
            usersReactionManager.push(reactionBasedOnIcon.users.fetch());
        });
        const userFromReaction = await Promise.all(usersReactionManager);
        const userReacted = [];
        userFromReaction.forEach(element => {
            element.forEach(user => {
                userReacted.push(user.id);
            });
        });
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
            const luckyUsers = this.roll(users, this.data.items, this.data.quantity);
            await this.replyMessage(luckyUsers);
        };

        const runJob = async () => {
            await getResult();
        };

        schedule.scheduleJob(timeToExecute, () => {
            runJob();
        });
    }

    roll(users, items, quantity) {
        const gifts = [];
        Object.keys(items).forEach(key => {
            gifts.push(...new Array(items[key]).fill(key));
        });
        gifts.sort(() => 0.5 - Math.random());

        const indexes = [...Array(users.length).keys()]
            .sort(() => 0.5 - Math.random())
            .slice(-1 * quantity);

        const userIds = indexes.map(index => users[index]);
        const result = [];
        if (gifts.length < users.length) {
            gifts.forEach((giftName, index) => {
                result.push({
                    id: userIds[index],
                    giftName,
                });
            });
            return result;
        }
        users.forEach((id, index) => {
            result.push({
                id,
                giftName: gifts[index],
            });
        });
        return result;
    }
}

export const ScheduleService = new CronJobServiceImpl();
