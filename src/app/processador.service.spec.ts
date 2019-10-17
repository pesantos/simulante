import { TestBed } from '@angular/core/testing';

import { ProcessadorService } from './processador.service';

describe('ProcessadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessadorService = TestBed.get(ProcessadorService);
    expect(service).toBeTruthy();
  });
});
