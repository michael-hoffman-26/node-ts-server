import { ResumService } from "../service/resume";
import { JsonParser } from "../parser/json";
import { TextParser } from "../parser/text";

export class ResumeController {
    private jsonParser = new JsonParser();
    private textParser = new TextParser();

    constructor(private resumeService: ResumService) {
        this.resumeService = resumeService
    }

    async exportData(): Promise<void> {
        let enrichedData = await this.resumeService.getEnrichedNextData();
        while (enrichedData) {
            const jsonData = this.jsonParser.parse(enrichedData);
            const textData = this.textParser.parse(enrichedData);

            // for now, we are only printing the data for simplicity
            console.log("JSON Data:")
            console.log(jsonData);
            
            console.log("Text Data:")
            console.log(textData);

            enrichedData = await this.resumeService.getEnrichedNextData();
        }
    }
}
