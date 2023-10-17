import { TestBed } from '@angular/core/testing';

import { ShareDataProductsService } from './share-data-products.service';

describe('ShareDataProductsService', () => {
  let service: ShareDataProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
