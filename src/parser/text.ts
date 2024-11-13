import { IParser, Person } from "./type";

export class TextParser implements IParser<string> {
    parse(rawData: any): any {
        let text = "Hello"

        const person: Person = {
            Name: {
                FirstName: rawData?.contact_info?.name?.given_name,
                LastName: rawData?.contact_info?.name?.family_name
            },
            JobExperience: []
        }
        person.JobExperience = []
        text += person.Name.FirstName + " " + person.Name.LastName +  ',\n \n' 

        for (let index = 0; index < rawData?.experience?.length; index++) {
            const currentExpe = rawData?.experience[index]
            person.JobExperience[index] = {
                EndDate: currentExpe?.end_date,
                StartDate: currentExpe?.start_date,
                Role: currentExpe?.title,
                Location: currentExpe?.location?.short_display_address
            }
        }
        for (let index = 0; index < person.JobExperience.length; index++) {
            const currentExp = person.JobExperience[index];
            
            text += `Worked as: ${currentExp.Role}, From ${currentExp.StartDate} To ${currentExp.EndDate} in ${currentExp.Location}\n`;
        }

        return text
    }
}
