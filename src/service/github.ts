import axios, { AxiosError, AxiosHeaders } from "axios";
import { getGithubSecret } from "../utils/load-secret";


const getHeaders = () => {
    const headers = {
        'Authorization': `Bearer ${getGithubSecret()}`,
        // 'Authorization': `Bearer ${process.env.SECRET_TOKEN_GITHUB}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28'
    };
    console.log(headers);
    
    return headers
}

// load the secret only one time
const headers = getHeaders()


export async function fetchDataFromGithub(url: string) {

    try {
        const response = await axios.get(url, { headers })
        return response

    } catch (error) {
        if (error instanceof AxiosError) {
            // TODO better handle errors

            if (error?.response) {
                // Server responded with a status other than 2xx
                console.error('Error Status:', error.response.status);
                console.error('Error Data:', error.response.data);
                console.error('Error Headers:', error.response.headers);
            } else if (error?.request) {
                // Request was made but no response received
                console.error('No Response:', error.request);
            } else {
                // Something else happened in setting up the request
                console.error('Error:', error.message);
            }

        }
    }
}
