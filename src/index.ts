import { ResumeRepo } from "./repo/resume";
import { ResumService } from "./service/resume";
import { ResumeController } from "./controller/resume";

console.log("hello world");

// TODO load add in a better way

async function main() {
    // TODO load url in a better way
    const RESUME_URL = 'https://hs-recruiting-test-resume-data.s3.amazonaws.com/allcands-full-api_hub_b1f6-acde48001122.json'

    const sharedResumeRepo = ResumeRepo.getInstance(RESUME_URL);

    await sharedResumeRepo.loadData(); // Load data into the source

    const resumeService = new ResumService(sharedResumeRepo);
    const resumeController = new ResumeController(resumeService);

    await resumeController.exportData();  // Export data in JSON and text formats
}


main().catch(console.error);