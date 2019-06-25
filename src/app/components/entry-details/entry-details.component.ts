import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { FeedEntry } from '../../models';
import { ActiveItemsService } from '../../services/active-items.service';

@Component({
    selector: 'app-entry-details',
    templateUrl: './entry-details.component.html',
    styleUrls: ['./entry-details.component.scss']
})
export class EntryDetailsComponent implements OnInit {
    public entry: FeedEntry;

    constructor(private activeItems: ActiveItemsService,
                private location: Location) {
    }

    public ngOnInit(): void {
        this.activeItems.activeEntry
            .subscribe(item => {
                if (item) {
                    this.entry = item;
                }
            });
    }

    /**
     * Go back to list entries
     */
    public goBack(): void {
        this.location.back();
    }

}
