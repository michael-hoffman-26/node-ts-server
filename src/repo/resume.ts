export class DataSource {
    constructor(private url: string) { }

    async loadData(): Promise<any[]> {
        try {
            const response = await fetch(this.url);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
            }
            return await response.json();
        } catch (error: any) {
            throw new Error("Error loading data: " + error.message);
        }
    }
}

