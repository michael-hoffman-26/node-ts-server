import { ItemNotExists } from "../../errors/ItemNotExists";
import { DownloadData, Status } from "../../models/item";

export interface DownloadDBRepo {
    doDownload(data: DownloadData): Promise<DownloadData>;
    getStatusForId(id: number): Promise<DownloadData>;
    getStatus(): Promise<DownloadData[]>;
    updateDownloadStatus(id: number, status: Status): Promise<void>
}


export class InMemoryDownloadRepo implements DownloadDBRepo {
    private items: Map<number, DownloadData> = new Map(); // Change array to Map
    private nextId: number = 1;

    async doDownload(data: DownloadData): Promise<DownloadData> {
        const newItem: DownloadData = { id: this.nextId++, name: data.name, status: Status.InProgress };
        this.items.set(newItem?.id || -1, newItem); // Use Map's set method
        return newItem;
    }

    async getStatus(): Promise<DownloadData[]> {
        // Convert Map values to an array to return
        // todo implements query
        return Array.from(this.items.values());
    }

    async getStatusForId(id: number): Promise<DownloadData> {
        const item = this.items.get(id); // Use Map's get method

        if (item) {
            return item;
        }
        throw new ItemNotExists(id);
    }

    async updateDownloadStatus(id: number, status: Status): Promise<void> {
        const item = this.items.get(id);

        if (!item) {
            throw new ItemNotExists(id);
        }

        const updatedItem: DownloadData = { ...item, status };

        this.items.set(id, updatedItem);
    }
}




