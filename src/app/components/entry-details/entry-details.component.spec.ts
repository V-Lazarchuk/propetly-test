import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LocationStrategy } from '@angular/common';

import { EntryDetailsComponent } from './entry-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActiveItemsService } from '../../services/active-items.service';
import { createMockEntries } from '../list-entries/list-entries.component.spec';

describe('EntryDetailsComponent', () => {
    let component: EntryDetailsComponent;
    let fixture: ComponentFixture<EntryDetailsComponent>;
    let service: ActiveItemsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EntryDetailsComponent],
            imports: [RouterTestingModule],
            providers: [LocationStrategy, ActiveItemsService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EntryDetailsComponent);
        service = TestBed.get(ActiveItemsService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have item', fakeAsync(() => {
        service.activeEntry.next(createMockEntries(1)[0]);
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(component.entry).toBeDefined();
    }));
});
