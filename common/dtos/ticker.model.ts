import { Exchange } from "../enums/exchange";

export class TickerDto {
    readonly id: number;
    readonly exchange: Exchange;
    readonly symbol: string;
    readonly last: number;
    readonly lowestAsk: number;
    readonly highestBid: number;
    readonly percentChange: number;
    readonly quote: string;
    readonly base: string;
    readonly volume: number;
    readonly isFrozen: boolean;
    readonly high24hr: number;
    readonly low24hr: number;
    readonly updated: number;
}

