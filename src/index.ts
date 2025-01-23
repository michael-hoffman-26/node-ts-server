import { ResumeRepo } from "./repo/resume";
import { ResumService } from "./service/resume";
import { ResumeController } from "./controller/resume";


async function main() {
    // TODO load url in a better way, env var or something else
    const RESUME_URL = 'https://hs-recruiting-test-resume-data.s3.amazonaws.com/allcands-full-api_hub_b1f6-acde48001122.json'

    const USE_LOCAL_DATA = true;
    const sharedResumeRepo = ResumeRepo.getInstance(RESUME_URL, USE_LOCAL_DATA);

    await sharedResumeRepo.loadData();

    const resumeService = new ResumService(sharedResumeRepo);
    const resumeController = new ResumeController(resumeService);

    await resumeController.exportData();  // Export data in JSON and text formats
}


main().catch(console.error);