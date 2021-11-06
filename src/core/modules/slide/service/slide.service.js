class SlideServiceImpl {
    async getAll() {
        return 'fuck off, bitch!!!';
    }

    async helloCase() {
        return 'get fuck off, hoe!!';
    }

    async nameCase(client) {
        return client.user.username;
    }

    async getSlideCase() {
        return 'slide returned, bitch';
    }
}

export const SlideService = new SlideServiceImpl();
