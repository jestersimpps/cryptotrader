import { Module } from '@nestjs/common';
import { PoloniexWrapper } from './poloniex.wrapper';
import { ApiWrapper } from './api.wrapper';

@Module({
    components: [
        ApiWrapper,
        PoloniexWrapper
    ],
    exports: [
        PoloniexWrapper
    ],
})
export class ExchangeWrapperModule { }