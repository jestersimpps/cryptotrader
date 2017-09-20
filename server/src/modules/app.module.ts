import { ExchangeWrapperModule } from './../services/exchangewrappers/exchangewrappers.module';
import { ExchangeService } from './../services/exchange.service';
import { OverviewController } from './../controllers/overview.controller';
import { Module } from '@nestjs/common';
import { String } from './../../../common/extensionmethods/string'

@Module({
    controllers: [OverviewController],
    components: [
        ExchangeService,
    ],
    modules: [ExchangeWrapperModule],
})
export class ApplicationModule { }