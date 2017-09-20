import { Module } from '@nestjs/common';
import { PoloniexWrapper } from './poloniex.wrapper';

@Module({
    components: [
        PoloniexWrapper
    ],
    exports: [
        PoloniexWrapper
    ],
})
export class ExchangeWrapperModule { }