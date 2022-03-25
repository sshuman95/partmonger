import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PARTSMOCK } from 'src/app/mocks/parts-mock';
import { PartFormComponent } from './part-form.component';

describe('PartFormComponent', () => {
  let component: PartFormComponent;
  let fixture: ComponentFixture<PartFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartFormComponent],
      imports: [
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty part form if no part is provided', () => {
    let emptyForm = {
      name: '',
      cost: 0,
      partNumber: '',
      description: '',
      notes: '',
      inStock: 0,
      image: '',
      isActive: true,
      id: 0,
    };
    expect(component.partForm.value).toEqual(emptyForm);
  });

  it('should set formFields equal to the part if a part is provided', () => {
    component.part = PARTSMOCK[0];
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.partForm.value).toEqual(PARTSMOCK[0]);
  });

  it('should display an error message if cost is less than 0 or undefined', () => {
    component.partForm.get('cost')?.setValue(-1);
    fixture.detectChanges();
    expect(component.getCostError()).toBe('Cost must be greater than 0.');
    component.partForm.get('cost')?.setValue(undefined);
    fixture.detectChanges();
    expect(component.getCostError()).toBe(component.requiredMessage);
  });

  it('should display an error message if inStock is less than 0 or undefined', () => {
    component.partForm.get('inStock')?.setValue(-1);
    fixture.detectChanges();
    expect(component.getInStockError()).toBe(
      'Stock quantity must be greater than 0.'
    );
    component.partForm.get('inStock')?.setValue(undefined);
    fixture.detectChanges();
    expect(component.getInStockError()).toBe(component.requiredMessage);
  });
});
