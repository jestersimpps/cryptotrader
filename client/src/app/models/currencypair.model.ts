export interface CurrencyPair {
    symbol: string;
    exchange: string;
    selectedPrice: number;
    base: string;
    unixDate: string;
    quote: string;
    market_id: string;
    high: number;
    low: number;
    bid: number;
    ask: number;
    last: number;
    change: number;
    percentage: number;
    baseVolume: number;
    quoteVolume: number;
    created_at: string;
    updated_at: string;
    priceHistory: {
        p: number;
        v: number;
        d: string;
    }[];
}
