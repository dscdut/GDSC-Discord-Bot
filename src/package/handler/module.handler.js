import express from 'express';
import { logger } from 'package/logger';
import { HttpException } from './http-exception';
import { HttpResponse, InValidHttpResponse } from './http-response';

export class Module {
    #prefix;

    #router = express.Router();

    #createHandler = controller => async (request, response) => {
        try {
            const data = await controller(request);
            if (!(data instanceof HttpResponse)) {
                return InValidHttpResponse
                    .toInternalResponse(
                        `${data.constructor.name} is not instance of HttpResponse.`
                        + 'Should use HttpResponse to build http response'
                    )
                    .toResponse(response);
            }
            return data.toResponse(response);
        } catch (err) {
            if (err instanceof HttpException) {
                return new InValidHttpResponse(err.status, err.code, err.message)
                    .toResponse(response);
            }
            logger.error(err.message);
            logger.error(err.stack);
            return InValidHttpResponse
                .toInternalResponse(err.message)
                .toResponse(response);
        }
    }

    static builder() {
        return new Module();
    }

    addPrefix({ prefixPath = '/', module }) {
        if (!module) {
            logger.error('Module is require in addPrefix function');
        }
        this.#prefix = {
            prefixPath,
            module
        };
        return this;
    }

    register(apis) {
        logger.info(`${this.#prefix.module} is bundling`);
        apis.forEach(api => {
            const { route, controller, method } = api;
            this.#router[method](route, (req, res, next) => { next(); }, this.#createHandler(controller));
        });
        return this;
    }

    build(globalRoute) {
        globalRoute.use(this.#prefix.prefixPath, this.#router);
    }
}
