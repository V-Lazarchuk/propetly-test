import { TestBed } from '@angular/core/testing';

import { ActiveItemsService } from './active-items.service';

describe('ActiveItemsService', () => {
    let service: ActiveItemsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ActiveItemsService]
        });
        service = TestBed.get(ActiveItemsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return a correct page number', (done: DoneFn) => {
        service.activePageNumber.next(5);
        service.activePageNumber.subscribe(item => {
            expect(item).toEqual(5);
            done();
        });
    });
});
