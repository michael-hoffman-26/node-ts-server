import { DownloadData } from '../models/item';
import { DownloadDBRepo } from '../repostory/download/main';

export class DownloadService {
    private downloadDbCLient: DownloadDBRepo;
    private downloadQueue: any

    constructor(downloadDbCLient: DownloadDBRepo, downloadQueue: any) {
        this.downloadDbCLient = downloadDbCLient;
        this.downloadQueue = downloadQueue
    }

    async createItem(data: DownloadData): Promise<DownloadData> {
        const downloadData = await this.downloadDbCLient.doDownload(data);
        this.downloadQueue.add(data)
        
        return downloadData
    }

    async getStatus(): Promise<DownloadData[]> {
        return this.downloadDbCLient.getStatus();
    }

    async getStatusForId(id: number): Promise<DownloadData> {
        return this.downloadDbCLient.getStatusForId(id);
    }
}


