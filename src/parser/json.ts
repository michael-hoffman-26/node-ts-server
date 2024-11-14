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
                    Location: currentExpe?.location?.short_display_address,
                }
                if (currentExpe?.gap_in_days) {
                    person.JobExperience[index].GapInDays = currentExpe.gap_in_days
                }
            }

            return person
        } catch (error: any) {
            throw new Error("Failed to parse JSON data: " + error?.message);
        }
    }
}
