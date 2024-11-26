import { NextFunction, Request, Response } from "express";
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { DownloadService } from '../service/download';
import { createDownloadRepo } from '../repostory/download/download-factory';

const downloadDbRepo = createDownloadRepo();
const downloadService = new DownloadService(downloadDbRepo);


export async function doDownload(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const newItem = await downloadService.createItem(req.body);
        res.status(StatusCodes.CREATED).json(newItem);
    } catch (error) {
        next(error)
    }
}

export async function getStatusForId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const items = await downloadService.getAllItems();
        res.status(StatusCodes.OK).json(items);
    } catch (error) {
        next(error)
    }
}

export async function getStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const items = await downloadService.delete(+req.params?.id);
        res.status(StatusCodes.NO_CONTENT).json(items);
    } catch (error) {
        next(error)
    }
}