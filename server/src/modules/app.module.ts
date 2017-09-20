import { OverviewService } from './../services/overview.service';
import { OverviewController } from './../controllers/overview.controller';
import { Module } from '@nestjs/common';

@Module({
    controllers: [OverviewController],
    components: [OverviewService],
    modules: [],
})
export class ApplicationModule { }