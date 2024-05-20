import * as fs from 'fs';
import {IResource} from "./types";

export function parseJsonFile(filePath: string): IResource[] {
    const parsedObjects: IResource[] = [];
    const fileContents: string[] = fs.readFileSync(filePath, 'utf-8').split('\n');

    fileContents.forEach((line: string) => {
        try {
            if (line.trim() !== '') {
                parsedObjects.push(JSON.parse(line));
            }
        } catch (error) {
            console.error(`Error decoding JSON from line: ${line}`);
            console.error(error);
        }
    });

    return parsedObjects;
}