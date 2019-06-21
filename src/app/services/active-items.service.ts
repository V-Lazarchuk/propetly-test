import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FeedEntry } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ActiveItemsService {
    activeEntry: BehaviorSubject<FeedEntry> = new BehaviorSubject(null);
    activePageNumber: BehaviorSubject<number> = new BehaviorSubject(null);
}
