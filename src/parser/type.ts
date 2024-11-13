export interface IParser<T> {
    parse(rawData: any): T;
}


interface JobExperience {
    Role: string;
    StartDate: string;
    EndDate: string;
    Location: string;
    GapInDays?: string;
}

interface Name {
    FirstName: string;
    LastName: string;
}

export interface Person {
    Name: Name;
    JobExperience?: JobExperience[];
}

