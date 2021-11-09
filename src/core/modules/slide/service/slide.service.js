class SlideServiceImpl {
    async addSlide(slideInfo) {
        if (this.#checkValidSlideTitle(slideInfo)) {
            const slideTitle = this.#getSlideTitle(slideInfo);
            const slideUrl = this.#getSlideUrl(slideInfo);
            
        } else {
            return '[ERROR] slide\'s title must begin with character: double quote (")';
        }
    }

    #getSlideTitle(content) {
        return content.slice(content.indexOf('"') + 1, content.lastIndexOf('"'));
    }

    #getSlideUrl(content) {
        return content.slice(content.lastIndexOf('"')).trim();
    }

    #checkValidSlideTitle(content) {
        return content.indexOf('"') === 0;
    }
}

export const SlideService = new SlideServiceImpl();
