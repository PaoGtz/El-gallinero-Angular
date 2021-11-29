import { TestBed } from '@angular/core/testing';

import { UsrActivoService } from './usr-activo.service';

describe('UsrActivoService', () => {
  let service: UsrActivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsrActivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
