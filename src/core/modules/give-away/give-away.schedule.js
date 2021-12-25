import * as schedule from 'node-schedule';
import { DEFAULT_TIMEZONE } from 'core/common/constant';
import { failResponse, formatResponseBoldText } from 'package/handler/bot-response';

class CronJobServiceImpl {
    client;

    message;

    channel;

    data;

    async replyMessage(luckyUsers) {
        if (luckyUsers.length === 0) {
            this.message.reply(failResponse('Error', 'There\'s nobody reacted to your message!'));
            return;
        }
        let currentIndex = 0;
        let timeCounter = 0;
        const waitingMessage = await this.message.reply('⌛');
        let awardMessage;
        const timer = setInterval(async () => {
            if (timeCounter === 0 && currentIndex !== 0) {
                waitingMessage.edit('⌛');
            }
            const currentContent = waitingMessage.content;
            if (timeCounter % 2 === 1) {
                waitingMessage.edit(`${currentContent}⏳`);
            } else if (timeCounter % 2 === 0 && timeCounter !== 0) {
                waitingMessage.edit(`${currentContent}⌛`);
            }
            timeCounter += 1;
            if (timeCounter === 4) {
                const replyMsg = `Chúc mừng <@${luckyUsers[currentIndex]}> 🎁🎁🎁`;
                if (!awardMessage) {
                    awardMessage = await this.message.reply(formatResponseBoldText(replyMsg));
                } else {
                    const currentAwardMessage = awardMessage.content.replace(/\*\*/g, '');
                    awardMessage.edit(formatResponseBoldText(`${currentAwardMessage}\n\n${replyMsg}`));
                }
                currentIndex += 1;
                timeCounter = 0;
            }
            if (currentIndex >= luckyUsers.length) {
                setTimeout(() => waitingMessage.delete(), 1000);
                clearInterval(timer);
            }
        }, 2000);
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
