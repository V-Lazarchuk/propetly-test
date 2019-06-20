import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FeedEntry } from '../../models';

@Component({
    selector: 'app-entry',
    templateUrl: './entry.component.html',
    styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
    @Input() entry: FeedEntry;
    @Output() userSelect: EventEmitter<void> = new EventEmitter();

    constructor(public sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        console.log(this.entry);
    }

}
