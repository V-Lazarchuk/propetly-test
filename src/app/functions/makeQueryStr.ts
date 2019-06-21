import { EntriesQuery } from '../models';

/**
 * Make encoded URI string for any query object
 * @param query
 */
export function makeQueryStr(query: EntriesQuery): string {
    if (!query) {
        return ``;
    } else {
        const params: string[] = [];
        Object.keys(query).forEach(key => {
            if (query[key] && query[key] !== '') {
                params.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
            }
        });
        return `?${params.join('&')}`;
    }
}
