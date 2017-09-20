import { OverviewController } from './../controllers/overview.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [OverviewController],
    modules: [],
})
export class ApplicationModule { }