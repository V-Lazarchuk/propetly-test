import { Component, Input, OnInit } from '@angular/core';
import { FeedEntry } from '../../models';
import { ActiveItemsService } from '../../services/active-items.service';

@Component({
    selector: 'app-entry-details',
    templateUrl: './entry-details.component.html',
    styleUrls: ['./entry-details.component.scss']
})
export class EntryDetailsComponent implements OnInit {
    entry: FeedEntry;

    constructor(private activeItems: ActiveItemsService) {
    }

    ngOnInit(): void {
        this.activeItems.activeEntry
            .subscribe( item => {
                if (item) {
                    this.entry = item;
                }
            })
    }

}
