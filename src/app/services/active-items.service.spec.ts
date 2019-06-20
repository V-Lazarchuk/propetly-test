import { TestBed } from '@angular/core/testing';

import { ActiveItemsService } from './active-items.service';

describe('ActiveItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActiveItemsService = TestBed.get(ActiveItemsService);
    expect(service).toBeTruthy();
  });
});
