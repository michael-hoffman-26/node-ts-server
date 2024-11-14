import { IParser } from "../parser/type";
import { DataSource, ResumeRepo } from "../repo/resume";


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

export class ResumService {
    constructor(private dataSource: ResumeRepo) { }

    async getEnrichedNextData(): Promise<any | null> {
        const rawData = this.dataSource.getNext();
        if (rawData) {
            return this.enrichData(rawData);
        }
        return null;
    }

    private enrichData(data: any): any {
        // TODO fix the logic
        // probaly a simple error
        // great news you almost finished
        const checkArr = []
        checkArr.sort()

        // Sort experiences by start date in descending order (most recent first)
        // Sort experiences by start date in descending order (most recent first)
        data?.experience.sort((a, b) => {
            const startA = new Date(a.start_date);
            const startB = new Date(b.start_date);
            return startB.getTime() - startA.getTime();
        });

        for (let index = 1; index < data?.experience.length; index++) {
            const currentJob = data.experience[index - 1];
            const previousJob = data.experience[index];

            const previousJobEnd = new Date(previousJob.end_date).getTime();
            const currentJobStart = new Date(currentJob.start_date).getTime();

            const gapInMillis = currentJobStart - previousJobEnd;
            const gapInDays = gapInMillis / (1000 * 3600 * 24); // 1000 ms * 3600 sec * 24 hours
            const daysGap = Math.floor(gapInDays);

            // 1 day is not a considered as a Gap
            if (daysGap > 1) {
                currentJob.gap_in_days = `${daysGap} days`;                
            }
        }

        return data;
    }
}