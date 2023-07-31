import { TestBed } from '@angular/core/testing';

import { DropdownFormService } from './dropdown-form.service';

describe('DropdownFormService', () => {
  let service: DropdownFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropdownFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
