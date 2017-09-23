import * as redis from 'redis';
import { KrakenWrapper } from './../src/services/exchangewrappers/exchanges/kraken.wrapper';
import { PoloniexWrapper } from './../src/services/exchangewrappers/exchanges/poloniex.wrapper';
import { BittrexWrapper } from './../src/services/exchangewrappers/exchanges/bittrex.wrapper';
import { BitfinexWrapper } from './../src/services/exchangewrappers/exchanges/bitfinex.wrapper';
import { Exchange } from '../../common/enums/exchange.enum';

async function loadData() {
    const redisClient = redis.createClient();

    const poloniexWrapper = new PoloniexWrapper();
    poloniexWrapper.getTicker().subscribe(tickerData => {
        redisClient.set(`${Exchange.poloniex}_ticker`, JSON.stringify(tickerData));
    })
    const krakenWrapper = new KrakenWrapper();
    krakenWrapper.getTicker().subscribe(tickerData => {
        redisClient.set(`${Exchange.kraken}_ticker`, JSON.stringify(tickerData));
    })
    const bittrexWrapper = new BittrexWrapper();
    poloniexWrapper.getTicker().subscribe(tickerData => {
        redisClient.set(`${Exchange.bittrex}_ticker`, JSON.stringify(tickerData));
    })
    const bitfinexWrapper = new BitfinexWrapper();
    poloniexWrapper.getTicker().subscribe(tickerData => {
        redisClient.set(`${Exchange.bitfinex}_ticker`, JSON.stringify(tickerData));
    })

}
loadData();