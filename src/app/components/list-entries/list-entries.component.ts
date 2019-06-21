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
    allEntriesNames: string[] = [];
    subRedditName: string = 'space';
    activePage: number;
    entriesPerPage: number = 10;

    constructor(private httpCommon: HttpCommonService,
                private activeItems: ActiveItemsService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.getActivePageNumber()
            .then(() => this.getAllEntriesNames())
            .then(() => this.getEntries());
    }

    getAllEntriesNames(): Promise<void> {
        return new Promise(resolve => {
            this.httpCommon.getListEntries(this.subRedditName, {limit: 150})
                .subscribe(response => {
                    this.allEntriesNames = response.data.children.map(item => item.data.name);
                    resolve();
                });
        });
    }

    setActiveEntry(entry: FeedEntry): void {
        this.activeItems.activeEntry.next(entry);
        this.router.navigate([entry.data.name], {relativeTo: this.route});
    }

    getCountPages(): number {
        return Math.ceil(this.allEntriesNames.length / this.entriesPerPage);
    }

    getEntries(): void {
        this.httpCommon.getListEntries(this.subRedditName,
            {limit: this.entriesPerPage, after: this.getLastItemName(this.activePage)}
        ).subscribe(response => {
            this.entries = response.data.children;
            /**
             * crutch for array length
             */
            this.checkItemsLength();
        });
    }

    getLastItemName(pageNumber: number): string {
        if (pageNumber === 1) {
            return ``;
        } else {
            console.log(((pageNumber - 1) * this.entriesPerPage) - 1);
            return this.allEntriesNames[((pageNumber - 1) * this.entriesPerPage) - 1];
        }
    }

    getActivePageNumber(): Promise<void> {
        return new Promise(resolve => {
            this.activeItems.activePageNumber.subscribe(num => {
                if (num) {
                    this.activePage = num;
                } else {
                    this.activePage = 1;
                }
                resolve();
            });
        });
    }

    setActivePage(pageNumber: number): void {
        this.activePage = pageNumber;
        this.getEntries();
    }

    showPagination(): boolean {
        return this.allEntriesNames
            && this.entries
            && this.allEntriesNames.length !== 0
            && this.allEntriesNames.length > this.entriesPerPage
            && this.entries.length !== 0;
    }

    checkItemsLength() {
        if (this.entries.length > this.entriesPerPage) {
            this.entries = this.entries.slice(0, this.entriesPerPage);
        } else if (this.entries.length < this.entriesPerPage) {
            this.getEntries();
        }
    }

}
