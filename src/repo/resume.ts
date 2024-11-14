export class ResumeRepo {
    private static instance: ResumeRepo;
    private dataQueue: any[] = [];
    private index = 0;

    private constructor(private url: string) {
        this.url = url
    }

    public static getInstance(url: string): ResumeRepo {
        if (!ResumeRepo.instance) {
            ResumeRepo.instance = new ResumeRepo(url);
        }
        return ResumeRepo.instance;
    }

    /**
     * Loads data into the internal queue from the specified URL.
     * 
     * Ideally, this load could be triggered by an API call, a scheduled polling mechanism, 
     * or even by other event-driven approaches as needed.
     */
    async loadData(): Promise<void> {
        if (this.dataQueue.length === 0) {
            try {
                const response = await fetch(this.url);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                this.dataQueue = Array.isArray(data) ? data : [data];
            } catch (error: any) {
                throw new Error("Error loading data: " + error.message);
            }
        }
    }

    getNext(): any | null {
        return this.dataQueue.length > 0 ? this.dataQueue.shift() : null;
    }
}
