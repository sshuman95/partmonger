import { fakeAsync, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PartsService } from './parts.service';
import { PARTSMOCK } from '../mocks/parts-mock';
import { HttpErrorResponse } from '@angular/common/http';

describe('PartsService', () => {
  let service: PartsService;
  let httpTestController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PartsService);
    
    httpTestController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of parts', () => {
    service.getParts().subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(4);
    });
    const req = httpTestController.expectOne('http://localhost:9001/parts');
    expect(req.request.method).toEqual('GET');
    req.flush(PARTSMOCK);
  });

  it('should return a list of parts filtered by a query', () => {
    service.getParts('Grip').subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(1);
    });
    const req = httpTestController.expectOne(
      'http://localhost:9001/parts?search=Grip'
    );
    expect(req.request.method).toEqual('GET');
    req.flush([...PARTSMOCK].filter((p) => p.id === 1));
  });

  // it('should return an empty array if request fails', () => {
  //   service.getParts().subscribe(data => {

  //   });
  //   const req = httpTestController.expectOne('http://localhost:9001/parts');
  //   expect(req.request.method).toEqual('GET');
  //   req.flush({ status: 500, statusText: 'Internal Server error' });
  // });

  it('should emit a string', fakeAsync(() => {
    service.searchObs$.subscribe((value) => expect(value).toEqual('Test'));
    service.handleSearch('Test');
  }));

  afterEach(() => {
    httpTestController.verify();
  });
});
