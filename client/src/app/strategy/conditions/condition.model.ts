import { Statement } from './statement.model';

export interface Condition {
    statement1: Statement;
    comparator: string;
    statement2: Statement;
}
