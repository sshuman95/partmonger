import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  CONSUMEPARTSMOCK,
  CREATEPARTMOCK,
  EDITEDPARTSMOCK,
  EDITPARTMOCK,
  NEWPARTMOCK,
  PARTSMOCK,
  RECEIVEPARTSMOCK,
  UPDATEDPARTSMOCK,
} from '../mocks/parts-mock';
import { PartService } from './parts.service';

describe('PartsService', () => {
  let service: PartService;
  let httpTestController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PartService);
    httpTestController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //API REQUESTS

  it('should return a list of parts and update cache', () => {
    service.getParts().subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(4);
      expect(service.parts).toEqual(data);
    });
    const req = httpTestController.expectOne('http://localhost:9001/parts');
    expect(req.request.method).toEqual('GET');
    req.flush(PARTSMOCK);
  });

  it('should return a list of parts filtered by a query and update cache', () => {
    service.getParts('Grip').subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.length).toBe(1);
      expect(service.parts).toEqual(data);
    });
    const req = httpTestController.expectOne(
      'http://localhost:9001/parts?search=Grip'
    );
    expect(req.request.method).toEqual('GET');
    req.flush([...PARTSMOCK].filter((p) => p.id === 1));
  });

  it('should return a part with a matching ID', () => {
    service.getPartById(1).subscribe((res) => {
      expect(res).toBeTruthy();
      expect(res.id).toEqual(1);
      expect(res).toEqual(PARTSMOCK[0]);
    });
    const req = httpTestController.expectOne('http://localhost:9001/parts/1');
    expect(req.request.method).toEqual('GET');
    req.flush(PARTSMOCK[0]);
  });

  it('should increase the inStock quantity of a part given an ID', () => {
    service.receivePart(PARTSMOCK[0].id).subscribe((data) => {
      expect(data).toEqual(RECEIVEPARTSMOCK);
    });
    const req = httpTestController.expectOne(
      'http://localhost:9001/parts/1/receive'
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(RECEIVEPARTSMOCK);
  });

  it('should decrease the inStock quantity of a part given an ID', () => {
    service.consumePart(PARTSMOCK[0].id).subscribe((data) => {
      expect(data).toEqual(CONSUMEPARTSMOCK);
    });
    const req = httpTestController.expectOne(
      'http://localhost:9001/parts/1/consume'
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(CONSUMEPARTSMOCK);
  });

  it('should create a new part', () => {
    service.addPart(CREATEPARTMOCK).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data).toEqual(NEWPARTMOCK);
    });
    const req = httpTestController.expectOne('http://localhost:9001/parts');
    expect(req.request.method).toEqual('POST');
    req.flush(NEWPARTMOCK);
  });

  it('should edit a part', () => {
    service.editPart(EDITPARTMOCK).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data).toEqual(EDITPARTMOCK);
    });
    const req = httpTestController.expectOne(
      `http://localhost:9001/parts/${EDITPARTMOCK.id}`
    );
    expect(req.request.method).toEqual('PUT');
    req.flush(EDITPARTMOCK);
  });

  it('should delete a part', () => {
    service.deletePart(1).subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data).toEqual(PARTSMOCK[0]);
    });
    const req = httpTestController.expectOne('http://localhost:9001/parts/1');
    expect(req.request.method).toEqual('DELETE');
    req.flush(PARTSMOCK[0]);
  });

  //HELPERS

  it('should push a string value to the search stream', (done: DoneFn) => {
    service.searchSubject.subscribe((val) => {
      expect(val).toEqual('New value');
      done();
    });
    service.handleSearch('New value');
  });

  it("should update a part's inStock quanity and refresh the cache", (done: DoneFn) => {
    service.parts = [...PARTSMOCK];
    service.partCache$.subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data).toEqual(UPDATEDPARTSMOCK);
      done();
    });
    service.handleUpdateQuantity({ ...PARTSMOCK[0], inStock: 50 });
    expect(service.parts).toEqual(UPDATEDPARTSMOCK);
  });

  it('should add a new part to the cache', (done: DoneFn) => {
    service.parts = [...PARTSMOCK];
    service.partCache$.subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.length).toBeGreaterThan(PARTSMOCK.length);
      expect(data).toEqual([...PARTSMOCK, NEWPARTMOCK]);
      done();
    });
    service.handleAddPart(NEWPARTMOCK);
    expect(service.parts).toEqual([...PARTSMOCK, NEWPARTMOCK]);
  });

  it('should remove a part from the cache', (done: DoneFn) => {
    service.parts = [...PARTSMOCK];
    service.partCache$.subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.length).toBeLessThan(PARTSMOCK.length);
      expect(data).toEqual(PARTSMOCK.slice(0, PARTSMOCK.length - 1));
      done();
    });
    service.handleDeletePart(PARTSMOCK[PARTSMOCK.length - 1]);
    expect(service.parts).toEqual(PARTSMOCK.slice(0, PARTSMOCK.length - 1));
  });

  it('should update a part in the cache', (done: DoneFn) => {
    service.parts = [...PARTSMOCK];
    service.partCache$.subscribe((data) => {
      expect(data).toBeTruthy();
      expect(data.length).toEqual(PARTSMOCK.length);
      expect(data).toEqual(EDITEDPARTSMOCK);
      done();
    });
    service.handleEditPart(EDITPARTMOCK);
    expect(service.parts).toEqual(EDITEDPARTSMOCK);
  });

  afterEach(() => {
    httpTestController.verify();
  });
});
