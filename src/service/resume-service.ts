import { IParser } from "../parser/type";
import { DataSource } from "../repo/resume";


export class DataService<T> {
    constructor(private dataSource: DataSource, private parser: IParser<T>) { }

    async getParsedData(): Promise<any[]> {
        const rawData: any[] = await this.dataSource.loadData();

        const results: any[] = []
        for (let index = 0; index < rawData.length; index++) {
            results[index] = this.parser.parse(rawData[index]);
        }

        return results
    }
}