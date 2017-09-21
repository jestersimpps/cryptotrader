import { ExchangeWrapperModule } from './../services/exchangewrappers/exchangewrappers.module';
import { ExchangeService } from './../services/exchange.service';
import { ExchangeController } from './../controllers/exchange.controller';
import { Module } from '@nestjs/common';
import { String } from './../../../common/extensionmethods/string'

@Module({
    controllers: [ExchangeController],
    components: [
        ExchangeService,
    ],
    modules: [ExchangeWrapperModule],
})
export class ApplicationModule { }