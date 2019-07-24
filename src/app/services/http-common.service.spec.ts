import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HttpCommonService } from './http-common.service';

describe('HttpCommonService', () => {
    const spyHttp: jasmine.SpyObj<HttpCommonService> = jasmine.createSpyObj('HttpClient', ['getListEntries']);
    let service: HttpCommonService;

    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [{provide: HttpCommonService, useValue: spyHttp}]
        })
    );

    beforeEach(() => {
        service = TestBed.get(HttpCommonService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an array of entries', async(() => {
        spyHttp.getListEntries.and.returnValue(of({
            data: {
                children: new Array(27)
            }
        }));
        service.getListEntries('sweden').subscribe(response => {
            expect(response.data.children.length).toBe(27);
        });
    }));
});
