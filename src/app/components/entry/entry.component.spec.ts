import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { EntryComponent } from './entry.component';
import { SliceStrPipe } from '../../pipes';
import { createMockEntries } from '../list-entries/list-entries.component.spec';

describe('EntryComponent', () => {
    let component: EntryComponent;
    let fixture: ComponentFixture<EntryComponent>;
    let hostElement: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EntryComponent, SliceStrPipe]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryComponent);
        component = fixture.componentInstance;
        hostElement = fixture.debugElement;
        component.entry = createMockEntries(1)[0];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render entry', () => {
        expect(hostElement.query(By.css('.entry'))).toBeTruthy();
    });

    it('should emit on click', () => {
        let emitted = false;
        component.userSelect.subscribe(() => {
            emitted = true;
        });
        hostElement.query(By.css('.entry__link')).triggerEventHandler('click', null);
        expect(emitted).toBe(true);
    });
});
