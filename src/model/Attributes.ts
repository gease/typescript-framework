export class Attributes<T extends object> {
    constructor(private data: T) {}

    public get = <K extends keyof T>(param: K):(T[K] | undefined) => {
        return this.data[param];
    }

    public set = (param: T | {}): void => {
        Object.assign(this.data, param);
    }

    public getAll = (): T => {
        return this.data;
    }

}
