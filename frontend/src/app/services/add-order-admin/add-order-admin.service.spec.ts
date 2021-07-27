import { TestBed } from '@angular/core/testing';

import { AddOrderAdminService } from './add-order-admin.service';

describe('AddOrderAdminService', () => {
  let service: AddOrderAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOrderAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
