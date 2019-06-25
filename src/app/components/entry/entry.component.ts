import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { FeedEntry } from '../../models';

@Component({
    selector: 'app-entry',
    templateUrl: './entry.component.html',
    styleUrls: ['./entry.component.scss']
})
export class EntryComponent {
    @Input() public entry: FeedEntry;
    @Output() public userSelect: EventEmitter<void> = new EventEmitter();

    constructor(public sanitizer: DomSanitizer) {
    }

}
