
const fs = require('fs');
const readline = require('readline');

export async function readFileLineByLine(filePath) {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    const lines: string[] = [];

    try {
        for await (const line of rl) {
            lines.push(line); 
        }
    } catch (err) {
        console.error(`Error reading the file: ${err}`);
    }

    return lines;
}

