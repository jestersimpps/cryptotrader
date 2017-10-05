import { IdName } from './../idname.model';
import { TickerDto } from './../../../../../common/dtos/ticker.model';
export interface Statement {
    selector: IdName;
    exchange: string;
    pair: TickerDto;
    number: number;
}
