import { Exchange } from "../enums/exchange";

export class TickerDto {
    readonly id: string;
    readonly exchange: Exchange;
    readonly symbol: string;
    readonly last: number;
    readonly lowestAsk: number;
    readonly highestBid: number;
    readonly percentChange: number;
    readonly quote: string;
    readonly base: string;
    readonly baseVolume: number;
    readonly quoteVolume: number;
    readonly isFrozen: boolean;
    readonly high24hr: number;
    readonly low24hr: number;
}

