import { FeedEntry } from './feed-entrie';

export interface ListFeedEntries {
    kind?: string;
    data: {
        modhash?: string;
        dist?: number;
        children: FeedEntry[];
    };
}
