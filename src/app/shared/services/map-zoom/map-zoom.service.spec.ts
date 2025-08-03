import { TestBed } from '@angular/core/testing';

import { MapZoomService } from './map-zoom.service';

describe('MapZoomService', () => {
  let service: MapZoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapZoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
