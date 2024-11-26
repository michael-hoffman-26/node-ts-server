import express from 'express'

import { validateRequest } from '../../validator/validator';
import { deleteItemValidator, postItemValidator, } from './validators';
import { doDownload, getStatus, getStatusForId } from '../../controller/download';

const router = express.Router();

router.post('/:id',
    postItemValidator,
    validateRequest,
    doDownload
);

router.get('/status/:id',
    getStatusForId
);

router.get('/status',
    deleteItemValidator,
    validateRequest,
    getStatus
);

export default router;
