import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { ActiveItemsService } from '../../services/active-items.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
    @Input() public activePage: number;
    @Input() private countPages: number;
    @Output() public goToPage: EventEmitter<number> = new EventEmitter();
    public pagesArray: number[];

    constructor(private activeItems: ActiveItemsService) {
    }

    public ngOnChanges() {
        this.pagesArray = new Array(this.countPages);
    }

    /**
     * Emit event with active page number to parent component
     * @param pageNumber
     */
    public setActivePage(pageNumber: number) {
        this.activeItems.activePageNumber.next(pageNumber);
        this.goToPage.emit(pageNumber);
    }

}
