import { Module } from 'package/handler/module.handler';
import { SlideController } from './slide.controller';

export const SlideResolver = Module
    .builder()
    .addPrefix({
        prefixPath: '/slide',
        module: 'SlideModule'
    })
    .register([
        {
            route: '/',
            method: 'get',
            controller: SlideController.findAll
        }
    ]);
