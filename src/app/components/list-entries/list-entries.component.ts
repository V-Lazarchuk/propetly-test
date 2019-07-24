import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FeedEntry } from '../../models';
import { HttpCommonService } from '../../services';
import { ActiveItemsService } from '../../services/active-items.service';
import { tick } from '@angular/core/testing';

@Component({
    selector: 'app-list-entries',
    templateUrl: './list-entries.component.html',
    styleUrls: ['./list-entries.component.scss']
})
export class ListEntriesComponent implements OnInit {
    public entries: FeedEntry[];
    private allEntriesNames: string[] = [];
    private subRedditName: string = 'space';
    public activePage: number;
    public entriesPerPage: number = 10;

    constructor(private httpCommon: HttpCommonService,
                private activeItems: ActiveItemsService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    public ngOnInit(): void {
        this.getActivePageNumber()
            .then(() => this.getAllEntriesNames())
            .then(() => this.getEntries(this.entriesPerPage))
            .then(response => {
                this.entries = response;
            })
            /**
             * Fix response incorrect length
             */
            .then(() => {
                this.checkItemsLength();
            });
    }

    /**
     * Get all entries and save it's names to array for pagination
     */
    private getAllEntriesNames(): Promise<void> {
        return new Promise(resolve => {
            this.httpCommon.getListEntries(this.subRedditName, {limit: 150})
                .subscribe(response => {
                    this.allEntriesNames = response.data.children.map(item => item.data.name);
                    resolve();
                });
        });
    }

    /**
     * Set selected entry in service for prevent unnecessary requests when details component is loaded
     * @param entry
     */
    private setActiveEntry(entry: FeedEntry): void {
        this.activeItems.activeEntry.next(entry);
        this.router.navigate([entry.data.name], {relativeTo: this.route});
    }

    /**
     * Get count pages for pagination
     */
    private getCountPages(): number {
        return Math.ceil(this.allEntriesNames.length / this.entriesPerPage);
    }

    /**
     * Get entries
     * @param limit
     * @param after
     */
    private getEntries(limit: number, after?: string): Promise<FeedEntry[]> {
        return new Promise(resolve => {
            this.httpCommon.getListEntries(this.subRedditName,
                {limit, after}
            ).subscribe(response => {
                resolve(response.data.children);
            });
        });
    }

    /**
     * Get last item name for 'after' param in 'getEntries' method
     * @param pageNumber
     */
    private getLastItemName(pageNumber: number): string {
        if (pageNumber === 1) {
            return ``;
        } else {
            console.log(((pageNumber - 1) * this.entriesPerPage) - 1);
            return this.allEntriesNames[((pageNumber - 1) * this.entriesPerPage) - 1];
        }
    }

    /**
     * Get active page number from service after return from 'details' component
     */
    private getActivePageNumber(): Promise<void> {
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

    /**
     * Set active page number in service in each page changing
     * @param pageNumber
     */
    public setActivePage(pageNumber: number): void {
        this.activePage = pageNumber;
        this.getEntries(this.entriesPerPage, this.getLastItemName(this.activePage))
            .then(response => {
                this.entries = response;
            });
    }

    /**
     * Conditions for pagination
     */
    public get showPagination(): boolean {
        return this.allEntriesNames
            && this.entries
            && this.allEntriesNames.length !== 0
            && this.allEntriesNames.length > this.entriesPerPage
            && this.entries.length !== 0;
    }

    /**
     * Slice entries array or get missing entries regard entries length and entries per page options
     */
    public checkItemsLength(): void {
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
