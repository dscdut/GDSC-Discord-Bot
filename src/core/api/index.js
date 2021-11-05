import { HandlerResolver } from 'package/handler/resolver.handler';
import { SlideResolver } from './slide/slide.resolver';

export const ModuleResolver = HandlerResolver
    .builder()
    .addModule([
        SlideResolver
    ]);
