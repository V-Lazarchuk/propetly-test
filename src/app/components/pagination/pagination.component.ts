import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

import { ActiveItemsService } from '../../services/active-items.service';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
    @Input() activePage: number;
    @Input() countPages: number;
    @Output() goToPage: EventEmitter<number> = new EventEmitter();
    pagesArray: number[];

    constructor(private activeItems: ActiveItemsService) {
    }

    ngOnChanges() {
        this.pagesArray = new Array(this.countPages);
    }

    setActivePage(pageNumber: number) {
        this.activeItems.activePageNumber.next(pageNumber);
        this.goToPage.emit(pageNumber);
    }

}
