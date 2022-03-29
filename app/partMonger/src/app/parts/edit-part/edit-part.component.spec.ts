import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PARTSMOCK } from 'src/app/mocks/parts-mock';
import { NewPartComponent } from '../new-part/new-part.component';
import { PartService } from '../parts.service';
import { EditPartComponent } from './edit-part.component';

describe('EditPartComponent', () => {
  let component: EditPartComponent;
  let fixture: ComponentFixture<EditPartComponent>;
  let serviceSpy: any;
  let router: any;
  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('PartService', [
      'editPart',
      'deletePart',
      'handleEditPart',
      'handleDeletePart',
      'getPartById',
    ]);

    await TestBed.configureTestingModule({
      declarations: [EditPartComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'manage/new', component: NewPartComponent },
        ]),
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
    fixture = TestBed.createComponent(EditPartComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a new form group', () => {
    let formValue = {
      id: 1,
      cost: 10,
      partNumber: 'mockPart1',
      description: 'mock part',
      name: 'Mock Part 1',
      notes: 'Mock note',
      image: '',
      isActive: false,
      inStock: 1,
    };
    expect(component.initForm(PARTSMOCK[0]).value).toEqual(formValue);
  });

  it('should return the proper cost error message', () => {
    let form = component.initForm(PARTSMOCK[0]);
    form.get('cost')?.setValue(undefined);
    expect(component.getCostError(form)).toEqual(component.requiredMessage);
    form.get('cost')?.setValue(-1);
    expect(component.getCostError(form)).toEqual(
      'Cost must be greater than 0.'
    );
    form.get('cost')?.setValue(10);
    expect(component.getCostError(form)).toEqual('');
    expect(component.getCostError(new FormGroup({}))).toEqual('');
  });

  it('should return the proper inStock error message', () => {
    let form = component.initForm(PARTSMOCK[0]);
    form.get('inStock')?.setValue(undefined);
    expect(component.getStockError(form)).toEqual(component.requiredMessage);
    form.get('inStock')?.setValue(-1);
    expect(component.getStockError(form)).toEqual(
      'Stock Quantity must be at least 0.'
    );
    form.get('inStock')?.setValue(10);
    expect(component.getStockError(form)).toEqual('');
    expect(component.getStockError(new FormGroup({}))).toEqual('');
  });

  it('should submit a valid part and call handleUpdate', (done:DoneFn) => {
    let form = new FormGroup({});
    let part = PARTSMOCK[0];
    serviceSpy.getPartById.and.returnValue(of(PARTSMOCK[0]));
    serviceSpy.editPart.and.returnValue(of({ ...part, cost: 100, inStock: 500 }));
    fixture.detectChanges();
    component.partForm$?.subscribe((val) => {
      expect(val.value).toEqual({
        cost: part.cost,
        description: part.description,
        id: part.id,
        image: part.image,
        isActive: part.isActive,
        name: part.name,
        notes: part.notes,
        partNumber: part.partNumber,
        inStock: part.inStock,
      });
      form = val;
      done();
    });
    form.get('cost')?.setValue(100);
    form.get('inStock')?.setValue(500);
    fixture.detectChanges();
    component.handleSubmit(new SubmitEvent('submit'), form);
    fixture.detectChanges();
    expect(serviceSpy.editPart).toHaveBeenCalled();
    expect(serviceSpy.handleEditPart).toHaveBeenCalled();
  });

  it('should not submit an invalid part', (done: DoneFn) => {
    let form = new FormGroup({});
    serviceSpy.getPartById.and.returnValue(of(PARTSMOCK[0]));
    fixture.detectChanges();
    component.partForm$?.subscribe((val) => {
      expect(val.value).toEqual({
        cost: 10,
        description: 'mock part',
        id: 1,
        image: '',
        isActive: false,
        name: 'Mock Part 1',
        notes: 'Mock note',
        partNumber: 'mockPart1',
        inStock: 1,
      });
      form = val;
      done();
    });
    form.get('cost')?.setValue(-100);
    fixture.detectChanges();
    component.handleSubmit(new SubmitEvent('submit'), form);
    fixture.detectChanges();
    expect(serviceSpy.editPart).not.toHaveBeenCalled();
    expect(serviceSpy.handleEditPart).not.toHaveBeenCalled();
  });

  it('should redirect if no id is provided', (done: DoneFn) => {
    serviceSpy.getPartById.and.returnValue(of({ ...PARTSMOCK[0], id: 0 }));
    spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
    component.partForm$?.subscribe((val) => {
      expect(val.get('id')?.value).toBeFalsy();
      expect(router.navigateByUrl).toHaveBeenCalledWith('manage/new');
      done();
    });
  });

  it('should delete a part and navigate to /new', () => {
    serviceSpy.getPartById.and.returnValue(of(PARTSMOCK[0]));
    serviceSpy.deletePart.and.returnValue(of(PARTSMOCK[0]));
    spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('.delete')).nativeElement;
    button.click();
    fixture.detectChanges();
    expect(serviceSpy.deletePart).toHaveBeenCalledOnceWith(1)
    expect(serviceSpy.handleDeletePart).toHaveBeenCalledOnceWith(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('manage/new');
  });
});
