import { JsonParser } from "./parser/json";
import { TextParser } from "./parser/text";
import { DataSource } from "./repo/resume";
import { DataService } from "./service/resume-service";

console.log("hello world");

// TODO load add in a better way
const RESUME_URL = 'https://hs-recruiting-test-resume-data.s3.amazonaws.com/allcands-full-api_hub_b1f6-acde48001122.json'

const sharedDataSource = new DataSource(RESUME_URL); // todo make this singleton so we dont load data twice

const jsonDataService = new DataService(sharedDataSource, new JsonParser());
const textDataService = new DataService(sharedDataSource, new TextParser());

async function main() {
    const jsonData = await jsonDataService.getParsedData();
    const textData = await textDataService.getParsedData();

    // for (let index = 0; index < jsonData.length; index++) {
    for (let index = 0; index < 1; index++) {
        console.log('displaying user number:' + index);
        
        console.log(jsonData[index]);
        console.log(textData[index]);
    }
}

main().catch(console.error);