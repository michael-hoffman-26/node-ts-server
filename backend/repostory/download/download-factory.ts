import { InMemoryDownloadRepo, DownloadDBRepo } from './main';
import { CURRENT_REPO } from '../../utils/consts';

/**
 * I have choosed to implement a simple In memory cache
 * So it would be easier and fast to create this project
 */
export function createDownloadRepo(): DownloadDBRepo {
    switch (CURRENT_REPO) {
        case 'in-memory-cache':
            return new InMemoryDownloadRepo();
        // Future repository types can be added here as additional cases

        default:
            throw new Error(`Unknown repository type: ${CURRENT_REPO}`);
    }
}
