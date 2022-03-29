import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture, TestBed
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PARTSMOCK } from '../../mocks/parts-mock';
import { PartComponent } from '../part/part.component';
import { PartsListComponent } from '../parts-list/parts-list.component';
import { PartService } from '../parts.service';
import { PartsComponent } from './parts.component';

describe('PartsComponent', () => {
  let component: PartsComponent;
  let fixture: ComponentFixture<PartsComponent>;
  let service: any;
  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('PartService', ['handleSearch']);
    await TestBed.configureTestingModule({
      declarations: [PartsComponent, PartsListComponent, PartComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatCardModule,
        RouterTestingModule,
      ],
      providers: [{ provide: PartService, useValue: serviceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PartService);
    service.searchParts$ = of(PARTSMOCK);
    service.partCache$ = of([...PARTSMOCK].filter((p) => p.id === 1));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleSearch', (done: DoneFn) => {
    const input: HTMLInputElement = fixture.debugElement.query(
      By.css('input')
    ).nativeElement;
    input.value = 'Grip';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(service.handleSearch).toHaveBeenCalledOnceWith('Grip');
      done();
    });
  });
});
