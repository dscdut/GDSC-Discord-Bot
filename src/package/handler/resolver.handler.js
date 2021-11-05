import express from 'express';

export class HandlerResolver {
    #globalRouter = express.Router()

    static builder() {
        return new HandlerResolver();
    }

    addModule(modules) {
        modules.forEach(module => {
            module.build(this.#globalRouter);
        });
        return this;
    }

    /**
     *
     * @returns {import('express').Router}
     */
    resolve() {
        return this.#globalRouter;
    }
}
