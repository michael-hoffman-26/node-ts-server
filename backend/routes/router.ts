import express from 'express';

import downloadRouter from './download';
import healthRouter from './health';


const router = express.Router();

router.use("/download", downloadRouter);
router.use('/health', healthRouter);

export default router;