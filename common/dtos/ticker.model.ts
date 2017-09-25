import { Exchange } from "../enums/exchange.enum";

export class TickerDto {
    readonly exchange: Exchange;
    readonly symbol: string;
    readonly last: number;
    readonly ask: number;
    readonly bid: number;
    readonly percentChange: number;
    readonly quote: string;
    readonly base: string;
    readonly volume: number;
    readonly high: number;
    readonly low: number;
    readonly updated: number;
}

