
import { Module } from '@nestjs/common';
import { ApiWrapper } from '../services/exchangewrappers/api.wrapper';
import { PoloniexWrapper } from '../services/exchangewrappers/exchanges/poloniex.wrapper';
import { KrakenWrapper } from '../services/exchangewrappers/exchanges/kraken.wrapper';
import { BittrexWrapper } from '../services/exchangewrappers/exchanges/bittrex.wrapper';
import { BitfinexWrapper } from '../services/exchangewrappers/exchanges/bitfinex.wrapper';

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