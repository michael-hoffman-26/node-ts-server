import { z } from 'zod';
import { mockResumes } from '../data/mockCvs';

// Define the schema at class level
const ResumeSchema = z.object({
    contact_info: z.object({
        name: z.object({
            given_name: z.string(),
            family_name: z.string(),
        }),
    }),
    experience: z.array(z.object({
        title: z.string(),
        start_date: z.string(),
        end_date: z.string(),
        location: z.object({
            short_display_address: z.string(),
        }),
        gap_in_days: z.number().optional(),
    })),
});

// Export the type
export type Resume = z.infer<typeof ResumeSchema>;

export class ResumeRepo {
    private static instance: ResumeRepo;
    private dataQueue: any[] = [];
    private index = 0;
    private useLocalData: boolean;

    private constructor(private url: string, useLocalData: boolean = false) {
        this.url = url;
        this.useLocalData = useLocalData;
    }

    public static getInstance(url: string, useLocalData: boolean = false): ResumeRepo {
        if (!ResumeRepo.instance) {
            ResumeRepo.instance = new ResumeRepo(url, useLocalData);
        }
        return ResumeRepo.instance;
    }

    /**
     * Validates raw resume data against the schema
     */
    private validateResumeData(data: unknown): void {
        try {
            if (Array.isArray(data)) {
                data.forEach((item, index) => {
                    try {
                        ResumeSchema.parse(item);
                    } catch (error) {
                        if (error instanceof z.ZodError) {
                            throw new Error(`Invalid resume data at index ${index}: ${error.message}`);
                        }
                        throw error;
                    }
                });
            } else {
                ResumeSchema.parse(data);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new Error(`Schema validation failed: ${error.message}`);
            }
            throw error;
        }
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
                let data;
                if (this.useLocalData) {
                    data = mockResumes;
                } else {
                    const response = await fetch(this.url);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                    }
                    data = await response.json();
                }

                // Validate the data before storing it
                this.validateResumeData(data);

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
