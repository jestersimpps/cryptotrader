import { BitfinexWrapper } from './exchanges/bitfinex.wrapper';
import { BittrexWrapper } from './exchanges/bittrex.wrapper';
import { KrakenWrapper } from './exchanges/kraken.wrapper';
import { Module } from '@nestjs/common';
import { PoloniexWrapper } from './exchanges/poloniex.wrapper';
import { ApiWrapper } from './api.wrapper';

@Module({
    components: [
        ApiWrapper,
        PoloniexWrapper,
        KrakenWrapper,
        BittrexWrapper,
        BitfinexWrapper
    ],
    exports: [
        PoloniexWrapper,
        KrakenWrapper,
        BittrexWrapper,
        BitfinexWrapper
    ],
})
export class ExchangeWrapperModule { }