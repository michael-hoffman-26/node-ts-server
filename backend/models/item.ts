export enum Status {
    InProgress,
    Finished,
}

export interface DownloadData {
    name: string;
    id?: number;
    status: Status
}