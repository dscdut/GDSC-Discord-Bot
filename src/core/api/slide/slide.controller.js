import { SlideService } from 'core/modules/slide';
import { ValidHttpResponse } from 'package/handler/http-response';

class Controller {
    constructor() {
        this.service = SlideService;
    }

    findAll = async () => {
        const data = await this.service.getAll();
        return ValidHttpResponse.toOkResponse(data);
    }
}
export const SlideController = new Controller();
