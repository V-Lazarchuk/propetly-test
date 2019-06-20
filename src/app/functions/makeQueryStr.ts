import { EntriesQuery } from '../models';

export function makeQueryStr(query: EntriesQuery): string {
    if (!query) {
        return ``;
    } else {
        const params: string[] = [];
        Object.keys(query).forEach(key => {
            params.push(`${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`);
        });
        return `?${params.join('&')}`;
    }
}
