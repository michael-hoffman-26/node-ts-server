import { IParser, Person } from "./type";

export class TextParser implements IParser<string> {
    parse(rawData: any): string {
        let text = "Hello "
        text += rawData?.contact_info?.name?.given_name + " " + rawData?.contact_info?.name?.family_name +  ',\n \n' 
        
        for (let index = 0; index < rawData?.experience.length; index++) {
            const currentExp = rawData?.experience[index];
            
            text += `Worked as: ${currentExp?.title}, From ${currentExp.start_date}` +
                `To ${currentExp.end_date} in ${currentExp?.location?.short_display_address}\n`;
            
            if (currentExp?.gap_in_days) {
                text += `Gap in CV for ${currentExp?.gap_in_days}\n`
            }
        }

        return text
    }
}
