import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { PartService } from '../parts.service';
import { NewPartComponent } from './new-part.component';

describe('NewPartComponent', () => {
  let component: NewPartComponent;
  let fixture: ComponentFixture<NewPartComponent>;
  let serviceSpy: any;
  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('PartService', [
      'addPart',
      'handleAddPart',
    ]);
    await TestBed.configureTestingModule({
      declarations: [NewPartComponent],
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the proper error message for cost', () => {
    component.partForm.get('cost')?.setValue(undefined);
    fixture.detectChanges();
    expect(component.getCostError()).toEqual(component.requiredMessage);
    component.partForm.get('cost')?.setValue(-1);
    fixture.detectChanges();
    expect(component.getCostError()).toEqual('Cost must be greater than 0.');
    component.partForm.get('cost')?.setValue(10);
    fixture.detectChanges();
    expect(component.getCostError()).toEqual('');
    component.partForm.removeControl('cost');
    fixture.detectChanges();
    expect(component.getCostError()).toEqual('');
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
    serviceSpy.addPart.and.returnValue(of({ ...data, id: 5 }));
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
    expect(serviceSpy.addPart).toHaveBeenCalled();
    expect(serviceSpy.addPart).toHaveBeenCalledWith(data);
    expect(serviceSpy.handleAddPart).toHaveBeenCalled();
    expect(serviceSpy.handleAddPart).toHaveBeenCalledWith({
      ...data,
      id: 5,
    });
  });
});
