import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntriesQuery, ListFeedEntries } from '../models';
import {makeQueryStr} from '../functions';

@Injectable({
    providedIn: 'root'
})
export class HttpCommonService {
    baseUrl: string = 'https://www.reddit.com/r';

    constructor(private http: HttpClient) {
    }

    getListEntries(subRedditName: string, query?: EntriesQuery): Observable<ListFeedEntries> {
        return this.http.get<ListFeedEntries>(`${this.baseUrl}/${subRedditName}.json${query ? makeQueryStr(query) : ''}`);
    }

}
