export interface String {
    json(): string;
}

String.prototype.json = function (): string {
    try {
        return JSON.parse(this);
    } catch (e) {
        console.error(`Cannot parse object to json`);
        return null;
    }
}
