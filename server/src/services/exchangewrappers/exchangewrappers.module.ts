import { BittrexWrapper } from './bittrex.wrapper';
import { KrakenWrapper } from './kraken.wrapper';
import { Module } from '@nestjs/common';
import { PoloniexWrapper } from './poloniex.wrapper';
import { ApiWrapper } from './api.wrapper';

@Module({
    components: [
        ApiWrapper,
        PoloniexWrapper,
        KrakenWrapper,
        BittrexWrapper
    ],
    exports: [
        PoloniexWrapper,
        KrakenWrapper,
        BittrexWrapper
    ],
})
export class ExchangeWrapperModule { }