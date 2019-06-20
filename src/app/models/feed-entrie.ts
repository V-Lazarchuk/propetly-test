export interface FeedEntry {
    kind: string;
    data: {
        name: string;
        thumbnail: string;
        created: number;
        num_comments: number;
        author: string;
        score: number;
        permalink: string;
        url: string;
        title: string;
        selftext: string;
        thumbnail_height: number;
        thumbnail_width: number;
    };
}
