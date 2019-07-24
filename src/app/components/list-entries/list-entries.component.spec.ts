import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ListEntriesComponent } from './list-entries.component';
import { HttpCommonService } from '../../services';
import { ActiveItemsService } from '../../services/active-items.service';
import { EntryComponent, PaginationComponent } from '..';
import { SliceStrPipe } from '../../pipes';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FeedEntry } from '../../models';

describe('ListEntriesComponent', () => {
    let component: ListEntriesComponent;
    let fixture: ComponentFixture<ListEntriesComponent>;
    let hostElement: HTMLElement;
    const spyHttp: jasmine.SpyObj<HttpCommonService> = jasmine.createSpyObj('HttpCommonService', ['getListEntries']);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListEntriesComponent, EntryComponent, PaginationComponent, SliceStrPipe],
            imports: [FormsModule, HttpClientModule, RouterTestingModule],
            providers: [{provide: HttpCommonService, useValue: spyHttp}, ActiveItemsService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListEntriesComponent);
        component = fixture.componentInstance;
        hostElement = fixture.debugElement.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('shouldShowPagination', fakeAsync(() => {
        const mockEntries = createMockEntries(25);
        spyHttp.getListEntries.and.returnValue(of({
            data: {
                children: mockEntries
            }
        }));
        component.entriesPerPage = 10;
        component.ngOnInit();
        tick();
        expect(component.showPagination).toBe(true);
    }));

    it('shouldn\'t show pagination', fakeAsync(() => {
        const mockEntries = createMockEntries(12);
        spyHttp.getListEntries.and.returnValue(of({
            data: {
                children: mockEntries
            }
        }));
        component.entriesPerPage = 16;
        component.ngOnInit();
        tick();
        expect(component.showPagination).toBe(false);
    }));

    it('should show 5 entries', fakeAsync(() => {
        const mockEntries = createMockEntries(25);
        spyHttp.getListEntries.and.returnValue(of({
            data: {
                children: mockEntries
            }
        }));
        component.entriesPerPage = 5;
        component.ngOnInit();
        tick();
        fixture.detectChanges();
        expect(hostElement.querySelectorAll('app-entry').length).toEqual(5);
    }));
});

export function createMockEntries(count: number): FeedEntry[] {
    const mockEntries: FeedEntry[] = [];
    for (let i = 1; i <= count; i++) {
        mockEntries.push(
            {
                kind: 'kind',
                data: {
                    author: 'author',
                    created: 10,
                    name: 'name',
                    num_comments: 50,
                    permalink: 'permalink',
                    score: 50,
                    selftext: 'selftext',
                    thumbnail: 'thumbnail',
                    thumbnail_height: 50,
                    thumbnail_width: 40,
                    title: 'title',
                    url: 'url'
                }
            }
        );
    }
    return mockEntries;
}
