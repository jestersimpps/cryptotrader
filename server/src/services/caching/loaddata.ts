import { TickerDto } from './../../../../common/dtos/ticker.model';
import * as redis from 'redis';
import { Observable } from 'rxjs/Rx';
import { KrakenWrapper } from './../../services/exchangewrappers/exchanges/kraken.wrapper';
import { PoloniexWrapper } from './../../services/exchangewrappers/exchanges/poloniex.wrapper';
import { BittrexWrapper } from './../../services/exchangewrappers/exchanges/bittrex.wrapper';
import { BitfinexWrapper } from './../../services/exchangewrappers/exchanges/bitfinex.wrapper';
import { Exchange } from '../../../../common/enums/exchange.enum';

async function loadData() {
    const redisClient = redis.createClient();

    const poloniexWrapper = new PoloniexWrapper();
    const krakenWrapper = new KrakenWrapper();
    const bittrexWrapper = new BittrexWrapper();
    const bitfinexWrapper = new BitfinexWrapper();

    let tasks$ = [];

    /**
     * Load ticker data
     */
    tasks$.push(poloniexWrapper.getTickers().do(() => console.log(`loaded ${Exchange.poloniex} ticker data.`)));
    tasks$.push(krakenWrapper.getTickers().do(() => console.log(`loaded ${Exchange.kraken} ticker data.`)));
    tasks$.push(bittrexWrapper.getTickers().do(() => console.log(`loaded ${Exchange.bittrex} ticker data.`)));
    tasks$.push(bitfinexWrapper.getTickers().do(() => console.log(`loaded ${Exchange.bitfinex} ticker data.`)));

    Observable.interval(5000).subscribe(() => {
        Observable.forkJoin(...tasks$).subscribe(tickerData => {
            tickerData.forEach((ticker: TickerDto[]) => {
                if (ticker.length) {
                    redisClient.set(`${ticker[0].exchange}_tickers`, JSON.stringify(ticker));
                    ticker.forEach((pair: TickerDto) => {
                        redisClient.set(`${ticker[0].exchange}_ticker_${pair.symbol}`, JSON.stringify(pair));
                    })
                    console.log(`set ${ticker[0].exchange} ticker data in redis cache.`);
                }else{
                    console.error(`Error: ${ticker}`);
                }
            });
            // process.exit();
        });
    })

}

loadData();
