import { TickerDto } from './../../../../common/dtos/ticker.model';
import * as redis from 'redis';
import { Observable } from 'rxjs';
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
    tasks$.push(poloniexWrapper.getTicker().do(() => console.log(`loaded ${Exchange.poloniex} ticker data.`)));
    tasks$.push(krakenWrapper.getTicker().do(() => console.log(`loaded ${Exchange.kraken} ticker data.`)));
    tasks$.push(bittrexWrapper.getTicker().do(() => console.log(`loaded ${Exchange.bittrex} ticker data.`)));
    tasks$.push(bitfinexWrapper.getTicker().do(() => console.log(`loaded ${Exchange.bitfinex} ticker data.`)));

    Observable.forkJoin(...tasks$).subscribe(tickerData => {
        tickerData.forEach((ticker: TickerDto[]) => {
            redisClient.set(`${ticker[0].exchange}_ticker`, JSON.stringify(ticker));
            // Adds latest ohlc data point to each individual pair;
            addToOhlc(ticker);
            console.log(`set ${ticker[0].exchange} ticker data in redis cache.`);
        });
        process.exit();
    });

}

function addToOhlc(ticker: TickerDto[]) {

}


loadData();