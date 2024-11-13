import { IParser, Person } from "./type";

export class JsonParser implements IParser<object> {
    parse(rawData: any): any {
        try {
            const person: Person = {
                Name: {
                    FirstName: rawData?.contact_info?.name?.given_name,
                    LastName: rawData?.contact_info?.name?.family_name
                },
                JobExperience: []
            }
            person.JobExperience = []

            for (let index = 0; index < rawData?.experience?.length; index++) {
                const currentExpe = rawData?.experience[index]
                person.JobExperience[index] = {
                    EndDate: currentExpe?.end_date,
                    StartDate: currentExpe?.start_date,
                    Role: currentExpe?.title,
                    Location: currentExpe?.location?.short_display_address
                }
            }

            person.JobExperience.sort((a, b) => {
                const startA = new Date(a.StartDate);
                const startB = new Date(b.StartDate);

                return startB.getTime() - startA.getTime();
            });

            // Calculate gaps in days between jobs
            for (let index = person.JobExperience.length -1; index >= 1; index--) {
                const currentJob = person.JobExperience[index];
                const nextJob = person.JobExperience[index - 1];

                const endDate = new Date(currentJob.EndDate);
                const nextStartDate = new Date(nextJob.StartDate);

                // Calculate the difference in milliseconds
                const gapInMillis = nextStartDate.getTime() - endDate.getTime();

                // Convert milliseconds to days
                const gapInDays = gapInMillis / (1000 * 3600 * 24); // 1000 ms * 3600 sec * 24 hours

                // Add gap to the current job, rounding down to ensure it's a whole number
                const daysGap = gapInDays > 0 ? Math.floor(gapInDays) : 0; // If there's no gap, set it to 0
                if (daysGap && daysGap!==1) {
                    currentJob.GapInDays = `${daysGap} + days`
                }
            }


            return person
        } catch (error: any) {
            throw new Error("Failed to parse JSON data: " + error?.message);
        }
    }
}
