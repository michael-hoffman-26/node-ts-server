import { config } from "dotenv";

config()

export function getGithubSecret(){
    console.log(process.env.SECRET_TOKEN_GITHUB);
    const secret = process.env.SECRET_TOKEN_GITHUB; 
    return secret
}