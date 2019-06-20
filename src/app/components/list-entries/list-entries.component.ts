import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FeedEntry } from '../../models';
import { HttpCommonService } from '../../services';
import { ActiveItemsService } from '../../services/active-items.service';

@Component({
    selector: 'app-list-entries',
    templateUrl: './list-entries.component.html',
    styleUrls: ['./list-entries.component.scss']
})
export class ListEntriesComponent implements OnInit {
    entries: FeedEntry[];
    subRedditName: string = 'space';

    constructor(private httpCommon: HttpCommonService,
                private activeItems: ActiveItemsService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.httpCommon.getListEntries(this.subRedditName, {limit: 20})
            .subscribe(res => {
                console.log(res);
                console.log(res.data.children);
                this.entries = res.data.children;
                console.log(this.entries);
            });
    }

    setActiveEntry(entry: FeedEntry): void {
        this.activeItems.activeEntry.next(entry);
        this.router.navigate([entry.data.name], {relativeTo: this.route});
    }

}
