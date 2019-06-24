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
            .then(() => this.getEntries(this.entriesPerPage))
            .then(response => {
                this.entries = response;
            })
            /**
             * crutch for incorrect entries length
             */
            .then(() => {
                this.checkItemsLength();
            });
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

    getEntries(limit: number, after?: string): Promise<FeedEntry[]> {
        return new Promise(resolve => {
            this.httpCommon.getListEntries(this.subRedditName,
                {limit, after}
            ).subscribe(response => {
                resolve(response.data.children);
            });
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
        this.getEntries(this.entriesPerPage, this.getLastItemName(this.activePage))
            .then(response => {
                this.entries = response;
            });
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
            this.getEntries(this.entriesPerPage - this.entries.length, this.entries[this.entries.length - 1].data.name)
                .then(response => {
                    this.entries = this.entries.concat(response);
                });
        }
    }

}
