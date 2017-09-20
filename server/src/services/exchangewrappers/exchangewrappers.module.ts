import { KrakenWrapper } from './kraken.wrapper';
import { Module } from '@nestjs/common';
import { PoloniexWrapper } from './poloniex.wrapper';
import { ApiWrapper } from './api.wrapper';

@Module({
    components: [
        ApiWrapper,
        PoloniexWrapper,
        KrakenWrapper
    ],
    exports: [
        PoloniexWrapper,
        KrakenWrapper
    ],
})
export class ExchangeWrapperModule { }