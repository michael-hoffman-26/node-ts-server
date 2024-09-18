import { readFileLineByLine } from "./utils/load-file";
import { fetchDataFromGithub } from "./service/github";
import { formatGithubUrl } from "./utils/format-github-url";


const QUERIES_FILE_PATH = './src/resources/github_queries.txt';

(async () => {
    const urls = await readFileLineByLine(QUERIES_FILE_PATH)
    // console.log(lines)
    
    // const checkLine0 = lines[0]
    // const line0 = new URL(checkLine0);
    // const baseUrl = `${line0.origin}${line0.pathname}`;


    // const queryParam = line0.searchParams.get('q') || '';
    // const encodedQuery = encodeURIComponent(queryParam);

    // const requestUrl = `${baseUrl}?q=${encodedQuery}`;

    
    // const res = await fetchDataFromGithub(requestUrl)

    for (const url of urls) {
        const formattedUrl = formatGithubUrl(url)
        const res = await fetchDataFromGithub(formattedUrl);

        console.log(res?.data?.total_count);
        //TODO
        /**
         * Handle pagination.
         * in order to print all data.
         * 
         * add to the queries pagintains
         * and fetch all data using the total_count.
         * 
         */
        console.log(res?.data?.items);
        // TODO
        /***
         * Handle parallelism
         * to iterate over the queries file with iterator
         * and fetch each time X requests.
         * 
         * after that handle the requests using Promise.allSettled
         * 
         */
    }
})();


