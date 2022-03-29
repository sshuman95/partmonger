import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { InputErrorPipe } from 'src/app/pipes/input-error.pipe';
import { PartService } from '../parts.service';
import { NewPartComponent } from './new-part.component';

describe('NewPartComponent', () => {
  let component: NewPartComponent;
  let fixture: ComponentFixture<NewPartComponent>;
  let service: any;
  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('PartService', [
      'addPart',
      'handleAddPart',
    ]);
    await TestBed.configureTestingModule({
      declarations: [NewPartComponent, InputErrorPipe],
      imports: [
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: PartService, useValue: serviceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPartComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add part and call handleAddPart if the form is valid', () => {
    let data = {
      name: 'Sidney Test Part',
      partNumber: 'ABC',
      description: 'Description',
      notes: '',
      image: '',
      cost: 100,
      isActive: true,
    };
    service.addPart.and.returnValue(of({ ...data, id: 5 }));
    component.partForm.setValue({
      name: 'Sidney Test Part',
      cost: 100,
      partNumber: 'ABC',
      description: 'Description',
      notes: '',
      image: '',
      isActive: true,
      id: 0,
    });
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(service.addPart).toHaveBeenCalled();
    expect(service.handleAddPart).toHaveBeenCalled();
  });

  it('should not submit a new part', () => {
    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    expect(service.addPart).not.toHaveBeenCalled();
    expect(service.handleAddPart).not.toHaveBeenCalled();
  });
});
